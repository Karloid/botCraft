package org.example;

import java.util.*;

public class Strategy {
    private Api.GameOptions gameOptions;

    public void onJoinGame(Api.GameOptions gameOptions) {
        this.gameOptions = gameOptions;
    }

    public Action getAction(Api.GameState gameState) {
        Action resultAction = new Action();

        // print whole map
        printMap(gameState);

        boolean iHaveMeleeBase = gameState.entities.stream().anyMatch(entity -> entity.entityType.equals("MELEE_BASE") && entity.playerId == gameState.myId);
        boolean startedBuildingMeleeBase = false;
        boolean enoughResourcesForMeleeBase = gameState.getMyPlayer().resources >= gameOptions.getEntityProperties("MELEE_BASE").cost;

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

                if (!iHaveMeleeBase && !startedBuildingMeleeBase && enoughResourcesForMeleeBase) {
                    // build melee base
                    // find free space
                    Api.Point2D meleeBaseBuildPoint = findFreeSpaceFor(gameOptions, gameState, "MELEE_BASE", entity);
                    if (meleeBaseBuildPoint != null) {
                        startedBuildingMeleeBase = true;
                        nearestResource = null;
                        if (distanceToEntity(gameOptions, entity, "MELEE_BASE", meleeBaseBuildPoint) > 1) {
                            // move to build point
                            System.out.println("move to build point=" + meleeBaseBuildPoint + " from " + entity.position);
                            entityAction.moveAction = new Api.MoveAction(meleeBaseBuildPoint, true, true);
                        } else {
                            System.out.println("actual build point " + meleeBaseBuildPoint + " from " + entity.position);
                            entityAction.buildAction = new Api.BuildAction("MELEE_BASE", meleeBaseBuildPoint);
                        }
                    }
                }


                if (nearestResource != null) {
                    // find path to resource
                    List<Integer> entityIdsToIgnore = new ArrayList<>();
                    entityIdsToIgnore.add(entity.id);
                    entityIdsToIgnore.add(nearestResource.id);


                    int distanceToResource = distanceToEntity(gameOptions, entity, "RESOURCE", nearestResource.position);
                    //List<Api.Point2D> path = PathFinding.solve(gameOptions, gameState, entity.position, nearestResource.position, entityIdsToIgnore);

                    // move to resource
                    // TODO just move and attack
                    if (distanceToResource > 1) {
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

    private int distanceToEntity(Api.GameOptions gameOptions, Api.Entity fromEntity, String toEntityType, Api.Point2D toEntityPos) {
        int toEntitySize = gameOptions.getEntityProperties(toEntityType).size;
        // for all cells of toEntity, find nearest and distance to it
        int minDistance = Integer.MAX_VALUE;
        for (int i = 0; i < toEntitySize; i++) {
            for (int j = 0; j < toEntitySize; j++) {
                int distance = fromEntity.position.distance(new Api.Point2D(toEntityPos.x + i, toEntityPos.y + j));
                if (distance < minDistance) {
                    minDistance = distance;
                }
            }
        }
        return minDistance;
    }

    private static Api.Point2D findFreeSpaceFor(Api.GameOptions gameOptions, Api.GameState gameState, String entityTypeToBuild, Api.Entity builder) {
        Map<Api.Point2D, Api.Entity> allEntitiesMap = new HashMap<>();
        for (Api.Entity entity : gameState.entities) {
            int entitySize = gameOptions.getEntityProperties(entity.entityType).size;
            // fill map
            for (int i = 0; i < entitySize; i++) {
                for (int j = 0; j < entitySize; j++) {
                    allEntitiesMap.put(new Api.Point2D(entity.position.x + i, entity.position.y + j), entity);
                }
            }
        }

        int entityToBuildSize = gameOptions.getEntityProperties(entityTypeToBuild).size;

        List<Api.Point2D> freePoints = new ArrayList<>();
        // for each cell in map check availability
        for (int x = 0; x < gameOptions.mapSize; x++) {
            for (int y = 0; y < gameOptions.mapSize; y++) {
                // check if cell is too far from builder
                if (Math.abs(builder.position.x - x) + Math.abs(builder.position.y - y) > 10) {
                    continue;
                }

                boolean isFree = true;
                // check all points in entity
                for (int i = 0; i < entityToBuildSize; i++) {
                    for (int j = 0; j < entityToBuildSize; j++) {
                        if (allEntitiesMap.containsKey(new Api.Point2D(x + i, y + j))) {
                            isFree = false;
                            break;
                        }
                    }
                }

                if (isFree) {
                    freePoints.add(new Api.Point2D(x, y));
                }
            }
        }
        // sort by distance to builder
        freePoints.sort(Comparator.comparingInt(o -> builder.position.distance(o)));
        if (freePoints.isEmpty()) {
            return null;
        }

        return freePoints.get(0);
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
