package pl.nasza.uczelnia.project.infrastructure.notifications;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import pl.nasza.uczelnia.project.infrastructure.domain.password.PasswordResetToken;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MailFactory {

    public static MailResetPassword createMailForPasswordReset(PasswordResetToken token) {
        MailResetPassword mail = new MailResetPassword();
        mail.setEmail(token.getUser().getEmail());
        mail.setToken(token.getToken());
        return mail;
    }
}

