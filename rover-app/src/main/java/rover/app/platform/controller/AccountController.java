package rover.app.platform.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rover.app.platform.dto.AccountDTO;
import rover.core.platform.auth.AuthService;
import rover.core.platform.auth.RoverUserDetails;

@RestController
@RequestMapping("/api/account")
public class AccountController {
    private final AuthService authService;

    public AccountController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/logout")
    public Object logout(@AuthenticationPrincipal RoverUserDetails user) {
        authService.logout(user.getAccessToken());

        return null;
    }

    @GetMapping("/me")
    public AccountDTO me(@AuthenticationPrincipal RoverUserDetails user) {
        return new AccountDTO(user.getName(), "TD");
    }
}
