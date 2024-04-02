package rover.ef.configuration;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;
import rover.ef.config.CacheConfig;

@Configuration
@ComponentScan("rover.ef")
@EnableJdbcRepositories({"rover.ef.enumeration.repository"})
@EnableCaching
@Import(CacheConfig.class)
public class RoverEfAutoConfiguration {
}
