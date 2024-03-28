package rover.core.platform.repository;

import org.springframework.stereotype.Repository;
import rover.core.platform.entity.TokenEntity;
import rover.core.platform.entity.TokenType;
import rover.core.shared.repository.BaseRepository;

import java.util.Optional;

@Repository
public interface TokenRepository extends BaseRepository<TokenEntity, String> {

    Optional<TokenEntity> findByTypeAndToken(TokenType type, String token);
}
