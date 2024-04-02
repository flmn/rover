package rover.app.platform.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import rover.app.platform.vo.UserVO;
import rover.app.shared.vo.ListResultMetaVO;
import rover.app.shared.vo.ListResultVO;
import rover.core.platform.entity.UserEntity;
import rover.core.platform.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/platform/users")
public class UsersController {
    private final UserService userService;

    public UsersController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ListResultVO<UserVO> list(@RequestParam(value = "search", required = false) String search,
                                     @RequestParam(value = "pageNumber", required = false, defaultValue = "0") int pageNumber,
                                     @RequestParam(value = "pageSize", required = false, defaultValue = "10") int pageSize,
                                     @RequestParam(value = "sort", required = false, defaultValue = "id") String sort,
                                     @RequestParam(value = "desc", required = false, defaultValue = "false") boolean desc) {
        Sort.Direction direction = desc ? Sort.Direction.DESC : Sort.Direction.ASC;

        Page<UserEntity> page = userService.list(search, pageNumber, pageSize, sort, direction);

        List<UserVO> records = page.stream()
                .map(UserVO::from)
                .toList();

        return new ListResultVO<>(new ListResultMetaVO(page.getTotalElements()), records);
    }

    @PostMapping
    public UserVO create(@RequestBody UserVO request) {
        UserEntity entity = userService.create(request.email(), request.password(), request.name(), request.isEnabled());

        return UserVO.from(entity);
    }

    @GetMapping("/{id}")
    public UserVO get(@PathVariable("id") String id) {
        var opt = userService.getById(id);

        UserEntity entity = opt.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return UserVO.from(entity);
    }

    @PostMapping("/{id}")
    public UserVO update(@PathVariable("id") String id, @RequestBody UserVO request) {
        UserEntity entity = userService.update(id, request.password(), request.name(), request.isEnabled(), request.isLocked());

        return UserVO.from(entity);
    }

    @DeleteMapping("/{id}")
    public UserVO delete(@PathVariable("id") String id) {
        UserEntity entity = userService.delete(id);

        return UserVO.from(entity);
    }
}
