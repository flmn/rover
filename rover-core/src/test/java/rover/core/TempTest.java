package rover.core;

import net.datafaker.Faker;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class TempTest {

    @Test
    @Disabled
    void password() {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        System.out.println(passwordEncoder.encode("admin123"));
    }

    @Test
    void faker() {
        Faker faker = new Faker();

        System.out.println(faker.domain().firstLevelDomain("example"));
    }
}
