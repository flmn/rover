package rover.app.platform.controller;

import org.springframework.web.bind.annotation.*;
import rover.app.platform.vo.EnumVO;
import rover.app.shared.vo.ListResultMetaVO;
import rover.app.shared.vo.ListResultVO;
import rover.ef.enumeration.entity.EnumEntity;
import rover.ef.enumeration.entity.EnumMember;
import rover.ef.enumeration.service.EnumService;
import rover.ef.util.NullHelper;

import java.util.Collections;
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
        List<EnumMember> members;
        if (request.members() == null || request.members().isEmpty()) {
            members = Collections.emptyList();
        } else {
            members = request.members()
                    .stream()
                    .map(dto -> {
                        EnumMember m = new EnumMember();
                        m.setLabel(dto.label());
                        m.setValue(dto.value());
                        m.setDefault(NullHelper.nullToFalse(dto.isDefault()));

                        return m;
                    })
                    .toList();
        }

        EnumEntity entity = enumService.create(request.id(), request.name(), request.description(), members);

        return EnumVO.from(entity);
    }

    @GetMapping("/{id}")
    public EnumVO get(@PathVariable String id) throws Exception {
        return EnumVO.from(enumService.getById(id));
    }

    @PostMapping("/{id}")
    public EnumVO update(@PathVariable("id") String id, @RequestBody EnumVO request) throws Exception {
        return EnumVO.from(enumService.update(id, request.name(), request.description()));
    }

    @PostMapping("/{id}/members")
    public EnumVO updateMembers(@PathVariable("id") String id, @RequestBody EnumVO request) throws Exception {
        if (request.members() == null) {
            return null; // todo
        }
        List<EnumMember> members = request.members()
                .stream()
                .map(dto -> {
                    EnumMember m = new EnumMember();
                    m.setLabel(dto.label());
                    m.setValue(dto.value());
                    m.setDefault(NullHelper.nullToFalse(dto.isDefault()));

                    return m;
                })
                .toList();


        EnumEntity entity = enumService.updateMembers(id, members);

        return EnumVO.from(entity);
    }

    @DeleteMapping("/{id}")
    public EnumVO delete(@PathVariable("id") String id) throws Exception {
//        EnumEntity entity = opt.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return EnumVO.from(enumService.delete(id));
    }
}
