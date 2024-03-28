package rover.core.platform.entity;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import rover.core.shared.entity.BaseEntity;

@Table("platform_role")
public class RoleEntity extends BaseEntity {
    public static final String ID_PREFIX = "rol";

    @Column("name")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
