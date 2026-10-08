package com.smarttraffic.backend.controller;

import com.smarttraffic.backend.MLPredictionRequest;
import com.smarttraffic.backend.MLPredictionResponse;
import com.smarttraffic.backend.TrafficPredictionRequest;
import com.smarttraffic.backend.TrafficPredictionResponse;
import com.smarttraffic.backend.service.MLPredictionService;

import org.springframework.web.bind.annotation.*;

@RestController
public class TrafficController {

    private final MLPredictionService mlPredictionService;

    public TrafficController(MLPredictionService mlPredictionService) {
        this.mlPredictionService = mlPredictionService;
    }

    @GetMapping("/api/traffic/status")
    public String getTrafficStatus() {
        return "Traffic API is ready!";
    }

    @PostMapping("/api/traffic/predict")
    public TrafficPredictionResponse predictTraffic(
            @RequestBody TrafficPredictionRequest request) {

        MLPredictionRequest mlRequest = new MLPredictionRequest();

        mlRequest.setArea_name(request.getAreaName());
        mlRequest.setRoad_intersection_name(request.getRoadIntersectionName());

        mlRequest.setTraffic_volume(request.getTrafficVolume());
        mlRequest.setAverage_speed(request.getAverageSpeed());
        mlRequest.setIncident_reports(request.getIncidentReports());

        mlRequest.setPublic_transport_usage(request.getPublicTransportUsage());
        mlRequest.setTraffic_signal_compliance(request.getTrafficSignalCompliance());
        mlRequest.setParking_usage(request.getParkingUsage());
        mlRequest.setPedestrian_and_cyclist_count(
                request.getPedestrianAndCyclistCount());

        mlRequest.setWeather_conditions(request.getWeatherConditions());
        mlRequest.setRoadwork_and_construction_activity(
                request.getRoadworkAndConstructionActivity());

        mlRequest.setYear(request.getYear());
        mlRequest.setMonth(request.getMonth());
        mlRequest.setDay(request.getDay());
        mlRequest.setDay_of_week(request.getDayOfWeek());

        MLPredictionResponse mlResponse =
                mlPredictionService.predict(mlRequest);

        return new TrafficPredictionResponse(
                mlResponse.getPredicted_congestion(),
                mlResponse.getCongestion_level()
        );
    }
}