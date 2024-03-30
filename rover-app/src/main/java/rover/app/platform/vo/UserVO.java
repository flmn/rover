package rover.app.platform.vo;

import rover.app.shared.vo.ViewObject;
import rover.core.platform.entity.UserEntity;

import java.time.LocalDateTime;

public record UserVO(String id,
                     String email,
                     Boolean isEnabled,
                     Boolean isLocked,
                     LocalDateTime createdAt,
                     LocalDateTime updatedAt) implements ViewObject {

    public static UserVO from(UserEntity entity) {
        return new UserVO(entity.getId(),
                entity.getEmail(),
                entity.getEnabled(),
                entity.getLocked(),
                entity.getCreatedAt(),
                entity.getUpdatedAt());
    }
}
