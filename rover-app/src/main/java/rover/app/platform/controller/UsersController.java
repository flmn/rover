package rover.app.platform.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import rover.app.platform.vo.UserVO;
import rover.app.shared.vo.ListResultMetaVO;
import rover.app.shared.vo.ListResultVO;
import rover.core.platform.entity.UserEntity;
import rover.core.platform.service.UserService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/platform/users")
public class UsersController {
    private final UserService userService;

    public UsersController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ListResultVO<UserVO> listUsers(@RequestParam(value = "search", required = false) String search,
                                          @RequestParam(value = "pageNumber", required = false, defaultValue = "0") int pageNumber,
                                          @RequestParam(value = "pageSize", required = false, defaultValue = "10") int pageSize,
                                          @RequestParam(value = "sort", required = false, defaultValue = "id") String sort,
                                          @RequestParam(value = "desc", required = false, defaultValue = "false") boolean desc) {
        Sort.Direction direction = desc ? Sort.Direction.DESC : Sort.Direction.ASC;

        Page<UserEntity> page = userService.listUsers(search, pageNumber, pageSize, sort, direction);

        List<UserVO> records = page.stream()
                .map(UserVO::from)
                .collect(Collectors.toList());

        return new ListResultVO<>(new ListResultMetaVO(page.getTotalElements()), records);
    }
}
