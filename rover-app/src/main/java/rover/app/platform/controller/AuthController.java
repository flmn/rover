package rover.app.platform.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rover.core.platform.auth.AuthService;
import rover.core.platform.auth.session.Session;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public Object login(@RequestBody LoginRequest request) {
        Optional<Session> opt = authService.login(request.email(), request.password());

        if (opt.isPresent()) {
            Session session = opt.get();

            return new LoginResult(session.getAccessToken(), session.getExpiresAt());
        } else {
            return ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, "Login failed");
        }
    }

    @PostMapping("/logout")
    public Object logout() {
        return null;
    }

    public record LoginRequest(String email, String password) {
    }

    record LoginResult(String accessToken, LocalDateTime expiresAt) {
    }
}
