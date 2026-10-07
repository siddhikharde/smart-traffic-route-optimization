package com.smarttraffic.backend;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MLPredictionRequest {

    @JsonProperty("area_name")
    private String area_name;

    @JsonProperty("road_intersection_name")
    private String road_intersection_name;

    @JsonProperty("traffic_volume")
    private double traffic_volume;

    @JsonProperty("average_speed")
    private double average_speed;

    @JsonProperty("incident_reports")
    private int incident_reports;

    @JsonProperty("public_transport_usage")
    private double public_transport_usage;

    @JsonProperty("traffic_signal_compliance")
    private double traffic_signal_compliance;

    @JsonProperty("parking_usage")
    private double parking_usage;

    @JsonProperty("pedestrian_and_cyclist_count")
    private int pedestrian_and_cyclist_count;

    @JsonProperty("weather_conditions")
    private String weather_conditions;

    @JsonProperty("roadwork_and_construction_activity")
    private String roadwork_and_construction_activity;

    @JsonProperty("year")
    private int year;

    @JsonProperty("month")
    private int month;

    @JsonProperty("day")
    private int day;

    @JsonProperty("day_of_week")
    private String day_of_week;

    public MLPredictionRequest() {
    }
}