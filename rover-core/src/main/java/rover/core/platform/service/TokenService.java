package rover.core.platform.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import rover.core.platform.entity.TokenEntity;
import rover.core.platform.entity.TokenType;
import rover.core.platform.repository.TokenRepository;
import rover.core.shared.util.IdUtils;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class TokenService {
    private final TokenRepository tokenRepository;
    private final Integer expiresIn;

    public TokenService(TokenRepository tokenRepository,
                        @Value("${rover.auth.expires-in:86400}") Integer expiresIn) {
        this.tokenRepository = tokenRepository;
        this.expiresIn = expiresIn;
    }

    public TokenEntity saveAccessToken(String userId, String accessToken) {
        Optional<TokenEntity> opt = tokenRepository.findByUserIdAndType(userId, TokenType.ACCESS_TOKEN);

        TokenEntity entity;
        if (opt.isEmpty()) {
            entity = new TokenEntity();
            entity.setId(IdUtils.newTsid(TokenEntity.ID_PREFIX));
            entity.setUserId(userId);
            entity.setType(TokenType.ACCESS_TOKEN);

        } else {
            entity = opt.get();

        }

        entity.setToken(accessToken);
        entity.setExpiresAt(LocalDateTime.now().plusSeconds(expiresIn));

        tokenRepository.save(entity);

        return entity;
    }

    public Optional<TokenEntity> getAccessToken(String accessToken) {
        return tokenRepository.findByTypeAndToken(TokenType.ACCESS_TOKEN, accessToken);
    }
}
