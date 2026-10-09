
package com.smarttraffic.backend.routing;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class RouteService {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public RouteService(RestClient.Builder builder,
                        ObjectMapper objectMapper) {

        this.restClient = builder
                .baseUrl("https://router.project-osrm.org")
                .defaultHeader(HttpHeaders.ACCEPT_ENCODING, "identity")
                .defaultHeader(HttpHeaders.ACCEPT,
                        MediaType.APPLICATION_JSON_VALUE)
                .build();

        this.objectMapper = objectMapper;
    }

    public RouteResponse getRoutes(
            double originLongitude,
            double originLatitude,
            double destinationLongitude,
            double destinationLatitude) {

        String coordinates =
                originLongitude + "," + originLatitude + ";"
                + destinationLongitude + "," + destinationLatitude;

        String uri = "/route/v1/driving/" + coordinates
                + "?alternatives=true&overview=full&geometries=geojson";

        String response = restClient.get()
                .uri(uri)
                .retrieve()
                .body(String.class);

        try {
            JsonNode root = objectMapper.readTree(response);

            RouteResponse routeResponse = new RouteResponse();
            List<RouteOption> routeOptions = new ArrayList<>();

            JsonNode routes = root.path("routes");

            for (JsonNode route : routes) {
                RouteOption option = new RouteOption();

                double distanceMeters =
                        route.path("distance").asDouble();
                double durationSeconds =
                        route.path("duration").asDouble();

                option.setDistanceKm(distanceMeters / 1000.0);
                option.setDurationMinutes(durationSeconds / 60.0);

                option.setGeometry(
                        route.path("geometry").toString());

                routeOptions.add(option);
            }

            routeResponse.setOrigin(
                    originLongitude + "," + originLatitude);
            routeResponse.setDestination(
                    destinationLongitude + "," + destinationLatitude);
            routeResponse.setRoutes(routeOptions);
            routeResponse.setMessage("Routes retrieved successfully");

            return routeResponse;

        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to parse routing response", e);
        }
    }
}