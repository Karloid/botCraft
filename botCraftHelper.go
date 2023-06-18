package botCraft

import (
	"github.com/karloid/botCraft/pb"
)

func hasWinner(state *pb.State) bool {
	return false
}

func inBounds(options *pb.Options, target *pb.Point2D) bool {
	return target.X >= 0 && target.X < options.MapSize && target.Y >= 0 && target.Y < options.MapSize
}

func inBounds2(options *pb.Options, target *Point2D) bool {
	return target.X >= 0 && target.X < options.MapSize && target.Y >= 0 && target.Y < options.MapSize
}

func (s BotCraft) fillEntityProperties() []*pb.EntityProperties {
	entityProperties := make([]*pb.EntityProperties, 0)

	entityProperties = append(entityProperties, &pb.EntityProperties{
		EntityType:   pb.EntityType_WALL,
		Size:         1,
		BuildScore:   10,
		DestroyScore: 10,
		MaxHealth:    50,
		Cost:         10,
	})
	entityProperties = append(entityProperties, &pb.EntityProperties{
		EntityType:        pb.EntityType_HOUSE,
		Size:              2,
		BuildScore:        100,
		DestroyScore:      1000,
		MaxHealth:         100,
		Cost:              100,
		PopulationProvide: 10,
	})
	entityProperties = append(entityProperties, &pb.EntityProperties{
		EntityType:        pb.EntityType_BUILDER_BASE,
		Size:              4,
		BuildScore:        40,
		DestroyScore:      40,
		MaxHealth:         100,
		Cost:              50,
		PopulationProvide: 5,
		BuildProperties: &pb.BuildProperties{
			Options:    []pb.EntityType{pb.EntityType_BUILDER_UNIT},
			InitHealth: 100},
	})
	entityProperties = append(entityProperties, &pb.EntityProperties{
		EntityType:        pb.EntityType_BUILDER_UNIT,
		Size:              1,
		BuildScore:        10,
		DestroyScore:      10,
		MaxHealth:         50,
		Cost:              10,
		PopulationProvide: 0,
		PopulationUse:     1,
		CanMove:           true,
		BuildProperties: &pb.BuildProperties{
			Options: []pb.EntityType{pb.EntityType_WALL,
				pb.EntityType_HOUSE,
				pb.EntityType_BUILDER_BASE,
				pb.EntityType_TURRET,
				pb.EntityType_MELEE_BASE,
				pb.EntityType_RANGED_BASE},
			InitHealth: 100},
		AttackProperties: &pb.AttackProperties{
			AttackRange:     1,
			Damage:          1,
			CollectResource: true,
		},
		RepairProperties: &pb.RepairProperties{
			ValidTargets: []pb.EntityType{
				pb.EntityType_WALL,
				pb.EntityType_HOUSE,
				pb.EntityType_BUILDER_BASE,
				pb.EntityType_BUILDER_UNIT,
				pb.EntityType_MELEE_BASE,
				pb.EntityType_MELEE_UNIT,
				pb.EntityType_RANGED_BASE,
				pb.EntityType_RANGED_UNIT,
				pb.EntityType_TURRET,
			},
			Power: 1,
		},
	})
	entityProperties = append(entityProperties, &pb.EntityProperties{
		EntityType:        pb.EntityType_MELEE_BASE,
		Size:              4,
		BuildScore:        40,
		DestroyScore:      40,
		MaxHealth:         100,
		Cost:              50,
		PopulationProvide: 5,
		BuildProperties: &pb.BuildProperties{
			Options:    []pb.EntityType{pb.EntityType_MELEE_UNIT},
			InitHealth: 100,
		},
	})

	entityProperties = append(entityProperties, &pb.EntityProperties{
		EntityType:        pb.EntityType_MELEE_UNIT,
		Size:              1,
		BuildScore:        10,
		DestroyScore:      10,
		MaxHealth:         50,
		Cost:              10,
		PopulationProvide: 0,
		PopulationUse:     1,
		CanMove:           true,
		AttackProperties: &pb.AttackProperties{
			AttackRange:     1,
			Damage:          5,
			CollectResource: false,
		},
	})

	entityProperties = append(entityProperties, &pb.EntityProperties{
		EntityType:        pb.EntityType_RANGED_BASE,
		Size:              4,
		BuildScore:        40,
		DestroyScore:      40,
		MaxHealth:         100,
		Cost:              50,
		PopulationProvide: 5,
		BuildProperties: &pb.BuildProperties{
			Options:    []pb.EntityType{pb.EntityType_RANGED_UNIT},
			InitHealth: 100,
		},
	})

	entityProperties = append(entityProperties, &pb.EntityProperties{
		EntityType:        pb.EntityType_RANGED_UNIT,
		Size:              1,
		BuildScore:        10,
		DestroyScore:      10,
		MaxHealth:         50,
		Cost:              10,
		PopulationProvide: 0,
		PopulationUse:     1,
		CanMove:           true,
		AttackProperties: &pb.AttackProperties{
			AttackRange:     3,
			Damage:          5,
			CollectResource: false,
		},
	})

	entityProperties = append(entityProperties, &pb.EntityProperties{
		EntityType:        pb.EntityType_RESOURCE,
		Size:              1,
		MaxHealth:         30,
		ResourcePerHealth: 1,
	})

	entityProperties = append(entityProperties, &pb.EntityProperties{
		EntityType:        pb.EntityType_TURRET,
		Size:              1,
		BuildScore:        10,
		DestroyScore:      10,
		MaxHealth:         50,
		Cost:              10,
		PopulationProvide: 0,
		PopulationUse:     1,
		AttackProperties: &pb.AttackProperties{
			AttackRange: 3,
			Damage:      5,
		},
	})
	return entityProperties
}
