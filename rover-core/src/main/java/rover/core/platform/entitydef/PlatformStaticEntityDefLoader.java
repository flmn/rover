package rover.core.platform.entitydef;

import org.springframework.stereotype.Component;
import rover.ef.domain.EntityDef;
import rover.ef.registry.EntityDefLoader;

import java.util.Map;

@Component
public class PlatformStaticEntityDefLoader implements EntityDefLoader {

    @Override
    public Map<String, EntityDef> loadEntityDefs() {
        EntityDef fileDef = new EntityDef();


        return Map.ofEntries(
                Map.entry(PlatformEntities.FILE, fileDef)
        );
    }
}
