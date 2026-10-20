
package com.smarttraffic.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/traffic")
public class TomTomTrafficController {

    private final TomTomTrafficService tomTomTrafficService;

    public TomTomTrafficController(
            TomTomTrafficService tomTomTrafficService) {
        this.tomTomTrafficService = tomTomTrafficService;
    }

    @GetMapping("/live")
    public String getLiveTraffic(
            @RequestParam(defaultValue = "12.9716") double latitude,
            @RequestParam(defaultValue = "77.5946") double longitude) {

        return tomTomTrafficService.getTraffic(latitude, longitude);
    }
}
