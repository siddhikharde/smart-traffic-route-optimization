
package com.smarttraffic.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class TomTomTrafficService {

    @Value("${tomtom.api.key}")
    private String apiKey;

    @Value("${tomtom.api.base-url}")
    private String baseUrl;

    private final RestClient restClient = RestClient.create();

    public String getTraffic(double latitude, double longitude) {

        return restClient.get()
                .uri(baseUrl
                        + "/traffic/services/4/flowSegmentData/relative0/10/json"
                        + "?point={point}&unit=KMPH&openLr=false&key={key}",
                        latitude + "," + longitude,
                        apiKey)
                .retrieve()
                .body(String.class);
    }

    public double getCurrentSpeed(double latitude, double longitude) {
    try {
        String response = getTraffic(latitude, longitude);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response);

        return root
                .path("flowSegmentData")
                .path("currentSpeed")
                .asDouble();
    } catch (Exception e) {
        throw new RuntimeException(
                "Failed to retrieve live traffic speed from TomTom", e);
    }
}
}
