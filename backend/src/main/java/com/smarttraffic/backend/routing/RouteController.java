
package com.smarttraffic.backend.routing;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/routes")
public class RouteController {

    private final RouteService routeService;

    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    @PostMapping
    public RouteResponse getRoutes(@RequestBody RouteRequest request) {

        return routeService.getRoutes(
                request.getOriginLongitude(),
                request.getOriginLatitude(),
                request.getDestinationLongitude(),
                request.getDestinationLatitude(),
                request.getTraffic()
        );
    }
}
