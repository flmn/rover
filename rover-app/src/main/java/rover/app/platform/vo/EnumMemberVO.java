package rover.app.platform.vo;

import rover.app.shared.vo.ViewObject;
import rover.ef.enumeration.entity.EnumMember;

public record EnumMemberVO(String value,
                           String label,
                           Integer displayOrder,
                           Boolean isDefault) implements ViewObject {

    public static EnumMemberVO from(EnumMember entity) {
        if (entity == null) {
            return null;
        }

        return new EnumMemberVO(entity.getValue(),
                entity.getLabel(),
                entity.getDisplayOrder(),
                entity.getDefault());
    }
}
