package rover.app.platform.vo;

import rover.app.shared.vo.ViewObject;
import rover.core.platform.entity.UserEntity;

import java.time.LocalDateTime;

public record UserVO(String id,
                     String email,
                     String name,
                     Boolean isEnabled,
                     Boolean isLocked,
                     LocalDateTime createdAt,
                     LocalDateTime updatedAt) implements ViewObject {

    public static UserVO from(UserEntity entity) {
        if (entity == null) {
            return null;
        }

        return new UserVO(entity.getId(),
                entity.getEmail(),
                entity.getName(),
                entity.getEnabled(),
                entity.getLocked(),
                entity.getCreatedAt(),
                entity.getUpdatedAt());
    }
}
