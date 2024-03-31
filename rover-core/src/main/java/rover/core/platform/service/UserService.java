package rover.core.platform.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import rover.core.platform.entity.TokenEntity;
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

    public Page<UserEntity> listUsers(int pageNumber, int pageSize, String sortProperty, Sort.Direction direction) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize);

        if (StringUtils.hasLength(sortProperty)) {
            pageRequest = pageRequest.withSort(direction, sortProperty);
        }

        return userRepository.findAll(pageRequest);
    }

    public Optional<UserEntity> getById(String id) {
        return userRepository.findById(id);
    }

    public Optional<UserEntity> getByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<UserEntity> create(String email, String password, String name, boolean enabled) {
        UserEntity entity = new UserEntity();
        entity.setId(IdUtils.newTsid(UserEntity.ID_PREFIX));
        entity.setEmail(email);
        entity.setName(name);
        entity.setPassword(passwordEncoder.encode(password));
        entity.setEnabled(enabled);

        entity = userRepository.save(entity);

        return Optional.of(entity);
    }

    public Optional<TokenEntity> login(String email, String password) {
        Optional<UserEntity> opt = userRepository.findByEmail(email);

        if (opt.isPresent()) {
            UserEntity user = opt.get();

            if (passwordEncoder.matches(password, user.getPassword())) {
                String accessToken = IdUtils.newCompactUuid();

                TokenEntity tokenEntity = tokenService.saveAccessToken(user.getId(), accessToken);

                return Optional.of(tokenEntity);
            }
        }

        return Optional.empty();
    }
}
