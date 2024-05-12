package rover.core.shared.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jdbc.repository.config.EnableJdbcAuditing;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;
import rover.core.shared.repository.EnhancedJdbcRepository;

@Configuration
@EnableJdbcRepositories(
        basePackages = {"rover.core.shared", "rover.core.platform", "rover.core.features"},
        repositoryBaseClass = EnhancedJdbcRepository.class
)
@EnableJdbcAuditing
public class JdbcConfig {
}
