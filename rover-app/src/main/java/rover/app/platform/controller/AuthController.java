package rover.app.platform.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rover.core.platform.entity.TokenEntity;
import rover.core.platform.service.UserService;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public Object login(@RequestBody LoginRequest request) {
        Optional<TokenEntity> opt = userService.login(request.email(), request.password());

        if (opt.isPresent()) {
            TokenEntity tokenEntity = opt.get();

            return new LoginResult(tokenEntity.getToken(), tokenEntity.getExpiresAt());
        } else {
            return ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, "Login failed");
        }
    }

    public record LoginRequest(String email, String password) {
    }

    record LoginResult(String accessToken, LocalDateTime expiresAt) {
    }
}
