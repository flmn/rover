package rover.core.platform.repository;

import org.springframework.stereotype.Repository;
import rover.core.platform.entity.ConfigEntity;
import rover.core.shared.repository.BaseRepository;

@Repository
public interface ConfigRepository extends BaseRepository<ConfigEntity, String> {
}
