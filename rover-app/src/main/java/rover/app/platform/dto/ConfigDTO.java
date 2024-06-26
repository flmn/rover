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
                        Boolean readonly,
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
                entity.getReadonly(),
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
                null,
                null);
    }

    public static String name(ConfigType type) {
        return switch (type) {
            case BOOLEAN -> "布尔";
            case COLOR -> "颜色";
            case DATE -> "日期";
            case ENUM -> "枚举值";
            case INTEGER -> "数字";
            case JSON -> "JSON";
            case PERCENT -> "百分比";
            case TEXT -> "文字";
            case TIME -> "时间";
            case URL -> "URL";
        };
    }
}
