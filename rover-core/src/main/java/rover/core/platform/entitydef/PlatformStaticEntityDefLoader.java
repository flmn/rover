package rover.core.platform.entitydef;

import org.springframework.stereotype.Component;
import rover.ef.entity.domain.EntityDef;
import rover.ef.entity.domain.FieldDef;
import rover.ef.entity.registry.EntityDefLoader;
import rover.ef.util.FieldHelper;

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
        FieldHelper.addId(fields, naturalOrder);

        // CreatedBy, CreatedAt, UpdatedBy, UpdatedAt, IsDeleted, DeletedAt
        FieldHelper.addCreatedBy(fields, ++naturalOrder);
        FieldHelper.addCreatedAt(fields, ++naturalOrder);
        FieldHelper.addUpdatedBy(fields, ++naturalOrder);
        FieldHelper.addUpdatedAt(fields, ++naturalOrder);
        FieldHelper.addIsDeleted(fields, ++naturalOrder);
        FieldHelper.addDeletedBy(fields, ++naturalOrder);
        FieldHelper.addDeletedAt(fields, ++naturalOrder);

        return new EntityDef(PlatformEntities.FILE,
                PlatformEntities.FILE_TABLE,
                "ID",
                "Name",
                fields);
    }
}
