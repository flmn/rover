package rover.core.features.fleet.service;

import org.springframework.stereotype.Service;
import rover.core.features.fleet.repository.AircraftRepository;

@Service
public class AircraftService {
    private final AircraftRepository aircraftRepository;

    public AircraftService(AircraftRepository aircraftRepository) {
        this.aircraftRepository = aircraftRepository;
    }
}
