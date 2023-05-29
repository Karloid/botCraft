package main

import (
	"flag"
	"github.com/karloid/botCraft/bot-example/go/api"
	"log"
	"math/rand"
	"strconv"
	"time"
)

var (
	token  = flag.String("token", "", "")
	gameId = flag.String("game", "", "")
	debug  = flag.Bool("debug", false, "")
)

/*
*
EntityTypes =

		"WALL"
		"HOUSE"
		"BUILDER_BASE"
		"BUILDER_UNIT"
		"MELEE_BASE"
		"MELEE_UNIT"
		"RANGED_BASE"
		"RANGED_UNIT"
		"RESOURCE"
		"TURRET"
	}
*/
func main() {
	flag.Parse()
	rand.Seed(time.Now().UnixNano())

	if *token == "" {
		token = randomInt()
	}
	log.Println("token is=", *token)

	bsApi := api.New("http://localhost:10000/game")

	globalGame := api.Game{}

	if *gameId == "" {
		log.Println("Waiting opponent")
		game, err := bsApi.Join(*token, *debug)
		if err != nil {
			if apiErr, ok := err.(*api.Error); ok && apiErr.Code == "AlreadyInGame" {
				*gameId = apiErr.Data.(string)
			} else {
				log.Fatal(err)
			}
		} else {
			globalGame = *game
			*gameId = game.Id
		}
	}

	entityPropertiesMap := make(map[string]*api.EntityProperties)
	for _, prop := range globalGame.EntityProperties {
		entityPropertiesMap[prop.EntityType] = prop
	}

	for {
		log.Println("Waiting for turn")
		state, err := bsApi.WaitTurn(*token, *gameId)
		if err != nil {
			if apiErr, ok := err.(*api.Error); ok && apiErr.Code == "GameFinished" {
				log.Printf("The game has finished. Your result is `%s`", apiErr.Data)
				return
			}

			log.Fatal(err)
		}

		myPlayer := state.Players[state.MyId]
		log.Println("my id=", state.MyId, "tick id=", state.TickId, "myResources=", myPlayer.Resources, "myScore", myPlayer.Score)

		entityMap := make(map[api.Point2D]*api.Entity)
		entitySurfaceMap := make(map[api.Point2D]*api.Entity)

		entityActions := make(map[int32]api.EntityAction)

		for _, entity := range state.Entities {
			entityMap[entity.Position] = entity

			entityProperties := entityPropertiesMap[entity.EntityType]
			entitySize := entityProperties.Size

			// fill entitySurfaceMap using entitySize
			for y := entity.Position.Y; y < entity.Position.Y+entitySize; y++ {
				for x := entity.Position.X; x < entity.Position.X+entitySize; x++ {
					entitySurfaceMap[api.Point2D{x, y}] = entity
				}
			}

			if entity.PlayerId != state.MyId {
				continue
			}
			log.Println("my entity", entity.Id, entity.EntityType, entity.Position, entity.Health)

			if contains(entityProperties.BuildProperties.Options, "BUILDER_UNIT") {

				continue
			}

			if entity.EntityType == "BUILDER_UNIT" {
				// move builder to center
				entityActions[entity.Id] = api.EntityAction{
					MoveAction: &api.MoveAction{
						Target: api.Point2D{X: globalGame.MapSize / 2, Y: globalGame.MapSize / 2},
					},
				}
			}

		}

		// print whole map for game.MapSize
		// appending to string and print whole string
		for y := int32(0); y < globalGame.MapSize; y++ {
			stringRow := ""
			for x := int32(0); x < globalGame.MapSize; x++ {
				// check for existing entity at given coordinates
				entity, ok := entitySurfaceMap[api.Point2D{x, y}]
				if !ok {
					// no entity at given coordinates
					stringRow += " "
					continue
				}

				char := firstChar(entity.EntityType)
				if char == "R" {
					char = "."
				}
				stringRow += char
			}
			log.Println(stringRow)
		}

		if err := bsApi.Action(*token, *gameId, entityActions); err != nil {
			log.Fatal(err)
		}
		log.Println("end turn", state.TickId)
	}
}

func firstChar(entityType string) string {
	if len(entityType) == 0 {
		return "?"
	}
	return entityType[0:1]
}

func randomInt() *string {
	r := rand.Uint32()
	s := strconv.Itoa(int(r))
	return &s
}

func contains(slice []string, element string) bool {
	for _, item := range slice {
		if item == element {
			return true
		}
	}
	return false
}
