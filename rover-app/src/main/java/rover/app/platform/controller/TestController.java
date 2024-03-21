package rover.app.platform.controller;

import org.jobrunr.scheduling.JobBuilder;
import org.jobrunr.scheduling.JobRequestScheduler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rover.app.shared.util.IdUtils;
import rover.core.platform.job.email.SendEmailJobRequest;

@RestController
@RequestMapping("/api/platform/test")
public class TestController {
    private final JobRequestScheduler jobRequestScheduler;

    public TestController(JobRequestScheduler jobRequestScheduler) {
        this.jobRequestScheduler = jobRequestScheduler;
    }

    @GetMapping
    public Object test() {
        JobBuilder builder = JobBuilder.aJob()
                .withName("A job requested for test")
                .withAmountOfRetries(1)
                .withLabels("from-rest-api")
                .withJobRequest(new SendEmailJobRequest(IdUtils.newTsid()));

        jobRequestScheduler.create(builder);

        return "test ok";
    }
}
