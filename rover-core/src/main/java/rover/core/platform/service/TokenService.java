package rover.core.platform.service;

import org.springframework.stereotype.Service;
import rover.core.platform.entity.TokenEntity;
import rover.core.platform.entity.TokenType;
import rover.core.platform.repository.TokenRepository;

import java.util.Optional;

@Service
public class TokenService {
    private final TokenRepository tokenRepository;

    public TokenService(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public Optional<TokenEntity> getAccessToken(String accessToken) {
        return tokenRepository.findByTypeAndToken(TokenType.ACCESS_TOKEN, accessToken);
    }
}
