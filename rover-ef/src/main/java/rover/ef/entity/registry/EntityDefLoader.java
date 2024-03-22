package rover.ef.entity.registry;

import rover.ef.entity.domain.EntityDef;

import java.util.List;

public interface EntityDefLoader {
    List<EntityDef> loadEntityDefs();
}
