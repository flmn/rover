package rover.core.platform.auth.session.impl.db;

import org.springframework.stereotype.Repository;
import rover.core.shared.repository.BaseRepository;

import java.util.Optional;

@Repository
public interface SessionRepository extends BaseRepository<SessionEntity, String> {
    Optional<SessionEntity> findByAccessToken(String accessToken);
}
