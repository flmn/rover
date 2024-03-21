package rover.ef.registry;

import rover.ef.domain.EntityDef;

import java.util.Map;

public interface EntityDefLoader {
    Map<String, EntityDef> loadEntityDefs();
}
