package pl.nasza.uczelnia.project.config.security;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties("security")
public class SecurityProperties {

    private String clientId;
    private String clientSecret;
    private int expirationTime;
    private String devUserLogin;
    private String devUserPassword;
    private String devUserEmail;
    private String devUserName;
}

