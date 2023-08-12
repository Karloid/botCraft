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

        List<Api.Entity> myEntities = gameState.entities.stream()
                .filter(entity -> entity.playerId == gameState.myId)
                .toList();

        List<Api.Entity> myBuilderUnits = gameState.entities.stream()
                .filter(entity -> entity.entityType.equals("BUILDER_UNIT") && entity.playerId == gameState.myId)
                .toList();

        List<Api.Entity> myMeleeUnits = gameState.entities.stream()
                .filter(entity -> entity.entityType.equals("MELEE_UNIT") && entity.playerId == gameState.myId)
                .toList();

        List<Api.Entity> myMeleeBases = gameState.entities.stream()
                .filter(entity -> entity.entityType.equals("MELEE_BASE") && entity.playerId == gameState.myId)
                .toList();

        List<Api.Entity> myBuilderBases = gameState.entities.stream()
                .filter(entity -> entity.entityType.equals("MELEE_BASE") && entity.playerId == gameState.myId)
                .toList();

        // other types


        for (Api.Entity myBuilder : myBuilderUnits) {
            if (!myBuilder.active) {
                continue;
            }
            Api.EntityAction entityAction = new Api.EntityAction();
            resultAction.entityActions.put(myBuilder.id, entityAction);

            List<Api.Entity> entitiesToActivate = myEntities.stream()
                    .filter(entity -> !entity.active)
                    .sorted(Comparator.comparingInt(entity -> distanceToEntity(gameOptions, myBuilder, entity.entityType, entity.position)))
                    .toList();

            if (!entitiesToActivate.isEmpty()) {
                // check distance
                if (distanceToEntity(gameOptions, myBuilder, entitiesToActivate.get(0).entityType, entitiesToActivate.get(0).position) > 1) {
                    // move to entity
                    entityAction.moveAction = new Api.MoveAction(entitiesToActivate.get(0).position, true, true);
                } else {
                    entityAction.repairAction = new Api.RepairAction(entitiesToActivate.get(0).id);
                }
                continue;
            }

            if (!iHaveMeleeBase && !startedBuildingMeleeBase && enoughResourcesForMeleeBase) {
                // build melee base
                // find free space
                Api.Point2D meleeBaseBuildPoint = findFreeSpaceFor(gameOptions, gameState, "MELEE_BASE", myBuilder);
                if (meleeBaseBuildPoint != null) {
                    startedBuildingMeleeBase = true;
                    if (distanceToEntity(gameOptions, myBuilder, "MELEE_BASE", meleeBaseBuildPoint) > 1) {
                        // move to build point
                        System.out.println("move to build point=" + meleeBaseBuildPoint + " from " + myBuilder.position);
                        entityAction.moveAction = new Api.MoveAction(meleeBaseBuildPoint, true, true);
                    } else {
                        System.out.println("actual build point " + meleeBaseBuildPoint + " from " + myBuilder.position);
                        entityAction.buildAction = new Api.BuildAction("MELEE_BASE", meleeBaseBuildPoint);
                    }
                    continue;
                }
            }

            // find nearest resource
            Api.Entity nearestResource = null;
            int nearestResourceDistance = Integer.MAX_VALUE;
            for (Api.Entity resource : gameState.entities) {
                if (resource.entityType.equals("RESOURCE")) {
                    int distance = Math.abs(resource.position.x - myBuilder.position.x) + Math.abs(resource.position.y - myBuilder.position.y);
                    if (distance < nearestResourceDistance) {
                        nearestResourceDistance = distance;
                        nearestResource = resource;
                    }
                }
            }

            if (nearestResource != null) {
                // find path to resource
                List<Integer> entityIdsToIgnore = new ArrayList<>();
                entityIdsToIgnore.add(myBuilder.id);
                entityIdsToIgnore.add(nearestResource.id);

                int distanceToResource = distanceToEntity(gameOptions, myBuilder, "RESOURCE", nearestResource.position);

                //System.out.println("distance to resource=" + distanceToResource + " from " + myBuilder.position + " to " + nearestResource.position);
                if (distanceToResource > 1) {
                    // move to resource
                    entityAction.moveAction = new Api.MoveAction(nearestResource.position, true, true);
                } else {
                    entityAction.attackAction = new Api.AttackAction(nearestResource.id);
                }
                continue;
            }
        }

        for (Api.Entity myMeleeBase : myMeleeBases) {
            if (!myMeleeBase.active) {
                continue;
            }

            Api.EntityAction entityAction = new Api.EntityAction();
            resultAction.entityActions.put(myMeleeBase.id, entityAction);

            int meleeUnitCost = gameOptions.getEntityProperties("MELEE_UNIT").cost;
            if (meleeUnitCost < gameState.getMyPlayer().resources) {
                List<Api.Point2D> positionsToBuildAvailable = findFreeAdjactedSpaceFor(gameOptions, gameState, myMeleeBase);

                if (!positionsToBuildAvailable.isEmpty()) {
                    entityAction.buildAction = new Api.BuildAction("MELEE_UNIT", positionsToBuildAvailable.get(0));
                }
            }
        }

        for (Api.Entity myMeleeUnit : myMeleeUnits) {
            if (!myMeleeUnit.active) {
                continue;
            }
            Api.EntityAction entityAction = new Api.EntityAction();
            resultAction.entityActions.put(myMeleeUnit.id, entityAction);

            Api.Entity nearestEnemy = null;
            int nearestEnemyDistance = Integer.MAX_VALUE;
            for (Api.Entity enemy : gameState.entities) {
                if (enemy.playerId != gameState.myId && !Objects.equals(enemy.entityType, "RESOURCE")) {
                    int distance = Math.abs(enemy.position.x - myMeleeUnit.position.x) + Math.abs(enemy.position.y - myMeleeUnit.position.y);
                    if (distance < nearestEnemyDistance) {
                        nearestEnemyDistance = distance;
                        nearestEnemy = enemy;
                    }
                }
            }

            if (nearestEnemy != null) {
                // find path to resource
                int distanceToEnemy = distanceToEntity(gameOptions, myMeleeUnit, nearestEnemy.entityType, nearestEnemy.position);

                if (distanceToEnemy > 1) {
                    entityAction.moveAction = new Api.MoveAction(nearestEnemy.position, true, true);
                } else {
                    entityAction.attackAction = new Api.AttackAction(nearestEnemy.id);
                }
            }
        }

        return resultAction;
    }

    private List<Api.Point2D> findFreeAdjactedSpaceFor(Api.GameOptions gameOptions, Api.GameState gameState, Api.Entity entity) {
        List<Api.Point2D> result = new ArrayList<>();
        Map<Api.Point2D, Api.Entity> allEntitiesMap = new HashMap<>();
        for (Api.Entity entity1 : gameState.entities) {
            int entitySize = gameOptions.getEntityProperties(entity1.entityType).size;
            // fill map
            for (int i = 0; i < entitySize; i++) {
                for (int j = 0; j < entitySize; j++) {
                    allEntitiesMap.put(new Api.Point2D(entity1.position.x + i, entity1.position.y + j), entity1);
                }
            }
        }

        int entitySize = gameOptions.getEntityProperties(entity.entityType).size;
        // fill map
        for (int i = -1; i <= entitySize; i++) {
            for (int j = -1; j <= entitySize; j++) {
                Api.Point2D point = new Api.Point2D(entity.position.x + i, entity.position.y + j);

                // check in bounds
                if (point.x < 0 || point.y < 0 || point.x >= gameOptions.mapSize || point.y >= gameOptions.mapSize) {
                    continue;
                }

                // TODO check both entities surface
                if (distanceToEntity(gameOptions, entity, "MELEE_UNIT", point) > 1) {
                    continue;
                }
                if (allEntitiesMap.get(point) == null) {
                    result.add(point);
                }
            }
        }

        return result;
    }

    private int distanceToEntity(Api.GameOptions gameOptions, Api.Entity fromEntity, String toEntityType, Api.Point2D toEntityPos) {
        int toEntitySize = gameOptions.getEntityProperties(toEntityType).size;
        // for all cells of toEntity, find nearest and distance to it
        int minDistance = Integer.MAX_VALUE;
        // TODO check both entities surface
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
                        // check in bounds
                        if (x + i >= gameOptions.mapSize || y + j >= gameOptions.mapSize) {
                            isFree = false;
                            break;
                        }

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
        System.out.println("\n\nMy resources = " + gameState.getMyPlayer().resources + " my score= " + gameState.getMyPlayer().score);
        // print enemy resources and score
        for (Api.Player player : gameState.players) {
            if (player.id != gameState.getMyPlayer().id) {
                System.out.println("Enemy id=" + player.id + " resources = " + player.resources + " enemy score= " + player.score);
            }
        }
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
                System.out.print(foundEntity == null ? "." : foundEntity.playerId != -1 && foundEntity.playerId != gameState.getMyPlayer().id ? "*" : getCharByType(foundEntity));
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
                return foundEntity.entityType.substring(0, 1);
        }
    }
}
