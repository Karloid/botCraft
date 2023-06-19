package wait_turn

import (
	"context"
	"errors"
	"github.com/karloid/botCraft/pb"
	"log"

	"github.com/go-qbit/rpc"

	manager "github.com/bot-games/game-manager"
)

type reqV1 struct {
	Token  string `json:"token" desc:"User bot token from [profile](/profile)"`
	GameId string `json:"game_id"`
}

type point2DV1 struct {
	X int32 `json:"x"`
	Y int32 `json:"y"`
}

type entityV1 struct {
	Id         int32     `json:"id"`
	PlayerId   int32     `json:"player_id"`
	EntityType string    `json:"entity_type"`
	Health     int32     `json:"health"`
	Position   point2DV1 `json:"position"`
	Active     bool      `json:"active"`
}

type playerV1 struct {
	Id        int32 `json:"id"`
	Score     int32 `json:"score"`
	Resources int32 `json:"resources"`
}

type stateV1 struct {
	TickId   uint16      `json:"tick_id"`
	MyId     int         `json:"my_id"`
	Entities []*entityV1 `json:"entities"`
	Players  []*playerV1 `json:"players"`
}

var errorsV1 struct {
	InvalidToken  rpc.ErrorFunc `desc:"Invalid token"`
	InvalidGameId rpc.ErrorFunc `desc:"Invalid game ID"`
	GameFinished  rpc.ErrorFunc `desc:"The game has finished. The result is in the data field, can be one of **Draw**, **Win**, **Defeat**"`
}

func (m *Method) ErrorsV1() interface{} {
	return &errorsV1
}

func (m *Method) V1(ctx context.Context, r *reqV1) (*stateV1, error) {
	tickInfo, err := m.gm.WaitTurn(ctx, r.Token, r.GameId)
	if err != nil {
		errGameFinished := &manager.ErrEndOfGame{}

		if errors.Is(err, manager.ErrInvalidToken) {
			return nil, errorsV1.InvalidToken("Invalid token")
		} else if errors.Is(err, manager.ErrInvalidGameId) {
			return nil, errorsV1.InvalidGameId("Invalid game ID")
		} else if errors.As(err, errGameFinished) {
			var gameResult string
			if errGameFinished.Winner == 0 {
				gameResult = "Draw"
			} else if errGameFinished.IsYou {
				gameResult = "Win"
			} else {
				gameResult = "Defeat"
			}

			return nil, errorsV1.GameFinished("The game has finished", gameResult)
		}

		return nil, err
	}

	state := tickInfo.State.(*pb.State)

	myUid := tickInfo.CurUid
	// find index of myUid in tickInfo.Uids
	myPos := 0
	for i, uid := range tickInfo.Uids {
		if uid == myUid {
			myPos = i
			break
		}
	}

	log.Println("get request from user", myUid, "myPos", myPos, "for game", r.GameId, "with token", r.Token, "and tick", tickInfo.Id)

	entities := make([]*entityV1, 0)
	for _, entity := range state.Entities {
		entities = append(entities, &entityV1{
			Id:         entity.Id,
			PlayerId:   entity.PlayerId,
			EntityType: entity.EntityType.String(),
			Health:     entity.Health,
			Position: point2DV1{
				X: entity.Position.X,
				Y: entity.Position.Y,
			},
			Active: entity.Active,
		})
	}

	myPlayerId := 0
	players := make([]*playerV1, 0)
	for i, player := range state.Players {
		if i == myPos {
			myPlayerId = i
		}
		players = append(players, &playerV1{
			Id:        player.Id,
			Score:     player.Score,
			Resources: player.Resources,
		})
	}
	return &stateV1{
		MyId:     myPlayerId,
		TickId:   tickInfo.Id,
		Entities: entities,
		Players:  players,
	}, nil
}
