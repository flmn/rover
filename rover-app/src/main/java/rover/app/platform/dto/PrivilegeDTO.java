package rover.app.platform.dto;

import rover.app.shared.dto.DataTransferObject;
import rover.core.platform.entity.PrivilegeEntity;

import java.util.ArrayList;
import java.util.List;

public record PrivilegeDTO(String id,
                           String name,
                           Integer level,
                           List<PrivilegeDTO> children) implements DataTransferObject {

    public static PrivilegeDTO from(PrivilegeEntity entity) {
        if (entity == null) {
            return null;
        }

        return new PrivilegeDTO(entity.getId(),
                entity.getName(),
                entity.getLevel(),
                new ArrayList<>());
    }
}
