package com.smarttraffic.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.PrePersist;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "traffic_predictions")
@Getter
@Setter
public class TrafficPrediction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "area")
    private String area;

    @Column(name = "road_intersection")
    private String roadIntersection;

    @Column(name = "predicted_congestion")
    private double predictedCongestion;

    @Column(name = "congestion_level")
    private String congestionLevel;

    @Column(name = "prediction_time")
    private LocalDateTime predictionTime;

    public TrafficPrediction() {
    }

    @PrePersist
    protected void onCreate() {
        if (predictionTime == null) {
            predictionTime = LocalDateTime.now();
        }
    }
}