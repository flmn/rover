package rover.app.platform.service;

import org.springframework.stereotype.Service;
import rover.app.platform.entity.EnumEntity;
import rover.app.platform.repository.EnumMemberRepository;
import rover.app.platform.repository.EnumRepository;

import java.util.List;

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
}
