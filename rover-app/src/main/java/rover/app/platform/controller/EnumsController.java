package rover.app.platform.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import rover.app.platform.vo.EnumVO;
import rover.app.shared.vo.ListResultMetaVO;
import rover.app.shared.vo.ListResultVO;
import rover.ef.enumeration.entity.EnumEntity;
import rover.ef.enumeration.service.EnumService;

import java.util.List;

@RestController
@RequestMapping("/api/platform/enums")
public class EnumsController {
    private final EnumService enumService;

    public EnumsController(EnumService enumService) {
        this.enumService = enumService;
    }

    @GetMapping
    public ListResultVO<EnumVO> list() {
        List<EnumVO> records = enumService.list()
                .stream()
                .map(EnumVO::from)
                .toList();

        return new ListResultVO<>(new ListResultMetaVO(records.size()), records);
    }

    @PostMapping
    public EnumVO create(@RequestBody EnumVO request) {
        EnumEntity entity = enumService.create(request.id(), request.name(), request.description());

        return EnumVO.from(entity);
    }

    @GetMapping("/{id}")
    public EnumVO get(@PathVariable String id) {
        var opt = enumService.getById(id);

        EnumEntity entity = opt.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return EnumVO.from(entity);
    }

    @PostMapping("/{id}")
    public EnumVO update(@PathVariable("id") String id, @RequestBody EnumVO request) {
        EnumEntity entity = enumService.update(id, request.name(), request.description());

        return EnumVO.from(entity);
    }

    @DeleteMapping("/{id}")
    public EnumVO delete(@PathVariable("id") String id) {
        EnumEntity entity = enumService.delete(id);

        return EnumVO.from(entity);
    }

    @GetMapping("/{id}/members")
    public Object members(@PathVariable String id) {
        return enumService.listEnumMembers(id);
    }
}
