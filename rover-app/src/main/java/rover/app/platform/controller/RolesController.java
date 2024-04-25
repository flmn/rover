package rover.app.platform.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import rover.app.platform.dto.RoleDTO;
import rover.app.shared.config.Constants;
import rover.app.shared.dto.ListResultDTO;
import rover.core.platform.entity.RoleEntity;
import rover.core.platform.service.RoleService;
import rover.core.shared.exception.NotFoundException;

import java.util.List;

@RestController
@RequestMapping("/api/platform/roles")
public class RolesController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final RoleService roleService;

    public RolesController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public ListResultDTO<RoleDTO> list() {
        List<RoleDTO> items = roleService.list()
                .stream()
                .map(entity -> RoleDTO.from(entity, 0))
                .toList();

        return new ListResultDTO<>(1, Constants.MAX_PAGE_SIZE, items.size(), items);
    }

    @PostMapping
    public RoleDTO create(@RequestBody RoleDTO request) {
        RoleEntity entity = roleService.create(request.name());

        return RoleDTO.from(entity, 0);
    }

    @GetMapping("/{id}")
    public RoleDTO get(@PathVariable("id") String id) throws NotFoundException {
        var opt = roleService.getById(id);

        if (opt.isEmpty()) {
            throw new NotFoundException("Can not found role");
        }

        return RoleDTO.from(opt.get(), 0);
    }

    @PostMapping("/{id}")
    public RoleDTO update(@PathVariable("id") String id,
                          @RequestBody RoleDTO request) {
        RoleEntity entity = roleService.update(id, request.name());

        return RoleDTO.from(entity, 0);
    }

    @DeleteMapping("/{id}")
    public RoleDTO delete(@PathVariable("id") String id) {
        RoleEntity entity = roleService.delete(id);

        return RoleDTO.from(entity, 0);
    }
}
