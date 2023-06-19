package join

import (
	"context"
	"errors"
	"github.com/go-qbit/rpc"
	"github.com/karloid/botCraft/pb"

	manager "github.com/bot-games/game-manager"
)

type reqV1 struct {
	Token string `json:"token" desc:"User bot token from [profile](/profile)"`
	Debug bool   `json:"debug" desc:"Use it for games against SmartGuy. The debug game doesn't affect ratings. There is not time limit for a turn'"`
}

type buildPropertiesV1 struct {
	Options    []string `json:"options"`
	InitHealth *int32   `json:"init_health"`
}

type attackPropertiesV1 struct {
	AttackRange     int32 `json:"attack_range"`
	Damage          int32 `json:"damage"`
	CollectResource bool  `json:"collect_resource"`
}

type repairPropertiesV1 struct {
	ValidTargets []string `json:"valid_targets"`
	Power        int32    `json:"power"`
}

type entityPropertiesV1 struct {
	EntityType        string              `json:"entity_type"`
	Size              int32               `json:"size"`
	BuildScore        int32               `json:"build_score"`
	DestroyScore      int32               `json:"destroy_score"`
	CanMove           bool                `json:"can_move"`
	PopulationProvide int32               `json:"population_provide"`
	PopulationUse     int32               `json:"population_use"`
	MaxHealth         int32               `json:"max_health"`
	Cost              int32               `json:"cost"`
	SightRange        int32               `json:"sight_range"`
	ResourcePerHealth int32               `json:"resource_per_health"`
	BuildProperties   *buildPropertiesV1  `json:"build_properties"`
	AttackProperties  *attackPropertiesV1 `json:"attack_properties"`
	RepairProperties  *repairPropertiesV1 `json:"repair_properties"`
}

type gameV1 struct {
	Id               string                `json:"id"`
	MapSize          int32                 `json:"map_size"`
	FogOfWar         bool                  `json:"fog_of_war"`
	EntityProperties []*entityPropertiesV1 `json:"entity_properties"`
	MaxTickCount     uint32                `json:"max_tick_count"`
}

var errorsV1 struct {
	InvalidToken  rpc.ErrorFunc `desc:"Invalid token"`
	AlreadyInGame rpc.ErrorFunc `desc:"The user is already in a game. Game id will be in data field"`
}

func (m *Method) ErrorsV1() interface{} {
	return &errorsV1
}

func (m *Method) V1(ctx context.Context, r *reqV1) (*gameV1, error) {
	g, err := m.gm.JoinGame(ctx, r.Token, r.Debug)
	if err != nil {
		var errInGame manager.ErrInGame
		if errors.Is(err, manager.ErrInvalidToken) {
			return nil, errorsV1.InvalidToken("Invalid token")
		} else if errors.As(err, &errInGame) {
			return nil, errorsV1.AlreadyInGame("The user is already in the game "+string(errInGame), string(errInGame))
		}

		return nil, err
	}

	options := g.Options.(*pb.Options)
	// code which maps options.EntityProperties to entityPropertiesV1

	entityPropertiesV1List := make([]*entityPropertiesV1, len(options.EntityProperties))
	for i, entityProperties := range options.EntityProperties {

		var buildProperties *buildPropertiesV1 = nil
		if entityProperties.BuildProperties != nil {

			// if have initHealth in &entityProperties.BuildProperties.InitHealth.Value
			var initHealth *int32 = nil
			if entityProperties.BuildProperties.InitHealth != nil {
				initHealth = &entityProperties.BuildProperties.InitHealth.Value
			}

			buildProperties = &buildPropertiesV1{
				Options:    convertToStringArr(entityProperties.BuildProperties.Options),
				InitHealth: initHealth,
			}
		}

		var attackProperties *attackPropertiesV1 = nil
		if entityProperties.AttackProperties != nil {
			attackProperties = &attackPropertiesV1{
				AttackRange:     entityProperties.AttackProperties.AttackRange,
				Damage:          entityProperties.AttackProperties.Damage,
				CollectResource: entityProperties.AttackProperties.CollectResource,
			}
		}

		var repairProperties *repairPropertiesV1 = nil
		if entityProperties.RepairProperties != nil {
			repairProperties = &repairPropertiesV1{
				ValidTargets: convertToStringArr(entityProperties.RepairProperties.ValidTargets),
				Power:        entityProperties.RepairProperties.Power,
			}
		}
		entityPropertiesV1List[i] = &entityPropertiesV1{
			EntityType:        convertToString(entityProperties.EntityType),
			Size:              entityProperties.Size,
			BuildScore:        entityProperties.BuildScore,
			DestroyScore:      entityProperties.DestroyScore,
			CanMove:           entityProperties.CanMove,
			PopulationProvide: entityProperties.PopulationProvide,
			PopulationUse:     entityProperties.PopulationUse,
			MaxHealth:         entityProperties.MaxHealth,
			Cost:              entityProperties.Cost,
			SightRange:        entityProperties.SightRange,
			ResourcePerHealth: entityProperties.ResourcePerHealth,
			BuildProperties:   buildProperties,
			AttackProperties:  attackProperties,
			RepairProperties:  repairProperties,
		}
	}

	return &gameV1{
		Id:               g.Uuid.String(),
		MapSize:          options.MapSize,
		FogOfWar:         options.FogOfWar,
		EntityProperties: entityPropertiesV1List,
		MaxTickCount:     options.MaxTickCount,
	}, nil
}

func convertToString(entityType pb.EntityType) string {
	return pb.EntityType_name[int32(entityType)]
}

func convertToStringArr(options []pb.EntityType) []string {
	result := make([]string, len(options))
	for i, option := range options {
		result[i] = pb.EntityType_name[int32(option)]
	}
	return result
}
