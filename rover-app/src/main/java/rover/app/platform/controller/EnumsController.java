package rover.app.platform.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import rover.app.platform.vo.EnumVO;
import rover.app.shared.vo.ListResultMetaVO;
import rover.app.shared.vo.ListResultVO;
import rover.ef.enumeration.service.EnumService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/platform/enums")
public class EnumsController {
    private final EnumService enumService;

    public EnumsController(EnumService enumService) {
        this.enumService = enumService;
    }

    @GetMapping
    public ListResultVO<EnumVO> listEnums() {
        List<EnumVO> records = enumService.listEnums()
                .stream()
                .map(EnumVO::from)
                .collect(Collectors.toList());

        return new ListResultVO<>(new ListResultMetaVO(records.size()), records);
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
