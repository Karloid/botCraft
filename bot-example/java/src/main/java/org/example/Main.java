package org.example;

import java.net.SocketTimeoutException;
import java.util.Map;
import java.util.Random;

public class Main {
    public static void main(String[] args) throws Exception {
        String apiUrl = "http://127.0.0.1:10000/game";        // localrunner
        //String apiUrl = "https://api.bot-games.fun/game/drones"; // production

        String apiToken = new Random().nextInt(0, 2000000) + ""; // localrunner
        //String apiToken = "TOKEN FROM https://bot-games.fun/profile"; // production
        String apiGameId = null;
        boolean apiDebug = false;   // true for game against SmartGuy (dummy bot), false for game against other players

        Api api = new Api(apiUrl);

        Api.GameOptions gameOptions;

        if (apiGameId != null) {
            System.out.println("Rejoin ongoing game with specified id " + apiGameId);
            gameOptions = api.rejoin(apiToken, apiGameId);
        } else {
            System.out.println("Waiting for game to start...");
            while (true) {   // retry on timeout
                try {
                    gameOptions = api.join(apiToken, apiDebug);
                    break;
                } catch (Throwable e) {
                    if (e instanceof GameServerError) {
                        GameServerError ex = (GameServerError) e;
                        if (ex.error.code.equals("AlreadyInGame")
                                && ex.error.data instanceof String) {
                            System.out.println("Rejoin ongoing game " + ex.error.data);
                            apiGameId = (String) ex.error.data;
                            gameOptions = api.rejoin(apiToken, apiGameId);
                            break;
                        }
                    } else if (e.getCause() instanceof SocketTimeoutException) {
                        System.out.println("Join timeout, sleep and retrying...");
                        Thread.sleep(500);
                    } else {
                        throw e;
                    }
                }
            }
        }


        String actualGameId = apiGameId != null ? apiGameId : gameOptions.id;

        Strategy strategy = new Strategy();
        strategy.onJoinGame(gameOptions);

        int tick;
        while (true) {
            Api.GameState gameState;

            try {
                System.out.println(" Waiting for turn...");
                gameState = api.waitTurn(apiToken, actualGameId);
                tick = gameState.tickId;
                System.out.println(tick + " Turn received");
            } catch (Throwable e) {
                if (e instanceof GameServerError) {
                    GameServerError ex = (GameServerError) e;
                    if (ex.error.code.equals("GameFinished")) {
                        String gameResult = ex.error.data != null ? ex.error.data.toString() : "?";
                        boolean iWinGame = ex.error.data != null && ex.error.data.toString().equals("Win");
                        System.out.println("Game finished with result=" + gameResult + " iWinGame=" + iWinGame);

                        System.out.println("Production game replay " + apiUrl.replaceAll("api.", "") + "/battle/" + gameOptions.id);
                        System.out.println("Localrunner game replay " + apiUrl.replaceAll("/game", "") + "/battle/" + gameOptions.id);
                        break;
                    }
                }
                throw e;
            }

            Action action = strategy.getAction(gameState);
            Map<Integer, Api.EntityAction> entityActions = action.entityActions;
            // filter empty actions out and pack back to map to save some space :>
            entityActions.entrySet().removeIf(entry -> entry.getValue().isEmpty());
            api.applyAction(new Api.ActionRequest(apiToken, actualGameId, entityActions));
        }
    }
}