package rover.app.platform.vo;

import rover.app.shared.vo.ViewObject;
import rover.core.platform.entity.RoleEntity;

import java.time.LocalDateTime;

public record RoleVO(String id,
                     String name,
                     LocalDateTime createdAt,
                     LocalDateTime updatedAt) implements ViewObject {

    public static RoleVO from(RoleEntity entity) {
        return new RoleVO(entity.getId(),
                entity.getName(),
                entity.getCreatedAt(),
                entity.getUpdatedAt());
    }
}
