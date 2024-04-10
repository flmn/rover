package rover.core.platform.auth.session.impl.db;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import rover.core.platform.auth.session.Session;
import rover.core.platform.auth.session.SessionManager;
import rover.core.platform.auth.session.impl.AbstractSessionManager;
import rover.ef.util.IdHelper;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Component
public class DbSessionManager extends AbstractSessionManager implements SessionManager {
    private static final MapTypeReference MAP_TYPE = new MapTypeReference();
    private final ObjectMapper objectMapper;
    private final SessionRepository sessionRepository;

    public DbSessionManager(ObjectMapper objectMapper,
                            SessionRepository sessionRepository,
                            @Value("${rover.auth.expires-in:86400}") Integer expiresIn) {
        super(expiresIn);

        this.objectMapper = objectMapper;
        this.sessionRepository = sessionRepository;
    }

    @Override
    public void save(Session session) {
        var opt = sessionRepository.findByAccessToken(session.getAccessToken());

        SessionEntity entity;
        if (opt.isEmpty()) {
            entity = new SessionEntity();
            entity.setId(IdHelper.newTsid(SessionEntity.ID_PREFIX));
            entity.setUserId(session.getUserId());
            entity.setAccessToken(session.getAccessToken());
            entity.setCreatedBy(session.getUserId());
        } else {
            entity = opt.get();
            entity.setUpdatedBy(session.getUserId());
        }

        entity.setExpiresAt(LocalDateTime.now().plusSeconds(expiresIn));
        entity.setData(toJson(session.getData()));

        sessionRepository.save(entity);
    }

    @Override
    public Optional<Session> get(String accessToken) {
        var opt = sessionRepository.findByAccessToken(accessToken);
        if (opt.isEmpty()) {
            return Optional.empty();
        }

        SessionEntity entity = opt.get();

        Session session = new Session(entity.getUserId(), entity.getAccessToken(), entity.getExpiresAt());

        session.setData(toMap(entity.getData()));

        return Optional.of(session);
    }

    @Override
    public void delete(String accessToken) {
        var opt = sessionRepository.findByAccessToken(accessToken);

        opt.ifPresent(sessionRepository::delete);
    }

    private String toJson(Map<String, Object> data) {
        try {
            return objectMapper.writeValueAsString(data);
        } catch (JsonProcessingException e) {
            return "{}";
        }
    }

    private Map<String, Object> toMap(String json) {
        if (!StringUtils.hasText(json)) {
            return Collections.emptyMap();
        }

        try {
            return objectMapper.readValue(json, MAP_TYPE);
        } catch (JsonProcessingException e) {
            return Collections.emptyMap();
        }
    }

    private static final class MapTypeReference extends TypeReference<Map<String, Object>> {

    }
}
