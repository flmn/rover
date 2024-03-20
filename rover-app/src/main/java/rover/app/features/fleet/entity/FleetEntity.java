package rover.app.features.fleet.entity;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import rover.app.shared.entity.SoftDeletableEntity;

@Table("fleet_fleet")
public class FleetEntity extends SoftDeletableEntity {

    @Column("name")
    private String name;

    @Column("description")
    private String description;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
