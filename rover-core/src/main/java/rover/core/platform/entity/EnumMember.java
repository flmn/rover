package rover.core.platform.entity;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import rover.core.shared.constants.PlatformTableNames;

@Table(PlatformTableNames.ENUM_MEMBER)
public class EnumMember {

    @Column("enum_id")
    private String enumId; // 隐式处理

    @Column("value")
    private String value;

    @Column("label")
    private String label;

    @Column("is_default")
    private Boolean isDefault = false;

    @Column("display_order")
    private Integer displayOrder; // 隐式处理，按 members 数组顺序，0开头

    public String getEnumId() {
        return enumId;
    }

    public void setEnumId(String enumId) {
        this.enumId = enumId;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Boolean getDefault() {
        return isDefault;
    }

    public void setDefault(Boolean aDefault) {
        isDefault = aDefault;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}
