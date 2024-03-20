package rover.app.features.fleet.repository;

import org.springframework.stereotype.Repository;
import rover.app.features.fleet.entity.AircraftEntity;
import rover.app.shared.repository.BaseRepository;

@Repository
public interface AircraftRepository extends BaseRepository<AircraftEntity, String> {
}
