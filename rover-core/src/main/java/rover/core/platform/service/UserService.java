package rover.core.platform.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import rover.core.platform.dto.LoginResult;
import rover.core.platform.entity.UserEntity;
import rover.core.platform.repository.UserRepository;
import rover.core.shared.util.IdUtils;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       TokenService tokenService,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResult login(String email, String password) {
        Optional<UserEntity> opt = userRepository.findByEmail(email);

        if (opt.isPresent()) {
            UserEntity user = opt.get();

            if (passwordEncoder.matches(password, user.getPassword())) {
                String accessToken = IdUtils.newCompactUuid();

                return new LoginResult(accessToken);
            }
        }

        return null;
    }

    public Optional<UserEntity> getById(String id) {
        return userRepository.findById(id);
    }

    public Optional<UserEntity> getByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
