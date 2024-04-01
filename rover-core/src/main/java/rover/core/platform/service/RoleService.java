package rover.core.platform.service;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import rover.core.platform.entity.RoleEntity;
import rover.core.platform.repository.RoleRepository;
import rover.core.shared.util.IdUtils;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<RoleEntity> listRoles() {
        return roleRepository.findAll(Sort.by("name"));
    }

    public Optional<RoleEntity> create(String name) {
        RoleEntity entity = new RoleEntity();
        entity.setId(IdUtils.newTsid(RoleEntity.ID_PREFIX));
        entity.setName(name);

        entity = roleRepository.save(entity);

        return Optional.of(entity);
    }
}
