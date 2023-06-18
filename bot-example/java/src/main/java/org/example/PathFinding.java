package org.example;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class PathFinding {
    public static List<Api.Point2D> solve(Api.GameOptions gameOptions, Api.GameState gameState, Api.Point2D start, Api.Point2D goal, List<Integer> entityIdsToIgnore) {
        // collect all entities to map Point2D -> Entity
        Map<Api.Point2D, Api.Entity> entityMap = new HashMap<>();
        for (Api.Entity entity : gameState.entities) {
            if (!entityIdsToIgnore.contains(entity.id)) {
                entityMap.put(entity.position, entity);
            }
        }

        ArrayDeque<Api.Point2D> queue = new ArrayDeque<>();
        Set<Api.Point2D> visited = new java.util.HashSet<>();
        Map<Api.Point2D, Api.Point2D> prev = new HashMap<>();
        queue.add(start);
        visited.add(start);

        while (!queue.isEmpty()) {
            Api.Point2D current = queue.removeFirst();
            if (current.equals(goal)) {
                List<Api.Point2D> path = new ArrayList<>();

                Api.Point2D cur = current;
                while (!cur.equals(start)) {
                    path.add(cur);
                    cur = prev.get(cur);
                }
                path.add(cur);
                Collections.reverse(path);
                return path;
            }

            for (Api.Point2D next : getNeighbors(gameOptions, entityMap, current)) {
                if (!visited.contains(next)) {
                    queue.add(next);
                    visited.add(next);
                    prev.put(next, current);
                }
            }
        }

        return Collections.emptyList();
    }

    private static List<Api.Point2D> getNeighbors(Api.GameOptions gameOptions, Map<Api.Point2D, Api.Entity> entityMap, Api.Point2D current) {
        int width = gameOptions.mapSize;
        int height = gameOptions.mapSize;
        int x = current.x;
        int y = current.y;

        List<Api.Point2D> neighbors = new ArrayList<>();

        if (x > 0 && !entityMap.containsKey(new Api.Point2D(x - 1, y))) {
            neighbors.add(new Api.Point2D(x - 1, y));
        }
        if (x < width - 1 && !entityMap.containsKey(new Api.Point2D(x + 1, y))) {
            neighbors.add(new Api.Point2D(x + 1, y));
        }
        if (y > 0 && !entityMap.containsKey(new Api.Point2D(x, y - 1))) {
            neighbors.add(new Api.Point2D(x, y - 1));
        }
        if (y < height - 1 && !entityMap.containsKey(new Api.Point2D(x, y + 1))) {
            neighbors.add(new Api.Point2D(x, y + 1));
        }

        return neighbors;
    }
}

