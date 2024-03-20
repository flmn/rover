package rover.app.shared.repository;

import org.springframework.data.relational.core.mapping.event.AbstractRelationalEventListener;
import org.springframework.data.relational.core.mapping.event.BeforeSaveEvent;
import org.springframework.stereotype.Component;
import rover.app.shared.entity.BaseEntity;

import java.time.LocalDateTime;

@Component
public class BaseEntityEventListener extends AbstractRelationalEventListener<BaseEntity> {

    @Override
    protected void onBeforeSave(BeforeSaveEvent<BaseEntity> event) {
        var baseEntity = event.getEntity();

        if (baseEntity == null) {
            return;
        }

        var now = LocalDateTime.now();

        if (baseEntity.getCreatedAt() == null) { // create
            baseEntity.setCreatedAt(now);
        } else { // update
            baseEntity.setUpdatedAt(now);
        }
    }
}
