package rover.app.platform.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import rover.app.platform.vo.RoleVO;
import rover.app.shared.vo.ListResultMetaVO;
import rover.app.shared.vo.ListResultVO;
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
    public ListResultVO<RoleVO> list() {
        List<RoleVO> records = roleService.list()
                .stream()
                .map(RoleVO::from)
                .toList();

        return new ListResultVO<>(new ListResultMetaVO(records.size()), records);
    }

    @PostMapping
    public RoleVO create(@RequestBody RoleVO request) {
        RoleEntity entity = roleService.create(request.name());

        return RoleVO.from(entity);
    }

    @GetMapping("/{id}")
    public RoleVO get(@PathVariable("id") String id) {
        var opt = roleService.getById(id);

        RoleEntity entity = opt.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return RoleVO.from(entity);
    }

    @PostMapping("/{id}")
    public RoleVO update(@PathVariable("id") String id, @RequestBody RoleVO request) {
        RoleEntity entity = roleService.update(id, request.name());

        return RoleVO.from(entity);
    }

    @DeleteMapping("/{id}")
    public RoleVO delete(@PathVariable("id") String id) {
        RoleEntity entity = roleService.delete(id);

        return RoleVO.from(entity);
    }
}
