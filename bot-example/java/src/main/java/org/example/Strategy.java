package org.example;

import java.util.ArrayList;
import java.util.List;

public class Strategy {
    private Api.GameOptions gameOptions;

    public void onJoinGame(Api.GameOptions gameOptions) {
        this.gameOptions = gameOptions;
    }

    public Action getAction(Api.GameState gameState) {
        Action resultAction = new Action();

        // print whole map
        printMap(gameState);

        for (Api.Entity entity : gameState.entities) {
            if (entity.entityType.equals("BUILDER_UNIT") && entity.playerId == gameState.myId) {
                Api.EntityAction entityAction = new Api.EntityAction();

                // find nearest resource
                Api.Entity nearestResource = null;
                int nearestResourceDistance = Integer.MAX_VALUE;
                for (Api.Entity resource : gameState.entities) {
                    if (resource.entityType.equals("RESOURCE")) {
                        int distance = Math.abs(resource.position.x - entity.position.x) + Math.abs(resource.position.y - entity.position.y);
                        if (distance < nearestResourceDistance) {
                            nearestResourceDistance = distance;
                            nearestResource = resource;
                        }
                    }
                }

                if (nearestResource != null) {
                    // find path to resource
                    List<Integer> entityIdsToIgnore = new ArrayList<>();
                    entityIdsToIgnore.add(entity.id);
                    entityIdsToIgnore.add(nearestResource.id);

                    List<Api.Point2D> path = PathFinding.solve(gameOptions, gameState, entity.position, nearestResource.position, entityIdsToIgnore);

                    // move to resource
                    // TODO just move and attack
                    if (path.size() > 1) {
                        //Api.Point2D nextPoint = path.get(1);
                        entityAction.moveAction = new Api.MoveAction(nearestResource.position, true, true);
                    } else {
                        entityAction.attackAction = new Api.AttackAction(nearestResource.id, null);
                    }
                    resultAction.entityActions.put(entity.id, entityAction);
                }
            }
        }


        return resultAction;
    }

    private void printMap(Api.GameState gameState) {
        System.out.println("\n\nMy resources = " + gameState.getMyPlayer().resources);
        System.out.println("Map:");
        for (int y = 0; y < gameOptions.mapSize; y++) {
            for (int x = 0; x < gameOptions.mapSize; x++) {
                // find entity in point
                Api.Entity foundEntity = null;
                for (Api.Entity entity : gameState.entities) {
                    var entityProperties = gameOptions.getEntityProperties(entity.entityType);
                    int entitySize = entityProperties.size;
                    // check all points in entity
                    for (int i = 0; i < entitySize; i++) {
                        for (int j = 0; j < entitySize; j++) {
                            if (entity.position.x + i == x && entity.position.y + j == y) {
                                foundEntity = entity;
                                break;
                            }
                        }
                    }
                }
                System.out.print(foundEntity == null ? "." : getCharByType(foundEntity));
            }
            System.out.println();
        }
    }

    private static String getCharByType(Api.Entity foundEntity) {
        switch (foundEntity.entityType) {
            case "BUILDER_UNIT":
                return "B";
            case "MELEE_UNIT":
                return "M";
            case "RANGED_UNIT":
                return "R";
            case "HOUSE":
                return "H";
            case "BUILDER_BASE":
                return "b";
            case "MELEE_BASE":
                return "m";
            case "RANGED_BASE":
                return "r";
            case "WALL":
                return "W";
            case "RESOURCE":
                return "^";
            default:
                return "?";
        }
    }
}
