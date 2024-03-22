package rover.ef.registry;

import rover.ef.domain.EntityDef;

import java.util.List;

public interface EntityDefLoader {
    List<EntityDef> loadEntityDefs();
}
