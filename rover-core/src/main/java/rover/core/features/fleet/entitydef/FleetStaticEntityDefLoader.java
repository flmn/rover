package rover.core.features.fleet.entitydef;

import org.springframework.stereotype.Component;
import rover.ef.entity.domain.DataType;
import rover.ef.entity.domain.EntityDef;
import rover.ef.entity.domain.FieldDef;
import rover.ef.entity.registry.EntityDefLoader;
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
        int naturalOrder = 0;

        // ID
        FieldUtils.addId(fields, naturalOrder);

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
                    ++naturalOrder);
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
                    ++naturalOrder);
            fields.put(name.name(), name);
        }

        // CreatedAt, UpdatedAt, IsDeleted, DeletedAt
        FieldUtils.addCreatedAt(fields, ++naturalOrder);
        FieldUtils.addUpdatedAt(fields, ++naturalOrder);
        FieldUtils.addIsDeleted(fields, ++naturalOrder);
        FieldUtils.addDeletedAt(fields, ++naturalOrder);

        return new EntityDef(FleetEntities.AIRLINE,
                FleetEntities.AIRLINE_TABLE,
                "ID",
                "Name",
                fields);
    }
}
