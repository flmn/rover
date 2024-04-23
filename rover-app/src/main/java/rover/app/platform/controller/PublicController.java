package rover.app.platform.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.*;
import rover.app.platform.dto.ConfigDTO;
import rover.app.platform.dto.LoginRequestDTO;
import rover.app.platform.dto.LoginResultDTO;
import rover.core.platform.auth.AuthService;
import rover.core.platform.auth.session.Session;
import rover.core.platform.service.ConfigService;
import rover.core.shared.exception.NotFoundException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/public")
public class PublicController {
    private final AuthService authService;
    private final ConfigService configService;

    public PublicController(AuthService authService,
                            ConfigService configService) {
        this.authService = authService;
        this.configService = configService;
    }

    @PostMapping("/login")
    public Object login(@RequestBody LoginRequestDTO request) {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        Optional<Session> opt = authService.login(request.email(), request.password());

        if (opt.isPresent()) {
            Session session = opt.get();

            return new LoginResultDTO(session.getAccessToken(), session.getExpiresAt());
        } else {
            return ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, "Login failed");
        }
    }

    @GetMapping("/configs")
    public List<ConfigDTO> configs() {
        return configService.list(true)
                .stream()
                .map(ConfigDTO::simple)
                .toList();
    }

    @GetMapping("/configs/{id}")
    public ConfigDTO getConfig(@PathVariable String id) throws NotFoundException {
        var opt = configService.get(id);

        if (opt.isEmpty() || !opt.get().getPublicAccess()) {
            throw new NotFoundException("Can not found config");
        }

        return ConfigDTO.simple(opt.get());
    }
}
