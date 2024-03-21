package rover.core.features.fleet.repository;

import org.springframework.stereotype.Repository;
import rover.core.features.fleet.entity.AircraftEntity;
import rover.core.shared.repository.BaseRepository;

@Repository
public interface AircraftRepository extends BaseRepository<AircraftEntity, String> {
}
