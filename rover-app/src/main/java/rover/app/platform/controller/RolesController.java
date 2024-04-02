package rover.app.platform.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import rover.app.platform.dto.RoleDTO;
import rover.app.shared.dto.ListResultDTO;
import rover.app.shared.dto.ListResultMetaDTO;
import rover.core.platform.entity.RoleEntity;
import rover.core.platform.service.RoleService;

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
        List<RoleDTO> records = roleService.list()
                .stream()
                .map(RoleDTO::from)
                .toList();

        return new ListResultDTO<>(new ListResultMetaDTO(records.size()), records);
    }

    @PostMapping
    public RoleDTO create(@RequestBody RoleDTO request) {
        RoleEntity entity = roleService.create(request.name());

        return RoleDTO.from(entity);
    }

    @GetMapping("/{id}")
    public RoleDTO get(@PathVariable("id") String id) {
        var opt = roleService.getById(id);

        RoleEntity entity = opt.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return RoleDTO.from(entity);
    }

    @PostMapping("/{id}")
    public RoleDTO update(@PathVariable("id") String id, @RequestBody RoleDTO request) {
        RoleEntity entity = roleService.update(id, request.name());

        return RoleDTO.from(entity);
    }

    @DeleteMapping("/{id}")
    public RoleDTO delete(@PathVariable("id") String id) {
        RoleEntity entity = roleService.delete(id);

        return RoleDTO.from(entity);
    }
}
