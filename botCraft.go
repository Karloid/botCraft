//go:generate protoc -I proto --go_out=. botCraft/options.proto botCraft/state.proto botCraft/action.proto
package botCraft

import (
	"fmt"
	"github.com/karloid/botCraft/pb"
	"log"
	"math"
	"math/rand"

	"google.golang.org/protobuf/proto"

	manager "github.com/bot-games/game-manager"
)

type BotCraft struct{}

// TODO DELETEME implement proper map generation
func (s BotCraft) Init() (proto.Message, proto.Message, uint8) {
	maxMapSize := int32(18)

	players := make([]*pb.Player, 0)

	players = append(players, &pb.Player{
		Id:        0,
		Score:     0,
		Resources: 0,
	})

	players = append(players, &pb.Player{
		Id:        1,
		Score:     0,
		Resources: 0,
	})

	entityProperties := s.fillEntityProperties()
	entityPropertiesByType := make(map[pb.EntityType]*pb.EntityProperties)
	for _, entityProperty := range entityProperties {
		entityPropertiesByType[entityProperty.EntityType] = entityProperty
	}

	entitiesById := make(map[int32]*pb.Entity)
	entitiesSurface := make(map[GamePoint2D]*pb.Entity)

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
		MaxTickCount:     1000,
		EntityProperties: entityProperties,
	}, state, uint8((1 << 0) | (1 << 1))
}

func (s BotCraft) generateResources(entitiesById *map[int32]*pb.Entity, nextId int32, mapSize int32, entitiesSurface *map[GamePoint2D]*pb.Entity, entityProperties *map[pb.EntityType]*pb.EntityProperties) int32 {
	resourcesToGenerate := (rand.Float32()*0.5 + 0.2) * float32(mapSize*mapSize/2)

	existingResources := make(map[GamePoint2D]bool)

	resourceSize := (*entityProperties)[pb.EntityType_RESOURCE].Size

	for i := 0; i < int(resourcesToGenerate); i++ {
		x := rand.Int31n(mapSize)
		y := rand.Int31n(mapSize)

		pos := GamePoint2D{X: x, Y: y}
		if existingResources[pos] {
			i--
			continue
		}

		if pos.distanceManh(GamePoint2D{X: 0, Y: 0}) > mapSize {
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
			Active:     true,
		}

		isFree := s.checkIsPosFree(pos, resourceSize, entitiesSurface)

		if isFree {
			s.putEntityToSurface(pos, resourceSize, entitiesSurface, entityCandidate)
			(*entitiesById)[entityCandidate.Id] = entityCandidate

			nextId++
		}
	}

	// mirror existingResources
	for pos, _ := range existingResources {
		mirroredPos := GamePoint2D{X: mapSize - pos.X - resourceSize, Y: mapSize - pos.Y - resourceSize}
		isFree := s.checkIsPosFree(mirroredPos, resourceSize, entitiesSurface)

		if isFree {
			log.Println("mirroring resource", pos, "->", mirroredPos)
			entityCandidate := &pb.Entity{
				Id:         nextId,
				PlayerId:   -1,
				EntityType: pb.EntityType_RESOURCE,
				Position:   mirroredPos.toPb(),
				Health:     30,
				Active:     true,
			}
			s.putEntityToSurface(mirroredPos, resourceSize, entitiesSurface, entityCandidate)
			(*entitiesById)[entityCandidate.Id] = entityCandidate
			nextId++
		}
	}

	return nextId
}

func (s BotCraft) putEntityToSurface(pos GamePoint2D, resourceSize int32, entitiesSurface *map[GamePoint2D]*pb.Entity, entityCandidate *pb.Entity) {
	for xx := pos.X; xx < pos.X+resourceSize; xx++ {
		for yy := pos.Y; yy < pos.Y+resourceSize; yy++ {
			log.Println("putting resource", pos, "->", xx, yy)
			posToPlace := GamePoint2D{X: xx, Y: yy}
			(*entitiesSurface)[posToPlace] = entityCandidate
		}
	}
}

