package rover.core.platform.service;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import rover.core.platform.entity.DataPermission;
import rover.core.platform.entity.RoleEntity;
import rover.core.platform.repository.RoleRepository;
import rover.core.shared.util.IdHelper;
import rover.core.shared.util.NullHelper;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<RoleEntity> list() {
        return roleRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public Optional<RoleEntity> getById(String id) {
        return roleRepository.findById(id);
    }

    public List<RoleEntity> getAllByIds(List<String> ids) {
        return roleRepository.findAllById(ids);
    }

    public int countUsers(String id) {
        return roleRepository.countRoleUsers(id);
    }

    public RoleEntity create(String name, String description) {
        RoleEntity entity = new RoleEntity();
        entity.setId(IdHelper.newTsid(RoleEntity.ID_PREFIX));
        entity.setName(name);
        entity.setDescription(NullHelper.nullToEmpty(description));
        entity.setDataPermission(DataPermission.ALL);

        return roleRepository.save(entity);
    }

    public RoleEntity update(String id, String name, String description, List<String> privileges) {
        var opt = roleRepository.findById(id);

        if (opt.isEmpty()) {
            return null;
        }

        RoleEntity entity = opt.get();

        if (StringUtils.hasText(name)) {
            entity.setName(name);
        }

        if (description != null) {
            entity.setDescription(description);
        }

        if (privileges != null) {
            entity.setPrivileges(privileges);
        }

        return roleRepository.save(entity);
    }

    public RoleEntity delete(String id) {
        var opt = roleRepository.findById(id);

        if (opt.isEmpty()) {
            return null;
        }

        RoleEntity entity = opt.get();

        roleRepository.delete(entity);

        return entity;
    }
}
