package rover.core.platform.repository;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;
import rover.core.platform.entity.ConfigEntity;
import rover.core.shared.repository.BaseRepository;

import java.util.List;

@Repository
public interface ConfigRepository extends BaseRepository<ConfigEntity, String> {
    List<ConfigEntity> findAllByPublicAccess(boolean publicAccess, Sort sort);
}
