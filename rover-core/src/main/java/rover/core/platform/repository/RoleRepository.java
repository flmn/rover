package rover.core.platform.repository;

import org.springframework.stereotype.Repository;
import rover.core.platform.entity.RoleEntity;
import rover.core.shared.repository.BaseRepository;

@Repository
public interface RoleRepository extends BaseRepository<RoleEntity, String> {
}
