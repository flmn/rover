package rover.core.platform.entity;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;
import rover.core.platform.constants.PlatformTableNames;
import rover.core.shared.entity.BaseEntity;

import java.util.ArrayList;
import java.util.List;

@Table(PlatformTableNames.ENUM)
public class EnumEntity extends BaseEntity {

    @Column("name")
    private String name;

    @Column("description")
    private String description;

    // 这里的 keyColumn 是用来排序的，生成的 SQL：WHERE enum_id = ? ORDER BY display_order
    @MappedCollection(idColumn = "enum_id", keyColumn = "display_order")
    private List<EnumMember> members = new ArrayList<>();

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

    public List<EnumMember> getMembers() {
        return members;
    }

    public void setMembers(List<EnumMember> members) {
        this.members = members;
    }
}
