package rover.core.platform.entity;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import rover.core.platform.constants.PlatformTableNames;
import rover.core.shared.entity.BaseEntity;

@Table(PlatformTableNames.FILE)
public class FileEntity extends BaseEntity {

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
