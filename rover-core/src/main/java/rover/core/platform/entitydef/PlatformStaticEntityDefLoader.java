package rover.core.platform.entitydef;

import org.springframework.stereotype.Component;
import rover.ef.entity.domain.EntityDef;
import rover.ef.entity.domain.FieldDef;
import rover.ef.entity.registry.EntityDefLoader;
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
        int naturalOrder = 0;

        // ID
        FieldUtils.addId(fields, naturalOrder);

        // CreatedAt, UpdatedAt, IsDeleted, DeletedAt
        FieldUtils.addCreatedAt(fields, ++naturalOrder);
        FieldUtils.addUpdatedAt(fields, ++naturalOrder);
        FieldUtils.addIsDeleted(fields, ++naturalOrder);
        FieldUtils.addDeletedAt(fields, ++naturalOrder);

        return new EntityDef(PlatformEntities.FILE,
                PlatformEntities.FILE_TABLE,
                "ID",
                "Name",
                fields);
    }
}
