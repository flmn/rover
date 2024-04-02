package rover.app.platform.vo;

import rover.app.shared.vo.ViewObject;
import rover.ef.enumeration.entity.EnumMemberEntity;

import java.time.LocalDateTime;

public record EnumMemberVO(String id,
                           String enumId,
                           String label,
                           String value,
                           Integer displayOrder,
                           Boolean isDefault,
                           LocalDateTime createdAt,
                           LocalDateTime updatedAt) implements ViewObject {

    public static EnumMemberVO from(EnumMemberEntity entity) {
        if (entity == null) {
            return null;
        }

        return new EnumMemberVO(entity.getId(),
                entity.getEnumId(),
                entity.getLabel(),
                entity.getValue(),
                entity.getDisplayOrder(),
                entity.getDefault(),
                entity.getCreatedAt(),
                entity.getUpdatedAt());
    }
}
