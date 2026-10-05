package com.smarttraffic.backend.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping; 
import org.springframework.web.bind.annotation.RequestBody;
import com.smarttraffic.backend.TrafficPredictionRequest;
import com.smarttraffic.backend.TrafficPredictionResponse;

import org.springframework.web.bind.annotation.RestController;

@RestController 
public class TrafficController {

    @GetMapping("/api/traffic/status")
    public String getTrafficStatus(){
        return  "Traffic Api is Ready!." ;
        
    }


@PostMapping("/api/traffic/predict")
public TrafficPredictionResponse predictTraffic(
        @RequestBody TrafficPredictionRequest request) {

    TrafficPredictionResponse response =
            new TrafficPredictionResponse(98.52, "Very High");

    return response;
}
    
}
