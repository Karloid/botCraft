package org.example;

import java.io.IOException;
import java.util.*;

import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import static java.util.concurrent.TimeUnit.*;

public class Api {
    private final String baseUrl;
    private final OkHttpClient client;
    private final Gson gson;

    public Api(String baseUrl) {
        this.baseUrl = baseUrl;
        this.client = new OkHttpClient.Builder()
                .readTimeout(60000, MILLISECONDS)
                .build();
        this.gson = new Gson();
    }

    public static class Point2D {
        @SerializedName("x")
        public int x;

        @SerializedName("y")
        public int y;

        public Point2D(int x, int y) {
            this.x = x;
            this.y = y;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Point2D point2D = (Point2D) o;
            return x == point2D.x && y == point2D.y;
        }

        @Override
        public int hashCode() {
            return Objects.hash(x, y);
        }

        @Override
        public String toString() {
            return "CellPos{" +
                    "x=" + x +
                    ", y=" + y +
                    '}';
        }

        public int distance(Point2D other) {
            return Math.abs(x - other.x) + Math.abs(y - other.y);
        }
    }

    public static class BuildProperties {
        @SerializedName("options")
        public List<String> options;

        @SerializedName("init_health")
        public int initHealth;
    }

    public static class AttackProperties {
        @SerializedName("attack_range")
        public int attackRange;

        @SerializedName("damage")
        public int damage;

        @SerializedName("collect_resource")
        public boolean collectResource;
    }

    public static class RepairProperties {
        @SerializedName("valid_targets")
        public List<String> validTargets;

        @SerializedName("power")
        public int power;
    }

    public static class EntityProperties {
        @SerializedName("entity_type")
        public String entityType;

        @SerializedName("size")
        public int size;

        @SerializedName("build_score")
        public int buildScore;

        @SerializedName("destroy_score")
        public int destroyScore;

        @SerializedName("can_move")
        public boolean canMove;

        @SerializedName("population_provide")
        public int populationProvide;

        @SerializedName("population_use")
        public int populationUse;

        @SerializedName("max_health")
        public int maxHealth;

        @SerializedName("cost")
        public int cost;

        @SerializedName("sight_range")
        public int sightRange;

        @SerializedName("resource_per_health")
        public int resourcePerHealth;

        @SerializedName("build_properties")
        public BuildProperties buildProperties;

        @SerializedName("attack_properties")
        public AttackProperties attackProperties;

        @SerializedName("repair_properties")
        public RepairProperties repairProperties;
    }

    public static class GameOptions {
        @SerializedName("id")
        public String id;

        @SerializedName("map_size")
        public int mapSize;

        @SerializedName("fog_of_war")
        public boolean fogOfWar;

        @SerializedName("entity_properties")
        public List<EntityProperties> entityProperties;

        @SerializedName("max_tick_count")
        public int maxTickCount;

        public EntityProperties getEntityProperties(String entityType) {
            for (EntityProperties entityProperties : this.entityProperties) {
                if (entityProperties.entityType.equals(entityType)) {
                    return entityProperties;
                }
            }
            return null;
        }
    }

    public static class Entity {
        @SerializedName("id")
        public int id;

        @SerializedName("player_id")
        public int playerId;

        @SerializedName("entity_type")
        public String entityType;

        @SerializedName("health")
        public int health;

        @SerializedName("position")
        public Point2D position;

        @SerializedName("active")
        public boolean active;
    }

    public static class Player {
        @SerializedName("id")
        public int id;

        @SerializedName("score")
        public int score;

        @SerializedName("resources")
        public int resources;
    }

    public static class GameState {
        @SerializedName("tick_id")
        public int tickId;

        @SerializedName("my_id")
        public int myId;

        @SerializedName("entities")
        public List<Entity> entities;

        @SerializedName("players")
        public List<Player> players;

        public Player getMyPlayer() {
            for (Player player : this.players) {
                if (player.id == this.myId) {
                    return player;
                }
            }
            return null;
        }
    }

