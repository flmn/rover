package rover.ef.enumeration.service;

import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import rover.ef.enumeration.entity.EnumEntity;
import rover.ef.enumeration.entity.EnumMember;
import rover.ef.enumeration.repository.EnumRepository;
import rover.ef.exception.NotFoundException;
import rover.ef.util.NullHelper;

import java.util.List;

@Service
@CacheConfig(cacheNames = "enums")
public class EnumService {
    private final EnumRepository enumRepository;

    public EnumService(EnumRepository enumRepository) {
        this.enumRepository = enumRepository;
    }

    public List<EnumEntity> list() {
        return enumRepository.findAll(Sort.by("id"));
    }

    @Cacheable(key = "#id")
    public EnumEntity getById(String id) throws NotFoundException {
        return get(id);
    }

    @Cacheable(key = "#id")
    public EnumEntity create(String id,
                             String name,
                             String description,
                             List<EnumMember> members) {
        EnumEntity entity = new EnumEntity();
        entity.setId(id);
        entity.setName(name);
        entity.setDescription(NullHelper.nullToEmpty(description));
        entity.setMembers(members);

        return enumRepository.save(entity);
    }

    @CacheEvict(key = "#result.id")
    public EnumEntity update(String id, String name, String description) throws NotFoundException {
        var opt = enumRepository.findById(id);

        if (opt.isEmpty()) {
            throw new NotFoundException("Can not found Enum");
        }

        EnumEntity entity = opt.get();

        if (StringUtils.hasText(name)) {
            entity.setName(name);
        }

        if (description != null) {
            entity.setDescription(description);
        }

        return enumRepository.save(entity);
    }

    @CacheEvict(key = "#result.id")
    public EnumEntity updateMembers(String id, List<EnumMember> members) throws NotFoundException {
        var opt = enumRepository.findById(id);

        if (opt.isEmpty()) {
            throw new NotFoundException("Can not found Enum");
        }

        EnumEntity entity = opt.get();

        entity.setMembers(members);

        enumRepository.save(entity);

        return get(id);
    }

    @CacheEvict(key = "#id")
    public EnumEntity delete(String id) throws NotFoundException {
        var opt = enumRepository.findById(id);

        if (opt.isEmpty()) {
            throw new NotFoundException("Can not found Enum");
        }

        EnumEntity entity = opt.get();

        enumRepository.delete(entity);

        return entity;
    }

    private EnumEntity get(String id) throws NotFoundException {
        var opt = enumRepository.findById(id);

        if (opt.isEmpty()) {
            throw new NotFoundException("Can not found Enum");
        }

        return opt.get();
    }
}
