package rover.core.features.fleet.entitydef;

import org.springframework.stereotype.Component;
import rover.ef.domain.DataType;
import rover.ef.domain.EntityDef;
import rover.ef.domain.FieldDef;
import rover.ef.registry.EntityDefLoader;
import rover.ef.util.FieldUtils;

import java.util.LinkedHashMap;
import java.util.List;

@Component
public class FleetStaticEntityDefLoader implements EntityDefLoader {

    @Override
    public List<EntityDef> loadEntityDefs() {
        return List.of(airline());
    }

    private EntityDef airline() {
        var fields = new LinkedHashMap<String, FieldDef>();
        int displayOrder = 0;

        // ID
        FieldUtils.addId(fields, displayOrder);

        // Code
        {
            var code = new FieldDef("Code",
                    "code",
                    DataType.STRING_SHORT,
                    4,
                    0,
                    "",
                    false,
                    true,
                    ++displayOrder);
            fields.put(code.name(), code);
        }

        // Name
        {
            var name = new FieldDef("Name",
                    "name",
                    DataType.STRING_SHORT,
                    20,
                    0,
                    "",
                    false,
                    true,
                    ++displayOrder);
            fields.put(name.name(), name);
        }

        // CreatedAt, UpdatedAt, IsDeleted, DeletedAt
        FieldUtils.addCreatedAt(fields, ++displayOrder);
        FieldUtils.addUpdatedAt(fields, ++displayOrder);
        FieldUtils.addIsDeleted(fields, ++displayOrder);
        FieldUtils.addDeletedAt(fields, ++displayOrder);

        return new EntityDef(FleetEntities.AIRLINE,
                FleetEntities.AIRLINE_TABLE,
                "ID",
                "Name",
                fields);
    }
}
