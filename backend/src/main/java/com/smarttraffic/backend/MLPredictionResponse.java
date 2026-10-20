package com.smarttraffic.backend;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MLPredictionResponse {

    private double predicted_congestion;
    private String congestion_level;

    public MLPredictionResponse() {
    }
}