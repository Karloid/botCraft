package main

import (
	"flag"
	"fmt"
	"log"
	"math/rand"
	"time"

	"github.com/bot-games/semaphore/bot-example/go/api"
)

var (
	token  = flag.String("token", "1", "")
	gameId = flag.String("game", "", "")
	debug  = flag.Bool("debug", false, "")
)

func main() {
	flag.Parse()
	rand.Seed(time.Now().UnixNano())

	if *token == "" {
		log.Fatalf("Empty token")
	}
	log.Println("token is=", *token)

	bsApi := api.New("http://localhost:10000/game")

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
			*gameId = game.Id
		}
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

		for _, row := range state.Field {
			for _, cell := range row {
				symbol := "🤍"
				switch cell {
				case "Green":
					symbol = "💚"
				case "Yellow":
					symbol = "💛"
				case "Red":
					symbol = "💜"
				}
				fmt.Printf("%s", symbol)
			}
			fmt.Println()
		}

		availableCells := getAvailableCells(state.Field)
		target := availableCells[rand.Intn(len(availableCells))]

		if err := bsApi.Action(*token, *gameId, target.x, target.y); err != nil {
			log.Fatal(err)
		}
	}
}

type point struct {
	x, y uint8
}

func getAvailableCells(field [3][4]string) []point {
	pieces := map[string]int{}
	for _, row := range field {
		for _, cell := range row {
			pieces[cell]++
		}
	}

	var res []point
	for y, row := range field {
		for x, cell := range row {
			if cell == "Red" || cell != "Empty" && pieces[cell] >= 8 {
				continue
			}
			res = append(res, point{uint8(x), uint8(y)})
		}
	}

	return res
}
