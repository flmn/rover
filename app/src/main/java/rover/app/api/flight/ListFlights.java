package rover.app.api.flight;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController(ListFlights.PATH)
public class ListFlights {
    static final String PATH = "/api/flight/list-flights";

    @PostMapping(PATH)
    public Object process() {
        return List.of("a", "b", "c");
    }
}
