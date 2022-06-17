package pl.nasza.uczelnia.project.infrastructure.notifications;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MailResetPassword {

    private String email;
    private String token;
}
