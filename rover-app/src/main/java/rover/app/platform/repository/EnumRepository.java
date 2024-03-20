package rover.app.platform.repository;

import org.springframework.stereotype.Repository;
import rover.app.platform.entity.EnumEntity;
import rover.app.shared.repository.BaseRepository;

@Repository
public interface EnumRepository extends BaseRepository<EnumEntity, String> {
}
