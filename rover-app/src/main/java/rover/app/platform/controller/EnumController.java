package rover.app.platform.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import rover.ef.enumeration.service.EnumService;

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

    @GetMapping("/{id}")
    public Object getEnum(@PathVariable String id) {
        var opt = enumService.getEnum(id);

        return opt.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/{id}/members")
    public Object listMembers(@PathVariable String id) {
        return enumService.listEnumMembers(id);
    }
}
