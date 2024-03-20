package rover.app.features.fleet.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/fleet/aircrafts")
public class AircraftController {

    @GetMapping
    public Object list() {
        return List.of("B-1234", "B-5678", "B-90JQ");
    }
}
