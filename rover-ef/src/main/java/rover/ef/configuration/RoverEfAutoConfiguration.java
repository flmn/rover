package rover.ef.configuration;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;

@Configuration
@ComponentScan("rover.ef")
@EnableJdbcRepositories({"rover.ef.enumeration.repository"})
public class RoverEfAutoConfiguration {
}
