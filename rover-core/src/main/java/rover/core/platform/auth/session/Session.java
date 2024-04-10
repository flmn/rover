package rover.core.platform.auth.session;

import org.springframework.util.NumberUtils;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class Session {
    public static final String ATTR_EMAIL = "email";
    public static final String ATTR_ENABLED = "enabled";
    public static final String ATTR_LOCKED = "locked";
    public static final String ATTR_AUTHORITIES = "authorities";
    private final String userId;
    private final String accessToken;
    private final ConcurrentMap<String, Object> data = new ConcurrentHashMap<>();
    private LocalDateTime expiresAt;

    public Session(String userId,
                   String accessToken,
                   LocalDateTime expiresAt) {
        this.userId = userId;
        this.accessToken = accessToken;
        this.expiresAt = expiresAt;
    }

    public void put(String key, Object value) {
        data.put(key, value);
    }

    public String getString(String key, String defaultValue) {
        var obj = data.getOrDefault(key, null);

        if (obj == null) {
            return defaultValue;
        }

        return obj.toString();
    }

    public boolean getBoolean(String key, boolean defaultValue) {
        var obj = data.getOrDefault(key, null);

        if (obj == null) {
            return defaultValue;
        }

        if (obj instanceof Boolean b) {
            return b;
        }

        return defaultValue;
    }

    public int getInt(String key, int defaultValue) {
        var obj = data.getOrDefault(key, null);

        switch (obj) {
            case Integer i -> {
                return i;
            }
            case String s -> {
                try {
                    return NumberUtils.parseNumber(s, Integer.class);
                } catch (Exception ignored) {
                    return defaultValue;
                }
            }
            case null, default -> {
                return defaultValue;
            }
        }
    }

    public String getUserId() {
        return userId;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    public ConcurrentMap<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data.clear();

        this.data.putAll(data);
    }
}
