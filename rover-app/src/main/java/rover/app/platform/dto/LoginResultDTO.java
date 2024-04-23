package rover.app.platform.dto;

import java.time.LocalDateTime;

public record LoginResultDTO(String accessToken, LocalDateTime expiresAt) {
}
