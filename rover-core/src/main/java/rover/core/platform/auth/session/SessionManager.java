package rover.core.platform.auth.session;

import java.util.Optional;

public interface SessionManager {
    Session create(String userId);

    void save(Session session);

    Optional<Session> get(String accessToken);

    void delete(String accessToken);
}
