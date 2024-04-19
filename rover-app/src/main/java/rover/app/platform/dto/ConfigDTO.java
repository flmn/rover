package rover.app.platform.dto;

import rover.app.shared.dto.DataTransferObject;
import rover.core.platform.entity.ConfigEntity;
import rover.core.platform.entity.ConfigType;

import java.time.LocalDateTime;

public record ConfigDTO(String id,
                        String name,
                        ConfigType type,
                        String typeText,
                        String value,
                        Boolean publicAccess,
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
                entity.getType(),
                name(entity.getType()),
                entity.getValue(),
                entity.getPublicAccess(),
                entity.getDescription(),
                entity.getCreatedBy(),
                entity.getCreatedAt(),
                entity.getUpdatedBy(),
                entity.getUpdatedAt());
    }

    public static ConfigDTO simple(ConfigEntity entity) {
        if (entity == null) {
            return null;
        }

        return new ConfigDTO(entity.getId(),
                null,
                null,
                null,
                entity.getValue(),
                null,
                null,
                null,
                null,
                null,
                null);
    }

    public static String name(ConfigType type) {
        return switch (type) {
            case ENUM -> "枚举值";
            case INTEGER -> "数字";
            case PERCENT -> "百分比";
            case TEXT -> "文字";
            case URL -> "URL";
        };
    }
}
