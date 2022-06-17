package pl.nasza.uczelnia.project.config.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;

@Configuration
@EnableResourceServer
@EnableWebSecurity
public class SecurityConfiguration extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.addFilterBefore(new SimpleCorsFilter(), ChannelProcessingFilter.class);
        http
                .authorizeRequests()
                .antMatchers("/users").permitAll()
                .antMatchers("/users/*").permitAll()
                .antMatchers("/users/registration").permitAll()
                .antMatchers("/oauth/token").permitAll()
                .antMatchers("/*").permitAll();
               // .anyRequest().authenticated();
    }
}
