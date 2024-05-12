package rover.core.platform.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.stereotype.Repository;
import rover.core.platform.entity.UserEntity;
import rover.core.shared.repository.BaseRepository;
import rover.core.shared.repository.CriteriaExecutor;
import rover.core.shared.repository.JdbcSupport;
import rover.core.shared.repository.MoreCriteria;

import java.util.Optional;

@Repository
public interface UserRepository extends BaseRepository<UserEntity, String>,
        CriteriaExecutor<UserEntity>,
        JdbcSupport {

    Optional<UserEntity> findByEmail(String email);

    default Page<UserEntity> search(String search, Pageable pageable) {
        Criteria criteria = Criteria.from(MoreCriteria.like("email", search))
                .or(MoreCriteria.like("name", search));

        return findAll(criteria, pageable);
    }
}
