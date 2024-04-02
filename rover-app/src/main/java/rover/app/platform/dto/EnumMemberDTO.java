package rover.app.platform.dto;

import rover.app.shared.dto.DataTransferObject;
import rover.ef.enumeration.entity.EnumMember;

public record EnumMemberDTO(String value,
                            String label,
                            Integer displayOrder,
                            Boolean isDefault) implements DataTransferObject {

    public static EnumMemberDTO from(EnumMember entity) {
        if (entity == null) {
            return null;
        }

        return new EnumMemberDTO(entity.getValue(),
                entity.getLabel(),
                entity.getDisplayOrder(),
                entity.getDefault());
    }
}
