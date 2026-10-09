
package com.smarttraffic.backend.routing;

public class RouteOption {

    private double distanceKm;
    private double durationMinutes;
    private double predictedCongestion;
    private String congestionLevel;
    private String geometry;

    public RouteOption() {
    }

    public double getDistanceKm() {
        return distanceKm;
    }

    public void setDistanceKm(double distanceKm) {
        this.distanceKm = distanceKm;
    }

    public double getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(double durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public double getPredictedCongestion() {
        return predictedCongestion;
    }

    public void setPredictedCongestion(double predictedCongestion) {
        this.predictedCongestion = predictedCongestion;
    }

    public String getCongestionLevel() {
        return congestionLevel;
    }

    public void setCongestionLevel(String congestionLevel) {
        this.congestionLevel = congestionLevel;
    }

    public String getGeometry() {
        return geometry;
    }

    public void setGeometry(String geometry) {
        this.geometry = geometry;
    }
}