package com.smarttraffic.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "traffic_data")
@Getter
@Setter
public class TrafficData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "area_name")
    private String areaName;

    @Column(name = "road_intersection_name")
    private String roadIntersectionName;

    @Column(name = "traffic_volume")
    private double trafficVolume;

    @Column(name = "average_speed")
    private double averageSpeed;

    @Column(name = "incident_reports")
    private int incidentReports;

    @Column(name = "public_transport_usage")
    private double publicTransportUsage;

    @Column(name = "traffic_signal_compliance")
    private double trafficSignalCompliance;

    @Column(name = "parking_usage")
    private double parkingUsage;

    @Column(name = "pedestrian_and_cyclist_count")
    private int pedestrianAndCyclistCount;

    @Column(name = "weather_conditions")
    private String weatherConditions;

    @Column(name = "roadwork_and_construction_activity")
    private String roadworkAndConstructionActivity;

    @Column(name = "year")
    private int year;

    @Column(name = "month")
    private int month;

    @Column(name = "day")
    private int day;

    @Column(name = "day_of_week")
    private String dayOfWeek;

    @Column(name = "recorded_at")
    private LocalDateTime recordedAt;

    public TrafficData() {
    }

    @PrePersist
    protected void onCreate() {
        if (recordedAt == null) {
            recordedAt = LocalDateTime.now();
        }
    }
}