package rover.core.shared.repository;

import org.springframework.jdbc.core.simple.JdbcClient;

public class JdbcSupportImpl implements JdbcSupport {
    private final JdbcClient jdbcClient;

    public JdbcSupportImpl(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    @Override
    public JdbcClient jdbcClient() {
        return jdbcClient;
    }
}
