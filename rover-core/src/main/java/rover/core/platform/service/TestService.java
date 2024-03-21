package rover.core.platform.service;

import org.jobrunr.scheduling.JobBuilder;
import org.jobrunr.scheduling.JobRequestScheduler;
import org.springframework.stereotype.Service;
import rover.core.platform.job.email.SendEmailJobRequest;
import rover.core.shared.util.IdUtils;

@Service
public class TestService {
    private final JobRequestScheduler jobRequestScheduler;

    public TestService(JobRequestScheduler jobRequestScheduler) {
        this.jobRequestScheduler = jobRequestScheduler;
    }

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
