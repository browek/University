package pl.nasza.uczelnia.project.infrastructure.notifications.handler;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import pl.nasza.uczelnia.project.infrastructure.notifications.MailResetPassword;
import pl.nasza.uczelnia.project.infrastructure.notifications.MailUtils;
import org.springframework.mail.javamail.JavaMailSender;


import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.logging.Logger;

import static java.util.Locale.ENGLISH;

@Service
@RequiredArgsConstructor
public class NotificationHandler {

    private static final Logger log = Logger.getLogger(NotificationHandler.class.getName());
    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;
    private final MailUtils mailUtils;

    @SneakyThrows(MessagingException.class)
    @Async
    public void sendMailForPasswordReset(MailResetPassword mail, String email) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper;
        helper = new MimeMessageHelper(message, true);
        helper.setFrom(mailUtils.getSender());
        helper.setTo(email);
        helper.setSubject(mailUtils.getSubjectForPasswordReset());
        message.setContent(buildResetMail(mail), "text/html");
        javaMailSender.send(message);
    }


    private String buildResetMail(MailResetPassword mail) {
        Context context = new Context(ENGLISH, mailUtils.contextPasswordResetMap(mail));
        return templateEngine.process("passwordResetMail", context);
    }
}
