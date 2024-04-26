package rover.app.platform.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rover.app.platform.dto.PrivilegeDTO;
import rover.core.platform.entity.PrivilegeEntity;
import rover.core.platform.service.PrivilegeService;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/platform/privileges")
public class PrivilegesController {
    private final PrivilegeService privilegeService;

    public PrivilegesController(PrivilegeService privilegeService) {
        this.privilegeService = privilegeService;
    }

    @GetMapping
    public List<PrivilegeDTO> list() {
        List<PrivilegeEntity> list = privilegeService.list();
        Map<String, PrivilegeDTO> map = new LinkedHashMap<>();

        for (PrivilegeEntity entity : list) {
            PrivilegeDTO dto = PrivilegeDTO.from(entity);
            map.put(entity.getId(), dto);

            if (entity.getLevel() > 1) {
                PrivilegeDTO parent = map.get(entity.getParent().getId());
                if (parent != null) {
                    parent.children().add(dto);
                }
            }
        }

        return map.values().stream().filter(dto -> dto.level() == 1).toList();
    }
}
