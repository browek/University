package pl.nasza.uczelnia.project.infrastructure.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserBaseException extends RuntimeException {

    private final Message failMessage;

    public enum Message {
        USER_NOT_FOUND,
        USER_ALREADY_EXISTS,
        WRONG_PASSWORD_FORMAT,
        EMAIL_NOT_EXISTS,
        TOKEN_NOT_FOUND,
        TOKEN_ALREADY_ASSIGNED,
        TOKEN_EXPIRED,
        NOT_USER_TOKEN,
        PASSWORDS_ARE_NOT_THE_SAME
    }

}
