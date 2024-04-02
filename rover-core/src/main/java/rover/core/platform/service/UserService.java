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

import java.time.LocalDateTime;
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

    public Page<UserEntity> list(String search, int pageNumber, int pageSize, String sortProperty, Sort.Direction direction) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize);

        if (StringUtils.hasLength(sortProperty)) {
            pageRequest = pageRequest.withSort(direction, sortProperty);
        }

        if (StringUtils.hasLength(search)) {
            search = "%" + search + "%";
            return userRepository.findByEmailLikeIgnoreCaseOrNameLikeIgnoreCase(search, search, pageRequest);
        } else {
            return userRepository.findAll(pageRequest);
        }
    }

    public Optional<UserEntity> getById(String id) {
        return userRepository.findById(id);
    }

    public Optional<UserEntity> getByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserEntity create(String email, String password, String name, boolean enabled) {
        UserEntity entity = new UserEntity();
        entity.setId(IdUtils.newTsid(UserEntity.ID_PREFIX));
        entity.setEmail(email);
        entity.setName(name);
        entity.setPassword(passwordEncoder.encode(password));
        entity.setEnabled(enabled);

        entity = userRepository.save(entity);

        return entity;
    }

    public UserEntity update(String id, String password, String name, Boolean enabled, Boolean locked) {
        var opt = userRepository.findById(id);

        if (opt.isEmpty()) {
            return null;
        }

        UserEntity entity = opt.get();

        if (StringUtils.hasLength(name)) {
            entity.setName(name);
        }

        if (StringUtils.hasLength(password)) {
            entity.setPassword(passwordEncoder.encode(password));
        }

        if (enabled != null) {
            entity.setEnabled(enabled);
        }

        if (locked != null) {
            entity.setLocked(locked);
        }

        return userRepository.save(entity);
    }

    public UserEntity delete(String id) {
        var opt = userRepository.findById(id);

        if (opt.isEmpty()) {
            return null;
        }

        UserEntity entity = opt.get();

        entity.setDeleted(true);
        entity.setDeletedAt(LocalDateTime.now());

        return userRepository.save(entity);
    }

    public Optional<TokenEntity> login(String email, String password) {
        var opt = userRepository.findByEmail(email);

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
