package rover.core.platform.repository;

import org.springframework.stereotype.Repository;
import rover.core.platform.entity.TokenEntity;
import rover.core.shared.repository.BaseRepository;

@Repository
public interface TokenRepository extends BaseRepository<TokenEntity, String> {
}
