package rover.core.platform.entity;

import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import rover.core.shared.entity.BaseEntity;

@Table("platform_token")
public class TokenEntity extends BaseEntity {

    @Column("user_id")
    private String userId;

    @Column("type")
    private TokenType type;

    @Column("token")
    private String token;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public TokenType getType() {
        return type;
    }

    public void setType(TokenType type) {
        this.type = type;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
