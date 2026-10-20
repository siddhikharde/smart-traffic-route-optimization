package com.smarttraffic.backend.repository;

import com.smarttraffic.backend.entity.TrafficData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrafficDataRepository
        extends JpaRepository<TrafficData, Integer> {

}