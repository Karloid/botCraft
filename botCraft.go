//go:generate protoc -I proto --go_out=. botCraft/options.proto botCraft/state.proto botCraft/action.proto
package botCraft

import (
	"github.com/karloid/botCraft/pb"
	"log"
	"math/rand"

	"google.golang.org/protobuf/proto"

	manager "github.com/bot-games/game-manager"
)

type BotCraft struct{}

type Point2D struct {
	X int32
	Y int32
}

func (d Point2D) toPb() *pb.Point2D {
	return &pb.Point2D{
		X: d.X,
		Y: d.Y,
	}
}

func (s BotCraft) Init() (proto.Message, proto.Message, uint8) {
	maxMapSize := int32(32)

	players := make([]*pb.Player, 0)

	players = append(players, &pb.Player{
		Id:    0,
		Score: 0,
	})

	players = append(players, &pb.Player{
		Id:    1,
		Score: 0,
	})

	entityProperties := s.fillEntityProperties()
	entityPropertiesByType := make(map[pb.EntityType]*pb.EntityProperties)
	for _, entityProperty := range entityProperties {
		entityPropertiesByType[entityProperty.EntityType] = entityProperty
	}

	entitiesById := make(map[int32]*pb.Entity)
	entitiesSurface := make(map[Point2D]*pb.Entity)

	nextId := int32(0)
	nextId = s.generateResources(&entitiesById, nextId, maxMapSize, &entitiesSurface, &entityPropertiesByType)

	nextId = s.generateBases(players, &entitiesById, nextId, maxMapSize, &entitiesSurface, &entityPropertiesByType)

	entities := make([]*pb.Entity, 0)
	for _, entity := range entitiesById {
		entities = append(entities, entity)
	}

	state := &pb.State{
		Players:  players,
		Entities: entities,
		Tick:     0,
		NextId:   nextId,
	}

	return &pb.Options{
		MapSize:          maxMapSize,
		FogOfWar:         false,
		MaxTickCount:     100, // TODO set 1000
		EntityProperties: entityProperties,
	}, state, uint8((1 << 0) | (1 << 1))
}

func (s BotCraft) generateResources(entities *map[int32]*pb.Entity, nextId int32, mapSize int32, entitiesSurface *map[Point2D]*pb.Entity, entityProperties *map[pb.EntityType]*pb.EntityProperties) int32 {
	resourcesToGenerate := (rand.Float32()*0.5 + 0.2) * float32(mapSize*mapSize)

	existingResources := make(map[Point2D]bool)

	resourceSize := (*entityProperties)[pb.EntityType_RESOURCE].Size

	for i := 0; i < int(resourcesToGenerate); i++ {
		x := rand.Int31n(mapSize)
		y := rand.Int31n(mapSize)

		pos := Point2D{X: x, Y: y}
		if existingResources[pos] {
			i--
			continue
		}

		existingResources[pos] = true

		entityCandidate := &pb.Entity{
			Id:         nextId,
			PlayerId:   -1,
			EntityType: pb.EntityType_RESOURCE,
			Position:   pos.toPb(),
			Health:     30,
		}

		isFree := s.checkIsPosFree(pos, resourceSize, entitiesSurface)

		if isFree {
			(*entities)[nextId] = entityCandidate

			s.putEntityToSurface(pos, resourceSize, entitiesSurface, entityCandidate)

			nextId++
		}
	}

	return 0
}

func (s BotCraft) putEntityToSurface(pos Point2D, resourceSize int32, entitiesSurface *map[Point2D]*pb.Entity, entityCandidate *pb.Entity) {
	for xx := pos.X; xx < pos.X+resourceSize; xx++ {
		for yy := pos.Y; yy < pos.Y+resourceSize; yy++ {
			(*entitiesSurface)[Point2D{X: xx, Y: yy}] = entityCandidate
		}
	}
}

func (s BotCraft) checkIsPosFree(pos Point2D, entitySize int32, entitiesSurface *map[Point2D]*pb.Entity) bool {
	isFree := true
	// check pos for free
	for xx := pos.X; xx < pos.X+entitySize; xx++ {
		for yy := pos.Y; yy < pos.Y+entitySize; yy++ {
			if (*entitiesSurface)[Point2D{X: xx, Y: yy}] != nil {
				isFree = false
				break
			}
		}
	}
	return isFree
}

func (s BotCraft) DecodeState(data []byte) (proto.Message, error) {
	state := &pb.State{}
	if err := proto.Unmarshal(data, state); err != nil {
		return nil, err
	}

	return state, nil
}

func (s BotCraft) DecodeAction(data []byte) (proto.Message, error) {
	action := &pb.Action{}
	if err := proto.Unmarshal(data, action); err != nil {
		return nil, err
	}

	return action, nil
}

func (s BotCraft) CheckAction(tickInfo *manager.TickInfo, action proto.Message) error {
	return nil
}

