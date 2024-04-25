package rover.core.platform.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.stereotype.Repository;
import rover.core.platform.entity.RoleEntity;
import rover.core.shared.constants.PlatformTableNames;
import rover.core.shared.repository.BaseRepository;

@Repository
public interface RoleRepository extends BaseRepository<RoleEntity, String> {

    @Query("select count(user_id) from " + PlatformTableNames.ROLE_REF + " where role_id=:roleId")
    int countRoleUsers(String roleId);
}
