package com.smarttraffic.backend.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping; 
import org.springframework.web.bind.annotation.RequestBody;
import com.smarttraffic.backend.TrafficPredictionRequest;
import org.springframework.web.bind.annotation.RestController;

@RestController 
public class TrafficController {

    @GetMapping("/api/traffic/status")
    public String getTrafficStatus(){
        return  "Traffic Api is Ready!." ;
        
    }


    @PostMapping("/api/traffic/predict")
    public TrafficPredictionRequest receivePredictionRequest(
        @RequestBody TrafficPredictionRequest request
    ){
        return request;
    }
    
}
