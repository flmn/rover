package rover.core.platform.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import rover.core.platform.constants.PlatformTableNames;

@Table(PlatformTableNames.PRIVILEGE)
public class PrivilegeEntity {

    @Id
    private String id;

    @Column("name")
    private String name;

    @Column("level")
    private Integer level;

    @Column("parent")
    private AggregateReference<PrivilegeEntity, String> parent;

    @Column("display_order")
    private Integer displayOrder;

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

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public AggregateReference<PrivilegeEntity, String> getParent() {
        return parent;
    }

    public void setParent(AggregateReference<PrivilegeEntity, String> parent) {
        this.parent = parent;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}
