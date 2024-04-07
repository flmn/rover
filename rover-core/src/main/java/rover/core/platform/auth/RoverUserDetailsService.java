package rover.core.platform.auth;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import rover.core.platform.entity.UserEntity;
import rover.core.platform.service.UserService;

import java.util.Optional;

@Service
public class RoverUserDetailsService implements UserDetailsService {
    private final UserService userService;

    public RoverUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        if (!StringUtils.hasText(userId)) {
            return null;
        }

        Optional<UserEntity> opt = userService.getById(userId);

        if (opt.isEmpty()) {
            return null;
        }

        UserEntity userEntity = opt.get();

        return new RoverUserDetails(userEntity.getId(),
                userEntity.getEmail(),
                null,
                userEntity.getEnabled(),
                true,
                true,
                !userEntity.getLocked(),
                AuthorityUtils.NO_AUTHORITIES);
    }
}
