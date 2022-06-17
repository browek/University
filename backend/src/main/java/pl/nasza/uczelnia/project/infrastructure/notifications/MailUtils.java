package pl.nasza.uczelnia.project.infrastructure.notifications;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@Getter
@Setter
public class MailUtils {

    @Value(value = "${spring.mail.username}")
    private String sender;


    @Value(value = "${simplemail.user.subject.passwordreset}")
    private String subjectForPasswordReset;


    public Map<String, Object> contextPasswordResetMap(MailResetPassword mail) {
        Map<String, Object> result = new HashMap<>();
        result.put("token", mail.getToken());
        return result;
    }
}