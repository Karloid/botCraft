package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

type Api struct {
	url string
}

type BuildProperties struct {
	Options    []string `json:"options"`
	InitHealth int32    `json:"init_health"`
}

type AttackProperties struct {
	AttackRange     int32 `json:"attack_range"`
	Damage          int32 `json:"damage"`
	CollectResource bool  `json:"collect_resource"`
}

type RepairProperties struct {
	ValidTargets []string `json:"valid_targets"`
	Power        int32    `json:"power"`
}

type EntityProperties struct {
	EntityType        string            `json:"entity_type"`
	Size              int32             `json:"size"`
	BuildScore        int32             `json:"build_score"`
	DestroyScore      int32             `json:"destroy_score"`
	CanMove           bool              `json:"can_move"`
	PopulationProvide int32             `json:"population_provide"`
	PopulationUse     int32             `json:"population_use"`
	MaxHealth         int32             `json:"max_health"`
	Cost              int32             `json:"cost"`
	SightRange        int32             `json:"sight_range"`
	ResourcePerHealth int32             `json:"resource_per_health"`
	BuildProperties   *BuildProperties  `json:"build_properties"`
	AttackProperties  *AttackProperties `json:"attack_properties"`
	RepairProperties  *RepairProperties `json:"repair_properties"`
}

type Game struct {
	Id               string              `json:"id"`
	MapSize          int32               `json:"map_size"`
	FogOfWar         bool                `json:"fog_of_war"`
	EntityProperties []*EntityProperties `json:"entity_properties"`
	MaxTickCount     int32               `json:"max_tick_count"`
}

type Point2D struct {
	X int32 `json:"x"`
	Y int32 `json:"y"`
}

type Entity struct {
	Id         int32   `json:"id"`
	PlayerId   int32   `json:"player_id"`
	EntityType string  `json:"entity_type"`
	Health     int32   `json:"health"`
	Position   Point2D `json:"position"`
	Active     bool    `json:"active"`
}

type Player struct {
	Id    int32 `json:"id"`
	Score int32 `json:"score"`
}

type GameState struct {
	TickId   uint16    `json:"tick_id"`
	MyId     int32     `json:"my_id"`
	Entities []*Entity `json:"entities"`
	Players  []*Player `json:"players"`
}

type Error struct {
	Code    string      `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

type ActionRequest struct {
	Token         string                 `json:"token" desc:"User bot token from [profile](/profile)"`
	GameId        string                 `json:"game_id"`
	EntityActions map[int32]EntityAction `json:"entity_actions"`
}

type EntityAction struct {
	MoveAction   *MoveAction   `json:"move_action"`
	BuildAction  *BuildAction  `json:"build_action"`
	AttackAction *AttackAction `json:"attack_action"`
	RepairAction *RepairAction `json:"repair_action"`
}

type MoveAction struct {
	Target              Point2D `json:"target"`
	FindClosestPosition bool    `json:"find_closest_position"`
	BreakThrough        bool    `json:"break_through"`
}

type BuildAction struct {
	EntityType string  `json:"entity_type"`
	Position   Point2D `json:"position"`
}

type AttackAction struct {
	Target     int32       `json:"target"`
	AutoAttack *AutoAttack `json:"auto_attack"`
}

type AutoAttack struct {
	PathfindRange int32    `json:"pathfind_range"`
	ValidTargets  []string `json:"valid_targets"`
}

type RepairAction struct {
	TargetID int32 `json:"target_id"`
}

func (e *Error) Error() string {
	return e.Message
}

func New(url string) *Api {
	return &Api{url: url}
}

func (a *Api) Join(token string, debug bool) (*Game, error) {
	game := &Game{}

	if err := a.call("/join/v1", struct {
		Token string `json:"token"`
		Debug bool   `json:"debug"`
	}{token, debug}, game); err != nil {
		return nil, err
	}

	return game, nil
}

func (a *Api) WaitTurn(token, gameId string) (*GameState, error) {
	gameState := &GameState{}

	if err := a.call("/wait_turn/v1", struct {
		Token  string `json:"token"`
		GameId string `json:"game_id"`
	}{token, gameId}, gameState); err != nil {
		return nil, err
	}

	return gameState, nil
}

func (a *Api) Action(token, gameId string, entityActions map[int32]EntityAction) error {
	var resp struct{}

	return a.call("/action/v1",
		struct {
			Token         string                 `json:"token"`
			GameId        string                 `json:"game_id"`
			EntityActions map[int32]EntityAction `json:"entity_actions"`
		}{token, gameId, entityActions}, &resp)
}

func (a *Api) call(method string, req, resp interface{}) error {
	buf := &bytes.Buffer{}
	if err := json.NewEncoder(buf).Encode(req); err != nil {
		return err
	}
	httpResp, err := http.Post(a.url+method, "application/json", buf)
	if err != nil {
		return err
	}
	defer httpResp.Body.Close()

	switch httpResp.StatusCode {
	case http.StatusOK:
		body := httpResp.Body

		if method == "/wait_turn/v1" && false {
			// append only body of response to text file

			// Read the response body
			bodyBytes, err := ioutil.ReadAll(body)
			if err != nil {
				panic(err)
			}

			logText := string(bodyBytes)

			// Open the log file for append and write the log text
			// create if not exists
			if _, err := os.Stat("log.txt"); os.IsNotExist(err) {
				os.Create("log.txt")
			}

			f, err := os.OpenFile("log.txt", os.O_APPEND|os.O_WRONLY, 0600)
			if err != nil {
				panic(err)
			}
			defer f.Close()

			if _, err = f.WriteString(logText); err != nil {
				panic(err)
			}

			return nil
		}

		return json.NewDecoder(body).Decode(resp)
	case http.StatusBadRequest:
		apiErr := &Error{}
		if err := json.NewDecoder(httpResp.Body).Decode(apiErr); err != nil {
			return err
		}
		return apiErr

	default:
		return fmt.Errorf("invalid status %s", httpResp.Status)
	}
}
