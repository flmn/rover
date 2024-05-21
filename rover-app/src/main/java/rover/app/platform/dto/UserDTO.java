package rover.app.platform.dto;

import rover.app.shared.dto.DataTransferObject;
import rover.core.platform.entity.RoleRef;
import rover.core.platform.entity.UserEntity;

import java.time.LocalDateTime;
import java.util.List;

public record UserDTO(String id,
                      String email,
                      String password,
                      String name,
                      Boolean isEnabled,
                      Boolean isLocked,
                      LocalDateTime lastLoginAt,
                      List<String> roles,
                      LocalDateTime createdAt,
                      LocalDateTime updatedAt) implements DataTransferObject {

    public static UserDTO from(UserEntity entity) {
        if (entity == null) {
            return null;
        }

        List<String> roles = entity.getRoles()
                .stream()
                .map(RoleRef::getRoleId)
                .toList();

        return new UserDTO(entity.getId(),
                entity.getEmail(),
                null,
                entity.getName(),
                entity.getEnabled(),
                entity.getLocked(),
                entity.getLastLoginAt(),
                roles,
                entity.getCreatedAt(),
                entity.getUpdatedAt());
    }
}
