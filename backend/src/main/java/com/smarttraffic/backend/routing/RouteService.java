
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
import com.smarttraffic.backend.MLPredictionRequest;
import com.smarttraffic.backend.MLPredictionResponse;
import com.smarttraffic.backend.service.MLPredictionService;
import com.smarttraffic.backend.TrafficPredictionRequest;

@Service
public class RouteService {

        private final RestClient restClient;
        private final ObjectMapper objectMapper;
        private final MLPredictionService mlPredictionService;

        public RouteService(
                        RestClient.Builder builder,
                        ObjectMapper objectMapper,
                        MLPredictionService mlPredictionService) {

                this.restClient = builder
                                .baseUrl("https://router.project-osrm.org")
                                .defaultHeader(HttpHeaders.ACCEPT_ENCODING, "identity")
                                .defaultHeader(HttpHeaders.ACCEPT,
                                                MediaType.APPLICATION_JSON_VALUE)
                                .build();

                this.objectMapper = objectMapper;
                this.mlPredictionService = mlPredictionService;
        }

        public RouteResponse getRoutes(
                        double originLongitude,
                        double originLatitude,
                        double destinationLongitude,
                        double destinationLatitude,
                        com.smarttraffic.backend.TrafficPredictionRequest trafficRequest) {

                String coordinates = originLongitude + "," + originLatitude + ";"
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

                                MLPredictionRequest mlRequest = new MLPredictionRequest();

                                mlRequest.setArea_name(trafficRequest.getAreaName());
                                mlRequest.setRoad_intersection_name(
                                                trafficRequest.getRoadIntersectionName());

                                mlRequest.setTraffic_volume(trafficRequest.getTrafficVolume());
                                mlRequest.setAverage_speed(trafficRequest.getAverageSpeed());
                                mlRequest.setIncident_reports(trafficRequest.getIncidentReports());

                                mlRequest.setPublic_transport_usage(
                                                trafficRequest.getPublicTransportUsage());
                                mlRequest.setTraffic_signal_compliance(
                                                trafficRequest.getTrafficSignalCompliance());
                                mlRequest.setParking_usage(trafficRequest.getParkingUsage());
                                mlRequest.setPedestrian_and_cyclist_count(
                                                trafficRequest.getPedestrianAndCyclistCount());

                                mlRequest.setWeather_conditions(trafficRequest.getWeatherConditions());
                                mlRequest.setRoadwork_and_construction_activity(
                                                trafficRequest.getRoadworkAndConstructionActivity());

                                mlRequest.setYear(trafficRequest.getYear());
                                mlRequest.setMonth(trafficRequest.getMonth());
                                mlRequest.setDay(trafficRequest.getDay());
                                mlRequest.setDay_of_week(trafficRequest.getDayOfWeek());
                                System.out.println(
                                                "Roadwork sent to ML: "
                                                                + mlRequest.getRoadwork_and_construction_activity());
                                MLPredictionResponse mlResponse = mlPredictionService.predict(mlRequest);

                                option.setPredictedCongestion(
                                                mlResponse.getPredicted_congestion());

                                option.setCongestionLevel(
                                                mlResponse.getCongestion_level());

                                double distanceMeters = route.path("distance").asDouble();
                                double durationSeconds = route.path("duration").asDouble();

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