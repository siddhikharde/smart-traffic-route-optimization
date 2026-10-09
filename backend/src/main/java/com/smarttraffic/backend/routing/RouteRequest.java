
package com.smarttraffic.backend.routing;

public class RouteRequest {

    private String origin;
    private String destination;

    public RouteRequest() {
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }
}