package rover.app.shared.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.context.RequestAttributeSecurityContextRepository;
import org.springframework.security.web.util.matcher.AndRequestMatcher;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.NegatedRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

@Configuration("appSecurityConfig")
@EnableWebSecurity
public class SecurityConfig {
    private static final RequestMatcher PROTECTED_URLS = new AndRequestMatcher(
            new AntPathRequestMatcher("/api/**"),
            new NegatedRequestMatcher(new AntPathRequestMatcher("/api/public/**"))
    );

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationConfiguration authenticationConfiguration) throws Exception {
        http
                .sessionManagement(configurer -> configurer
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .csrf(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .logout(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(registry -> registry
                        .requestMatchers("/**")
                        .permitAll()
                        .requestMatchers(PROTECTED_URLS)
                        .authenticated()
                )
                .authenticationManager(authenticationConfiguration.getAuthenticationManager())
                .securityContext(securityContext -> securityContext
                        .securityContextRepository(new RequestAttributeSecurityContextRepository())
                )
                .addFilterBefore(
                        new BearerTokenAuthenticationFilter(PROTECTED_URLS, authenticationConfiguration.getAuthenticationManager()),
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}
