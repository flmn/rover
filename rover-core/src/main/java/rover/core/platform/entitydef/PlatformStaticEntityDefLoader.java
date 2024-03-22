package rover.core.platform.entitydef;

import org.springframework.stereotype.Component;
import rover.ef.domain.EntityDef;
import rover.ef.domain.FieldDef;
import rover.ef.registry.EntityDefLoader;
import rover.ef.util.FieldUtils;

import java.util.LinkedHashMap;
import java.util.List;

@Component
public class PlatformStaticEntityDefLoader implements EntityDefLoader {

    @Override
    public List<EntityDef> loadEntityDefs() {
        return List.of(file());
    }

    private EntityDef file() {
        var fields = new LinkedHashMap<String, FieldDef>();
        int displayOrder = 0;

        // ID
        FieldUtils.addId(fields, displayOrder);

        // CreatedAt, UpdatedAt, IsDeleted, DeletedAt
        FieldUtils.addCreatedAt(fields, ++displayOrder);
        FieldUtils.addUpdatedAt(fields, ++displayOrder);
        FieldUtils.addIsDeleted(fields, ++displayOrder);
        FieldUtils.addDeletedAt(fields, ++displayOrder);

        return new EntityDef(PlatformEntities.FILE,
                PlatformEntities.FILE_TABLE,
                "ID",
                "Name",
                fields);
    }
}
