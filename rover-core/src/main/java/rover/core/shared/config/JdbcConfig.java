package rover.core.shared.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jdbc.repository.config.EnableJdbcAuditing;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;

@Configuration
@EnableJdbcRepositories({"rover.core.platform", "rover.core.features"})
@EnableJdbcAuditing
public class JdbcConfig {
}
