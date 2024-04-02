package rover.core.platform.service;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import rover.core.platform.entity.RoleEntity;
import rover.core.platform.repository.RoleRepository;
import rover.ef.util.IdHelper;

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

    public RoleEntity create(String name) {
        RoleEntity entity = new RoleEntity();
        entity.setId(IdHelper.newTsid(RoleEntity.ID_PREFIX));
        entity.setName(name);

        return roleRepository.save(entity);
    }

    public RoleEntity update(String id, String name) {
        var opt = roleRepository.findById(id);

        if (opt.isEmpty()) {
            return null;
        }

        RoleEntity entity = opt.get();

        if (StringUtils.hasText(name)) {
            entity.setName(name);
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
