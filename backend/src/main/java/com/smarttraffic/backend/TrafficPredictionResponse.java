package com.smarttraffic.backend;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TrafficPredictionResponse {

    private double predictedCongestion;
    private String congestionLevel;

    public TrafficPredictionResponse() {
    }

    public TrafficPredictionResponse(double predictedCongestion, String congestionLevel) {
        this.predictedCongestion = predictedCongestion;
        this.congestionLevel = congestionLevel;
    }
}