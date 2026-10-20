package com.smarttraffic.backend.repository;

import com.smarttraffic.backend.entity.TrafficPrediction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrafficPredictionRepository
        extends JpaRepository<TrafficPrediction, Integer> {

}