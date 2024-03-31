package rover.core.platform.service;

import net.datafaker.Faker;
import org.jobrunr.scheduling.JobBuilder;
import org.jobrunr.scheduling.JobRequestScheduler;
import org.springframework.stereotype.Service;
import rover.core.platform.job.email.SendEmailJobRequest;
import rover.core.shared.util.IdUtils;

@Service
public class TestService {
    private final UserService userService;
    private final JobRequestScheduler jobRequestScheduler;

    public TestService(UserService userService,
                       JobRequestScheduler jobRequestScheduler) {
        this.userService = userService;
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

    public Object test2() {
        Faker faker = new Faker();

        for (int i = 0; i < 100; i++) {
            String email = faker.internet().emailAddress();
            String password = faker.internet().password();
            String name = faker.name().firstName();
            boolean enabled = faker.bool().bool();

            userService.create(email, password, name, enabled);
        }

        return "ok";
    }
}
