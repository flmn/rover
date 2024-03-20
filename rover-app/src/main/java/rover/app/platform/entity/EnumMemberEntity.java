package rover.app.platform.entity;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import rover.app.shared.entity.SoftDeletableEntity;

@Table("platform_enum_member")
public class EnumMemberEntity extends SoftDeletableEntity {

    @Column("enum_id")
    private String enumId;

    @Column("label")
    private String label;

    @Column("value")
    private String value;

    @Column("display_order")
    private Integer displayOrder;

    @Column("is_default")
    private Boolean isDefault;

    public String getEnumId() {
        return enumId;
    }

    public void setEnumId(String enumId) {
        this.enumId = enumId;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public Boolean getIsDefault() {
        return isDefault;
    }

    public void setIsDefault(Boolean isDefault) {
        this.isDefault = isDefault;
    }
}
