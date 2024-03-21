package rover.core.platform.repository;

import org.springframework.stereotype.Repository;
import rover.core.platform.entity.EnumMemberEntity;
import rover.core.shared.repository.BaseRepository;

@Repository
public interface EnumMemberRepository extends BaseRepository<EnumMemberEntity, String> {
}
