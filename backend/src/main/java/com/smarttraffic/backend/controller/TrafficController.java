package com.smarttraffic.backend.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController 
public class TrafficController {

    @GetMapping("/api/traffic/status")
    public String getTrafficStatus(){
        return  "Traffic Api is Ready!." ;
        
    }

}
