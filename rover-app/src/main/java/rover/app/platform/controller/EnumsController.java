package rover.app.platform.controller;

import org.springframework.web.bind.annotation.*;
import rover.app.platform.dto.EnumDTO;
import rover.app.shared.dto.ListResultDTO;
import rover.app.shared.dto.ListResultMetaDTO;
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
    public ListResultDTO<EnumDTO> list() {
        List<EnumDTO> records = enumService.list()
                .stream()
                .map(EnumDTO::from)
                .toList();

        return new ListResultDTO<>(new ListResultMetaDTO(records.size()), records);
    }

    @PostMapping
    public EnumDTO create(@RequestBody EnumDTO request) {
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

        return EnumDTO.from(entity);
    }

    @GetMapping("/{id}")
    public EnumDTO get(@PathVariable String id) throws Exception {
        return EnumDTO.from(enumService.getById(id));
    }

    @PostMapping("/{id}")
    public EnumDTO update(@PathVariable("id") String id, @RequestBody EnumDTO request) throws Exception {
        return EnumDTO.from(enumService.update(id, request.name(), request.description()));
    }

    @PostMapping("/{id}/members")
    public EnumDTO updateMembers(@PathVariable("id") String id, @RequestBody EnumDTO request) throws Exception {
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

        return EnumDTO.from(entity);
    }

    @DeleteMapping("/{id}")
    public EnumDTO delete(@PathVariable("id") String id) throws Exception {
//        EnumEntity entity = opt.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return EnumDTO.from(enumService.delete(id));
    }
}
