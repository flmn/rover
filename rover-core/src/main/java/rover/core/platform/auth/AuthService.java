package rover.core.platform.auth;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import rover.core.platform.auth.session.Session;
import rover.core.platform.auth.session.SessionManager;
import rover.core.platform.entity.UserEntity;
import rover.core.platform.service.UserService;

import java.util.Optional;

@Service
public class AuthService {
    private final UserService userService;
    private final SessionManager sessionManager;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserService userService,
                       SessionManager sessionManager,
                       PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.sessionManager = sessionManager;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<Session> login(String email, String password) {
        var opt = userService.getByEmail(email);

        if (opt.isPresent()) {
            UserEntity user = opt.get();

            if (passwordEncoder.matches(password, user.getPassword())) {
                Session session = sessionManager.create(user.getId());
                session.put(Session.ATTR_EMAIL, user.getEmail());
                session.put(Session.ATTR_NAME, user.getName());
                session.put(Session.ATTR_ENABLED, user.getEnabled());
                session.put(Session.ATTR_LOCKED, user.getLocked());
                session.put(Session.ATTR_AUTHORITIES, AuthorityUtils.NO_AUTHORITIES);

                sessionManager.save(session);

                return Optional.of(session);
            }
        }

        return Optional.empty();
    }
}
