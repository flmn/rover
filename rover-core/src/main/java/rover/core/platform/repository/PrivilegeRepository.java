package rover.core.platform.repository;

import org.springframework.stereotype.Repository;
import rover.core.platform.entity.PrivilegeEntity;
import rover.core.shared.repository.BaseRepository;

@Repository
public interface PrivilegeRepository extends BaseRepository<PrivilegeEntity, String> {
}
