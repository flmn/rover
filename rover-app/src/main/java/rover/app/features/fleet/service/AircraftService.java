package rover.app.features.fleet.service;

import org.springframework.stereotype.Service;
import rover.app.features.fleet.repository.AircraftRepository;

@Service
public class AircraftService {
    private final AircraftRepository aircraftRepository;

    public AircraftService(AircraftRepository aircraftRepository) {
        this.aircraftRepository = aircraftRepository;
    }
}
