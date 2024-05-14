package rover.core.platform.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;
import rover.core.platform.entity.UserEntity;
import rover.core.shared.constants.PlatformTableNames;
import rover.core.shared.repository.BaseRepository;
import rover.core.shared.repository.CriteriaExecutor;
import rover.core.shared.repository.JdbcSupport;
import rover.core.shared.repository.MoreCriteria;

import java.util.List;
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

    default Page<UserEntity> search(String search, String roleId, Pageable pageable) {
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        String sql = "select %s from " + PlatformTableNames.USER + " u";
        String where = "";
        String other = "";

        if (StringUtils.hasText(roleId)) {
            sql = sql.concat(" join " + PlatformTableNames.ROLE_REF + " ur on u.id = ur.user_id and ur.role_id = :roleId");
            parameters.addValue("roleId", roleId);
        }

        if (StringUtils.hasText(search)) {
            search = "%" + search + "%";
            where = where.concat(" where email like :search or name like :search");
            parameters.addValue("search", search);
        }

        Sort sort = pageable.getSort();
        if (!sort.isEmpty()) {
            Sort.Order order = sort.toList().getFirst();
            other = other.concat(" order by u." + order.getProperty() + " " + order.getDirection());
        }

        other = other.concat(" limit " + pageable.getPageSize() + " offset " + pageable.getOffset());

        long count = (long) jdbcClient()
                .sql(String.format(sql, "count(u.*)"))
                .paramSource(parameters)
                .query()
                .singleValue();

        List<UserEntity> list = jdbcClient()
                .sql(String.format(sql + where + other, "u.*"))
                .paramSource(parameters)
                .query(UserEntity.class)
                .list();

        return new PageImpl<>(list, pageable, count);
    }
}
