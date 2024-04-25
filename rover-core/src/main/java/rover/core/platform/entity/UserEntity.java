package rover.core.platform.entity;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;
import rover.core.shared.constants.PlatformTableNames;
import rover.core.shared.entity.SoftDeletableEntity;

import java.util.HashSet;
import java.util.Set;

@Table(PlatformTableNames.USER)
public class UserEntity extends SoftDeletableEntity {
    public static final String ID_PREFIX = "usr";

    @Column("email")
    private String email;

    @Column("password")
    private String password;

    @Column("name")
    private String name;

    @Column("is_enabled")
    private Boolean isEnabled = true;

    @Column("is_locked")
    private Boolean isLocked = false;

    @MappedCollection(idColumn = "user_id")
    private Set<RoleRef> roles = new HashSet<>();

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getEnabled() {
        return isEnabled;
    }

    public void setEnabled(Boolean enabled) {
        isEnabled = enabled;
    }

    public Boolean getLocked() {
        return isLocked;
    }

    public void setLocked(Boolean locked) {
        isLocked = locked;
    }

    public Set<RoleRef> getRoles() {
        return roles;
    }

    public void setRoles(Set<RoleRef> roles) {
        this.roles = roles;
    }
}
