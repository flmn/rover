package rover.app.platform.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rover.app.platform.service.ServerInfoService;

@RestController
@RequestMapping("/api/platform/server")
public class ServerController {
    private final ServerInfoService serverInfoService;

    public ServerController(ServerInfoService serverInfoService) {
        this.serverInfoService = serverInfoService;
    }

    @GetMapping("/info")
    public Object list() {
        return serverInfoService.getServerInfo();
    }
}
