
package com.smarttraffic.backend.routing;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/routes")
public class RouteController {

    private final RouteService routeService;

    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    @GetMapping
    public RouteResponse getRoutes(
            @RequestParam double originLongitude,
            @RequestParam double originLatitude,
            @RequestParam double destinationLongitude,
            @RequestParam double destinationLatitude) {

        return routeService.getRoutes(
                originLongitude,
                originLatitude,
                destinationLongitude,
                destinationLatitude);
    }
}