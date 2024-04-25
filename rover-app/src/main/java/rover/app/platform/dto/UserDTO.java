package rover.app.platform.dto;

import rover.app.shared.dto.DataTransferObject;
import rover.core.platform.entity.RoleEntity;
import rover.core.platform.entity.UserEntity;

import java.time.LocalDateTime;
import java.util.List;

public record UserDTO(String id,
                      String email,
                      String password,
                      String name,
                      Boolean isEnabled,
                      Boolean isLocked,
                      List<RoleDTO> roles,
                      LocalDateTime createdAt,
                      LocalDateTime updatedAt) implements DataTransferObject {

    public static UserDTO from(UserEntity entity, List<RoleEntity> roles) {
        if (entity == null) {
            return null;
        }

        return new UserDTO(entity.getId(),
                entity.getEmail(),
                null,
                entity.getName(),
                entity.getEnabled(),
                entity.getLocked(),
                roles.stream().map(RoleDTO::simple).toList(),
                entity.getCreatedAt(),
                entity.getUpdatedAt());
    }
}