    public static class Error {
        @SerializedName("code")
        public String code;

        @SerializedName("message")
        public String message;

        @SerializedName("data")
        public Object data;
    }

    public static class ActionRequest {
        @SerializedName("token")
        public String token;

        @SerializedName("game_id")
        public String gameId;

        @SerializedName("entity_actions")
        public Map<Integer, EntityAction> entityActions;

        public ActionRequest(String token, String gameId, Map<Integer, EntityAction> entityActions) {
            this.token = token;
            this.gameId = gameId;
            this.entityActions = entityActions;
        }
    }

    public static class EntityAction {
        @SerializedName("move_action")
        public MoveAction moveAction;

        @SerializedName("build_action")
        public BuildAction buildAction;

        @SerializedName("attack_action")
        public AttackAction attackAction;

        @SerializedName("repair_action")
        public RepairAction repairAction;

        public boolean isNotEmpty() {
            return moveAction != null || buildAction != null || attackAction != null || repairAction != null;
        }

        public boolean isEmpty() {
            return !isNotEmpty();
        }
    }

    public static class MoveAction {
        @SerializedName("target")
        public Point2D target;

        @SerializedName("find_closest_position")
        public boolean findClosestPosition;

        @SerializedName("break_through")
        public boolean breakThrough;

        public MoveAction(Point2D target, boolean findClosestPosition, boolean breakThrough) {
            this.target = target;
            this.findClosestPosition = findClosestPosition;
            this.breakThrough = breakThrough;
        }
    }

    public static class BuildAction {
        @SerializedName("entity_type")
        public String entityType;

        @SerializedName("position")
        public Point2D position;

        public BuildAction(String entityType, Point2D position) {
            this.entityType = entityType;
            this.position = position;
        }
    }

    public static class AttackAction {
        @SerializedName("target_id")
        public Integer targetId;

        public AttackAction(Integer target) {
            this.targetId = target;
        }
    }

    public static class RepairAction {
        @SerializedName("target_id")
        public int targetID;

        public RepairAction(int targetID) {
            this.targetID = targetID;
        }
    }

    public GameOptions join(String token, boolean debug) {
        return call(
                baseUrl + "/join/v1",
                Map.of(
                        "token", token,
                        "debug", debug
                ),
                GameOptions.class
        );
    }

    public GameOptions rejoin(String token, String apiGameId) {
        return call(
                baseUrl + "/rejoin/v1",
                Map.of(
                        "token", token,
                        "game_id", apiGameId
                ),
                GameOptions.class
        );
    }

    public GameState waitTurn(String token, String gameId) {
        return call(
                baseUrl + "/wait_turn/v1",
                Map.of(
                        "token", token,
                        "game_id", gameId
                ),
                GameState.class
        );
    }

    public void applyAction(ActionRequest actionRequest) {
        call(
                baseUrl + "/action/v1",
                actionRequest,
                Object.class
        );
    }

    private <T> T call(String url, Object bodyObject, Class<T> responseClass) {
        String jsonBody = gson.toJson(bodyObject);
        System.out.println("url= " + url + " body=" + jsonBody);
        RequestBody body = RequestBody.create(jsonBody, MediaType.get("application/json"));

        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();
        try (Response response = client.newCall(request).execute()) {

            if (response.body() != null) {
                String bodyAsString = Objects.requireNonNull(response.body()).string();
                if (response.isSuccessful()) {
                    return gson.fromJson(bodyAsString, responseClass);
                }
                try {
                    Error error = gson.fromJson(bodyAsString, Error.class);
                    if (error != null) {
                        throw new GameServerError(error);
                    }
                } catch (Exception e) {
                    if (e instanceof GameServerError) {
                        throw e;
                    }
                    e.printStackTrace();
                    throw new RuntimeException(String.format("Failed request=%s, error code=%d response=%s", url, response.code(), bodyAsString));
                }

            }

            throw new IOException(String.format("Network Error, no body=%d", response.code()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
