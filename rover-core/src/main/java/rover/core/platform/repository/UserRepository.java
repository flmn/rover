package rover.core.platform.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import rover.core.platform.entity.UserEntity;
import rover.core.shared.repository.BaseRepository;

import java.util.Optional;

@Repository
public interface UserRepository extends BaseRepository<UserEntity, String> {

    Optional<UserEntity> findByEmail(String email);

    Page<UserEntity> findByEmailLikeIgnoreCaseOrNameLikeIgnoreCase(String email, String name, Pageable pageable);
}
