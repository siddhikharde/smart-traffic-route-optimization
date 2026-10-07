package com.smarttraffic.backend.service;

import com.smarttraffic.backend.MLPredictionRequest;
import com.smarttraffic.backend.MLPredictionResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class MLPredictionService {

    private final RestClient restClient;

    public MLPredictionService(
            RestClient.Builder restClientBuilder,
            @Value("${ml.service.url}") String mlServiceUrl) {

        this.restClient = restClientBuilder
                .baseUrl(mlServiceUrl)
                .build();
    }

    public MLPredictionResponse predict(MLPredictionRequest request) {

        return restClient.post()
                .uri("/predict")
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(MLPredictionResponse.class);
    }
}