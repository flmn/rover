package rover.app.platform.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import rover.app.platform.dto.UserDTO;
import rover.app.shared.dto.ListResultDTO;
import rover.core.platform.auth.RoverUserDetails;
import rover.core.platform.entity.RoleRef;
import rover.core.platform.entity.UserEntity;
import rover.core.platform.service.RoleService;
import rover.core.platform.service.UserService;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/platform/users")
public class UsersController {
    private final UserService userService;
    private final RoleService roleService;

    public UsersController(UserService userService,
                           RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public ListResultDTO<UserDTO> list(@RequestParam(value = "search", required = false) String search,
                                       @RequestParam(value = "pageNumber", required = false, defaultValue = "0") int pageNumber,
                                       @RequestParam(value = "pageSize", required = false, defaultValue = "10") int pageSize,
                                       @RequestParam(value = "sort", required = false, defaultValue = "id") String sort,
                                       @RequestParam(value = "desc", required = false, defaultValue = "false") boolean desc) {
        Sort.Direction direction = desc ? Sort.Direction.DESC : Sort.Direction.ASC;

        Page<UserEntity> page = userService.list(search, pageNumber, pageSize, sort, direction);

        List<UserDTO> items = page.stream()
                .map(entity -> UserDTO.from(entity, Collections.emptyList()))
                .toList();

        return new ListResultDTO<>(pageNumber, pageSize, items.size(), items);
    }

    @PostMapping
    public UserDTO create(@RequestBody UserDTO request) {
        UserEntity entity = userService.create(request.email(),
                request.password(),
                request.name(),
                request.isEnabled());

        return toDTO(entity);
    }

    @GetMapping("/{id}")
    public UserDTO get(@PathVariable("id") String id) {
        var opt = userService.getById(id);

        UserEntity entity = opt.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return toDTO(entity);
    }

    @PostMapping("/{id}")
    public UserDTO update(@PathVariable("id") String id,
                          @RequestBody UserDTO request) {
        UserEntity entity = userService.update(id,
                request.password(),
                request.name(),
                request.isEnabled(),
                request.isLocked());

        return toDTO(entity);
    }

    @DeleteMapping("/{id}")
    public UserDTO delete(@PathVariable("id") String id,
                          @AuthenticationPrincipal RoverUserDetails user) {
        UserEntity entity = userService.delete(id);

        return toDTO(entity);
    }

    private UserDTO toDTO(UserEntity entity) {
        List<String> roleIds = entity.getRoles().stream().map(RoleRef::getRoleId).toList();

        return UserDTO.from(entity, roleService.getAllByIds(roleIds));
    }
}
