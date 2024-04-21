package rover.app.platform.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import rover.app.platform.dto.ConfigDTO;
import rover.app.shared.config.Constants;
import rover.app.shared.dto.ListResultDTO;
import rover.core.platform.auth.RoverUserDetails;
import rover.core.platform.entity.ConfigEntity;
import rover.core.platform.service.ConfigService;
import rover.core.shared.exception.NotFoundException;

import java.util.List;

@RestController
@RequestMapping("/api/platform/configs")
public class ConfigsController {
    private final ConfigService configService;

    public ConfigsController(ConfigService configService) {
        this.configService = configService;
    }

    @GetMapping
    public ListResultDTO<ConfigDTO> list() {
        List<ConfigDTO> items = configService.list(false)
                .stream()
                .map(ConfigDTO::from)
                .toList();

        return new ListResultDTO<>(1, Constants.MAX_PAGE_SIZE, items.size(), items);
    }

    @GetMapping("/{id}")
    public ConfigDTO get(@PathVariable String id) throws NotFoundException {
        var opt = configService.get(id);

        if (opt.isEmpty() || !opt.get().getPublicAccess()) {
            throw new NotFoundException("Can not found config");
        }

        return ConfigDTO.from(opt.get());
    }

    @PostMapping("/{id}")
    public ConfigDTO update(@PathVariable("id") String id,
                            @RequestBody ConfigDTO request,
                            @AuthenticationPrincipal RoverUserDetails user) {
        ConfigEntity entity = configService.update(id, request.value(), user.getUserId());

        return ConfigDTO.from(entity);
    }
}
