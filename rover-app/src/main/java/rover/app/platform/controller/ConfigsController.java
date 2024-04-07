package rover.app.platform.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import rover.app.platform.dto.ConfigDTO;
import rover.app.shared.dto.ListResultDTO;
import rover.app.shared.dto.ListResultMetaDTO;
import rover.core.platform.auth.RoverUserDetails;
import rover.core.platform.entity.ConfigEntity;
import rover.core.platform.service.ConfigService;

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
        List<ConfigDTO> records = configService.list()
                .stream()
                .map(ConfigDTO::from)
                .toList();

        return new ListResultDTO<>(new ListResultMetaDTO(records.size()), records);
    }

    @PostMapping("/{id}")
    public ConfigDTO update(@PathVariable("id") String id,
                            @RequestBody ConfigDTO request,
                            @AuthenticationPrincipal RoverUserDetails user) {
        ConfigEntity entity = configService.update(id, request.value(), user.getUserId());

        return ConfigDTO.from(entity);
    }
}
