package rover.app.shared.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import rover.core.platform.auth.RoverUserDetails;
import rover.core.platform.auth.session.Session;
import rover.core.platform.auth.session.SessionManager;

import java.time.LocalDateTime;

@Component
public class OpaqueTokenAuthenticationProvider implements AuthenticationProvider {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final SessionManager sessionManager;

    public OpaqueTokenAuthenticationProvider(SessionManager sessionManager) {
        this.sessionManager = sessionManager;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if (authentication instanceof BearerTokenAuthenticationToken authenticationRequest) {
            var opt = sessionManager.get(authenticationRequest.getAccessToken());

            if (opt.isPresent()) {
                Session session = opt.get();
                if (LocalDateTime.now().isAfter(session.getExpiresAt())) {
                    logger.info("User credentials have expired");

                    throw new CredentialsExpiredException("User credentials have expired");
                }

                UserDetails user = toUserDetails(session);

                checkUserDetails(user);

                BearerTokenAuthenticationToken authenticationResult = BearerTokenAuthenticationToken.authenticated(user);
                authenticationResult.setDetails(authentication.getDetails());

                return authenticationResult;
            } else {
                throw new BadCredentialsException("Bad credentials");
            }
        }

        return authentication;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (BearerTokenAuthenticationToken.class.isAssignableFrom(authentication));
    }

    private RoverUserDetails toUserDetails(Session session) {
        String email = session.getString(Session.ATTR_EMAIL, "");
        boolean enabled = session.getBoolean(Session.ATTR_ENABLED, true);
        boolean locked = session.getBoolean(Session.ATTR_LOCKED, false);

        return new RoverUserDetails(session.getUserId(),
                email,
                null,
                enabled,
                true,
                true,
                !locked,
                AuthorityUtils.NO_AUTHORITIES); // todo
    }

    private void checkUserDetails(UserDetails user) {
        if (!user.isEnabled()) {
            logger.info("User account is disabled");

            throw new DisabledException("User account is disabled");
        }

        if (!user.isAccountNonLocked()) {
            logger.info("User account is locked");

            throw new LockedException("User account is locked");
        }

        if (!user.isAccountNonExpired()) {

            logger.info("User account has expired");
            throw new AccountExpiredException("User account has expired");
        }
    }
}
