package rover.core.platform.auth.session.impl;

import rover.core.platform.auth.session.Session;
import rover.core.platform.auth.session.SessionManager;
import rover.ef.util.IdHelper;

import java.time.LocalDateTime;

public abstract class AbstractSessionManager implements SessionManager {
    protected final Integer expiresIn;

    protected AbstractSessionManager(Integer expiresIn) {
        this.expiresIn = expiresIn;
    }

    @Override
    public Session create(String userId) {
        String accessToken = IdHelper.newCompactUuid();
        LocalDateTime expiresAt = LocalDateTime.now().plusSeconds(expiresIn);

        return new Session(userId, accessToken, expiresAt);
    }
}
