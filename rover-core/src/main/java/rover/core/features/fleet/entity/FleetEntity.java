package rover.core.features.fleet.entity;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import rover.core.features.fleet.constants.FleetTableNames;
import rover.core.shared.entity.BaseEntity;

@Table(FleetTableNames.FLEET)
public class FleetEntity extends BaseEntity {

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
