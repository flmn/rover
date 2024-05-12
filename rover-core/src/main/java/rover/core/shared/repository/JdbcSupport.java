package rover.core.shared.repository;

import org.springframework.jdbc.core.simple.JdbcClient;

public interface JdbcSupport {
    JdbcClient jdbcClient();
}
