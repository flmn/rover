package rover.app.platform.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rover.app.platform.service.EnumService;

@RestController
@RequestMapping("/api/platform/enums")
public class EnumController {
    private final EnumService enumService;

    public EnumController(EnumService enumService) {
        this.enumService = enumService;
    }

    @GetMapping
    public Object listEnums() {
        return enumService.listEnums();
    }
}
