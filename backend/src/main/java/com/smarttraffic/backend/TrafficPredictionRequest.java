
package com.smarttraffic.backend;

import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
public class TrafficPredictionRequest {

    private String areaName;
    private String roadIntersectionName;

    private double trafficVolume;
    private double averageSpeed;
    private int incidentReports;

    private double publicTransportUsage;
    private double trafficSignalCompliance;
    private double parkingUsage;
    private int pedestrianAndCyclistCount;

    private String weatherConditions;
    private String roadworkAndConstructionActivity;

    private int year;
    private int month;
    private int day;
    private String dayOfWeek;

    public TrafficPredictionRequest() {
    }

    // Getters and setters will be added next.
}