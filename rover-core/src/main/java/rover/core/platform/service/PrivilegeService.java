package rover.core.platform.service;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import rover.core.platform.entity.PrivilegeEntity;
import rover.core.platform.repository.PrivilegeRepository;

import java.util.List;

@Service
public class PrivilegeService {
    private final PrivilegeRepository privilegeRepository;

    public PrivilegeService(PrivilegeRepository privilegeRepository) {
        this.privilegeRepository = privilegeRepository;
    }

    public List<PrivilegeEntity> list() {
        return privilegeRepository.findAll(Sort.by("level"));
    }
}
