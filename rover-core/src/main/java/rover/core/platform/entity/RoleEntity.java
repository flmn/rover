package rover.core.platform.entity;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import rover.core.shared.constants.PlatformTableNames;
import rover.core.shared.entity.BaseEntity;

import java.util.ArrayList;
import java.util.List;

@Table(PlatformTableNames.ROLE)
public class RoleEntity extends BaseEntity {
    public static final String ID_PREFIX = "rol";

    @Column("name")
    private String name;

    @Column("description")
    private String description;

    @Column("data_permission")
    private DataPermission dataPermission;

    @Column("privileges")
    private List<String> privileges = new ArrayList<>();

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

    public DataPermission getDataPermission() {
        return dataPermission;
    }

    public void setDataPermission(DataPermission dataPermission) {
        this.dataPermission = dataPermission;
    }

    public List<String> getPrivileges() {
        return privileges;
    }

    public void setPrivileges(List<String> privileges) {
        this.privileges = privileges;
    }
}
