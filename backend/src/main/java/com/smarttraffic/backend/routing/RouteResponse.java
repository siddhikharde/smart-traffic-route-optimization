
package com.smarttraffic.backend.routing;

import java.util.List;

public class RouteResponse {

    private String origin;
    private String destination;
    private List<RouteOption> routes;
    private String message;

    public RouteResponse() {
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

    public List<RouteOption> getRoutes() {
        return routes;
    }

    public void setRoutes(List<RouteOption> routes) {
        this.routes = routes;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}