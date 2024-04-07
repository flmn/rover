package rover.app.platform.dto;

import rover.app.shared.dto.DataTransferObject;
import rover.core.platform.entity.ConfigEntity;

import java.time.LocalDateTime;

public record ConfigDTO(String id,
                        String name,
                        String value,
                        String description,
                        String createdBy,
                        LocalDateTime createdAt,
                        String updatedBy,
                        LocalDateTime updatedAt) implements DataTransferObject {

    public static ConfigDTO from(ConfigEntity entity) {
        if (entity == null) {
            return null;
        }

        return new ConfigDTO(entity.getId(),
                entity.getName(),
                entity.getValue(),
                entity.getDescription(),
                entity.getCreatedBy(),
                entity.getCreatedAt(),
                entity.getUpdatedBy(),
                entity.getUpdatedAt());
    }
}
