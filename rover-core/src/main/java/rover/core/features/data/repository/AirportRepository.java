package rover.core.features.data.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;
import rover.core.features.data.entity.AirportEntity;
import rover.core.shared.repository.BaseRepository;

@Repository
public interface AirportRepository extends BaseRepository<AirportEntity, String> {

    Page<AirportEntity> findByIdLikeIgnoreCaseOrIataCodeLikeIgnoreCaseOrNameLikeIgnoreCase(String id, String iataCode, String name, PageRequest pageRequest);
}
