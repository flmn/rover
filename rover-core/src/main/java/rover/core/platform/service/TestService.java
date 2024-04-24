package rover.core.platform.service;

import net.datafaker.Faker;
import org.jobrunr.scheduling.JobBuilder;
import org.jobrunr.scheduling.JobRequestScheduler;
import org.springframework.stereotype.Service;
import rover.core.platform.entity.ConfigEntity;
import rover.core.platform.entity.ConfigType;
import rover.core.platform.entity.EnumMember;
import rover.core.platform.job.email.SendEmailJobRequest;
import rover.core.platform.repository.ConfigRepository;
import rover.core.shared.util.IdHelper;

import java.util.ArrayList;
import java.util.List;

@Service
public class TestService {
    private final Faker faker = new Faker();
    private final EnumService enumService;
    private final UserService userService;
    private final RoleService roleService;
    private final ConfigRepository configRepository;
    private final JobRequestScheduler jobRequestScheduler;

    public TestService(EnumService enumService,
                       UserService userService,
                       RoleService roleService,
                       ConfigRepository configRepository,
                       JobRequestScheduler jobRequestScheduler) {
        this.enumService = enumService;
        this.userService = userService;
        this.roleService = roleService;
        this.configRepository = configRepository;
        this.jobRequestScheduler = jobRequestScheduler;
    }

    public Object test() {
        JobBuilder builder = JobBuilder.aJob()
                .withName("A job requested for test")
                .withAmountOfRetries(1)
                .withLabels("from-rest-api")
                .withJobRequest(new SendEmailJobRequest(IdHelper.newTsid()));

        jobRequestScheduler.create(builder);

        return "test ok";
    }

    public Object test2() {
        for (int i = 0; i < 100; i++) {
            String email = faker.internet().emailAddress();
            String password = faker.internet().password();
            String name = faker.name().firstName();
            boolean enabled = faker.bool().bool();

            userService.create(email, password, name, enabled);
        }

        return "ok";
    }

    public Object test3() {
        for (int i = 0; i < 100; i++) {
            String name = faker.job().title();

            roleService.create(name);
        }

        return "ok";
    }

    public Object test4() {
        for (int i = 0; i < 10; i++) {
            String id = faker.internet().uuid();
            String name = faker.internet().username();
            List<EnumMember> members = new ArrayList<>();
            EnumMember member = new EnumMember();
            member.setValue(faker.internet().uuid());
            member.setLabel(faker.internet().username());
            members.add(member);

            enumService.create(id, name, "", members);
        }

        return "ok";
    }

    public Object testConfigs() {
        for (int i = 0; i < 10; i++) {
            ConfigEntity entity = new ConfigEntity();
            entity.setId(faker.internet().uuid());
            entity.setName(faker.internet().uuid());
            entity.setType(ConfigType.TEXT);
            entity.setValue(faker.internet().uuid());
            entity.setPublicAccess(false);
            entity.setDescription("");
            entity.setCreatedBy("test");


            configRepository.save(entity);
        }

        return "ok";
    }
}
