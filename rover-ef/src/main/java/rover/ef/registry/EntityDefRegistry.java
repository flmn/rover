package rover.ef.registry;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import rover.ef.domain.EntityDef;

import java.util.Set;
import java.util.StringJoiner;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class EntityDefRegistry {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final ConcurrentHashMap<String, EntityDef> defMap = new ConcurrentHashMap<>();
    private final Set<EntityDefLoader> entityDefLoaders;

    public EntityDefRegistry(Set<EntityDefLoader> entityDefLoaders) {
        this.entityDefLoaders = entityDefLoaders;
    }

    @PostConstruct
    public void init() {
        for (var loader : entityDefLoaders) {
            var map = loader.loadEntityDefs();
            if (map != null && !map.isEmpty()) {
                defMap.putAll(map);
            }
        }

        StringJoiner joiner = new StringJoiner(", ", "[", "]");
        defMap.forEachKey(1, joiner::add);

        logger.info("#Loaders: {}, #EntityDefs: {}, Entities: {}.",
                entityDefLoaders.size(),
                defMap.size(),
                joiner);
    }
}
