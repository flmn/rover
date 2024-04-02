package rover.ef.enumeration.service;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import rover.ef.enumeration.entity.EnumEntity;
import rover.ef.enumeration.entity.EnumMemberEntity;
import rover.ef.enumeration.repository.EnumMemberRepository;
import rover.ef.enumeration.repository.EnumRepository;
import rover.ef.util.StringHelper;

import java.util.List;
import java.util.Optional;

@Service
public class EnumService {
    private final EnumRepository enumRepository;
    private final EnumMemberRepository enumMemberRepository;

    public EnumService(EnumRepository enumRepository, EnumMemberRepository enumMemberRepository) {
        this.enumRepository = enumRepository;
        this.enumMemberRepository = enumMemberRepository;
    }

    public List<EnumEntity> list() {
        return enumRepository.findAll();
    }

    public Optional<EnumEntity> getById(String id) {
        var opt = enumRepository.findById(id);

        if (opt.isEmpty()) {
            return opt;
        }

        opt.get().setMembers(listEnumMembers(id));

        return opt;
    }

    public EnumEntity create(String id, String name, String description) {
        EnumEntity entity = new EnumEntity();
        entity.setId(id);
        entity.setName(name);
        entity.setDescription(StringHelper.nullToEmpty(description));

        return enumRepository.save(entity);
    }

    public EnumEntity update(String id, String name, String description) {
        var opt = enumRepository.findById(id);

        if (opt.isEmpty()) {
            return null;
        }

        EnumEntity entity = opt.get();

        if (StringUtils.hasLength(name)) {
            entity.setName(name);
        }

        if (StringUtils.hasLength(description)) {
            entity.setDescription(description);
        }

        return enumRepository.save(entity);
    }

    public EnumEntity delete(String id) {
        var opt = enumRepository.findById(id);

        if (opt.isEmpty()) {
            return null;
        }

        EnumEntity entity = opt.get();

        enumRepository.delete(entity);

        return entity;
    }

    public List<EnumMemberEntity> listEnumMembers(String enumId) {
        return enumMemberRepository.findByEnumId(enumId);
    }
}
