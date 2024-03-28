package rover.app.shared.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import rover.core.platform.entity.TokenEntity;
import rover.core.platform.service.TokenService;

import java.time.LocalDateTime;
import java.util.Optional;

@Component
public class OpaqueTokenAuthenticationProvider implements AuthenticationProvider {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final TokenService tokenService;
    private final UserDetailsService userDetailsService;

    public OpaqueTokenAuthenticationProvider(TokenService tokenService,
                                             UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
        this.tokenService = tokenService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if (authentication instanceof BearerTokenAuthenticationToken authenticationRequest) {
            Optional<TokenEntity> opt = tokenService.getAccessToken(authenticationRequest.getAccessToken());

            if (opt.isPresent()) {
                TokenEntity tokenEntity = opt.get();
                if (LocalDateTime.now().isAfter(tokenEntity.getExpiresAt())) {
                    logger.info("User credentials have expired");

                    throw new CredentialsExpiredException("User credentials have expired");
                }

                UserDetails user = userDetailsService.loadUserByUsername(tokenEntity.getUserId());
                if (user != null) {
                    checkUserDetails(user);

                    BearerTokenAuthenticationToken authenticationResult = BearerTokenAuthenticationToken.authenticated(user);
                    authenticationResult.setDetails(authentication.getDetails());

                    return authenticationResult;
                }
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
