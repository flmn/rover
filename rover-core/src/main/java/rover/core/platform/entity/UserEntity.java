package rover.core.platform.entity;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import rover.core.shared.entity.SoftDeletableEntity;

@Table("platform_user")
public class UserEntity extends SoftDeletableEntity {
    public static final String ID_PREFIX = "usr";

    @Column("email")
    private String email;

    @Column("password")
    private String password;

    @Column("is_enabled")
    private Boolean isEnabled = true;

    @Column("is_locked")
    private Boolean isLocked = false;

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
}
