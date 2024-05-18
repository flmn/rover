package rover.core.platform.entity;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import rover.core.platform.constants.PlatformTableNames;

@Table(PlatformTableNames.ROLE_REF)
public class RoleRef {

    @Column("user_id")
    private String userId; // 隐式处理

    @Column("role_id")
    private String roleId;

    public RoleRef() {
    }

    public RoleRef(String userId, String roleId) {
        this.userId = userId;
        this.roleId = roleId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }
}
