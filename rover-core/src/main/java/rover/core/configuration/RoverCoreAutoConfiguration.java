package rover.core.configuration;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;

@Configuration
@ComponentScan("rover.core")
@EnableJdbcRepositories({"rover.core.platform", "rover.core.features"})
public class RoverCoreAutoConfiguration {
}