func (s BotCraft) ApplyActions(tickInfo *manager.TickInfo, actions []manager.Action) *manager.TickResult {
	options := tickInfo.GameOptions.(*pb.Options)
	state := tickInfo.State.(*pb.State)
	state.Tick++

	entitiesById := make(map[int32]*pb.Entity)
	for _, entity := range state.Entities {
		entitiesById[entity.Id] = entity
	}

	log.Println("ApplyActions ", "actions:", len(actions))

	pendingNextSteps := make(map[int32]*pb.Point2D)

	for _, action := range actions {
		pbAction := action.Action.(*pb.Action)

		playerPos := 0
		for i := range tickInfo.Uids {
			if tickInfo.Uids[i] == action.Uid {
				playerPos = i
				break
			}
		}
		playerId := state.Players[playerPos].Id

		for entityId, entityAction := range pbAction.EntityActions {
			entity, ok := entitiesById[entityId]
			if !ok {
				// TODO log error to player response
				continue
			}
			if entity.PlayerId != playerId {
				// TODO log error to player response
				continue
			}

			/**
			1. Pathfinding algorithm is triggered for moving entities to determine the potential next position.
				If the target position for the movement action of an entity is adjacent, pathfinding is not performed and the position is memorized.
			2. All attack actions of active entities are executed in random order. If no valid target for an attack is found,
				but there is an enemy in the position found in the previous step, the entity attacks that enemy. If the target's health was positive and becomes zero after an attack, the target is considered destroyed and the attacker gains points (however, the target is not removed from the game yet).
			3. All build actions are executed in random order (if an entity has already executed an attack action during this tick,
				it cannot perform a build action).
			4. All repair actions are executed in random order. Only entities with positive health are repaired.
			5. Movement is executed in several steps. At each step, units attempt to move to the position found during the pathfinding stage.
				If multiple units attempt to move to the same position, a random one is chosen. If no unit is able to move, the movement phase ends.
			*/
			// TODO proper concurrent order of actions
			if entityAction.MoveAction != nil {
				// do breath first search
				// find next step
				target := entityAction.MoveAction.Target

				if !inBounds(options, target) {
					// TODO log error to player response
					continue
				}

				var nextStep pb.Point2D = objCopy(entity.Position)

				if nextStep.X < target.X {
					nextStep.X++
				} else if nextStep.X > target.X {
					nextStep.X--
				} else if nextStep.Y < target.Y {
					nextStep.Y++
				} else if nextStep.Y > target.Y {
					nextStep.Y--
				}

				pendingNextSteps[entityId] = &nextStep
			} else if entityAction.BuildAction != nil {

			}
		}

	}

	// apply steps
	for entityId, nextStep := range pendingNextSteps {
		entity, ok := entitiesById[entityId]
		if !ok {
			continue
		}

		entity.Position = nextStep
	}

	if hasWinner(state) {
		return &manager.TickResult{
			GameFinished: true,
			Winner:       1 << 0,
			NewState:     state,
		}
	}

	if state.Tick >= options.MaxTickCount {
		// TODO calc proper winner
		return &manager.TickResult{
			GameFinished: true,
			Winner:       1 << 0,
			NewState:     state,
		}
	}

	return &manager.TickResult{
		GameFinished:    false,
		NewState:        state,
		NextTurnPlayers: uint8((1 << 0) | (1 << 1)),
	}
}

func (s BotCraft) SmartGuyTurn(tickInfo *manager.TickInfo) proto.Message {
	actions := make(map[int32]*pb.EntityAction)

	return &pb.Action{
		EntityActions: actions,
	}
}

func (s BotCraft) generateBases(players []*pb.Player, entitiesById *map[int32]*pb.Entity, nextId int32, mapSize int32, entitiesSurface *map[Point2D]*pb.Entity, entityProperties *map[pb.EntityType]*pb.EntityProperties) int32 {

	// TODO better base generation

	for index, player := range players {

		s.placeEntity(entitiesSurface, entitiesById, entityProperties, &pb.Entity{
			Id:         nextId,
			PlayerId:   player.Id,
			EntityType: pb.EntityType_BUILDER_BASE,
			Position:   Point2D{X: 6, Y: int32(index) * (mapSize - 4)}.toPb(),
			Health:     100,
		})
		nextId++

		// generate couple of builders
		for i := 0; i < 2; i++ {

			s.placeEntity(entitiesSurface, entitiesById, entityProperties, &pb.Entity{
				Id:         nextId,
				PlayerId:   player.Id,
				EntityType: pb.EntityType_BUILDER_UNIT,
				Position:   Point2D{X: 11, Y: int32(index)*(mapSize-4) + int32(i)}.toPb(),
				Health:     10,
			})

			nextId++
		}
	}
	return nextId
}

func (s BotCraft) placeEntity(
	entitiesSurface *map[Point2D]*pb.Entity,
	entitiesById *map[int32]*pb.Entity,
	entityProperties *map[pb.EntityType]*pb.EntityProperties,
	entity *pb.Entity,
) {
	(*entitiesById)[entity.Id] = entity
	baseSize := (*entityProperties)[pb.EntityType_BUILDER_BASE].Size

	entityPosition := Point2D{X: entity.Position.X, Y: entity.Position.Y}

	for x := entityPosition.X; x < entityPosition.X+baseSize; x++ {
		for y := entityPosition.Y; y < entityPosition.Y+baseSize; y++ {
			// remove existing entities
			posToPlace := Point2D{X: x, Y: y}
			existing, ok := (*entitiesSurface)[posToPlace]
			if ok {
				s.removeEntity(entitiesById, entitiesSurface, entityProperties, existing)
			}

			(*entitiesSurface)[posToPlace] = entity
		}
	}
}

func (s BotCraft) removeEntity(
	entitiesById *map[int32]*pb.Entity,
	entitiesSurface *map[Point2D]*pb.Entity,
	entityProperties *map[pb.EntityType]*pb.EntityProperties,
	entity *pb.Entity,
) {
	delete(*entitiesById, entity.Id)

	existingSize := (*entityProperties)[entity.EntityType].Size
	for x2 := entity.Position.X; x2 < entity.Position.X+existingSize; x2++ {
		for y2 := entity.Position.Y; y2 < entity.Position.Y+existingSize; y2++ {
			delete(*entitiesSurface, Point2D{X: x2, Y: y2})
		}
	}
}
