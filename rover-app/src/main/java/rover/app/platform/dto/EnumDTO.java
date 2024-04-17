package rover.app.platform.dto;

import rover.app.shared.dto.DataTransferObject;
import rover.core.platform.entity.EnumEntity;

import java.time.LocalDateTime;
import java.util.List;

public record EnumDTO(String id,
                      String name,
                      String description,
                      LocalDateTime createdAt,
                      LocalDateTime updatedAt,
                      List<EnumMemberDTO> members) implements DataTransferObject {

    public static EnumDTO from(EnumEntity entity) {
        if (entity == null) {
            return null;
        }

        List<EnumMemberDTO> members = entity.getMembers()
                .stream()
                .map(EnumMemberDTO::from)
                .toList();

        return new EnumDTO(entity.getId(),
                entity.getName(),
                entity.getDescription(),
                entity.getCreatedAt(),
                entity.getUpdatedAt(),
                members);
    }
}
