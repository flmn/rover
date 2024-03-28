package rover.app.shared.auth;

import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import rover.core.platform.entity.TokenEntity;
import rover.core.platform.service.TokenService;

import java.util.Optional;

@Component
public class OpaqueTokenAuthenticationProvider implements AuthenticationProvider {
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
                UserDetails user = userDetailsService.loadUserByUsername(opt.get().getUserId());
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
            throw new DisabledException("User account is disabled");
        }

        if (!user.isAccountNonLocked()) {
            throw new LockedException("User account is locked");
        }

        if (!user.isAccountNonExpired()) {
            throw new AccountExpiredException("User account has expired");
        }

        if (!user.isCredentialsNonExpired()) {
            throw new CredentialsExpiredException("User credentials have expired");
        }
    }
}
