package rover.app.shared.service;

import org.springframework.stereotype.Service;
import rover.core.platform.service.UserService;

@Service
public class AuthService {
    private final UserService userService;

    public AuthService(UserService userService) {
        this.userService = userService;
    }
}
