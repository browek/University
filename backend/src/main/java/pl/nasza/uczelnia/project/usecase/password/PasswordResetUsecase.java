package pl.nasza.uczelnia.project.usecase.password;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pl.nasza.uczelnia.project.core.ExceptionFactory;
import pl.nasza.uczelnia.project.entrypoint.password.PasswordResetCommand;
import pl.nasza.uczelnia.project.entrypoint.password.UpdateUserPasswordCommand;
import pl.nasza.uczelnia.project.infrastructure.domain.password.PasswordResetToken;
import pl.nasza.uczelnia.project.infrastructure.domain.password.PasswordResetTokenRepository;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;
import pl.nasza.uczelnia.project.infrastructure.domain.user.UserRepository;
import pl.nasza.uczelnia.project.infrastructure.notifications.MailResetPassword;
import pl.nasza.uczelnia.project.infrastructure.notifications.handler.NotificationHandler;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;

import static java.time.LocalDateTime.now;
import static pl.nasza.uczelnia.project.infrastructure.notifications.MailFactory.createMailForPasswordReset;

@Service
@RequiredArgsConstructor
public class PasswordResetUsecase {

    private final PasswordResetTokenRepository tokenRepository;
    private final NotificationHandler notificationHandler;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Value(value = "${token.expire}")
    private int TOKEN_EXPIRE_TIME;

    private void checkIfTokenExpired(PasswordResetToken token) {
        if (token.getExpiryDate().isBefore(now())) {
            tokenRepository.delete(token);
            throw ExceptionFactory.tokenExpired();
        }
    }

    public void resetPassword(final PasswordResetCommand passwordResetCommand) {
        User user = userRepository.findByEmail(passwordResetCommand.getEmail())
                .orElseThrow(ExceptionFactory::emailNotExists);
        Optional<PasswordResetToken> resetToken = tokenRepository.findByUserIdAndExpiryDateBefore(user.getId(), now());
        if (resetToken.isEmpty()) {
            PasswordResetToken token = new PasswordResetToken();
            token.setToken(UUID.randomUUID().toString());
            token.setUser(user);
            token.setExpiryDate(now().plusHours(TOKEN_EXPIRE_TIME));
            tokenRepository.save(token);
            MailResetPassword mail = createMailForPasswordReset(token);
            notificationHandler.sendMailForPasswordReset(mail, passwordResetCommand.getEmail());
        } else throw ExceptionFactory.tokenAlreadyAssigned();
    }

    public void updatePassword(UpdateUserPasswordCommand command, String token) {

        if (!command.getPassword().equals(command.getRepeatPassword())) {
            throw ExceptionFactory.passwordsAreNotTheSame();
        }

        User user = userRepository.findByEmail(command.getEmail())
                .orElseThrow(ExceptionFactory::emailNotExists);

        PasswordResetToken userToken = tokenRepository.findByToken(token)
                .orElseThrow(ExceptionFactory::tokenNotFound);
        if (user.getEmail().equals(userToken.getUser().getEmail())) {
            checkIfTokenExpired(userToken);
            user.setPassword("{bcrypt}"+passwordEncoder.encode(command.getPassword()));
            userRepository.save(user);
        } else throw ExceptionFactory.notUsersToken();
    }

    @Transactional
    @Scheduled(cron = "${token.delete}")
    public void deleteExpiredTokens() {
        tokenRepository.deleteByExpiryDateBefore(now());
    }

}
