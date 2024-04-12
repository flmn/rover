package rover.app.platform.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rover.app.platform.dto.ProfileDTO;
import rover.core.platform.auth.RoverUserDetails;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @GetMapping("/me")
    public ProfileDTO me(@AuthenticationPrincipal RoverUserDetails user) {
        return new ProfileDTO(user.getName(), "TD");
    }
}
