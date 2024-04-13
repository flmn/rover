package rover.core.platform.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("core_platform_privilege")
public class PrivilegeEntity {
    public static final String ID_PREFIX = "pri";

    @Id
    private String id;

    @Column("name")
    private String name;

    @Column("parent")
    private AggregateReference<PrivilegeEntity, String> parent;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AggregateReference<PrivilegeEntity, String> getParent() {
        return parent;
    }

    public void setParent(AggregateReference<PrivilegeEntity, String> parent) {
        this.parent = parent;
    }
}
