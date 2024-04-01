package rover.app.platform.vo;

import rover.app.shared.vo.ViewObject;
import rover.ef.enumeration.entity.EnumEntity;

import java.time.LocalDateTime;

public record EnumVO(String id,
                     String name,
                     String description,
                     LocalDateTime createdAt,
                     LocalDateTime updatedAt) implements ViewObject {

    public static EnumVO from(EnumEntity entity) {
        if (entity == null) {
            return null;
        }

        return new EnumVO(entity.getId(),
                entity.getName(),
                entity.getDescription(),
                entity.getCreatedAt(),
                entity.getUpdatedAt());
    }
}
