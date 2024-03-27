package rover.core.platform.service;

import org.springframework.stereotype.Service;
import rover.core.platform.repository.RoleRepository;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }
}