func (s BotCraft) checkIsPosFree(pos GamePoint2D, entitySize int32, entitiesSurface *map[GamePoint2D]*pb.Entity) bool {
	isFree := true
	// check pos for free
	for xx := pos.X; xx < pos.X+entitySize; xx++ {
		for yy := pos.Y; yy < pos.Y+entitySize; yy++ {
			if (*entitiesSurface)[GamePoint2D{X: xx, Y: yy}] != nil {
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

type EntityIdPlusAction struct {
	EntityId     int32
	EntityAction *pb.EntityAction
}

func (s BotCraft) ApplyActions(tickInfo *manager.TickInfo, actions []manager.Action) *manager.TickResult {
	var options = tickInfo.GameOptions.(*pb.Options)
	entitiesProperties := make(map[pb.EntityType]*pb.EntityProperties)
	for i := range options.EntityProperties {
		entitiesProperties[options.EntityProperties[i].EntityType] = options.EntityProperties[i]
	}
	state := tickInfo.State.(*pb.State)
	state.Tick++

	entitiesById := make(map[int32]*pb.Entity)
	entitiesSurface := make(map[GamePoint2D]*pb.Entity)
	for _, entity := range state.Entities {
		entitiesById[entity.Id] = entity
		s.placeEntity(&entitiesSurface, &entitiesById, &entitiesProperties, entity)
	}
	playersById := make(map[int32]*pb.Player)
	for _, player := range state.Players {
		playersById[player.Id] = player
	}

	pendingMoveActions := make([]*EntityIdPlusAction, 0)
	pendingBuildActions := make([]*EntityIdPlusAction, 0)
	pendingAttackActions := make([]*EntityIdPlusAction, 0)
	pendingRepairActions := make([]*EntityIdPlusAction, 0)

	appliedAttacks := make([]*pb.AppliedAttack, 0)
	appliedRepairs := make([]*pb.AppliedRepair, 0)
	appliedBuilds := make([]*pb.AppliedBuild, 0)

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
				log.Println("ignore action: not existent", entityId)
				continue
			}
			if entity.PlayerId != playerId {
				// TODO log error to player response
				log.Println("ignore action: Entity not belongs to player", entityId)
				continue
			}

			if !entity.Active {
				// TODO log error to player response
				log.Println("ignore action: Entity is not active", entityId)
				continue
			}

			entityIdPlusAction := EntityIdPlusAction{
				EntityId:     entityId,
				EntityAction: entityAction,
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
			if entityAction.MoveAction != nil {
				pendingMoveActions = append(pendingMoveActions, &entityIdPlusAction)
			} else if entityAction.BuildAction != nil {
				pendingBuildActions = append(pendingBuildActions, &entityIdPlusAction)
			} else if entityAction.AttackAction != nil {
				pendingAttackActions = append(pendingAttackActions, &entityIdPlusAction)
			} else if entityAction.RepairAction != nil {
				pendingRepairActions = append(pendingRepairActions, &entityIdPlusAction)
			}
		}
	}

	log.Println(
		"ApplyActions ",
		"playerActions:",
		len(actions),
		"MoveActions:",
		len(pendingMoveActions),
		"BuildActions:",
		len(pendingBuildActions),
		"AttackActions:",
		len(pendingAttackActions),
		"RepairActions:",
		len(pendingRepairActions),
		"Player[0] resources:",
		state.Players[0].Resources,
		"[1]:",
		state.Players[1].Resources,
	)

	// apply steps

	// prepare move
	pendingMovePositions := make(map[int32]*pb.Point2D)

	for _, entityIdPlusAction := range pendingMoveActions {

		entity, ok := entitiesById[entityIdPlusAction.EntityId]
		if !ok {
			continue
		}

		// do breath first search
		// find next step
		target := entityIdPlusAction.EntityAction.MoveAction.Target

		if !inBounds(options, target) {
			// TODO log error to player response
			continue
		}
		if target.X == entity.Position.X && target.Y == entity.Position.Y {
			// TODO log error to player response
			continue
		}
		if !entitiesProperties[entity.EntityType].CanMove {
			continue
		}

		breakThrough := entityIdPlusAction.EntityAction.MoveAction.BreakThrough
		pathToTarget, closestToTarget := s.findPath(options, &entitiesSurface, entity, target, breakThrough)

		if len(pathToTarget) < 1 &&
			entityIdPlusAction.EntityAction.MoveAction.FindClosestPosition &&
			closestToTarget != nil &&
			!closestToTarget.equals(target) {
			// try to find closest position
			pathToTarget, _ = s.findPath(options, &entitiesSurface, entity, closestToTarget.toPb(), breakThrough)
			log.Println(
				"Fallback to closest position for entity", entity.Id, "from=",
				entity.Position.X, entity.Position.Y, " to=", target.X, target.Y,
				" pathLen=", len(pathToTarget),
			)
		}

		if len(pathToTarget) < 1 {
			log.Println("pathToTarget not found from=", entity.Position.X, entity.Position.Y, " to=", target.X, target.Y)
			continue
		}
		if len(pathToTarget) == 1 {
			// already at target, ignore
			continue
		}
		var nextStep *GamePoint2D = pathToTarget[1] // place occupied

		//TODO  check all new positions for all surface
		entityWithOccupiedNextStep := entitiesSurface[*nextStep]
		if entityWithOccupiedNextStep != nil && entityWithOccupiedNextStep.Id != entity.Id && entityWithOccupiedNextStep.PlayerId != entity.PlayerId && breakThrough {
			pendingAttackActions = append(pendingAttackActions, &EntityIdPlusAction{
				EntityId: entity.Id,
				EntityAction: &pb.EntityAction{
					AttackAction: &pb.AttackAction{
						TargetId: &pb.Int32Value{Value: entityWithOccupiedNextStep.Id},
					},
				},
			})
		} else {
			pendingMovePositions[entity.Id] = s.point2DtoProto(nextStep)
		}
	}

	// attack
	pendingAttackActions = shuffleArray(pendingAttackActions)

	for _, entityIdPlusAction := range pendingAttackActions {
		// if targetId not nil
		entity := entitiesById[entityIdPlusAction.EntityId]
		entityProperties := entitiesProperties[entity.EntityType]

		if entityIdPlusAction.EntityAction.AttackAction.TargetId != nil {
			targetId := entityIdPlusAction.EntityAction.AttackAction.TargetId.Value
			target, ok := entitiesById[targetId]
			if !ok {
				continue
			}

			distanceToTarget := distanceNoObstracles(target, entity, &entitiesProperties)
			if entityProperties.AttackProperties.AttackRange < distanceToTarget {
				continue
			}

			actualDamage := minOf(entityProperties.AttackProperties.Damage, target.Health)
			target.Health -= actualDamage

			// collect resources
			targetProperties := entitiesProperties[target.EntityType]
			resources := targetProperties.ResourcePerHealth * actualDamage
			if entityProperties.AttackProperties.CollectResource {
				player := playersById[entity.PlayerId]
				player.Resources += resources
			}

			appliedAttacks = append(appliedAttacks, &pb.AppliedAttack{
				AttackerId: entity.Id,
				TargetId:   target.Id,
				Damage:     actualDamage,
			})

			// collect score
			if actualDamage > 0 && target.Health <= 0 {
				player := playersById[entity.PlayerId]
				player.Score += targetProperties.DestroyScore
			}
		}
	}

	// remove dead units
	for _, entity := range entitiesById {
		if entity.Health <= 0 {
			if entity.EntityType != pb.EntityType_RESOURCE {
				println("dead entity=", entity.Id, "type", entity.EntityType.String(),
					"pos", entity.Position.X, entity.Position.Y, "playerId", entity.PlayerId)
			}

			s.removeEntity(&entitiesById, &entitiesSurface, &entitiesProperties, entity)
			// remove entity from state.Entities
			for i, e := range state.Entities {
				if e == entity {
					// found entity to remove, so remove it
					state.Entities = append(state.Entities[:i], state.Entities[i+1:]...)
					break
				}
			}
		}
	}

	// build
	pendingBuildActions = shuffleArray(pendingBuildActions)
	for _, action := range pendingBuildActions {
		builder, ok := entitiesById[action.EntityId]
		if !ok {
			log.Println("builder is dead probably")
			continue
		}
		positionToBuild := action.EntityAction.BuildAction.Position
		entityTypeToBuild := action.EntityAction.BuildAction.EntityType
		buildSize := entitiesProperties[entityTypeToBuild].Size

		// check builder can build this type of entity
		log.Println("builder.EntityType=", builder.EntityType, "entityTypeToBuild=", entityTypeToBuild)
		builderProp := entitiesProperties[builder.EntityType]
		if builderProp.BuildProperties == nil {
			log.Println("builder can't build entity=", entityTypeToBuild.String(), "playerId=", builder.PlayerId)
			// TODO log error to player response
			continue
		}
		// check builderProp.BuildProperties.Options contains entityTypeToBuild
		if !contains(builderProp.BuildProperties.Options, entityTypeToBuild) {
			log.Println("builder can't build this type of entity=", entityTypeToBuild.String(), "playerId=", builder.PlayerId)
			// TODO log error to player response
			continue
		}

		// check enough resources to build
		// TODO add cost per each created entity
		if playersById[builder.PlayerId].Resources < buildSize {
			log.Println("not enough resources to build entity=", entityTypeToBuild.String(), "playerId=", builder.PlayerId)
			// TODO log error to player response
			continue
		}

		entityToBuildCost := entitiesProperties[entityTypeToBuild].Cost
		if playersById[builder.PlayerId].Resources < entityToBuildCost {
			log.Println("not enough resources to build entity=", entityTypeToBuild.String(), "playerId=", builder.PlayerId)
			// TODO log error to player response
			continue
		}

		// check population is not full
		playerCurrentPopulation := int32(0)
		playerAllowedPopulation := int32(0)
		for _, entity := range entitiesById {
			if entity.PlayerId == builder.PlayerId {
				playerCurrentPopulation += entitiesProperties[entity.EntityType].PopulationUse
				playerAllowedPopulation += entitiesProperties[entity.EntityType].PopulationProvide
			}
		}

		populationUse := entitiesProperties[entityTypeToBuild].PopulationUse
		if playerCurrentPopulation+populationUse > playerAllowedPopulation {
			log.Println("not enough population to build entity=", entityTypeToBuild.String(), "playerId=", builder.PlayerId)
			// TODO log error to player response
			continue
		}

		// check all space is free according to size
		spaceIsFree := true
		for x := positionToBuild.X; x < positionToBuild.X+buildSize; x++ {
			for y := positionToBuild.Y; y < positionToBuild.Y+buildSize; y++ {
				// check if in bounds
				if !inBounds2(options, &GamePoint2D{x, y}) {
					spaceIsFree = false
					break
				}

				if entitiesSurface[GamePoint2D{x, y}] != nil {
					spaceIsFree = false
					break
				}
			}
		}

		if !spaceIsFree {
			// TODO log error to player response
			log.Println("space is not free to build entity=", entityTypeToBuild.String(), "playerId=", builder.PlayerId)
			continue
		}

		// check builder is adjacent to build position
		distanceToEntityToBuild := distanceTo(&entitiesProperties, options, builder, entityTypeToBuild, positionToBuild)
		if distanceToEntityToBuild > 1 {
			log.Println("builder is not adjacent to build position entity=", entityTypeToBuild.String(), "playerId=", builder.PlayerId, "distance=", distanceToEntityToBuild)
			continue
		}

		// build
		playersById[builder.PlayerId].Resources -= buildSize
		// TODO add active status and proper initial health
		initialHealth := entitiesProperties[action.EntityAction.BuildAction.EntityType].MaxHealth
		active := true
		if builderProp.BuildProperties.InitHealth != nil {
			initialHealth = builderProp.BuildProperties.InitHealth.Value
			active = false
		}

		newEntity := &pb.Entity{
			Id:         state.NextId,
			EntityType: action.EntityAction.BuildAction.EntityType,
			Health:     initialHealth,
			PlayerId:   builder.PlayerId,
			Position:   positionToBuild,
			Active:     active,
		}
		state.NextId++

		// place entity
		s.placeEntity(&entitiesSurface, &entitiesById, &entitiesProperties, newEntity)
		entitiesById[newEntity.Id] = newEntity
		state.Entities = append(state.Entities, newEntity)

		// consume resources
		playersById[builder.PlayerId].Resources -= entityToBuildCost

		// add score
		playersById[builder.PlayerId].Score += entitiesProperties[entityTypeToBuild].BuildScore

		appliedBuilds = append(appliedBuilds, &pb.AppliedBuild{
			BuilderId: builder.Id,
			TargetId:  newEntity.Id,
		})

		log.Println(
			"built entity=",
			entityTypeToBuild.String(),
			"playerId=",
			builder.PlayerId,
			"id=",
			newEntity.Id,
			"current Population=",
			playerCurrentPopulation+populationUse,
			"allowed Population=",
			playerAllowedPopulation,
		)
	}

	// repair
	for _, action := range pendingRepairActions {
		repairer, ok := entitiesById[action.EntityId]
		if !ok {
			log.Println("repairer is dead probably id=", action.EntityId)
			continue
		}

		target, ok := entitiesById[action.EntityAction.RepairAction.TargetId]
		if !ok {
			log.Println("target is dead probably id=", action.EntityAction.RepairAction.TargetId)
			continue
		}
		if repairer.PlayerId != target.PlayerId {
			log.Println("repairer and target are not owned by same player", "repairer.PlayerId=", repairer.PlayerId, "target.PlayerId=", target.PlayerId)
			continue
		}
		repairerProp := entitiesProperties[repairer.EntityType]
		if repairerProp.RepairProperties == nil || repairerProp.RepairProperties.ValidTargets == nil {
			log.Println("repairer can't repair anything=", target.EntityType.String(), "entityId=", repairer.Id)
			continue
		}

		if contains(repairerProp.RepairProperties.ValidTargets, target.EntityType) == false {
			log.Println("repairer can't repair this type of entity=", target.EntityType.String(), "repairerId=", repairer.Id)
			continue
		}

		// check repairer is adjacent to target
		distanceToTarget := distanceTo(&entitiesProperties, options, repairer, target.EntityType, target.Position)
		if distanceToTarget > 1 {
			log.Println("repairer is not adjacent to target", "repairerId=", repairer.Id, "targetId=", target.Id, "distance=", distanceToTarget)
			continue
		}

		// repair
		targetMaxHealth := entitiesProperties[target.EntityType].MaxHealth
		maxRepair := targetMaxHealth - target.Health

		actualRepair := minOf(repairerProp.RepairProperties.Power, maxRepair)
		target.Health += actualRepair
		if target.Health >= targetMaxHealth {
			target.Health = targetMaxHealth
			target.Active = true
		}
		appliedRepairs = append(appliedRepairs, &pb.AppliedRepair{
			RepairerId:     repairer.Id,
			TargetId:       target.Id,
			HealthRestored: actualRepair,
		})

		log.Println("repaired entity=", target.EntityType.String(), "playerId=", repairer.PlayerId, "id=", target.Id, "newHealth=", target.Health)
	}

	// move
	for entityId, pbNewPosition := range pendingMovePositions {
		entity, ok := entitiesById[entityId]
		if !ok {
			continue
		}
		if entity.Health < 0 {
			continue
		}

		newPosition := point2DFromProto(pbNewPosition)
		//TODO  check all new positions for all surface
		if entitiesSurface[newPosition] != nil && entitiesSurface[newPosition].Id != entityId {
			continue
		}
		s.removeEntity(&entitiesById, &entitiesSurface, &entitiesProperties, entity)
		entity.Position = pbNewPosition

		s.placeEntity(&entitiesSurface, &entitiesById, &entitiesProperties, entity)
	}
	state.AppliedBuilds = appliedBuilds
	state.AppliedRepairs = appliedRepairs
	state.AppliedAttacks = appliedAttacks

	// TODO check if entities are all dead
	if state.Tick >= options.MaxTickCount {
		// find player with highest score and set it as winner
		maxScore := int32(math.MinInt32)
		for _, player := range state.Players {
			if player.Score > maxScore {
				maxScore = player.Score
			}
		}
		winner := uint8(0)
		for _, player := range state.Players {
			if player.Score == maxScore {
				winner = 1 << player.Id
			}
		}
		// TODO handle tie
		return &manager.TickResult{
			GameFinished: true,
			Winner:       winner,
			NewState:     state,
		}
	}

	return &manager.TickResult{
		GameFinished:    false,
		NewState:        state,
		NextTurnPlayers: uint8((1 << 0) | (1 << 1)),
	}
}

func distanceTo(entitiesProperties *map[pb.EntityType]*pb.EntityProperties, options *pb.Options, builder *pb.Entity, buildEntityType pb.EntityType, buildPos *pb.Point2D) int32 {
	builderSize := (*entitiesProperties)[builder.EntityType].Size
	buildSize := (*entitiesProperties)[buildEntityType].Size
	distance := int32(math.MaxInt32)

	// for all cells of builder
	for x := builder.Position.X; x < builder.Position.X+builderSize; x++ {
		for y := builder.Position.Y; y < builder.Position.Y+builderSize; y++ {
			// for all cells of build
			for x2 := buildPos.X; x2 < buildPos.X+buildSize; x2++ {
				for y2 := buildPos.Y; y2 < buildPos.Y+buildSize; y2++ {
					distance = minOf(distance, distanceManh(&GamePoint2D{x, y}, &GamePoint2D{x2, y2}))
				}
			}
		}
	}

	return distance
}

func abs2(a int32) int32 {
	if a < 0 {
		return -a
	} else {
		return a
	}
}

func distanceManh(p *GamePoint2D, p2 *GamePoint2D) int32 {
	return abs2(p.X-p2.X) + abs2(p.Y-p2.Y)
}

func contains(array []pb.EntityType, entityTypeToCheck pb.EntityType) bool {
	for _, entityType := range array {
		if entityType == entityTypeToCheck {
			return true
		}
	}
	return false
}

func minOf(a int32, b int32) int32 {
	if a < b {
		return a
	} else {
		return b
	}
}

func point2DFromProto(position *pb.Point2D) GamePoint2D {
	return GamePoint2D{X: position.X, Y: position.Y}
}

func (s BotCraft) point2DtoProto(nextStep *GamePoint2D) *pb.Point2D {
	return &pb.Point2D{X: nextStep.X, Y: nextStep.Y}
}

func distanceNoObstracles(target *pb.Entity, entity *pb.Entity, m *map[pb.EntityType]*pb.EntityProperties) int32 {
	// calc manhattan distance between squares, with given positions of top left corners
	// TODO optimize it
	targetSize := (*m)[target.EntityType].Size
	entitySize := (*m)[entity.EntityType].Size

	minDistance := int32(99999)
	for targetX := target.Position.X; targetX < target.Position.X+targetSize; targetX++ {
		for targetY := target.Position.Y; targetY < target.Position.Y+targetSize; targetY++ {
			for entityX := entity.Position.X; entityX < entity.Position.X+entitySize; entityX++ {
				for entityY := entity.Position.Y; entityY < entity.Position.Y+entitySize; entityY++ {
					manhattanDistance := abs(targetX-entityX) + abs(targetY-entityY)
					if manhattanDistance < minDistance {
						minDistance = manhattanDistance
					}
				}
			}

		}
	}
	return minDistance
}

func abs(i int32) int32 {
	if i < 0 {
		return -i
	}
	return i
}

func shuffleArray(actions []*EntityIdPlusAction) []*EntityIdPlusAction {
	n := len(actions)
	for i := n - 1; i > 0; i-- {
		j := rand.Intn(i + 1)
		actions[i], actions[j] = actions[j], actions[i]
	}
	return actions
}

func (s BotCraft) SmartGuyTurn(tickInfo *manager.TickInfo) proto.Message {
	actions := make(map[int32]*pb.EntityAction)

	return &pb.Action{
		EntityActions: actions,
	}
}

func (s BotCraft) generateBases(players []*pb.Player, entitiesById *map[int32]*pb.Entity, nextId int32, mapSize int32, entitiesSurface *map[GamePoint2D]*pb.Entity, entityProperties *map[pb.EntityType]*pb.EntityProperties) int32 {

	// TODO support generation for more than two players

	for index, player := range players {

		if index == 0 {

			s.placeEntity(entitiesSurface, entitiesById, entityProperties, &pb.Entity{
				Id:         nextId,
				PlayerId:   player.Id,
				EntityType: pb.EntityType_BUILDER_BASE,
				Position:   GamePoint2D{X: 1, Y: 1}.toPb(),
				Health:     100,
				Active:     true,
			})
			nextId++

			// generate couple of builders
			s.placeEntity(entitiesSurface, entitiesById, entityProperties, &pb.Entity{
				Id:         nextId,
				PlayerId:   player.Id,
				EntityType: pb.EntityType_BUILDER_UNIT,
				Position:   GamePoint2D{X: 5, Y: 4}.toPb(),
				Health:     (*entityProperties)[pb.EntityType_BUILDER_UNIT].MaxHealth,
				Active:     true,
			})
			nextId++

			s.placeEntity(entitiesSurface, entitiesById, entityProperties, &pb.Entity{
				Id:         nextId,
				PlayerId:   player.Id,
				EntityType: pb.EntityType_BUILDER_UNIT,
				Position:   GamePoint2D{X: 4, Y: 5}.toPb(),
				Health:     (*entityProperties)[pb.EntityType_BUILDER_UNIT].MaxHealth,
				Active:     true,
			})
			nextId++

			s.placeEntity(entitiesSurface, entitiesById, entityProperties, &pb.Entity{
				Id:         nextId,
				PlayerId:   player.Id,
				EntityType: pb.EntityType_TURRET,
				Position:   GamePoint2D{X: 5, Y: 5}.toPb(),
				Health:     (*entityProperties)[pb.EntityType_TURRET].MaxHealth,
				Active:     true,
			})
			nextId++
		} else {
			// mirror to the other side
			entitiesOfFirstPlayer := make([]*pb.Entity, 0)
			for _, entity := range *entitiesById {
				if entity.PlayerId == players[0].Id {
					entitiesOfFirstPlayer = append(entitiesOfFirstPlayer, entity)
				}
			}

			for _, entity := range entitiesOfFirstPlayer {
				entitySize := (*entityProperties)[entity.EntityType].Size
				s.placeEntity(entitiesSurface, entitiesById, entityProperties, &pb.Entity{
					Id:         nextId,
					PlayerId:   player.Id,
					EntityType: entity.EntityType,
					Position:   GamePoint2D{X: mapSize - entity.Position.X - entitySize, Y: mapSize - entity.Position.Y - entitySize}.toPb(),
					Health:     entity.Health,
					Active:     entity.Active,
				})
				nextId++
			}

		}
	}
	return nextId
}

func (s BotCraft) placeEntity(
	entitiesSurface *map[GamePoint2D]*pb.Entity,
	entitiesById *map[int32]*pb.Entity,
	entityProperties *map[pb.EntityType]*pb.EntityProperties,
	entity *pb.Entity,
) {
	(*entitiesById)[entity.Id] = entity
	entitySize := (*entityProperties)[entity.EntityType].Size

	entityPosition := GamePoint2D{X: entity.Position.X, Y: entity.Position.Y}

	for x := entityPosition.X; x < entityPosition.X+entitySize; x++ {
		for y := entityPosition.Y; y < entityPosition.Y+entitySize; y++ {
			// remove existing entities
			posToPlace := GamePoint2D{X: x, Y: y}
			existing, ok := (*entitiesSurface)[posToPlace]
			if ok {
				log.Println("removing existing entity new=", entity.Position, " existing=", existing.Position, " type=", existing.EntityType)
				s.removeEntity(entitiesById, entitiesSurface, entityProperties, existing)
			}
			(*entitiesSurface)[posToPlace] = entity
		}
	}

}

// string method for GamePoint2D
func (p GamePoint2D) String() string {
	return fmt.Sprintf("(%d,%d)", p.X, p.Y)
}

func (s BotCraft) removeEntity(
	entitiesById *map[int32]*pb.Entity,
	entitiesSurface *map[GamePoint2D]*pb.Entity,
	entitiesProperties *map[pb.EntityType]*pb.EntityProperties,
	entity *pb.Entity,
) {
	delete(*entitiesById, entity.Id)

	existingSize := (*entitiesProperties)[entity.EntityType].Size
	for x2 := entity.Position.X; x2 < entity.Position.X+existingSize; x2++ {
		for y2 := entity.Position.Y; y2 < entity.Position.Y+existingSize; y2++ {
			delete(*entitiesSurface, GamePoint2D{X: x2, Y: y2})
		}
	}
}

func (s BotCraft) findPath(
	options *pb.Options,
	entitiesSurface *map[GamePoint2D]*pb.Entity,
	fromEntity *pb.Entity,
	target *pb.Point2D,
	breakThrough bool,
) ([]*GamePoint2D, *GamePoint2D) {
	// bfs to find path

	// Define a struct to represent each node in the graph
	type node struct {
		point          GamePoint2D
		parent         *node
		distanceToRoot int
	}

	// Create a queue to hold the nodes that we need to explore
	queue := []*node{{point: point2DFromProto(fromEntity.Position), distanceToRoot: 0}}

	// Create a set to hold the nodes that we've already explored
	exploredNodes := make(map[GamePoint2D]bool)

	var closestToTarget *GamePoint2D = nil

	// Define a function to check if a point is a valid next step in the path
	isStepValid := func(pt GamePoint2D) bool {
		// The target is always a valid step
		if (pt.X == target.X) && (pt.Y == target.Y) {
			return true
		}

		if ent, ok := (*entitiesSurface)[pt]; ok {
			if ent == fromEntity {
				return true // Ignore the entity itself as an obstacle
			}
			if breakThrough && ent.PlayerId != fromEntity.PlayerId {
				return true
			}
			return false
		}
		return true
	}

	// Continue searching until we've explored all possible nodes or found the target
	for len(queue) > 0 {
		currNode := queue[0]
		queue = queue[1:]

		// Check if this node is the target, and if so, return the path
		if currNode.point.X == target.X && currNode.point.Y == target.Y {
			path := []*GamePoint2D{&currNode.point}
			for currNode.parent != nil {
				currNode = currNode.parent
				path = append([]*GamePoint2D{&currNode.point}, path...)
			}
			return path, closestToTarget
		}

		// Explore the four adjacent points
		for _, adjPt := range []GamePoint2D{
			{currNode.point.X + 1, currNode.point.Y},
			{currNode.point.X - 1, currNode.point.Y},
			{currNode.point.X, currNode.point.Y + 1},
			{currNode.point.X, currNode.point.Y - 1},
		} {
			// skip if out of bounds
			if adjPt.X < 0 || adjPt.X >= options.GetMapSize() || adjPt.Y < 0 || adjPt.Y >= options.GetMapSize() {
				continue
			}

			// Skip the point if it's already been explored or is not a valid step
			if exploredNodes[adjPt] || !isStepValid(adjPt) {
				continue
			}

			// Add the adjacent point to the queue
			nextNode := &node{
				point:          adjPt,
				parent:         currNode,
				distanceToRoot: currNode.distanceToRoot + 1,
			}
			queue = append(queue, nextNode)

			// Mark the point as explored
			exploredNodes[adjPt] = true

			// Check if this is the closest point to the target
			if closestToTarget == nil || nextNode.point.distanceTo(target) < closestToTarget.distanceTo(target) {
				closestToTarget = &nextNode.point
			}
		}
	}

	return nil, closestToTarget // No path to the target was found
}

type GamePoint2D struct {
	X int32
	Y int32
}

func (d GamePoint2D) toPb() *pb.Point2D {
	return &pb.Point2D{
		X: d.X,
		Y: d.Y,
	}
}

func (d GamePoint2D) distanceTo(target *pb.Point2D) int32 {
	return abs(d.X-target.X) + abs(d.Y-target.Y)
}

func (d GamePoint2D) equals(target *pb.Point2D) bool {
	return d.X == target.X && d.Y == target.Y
}

func (d GamePoint2D) distanceManh(d2 GamePoint2D) int32 {
	return abs(d.X-d2.X) + abs(d.Y-d2.Y)
}
