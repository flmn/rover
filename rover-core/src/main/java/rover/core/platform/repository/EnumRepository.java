package rover.core.platform.repository;

import org.springframework.stereotype.Repository;
import rover.core.platform.entity.EnumEntity;
import rover.core.shared.repository.BaseRepository;

@Repository
public interface EnumRepository extends BaseRepository<EnumEntity, String> {
}
