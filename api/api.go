//go:generate gostatic2lib -path docs/ -package docs -out docs/game.go
//go:generate gostatic2lib -path ../player/dist -package player -out ./player/dist.go

package api

import (
	"bytes"
	"compress/gzip"
	"context"
	"github.com/karloid/botCraft/api/docs"
	"github.com/karloid/botCraft/api/player"
	"io"
	"net/http"

	"github.com/go-qbit/rpc"
	"github.com/go-qbit/rpc/openapi"

	manager "github.com/bot-games/game-manager"

	mAction "github.com/karloid/botCraft/api/method/action"
	mJoin "github.com/karloid/botCraft/api/method/join"
	mWaitTurn "github.com/karloid/botCraft/api/method/wait_turn"
)

type SemaphoreRpc struct {
	*rpc.Rpc
}

func New(gm *manager.GameManager) *SemaphoreRpc {
	gameRpc := &SemaphoreRpc{rpc.New("github.com/karloid/botCraft/api/method", rpc.WithCors("*"))}

	if err := gameRpc.RegisterMethods(
		mJoin.New(gm),
		mWaitTurn.New(gm),
		mAction.New(gm),
	); err != nil {
		panic(err)
	}

	return gameRpc
}

func (r *SemaphoreRpc) GetSwagger(ctx context.Context) *openapi.OpenApi {
	swagger := r.Rpc.GetSwagger(ctx)
	swagger.Info.Title = "Semaphore bot API"

	gz, _ := gzip.NewReader(bytes.NewBuffer(docs.NewHTTPHandler().GetFile("/game.md").Data))
	data, _ := io.ReadAll(gz)

	swagger.Info.Description = string(data)

	return swagger
}

func (r *SemaphoreRpc) GetPlayerHandler() http.Handler {
	return player.NewHTTPHandler()
}
