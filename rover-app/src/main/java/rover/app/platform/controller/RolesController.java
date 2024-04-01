package rover.app.platform.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rover.app.platform.vo.RoleVO;
import rover.app.shared.vo.ListResultMetaVO;
import rover.app.shared.vo.ListResultVO;
import rover.core.platform.service.RoleService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/platform/roles")
public class RolesController {
    private final RoleService roleService;

    public RolesController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public ListResultVO<RoleVO> listRoles() {
        List<RoleVO> records = roleService.listRoles()
                .stream()
                .map(RoleVO::from)
                .collect(Collectors.toList());

        return new ListResultVO<>(new ListResultMetaVO(records.size()), records);
    }
}
