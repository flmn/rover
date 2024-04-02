package rover.app.platform.dto;

import rover.app.shared.dto.DataTransferObject;
import rover.core.platform.entity.UserEntity;

import java.time.LocalDateTime;

public record UserDTO(String id,
                      String email,
                      String password,
                      String name,
                      Boolean isEnabled,
                      Boolean isLocked,
                      LocalDateTime createdAt,
                      LocalDateTime updatedAt) implements DataTransferObject {

    public static UserDTO from(UserEntity entity) {
        if (entity == null) {
            return null;
        }

        return new UserDTO(entity.getId(),
                entity.getEmail(),
                null,
                entity.getName(),
                entity.getEnabled(),
                entity.getLocked(),
                entity.getCreatedAt(),
                entity.getUpdatedAt());
    }
}
