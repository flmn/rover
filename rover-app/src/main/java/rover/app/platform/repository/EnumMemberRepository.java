package rover.app.platform.repository;

import org.springframework.stereotype.Repository;
import rover.app.platform.entity.EnumMemberEntity;
import rover.app.shared.repository.BaseRepository;

@Repository
public interface EnumMemberRepository extends BaseRepository<EnumMemberEntity, String> {
}
