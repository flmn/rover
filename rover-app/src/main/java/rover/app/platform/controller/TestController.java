package rover.app.platform.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rover.app.shared.auth.RoverUserDetails;
import rover.core.platform.service.TestService;

@RestController
@RequestMapping("/api/platform/test")
public class TestController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
    }

    @GetMapping
    public Object test(@AuthenticationPrincipal RoverUserDetails user) {
        logger.info("user: {}", user);

        return "test";
    }
}
