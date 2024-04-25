package rover.app.platform.dto;

import rover.app.shared.dto.DataTransferObject;
import rover.core.platform.entity.RoleEntity;

import java.time.LocalDateTime;

public record RoleDTO(String id,
                      String name,
                      Integer userCount,
                      LocalDateTime createdAt,
                      LocalDateTime updatedAt) implements DataTransferObject {

    public static RoleDTO from(RoleEntity entity, int userCount) {
        if (entity == null) {
            return null;
        }

        return new RoleDTO(entity.getId(),
                entity.getName(),
                userCount,
                entity.getCreatedAt(),
                entity.getUpdatedAt());
    }

    public static RoleDTO simple(RoleEntity entity) {
        if (entity == null) {
            return null;
        }

        return new RoleDTO(entity.getId(),
                entity.getName(),
                null,
                null,
                null);
    }
}
