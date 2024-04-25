package rover.app.platform.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import rover.app.platform.dto.ComboboxItemDTO;
import rover.app.platform.dto.RoleDTO;
import rover.app.shared.config.Constants;
import rover.app.shared.dto.ListResultDTO;
import rover.core.platform.entity.RoleEntity;
import rover.core.platform.service.RoleService;
import rover.core.platform.service.UserService;
import rover.core.shared.exception.NotFoundException;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/platform/roles")
public class RolesController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final RoleService roleService;
    private final UserService userService;

    public RolesController(RoleService roleService,
                           UserService userService) {
        this.roleService = roleService;
        this.userService = userService;
    }

    @GetMapping
    public Object list(@RequestParam(value = "type", required = false) String type) {
        List<RoleEntity> list = roleService.list();

        if ("combobox".equals(type)) {
            return list.stream()
                    .map(entity -> new ComboboxItemDTO(entity.getId(), entity.getName()))
                    .toList();
        }

        List<RoleDTO> items = roleService.list()
                .stream()
                .map(entity -> RoleDTO.from(entity, roleService.countUsers(entity.getId())))
                .toList();

        return new ListResultDTO<>(1, Constants.MAX_PAGE_SIZE, items.size(), items);
    }

    @PostMapping
    public RoleDTO create(@RequestBody RoleDTO request) {
        RoleEntity entity = roleService.create(request.name());

        return RoleDTO.from(entity, roleService.countUsers(entity.getId()));
    }

    @GetMapping("/{id}")
    public RoleDTO get(@PathVariable("id") String id) throws NotFoundException {
        var opt = roleService.getById(id);

        if (opt.isEmpty()) {
            throw new NotFoundException("Can not found role");
        }

        return RoleDTO.from(opt.get(), roleService.countUsers(id));
    }

    @GetMapping("/{id}/users")
    public Object users(@PathVariable("id") String id) throws NotFoundException {
        return Collections.emptyList(); // todo
    }

    @PostMapping("/{id}")
    public RoleDTO update(@PathVariable("id") String id,
                          @RequestBody RoleDTO request) {
        RoleEntity entity = roleService.update(id, request.name());

        return RoleDTO.from(entity, roleService.countUsers(id));
    }

    @DeleteMapping("/{id}")
    public RoleDTO delete(@PathVariable("id") String id) {
        RoleEntity entity = roleService.delete(id);

        return RoleDTO.from(entity, roleService.countUsers(id));
    }
}
