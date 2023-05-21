package main

import (
	manager "github.com/bot-games/game-manager"
	"github.com/bot-games/localrunner"
	"github.com/bot-games/localrunner/scheduler"
	"github.com/bot-games/localrunner/storage"
	"github.com/karloid/botCraft"
	"github.com/karloid/botCraft/api"
)

func main() {
	gameStorage := storage.New()

	localrunner.Start(
		manager.New(
			"botCraft", "BotCraft",
			botCraft.BotCraft{},
			gameStorage, scheduler.New(),
			func(m *manager.GameManager) manager.GameApi {
				return api.New(m)
			},
		),
		gameStorage,
	)
}
