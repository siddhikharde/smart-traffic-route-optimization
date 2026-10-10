
package com.smarttraffic.backend.routing;

import com.smarttraffic.backend.TrafficPredictionRequest;

public class RouteRequest {

    private double originLongitude;
    private double originLatitude;

    private double destinationLongitude;
    private double destinationLatitude;

    private TrafficPredictionRequest traffic;

    public RouteRequest() {
    }

    public double getOriginLongitude() {
        return originLongitude;
    }

    public void setOriginLongitude(double originLongitude) {
        this.originLongitude = originLongitude;
    }

    public double getOriginLatitude() {
        return originLatitude;
    }

    public void setOriginLatitude(double originLatitude) {
        this.originLatitude = originLatitude;
    }

    public double getDestinationLongitude() {
        return destinationLongitude;
    }

    public void setDestinationLongitude(double destinationLongitude) {
        this.destinationLongitude = destinationLongitude;
    }

    public double getDestinationLatitude() {
        return destinationLatitude;
    }

    public void setDestinationLatitude(double destinationLatitude) {
        this.destinationLatitude = destinationLatitude;
    }

    public TrafficPredictionRequest getTraffic() {
        return traffic;
    }

    public void setTraffic(TrafficPredictionRequest traffic) {
        this.traffic = traffic;
    }
}