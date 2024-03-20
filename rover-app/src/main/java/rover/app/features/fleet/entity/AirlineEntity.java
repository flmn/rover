package rover.app.features.fleet.entity;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import rover.app.shared.entity.SoftDeletableEntity;

@Table("fleet_airline")
public class AirlineEntity extends SoftDeletableEntity {

    @Column("code")
    private String code;

    @Column("name")
    private String name;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
