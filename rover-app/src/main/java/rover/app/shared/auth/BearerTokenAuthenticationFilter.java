package rover.app.shared.auth;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.util.StringUtils;

import java.io.IOException;

public class BearerTokenAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
    private static final String BEARER = "Bearer ";
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    protected BearerTokenAuthenticationFilter(RequestMatcher requiresAuthenticationRequestMatcher, AuthenticationManager authenticationManager) {
        super(requiresAuthenticationRequestMatcher, authenticationManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        logger.info("attemptAuthentication");
        String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (!StringUtils.hasLength(authorization)) {
            throw new AuthenticationCredentialsNotFoundException(String.format("Can not found header %s", HttpHeaders.AUTHORIZATION));
        }

        if (!authorization.startsWith(BEARER)) {
            throw new BadCredentialsException("Bearer token needed");
        }

        String token = authorization.substring(BEARER.length());

        Authentication authenticationRequest = new BearerTokenAuthenticationToken(token);

        return getAuthenticationManager().authenticate(authenticationRequest);
    }
}
