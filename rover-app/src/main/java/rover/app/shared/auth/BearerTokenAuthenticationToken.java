package rover.app.shared.auth;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class BearerTokenAuthenticationToken extends AbstractAuthenticationToken {
    private final String accessToken;
    private final Object principal;

    private BearerTokenAuthenticationToken(String accessToken,
                                           Object principal,
                                           Collection<? extends GrantedAuthority> authorities,
                                           boolean authenticated) {
        super(authorities);

        this.accessToken = accessToken;
        this.principal = principal;

        setAuthenticated(authenticated);
    }

    public static BearerTokenAuthenticationToken unauthenticated(String accessToken) {
        return new BearerTokenAuthenticationToken(accessToken,
                null,
                AuthorityUtils.NO_AUTHORITIES,
                false);
    }

    public static BearerTokenAuthenticationToken authenticated(UserDetails user) {
        return new BearerTokenAuthenticationToken(null,
                user,
                user.getAuthorities(),
                true);
    }

    public String getAccessToken() {
        return accessToken;
    }

    @Override
    public Object getCredentials() {
        return accessToken;
    }

    @Override
    public Object getPrincipal() {
        return principal;
    }
}
