package rover.ef.enumeration.service;

import org.springframework.stereotype.Service;
import rover.ef.enumeration.entity.EnumEntity;
import rover.ef.enumeration.repository.EnumMemberRepository;
import rover.ef.enumeration.repository.EnumRepository;

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

    public List<EnumEntity> listEnums() {
        return enumRepository.findAll();
    }

    public Optional<EnumEntity> getEnum(String id) {
        return enumRepository.findById(id);
    }
}
