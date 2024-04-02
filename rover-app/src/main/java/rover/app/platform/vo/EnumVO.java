package rover.app.platform.vo;

import rover.app.shared.vo.ViewObject;
import rover.ef.enumeration.entity.EnumEntity;

import java.time.LocalDateTime;
import java.util.List;

public record EnumVO(String id,
                     String name,
                     String description,
                     LocalDateTime createdAt,
                     LocalDateTime updatedAt,
                     List<EnumMemberVO> members) implements ViewObject {

    public static EnumVO from(EnumEntity entity) {
        if (entity == null) {
            return null;
        }

        List<EnumMemberVO> members = entity.getMembers() != null ?
                entity.getMembers()
                        .stream()
                        .map(EnumMemberVO::from)
                        .toList() : null;

        return new EnumVO(entity.getId(),
                entity.getName(),
                entity.getDescription(),
                entity.getCreatedAt(),
                entity.getUpdatedAt(),
                members);
    }
}
