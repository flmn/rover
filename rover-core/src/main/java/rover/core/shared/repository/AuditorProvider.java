package rover.core.shared.repository;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import rover.core.platform.auth.RoverUserDetails;

import java.util.Optional;

@Component
public class AuditorProvider implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) {
            return Optional.empty();
        }

        if (authentication.getPrincipal() instanceof RoverUserDetails userDetails) {
            return Optional.of(userDetails.getUserId());
        }

        return Optional.empty();
    }
}
