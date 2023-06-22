package join

import (
	"context"
	"errors"
	manager "github.com/bot-games/game-manager"
	"github.com/go-qbit/rpc"
	"github.com/karloid/botCraft/pb"
	"strconv"
)

type reqV1 struct {
	Token         string                    `json:"token" desc:"User bot token from [profile](/profile)"`
	GameId        string                    `json:"game_id"`
	EntityActions map[string]entityActionV1 `json:"entity_actions"`
}

type entityActionV1 struct {
	MoveAction   *moveActionV1   `json:"move_action"`
	BuildAction  *buildActionV1  `json:"build_action"`
	AttackAction *attackActionV1 `json:"attack_action"`
	RepairAction *repairActionV1 `json:"repair_action"`
}

type moveActionV1 struct {
	Target              point2DV1 `json:"target"`
	FindClosestPosition bool      `json:"find_closest_position"`
	BreakThrough        bool      `json:"break_through"`
}

type buildActionV1 struct {
	EntityType string    `json:"entity_type"`
	Position   point2DV1 `json:"position"`
}

type attackActionV1 struct {
	TargetId *int32 `json:"target_id"`
	//	AutoAttack *autoAttackV1 `json:"auto_attack"`
}

/*type autoAttackV1 struct {
	PathfindRange int32    `json:"pathfind_range"`
	ValidTargets  []string `json:"valid_targets"`
}*/

type repairActionV1 struct {
	TargetId int32 `json:"target_id"`
}

type point2DV1 struct {
	X int32 `json:"x"`
	Y int32 `json:"y"`
}

func (d point2DV1) toPb() *pb.Point2D {
	return &pb.Point2D{
		X: d.X,
		Y: d.Y,
	}
}

var errorsV1 struct {
	InvalidToken      rpc.ErrorFunc `desc:"Invalid token"`
	InvalidGameId     rpc.ErrorFunc `desc:"Invalid game ID"`
	InvalidCoordinate rpc.ErrorFunc `desc:"Invalid coordinate"`
}

func (m *Method) ErrorsV1() interface{} {
	return &errorsV1
}

func (m *Method) V1(ctx context.Context, r *reqV1) (*struct{}, error) {
	if err := m.gm.DoAction(ctx, r.Token, r.GameId, mapRequestToPbAction(r)); err != nil {
		if errors.Is(err, manager.ErrInvalidToken) {
			return nil, errorsV1.InvalidToken("Invalid token")
		} else if errors.Is(err, manager.ErrInvalidGameId) {
			return nil, errorsV1.InvalidGameId("Invalid game ID")
		}

		return nil, err
	}

	return &struct{}{}, nil
}

func mapRequestToPbAction(r *reqV1) *pb.Action {
	actions := make(map[int32]*pb.EntityAction)

	for idString, reqEntityAction := range r.EntityActions {
		pbEntityAction := &pb.EntityAction{}

		// move action
		if moveAction := reqEntityAction.MoveAction; moveAction != nil {
			pbEntityAction.MoveAction = &pb.MoveAction{
				Target:              moveAction.Target.toPb(),
				FindClosestPosition: moveAction.FindClosestPosition,
				BreakThrough:        moveAction.BreakThrough,
			}
		}

		// build action
		if buildAction := reqEntityAction.BuildAction; buildAction != nil {
			entityType, ok := pb.EntityType_value[buildAction.EntityType]
			if !ok {
				// TODO: log error
			} else {
				pbEntityAction.BuildAction = &pb.BuildAction{
					EntityType: pb.EntityType(entityType),
					Position:   buildAction.Position.toPb(),
				}
			}
		}

		// attack action
		if attackAction := reqEntityAction.AttackAction; attackAction != nil {

			pbAttackAction := &pb.AttackAction{}

			if attackAction.TargetId != nil {
				pbAttackAction.TargetId = &pb.Int32Value{
					Value: *attackAction.TargetId,
				}
			}

			// not supported
			/*	if autoAttack := attackAction.AutoAttack; autoAttack != nil {
				pbAttackAction.AutoAttack = &pb.AutoAttack{
					PathfindRange: autoAttack.PathfindRange,
					ValidTargets:  mapToPbEntityTypes(autoAttack.ValidTargets),
				}
			}*/

			pbEntityAction.AttackAction = pbAttackAction
		}

		// repair action
		if repairAction := reqEntityAction.RepairAction; repairAction != nil {
			pbEntityAction.RepairAction = &pb.RepairAction{
				TargetId: repairAction.TargetId,
			}
		}
		// convert idString to int32
		id, err := strconv.Atoi(idString)
		if err != nil {
			continue
		}
		actions[int32(id)] = pbEntityAction
	}

	return &pb.Action{
		EntityActions: actions,
	}
}

func mapToPbEntityTypes(targets []string) []pb.EntityType {
	pbTargets := make([]pb.EntityType, 0)
	for _, target := range targets {
		if pbType, ok := pb.EntityType_value[target]; ok {
			pbTargets = append(pbTargets, pb.EntityType(pbType))
		} else {
			// TODO log error
		}
	}
	return pbTargets
}
