package rover.core.features.fleet.entitydef;

import org.springframework.stereotype.Component;
import rover.ef.domain.EntityDef;
import rover.ef.registry.EntityDefLoader;

import java.util.Map;

@Component
public class FleetStaticEntityDefLoader implements EntityDefLoader {

    @Override
    public Map<String, EntityDef> loadEntityDefs() {
        EntityDef airlineDef = new EntityDef();


        return Map.ofEntries(
                Map.entry(FleetEntities.AIRLINE, airlineDef)
        );
    }
}
