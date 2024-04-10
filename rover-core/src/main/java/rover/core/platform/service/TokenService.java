package rover.core.platform.service;

import rover.core.platform.repository.TokenRepository;

//@Service
public class TokenService {
    private final TokenRepository tokenRepository;

    public TokenService(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

//    public TokenEntity saveAccessToken(String userId, String accessToken) {
//        Optional<TokenEntity> opt = tokenRepository.findByUserIdAndType(userId, TokenType.ACCESS_TOKEN);
//
//        TokenEntity entity;
//        if (opt.isEmpty()) {
//            entity = new TokenEntity();
//            entity.setId(IdHelper.newTsid(TokenEntity.ID_PREFIX));
//            entity.setUserId(userId);
//            entity.setType(TokenType.ACCESS_TOKEN);
//        } else {
//            entity = opt.get();
//        }
//
//        entity.setToken(accessToken);
//        entity.setExpiresAt(LocalDateTime.now().plusSeconds(expiresIn));
//
//        tokenRepository.save(entity);
//
//        return entity;
//    }
//
//    public Optional<TokenEntity> getAccessToken(String accessToken) {
//        return tokenRepository.findByTypeAndToken(TokenType.ACCESS_TOKEN, accessToken);
//    }
}
