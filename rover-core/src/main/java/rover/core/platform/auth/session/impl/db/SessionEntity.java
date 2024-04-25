package rover.core.platform.auth.session.impl.db;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import rover.core.shared.constants.PlatformTableNames;
import rover.core.shared.entity.BaseEntity;

import java.time.LocalDateTime;

@Table(PlatformTableNames.SESSION)
public class SessionEntity extends BaseEntity {
    public static final String ID_PREFIX = "ssn";

    @Column("user_id")
    private String userId;

    @Column("access_token")
    private String accessToken;

    @Column("expires_at")
    private LocalDateTime expiresAt;

    @Column("data")
    private String data;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}
