package pl.nasza.uczelnia.project.entrypoint.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import pl.nasza.uczelnia.project.core.ResponseErrorMessage;
import pl.nasza.uczelnia.project.infrastructure.exception.UserBaseException;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@ControllerAdvice
public class UserExceptionHandler {

    @ExceptionHandler(value = UserBaseException.class)
    public ResponseEntity<ResponseErrorMessage> handle(final UserBaseException exception) {
        switch (exception.getFailMessage()) {
            case USER_NOT_FOUND:
                return getErrorResponse(exception, NOT_FOUND);
            case USER_ALREADY_EXISTS:
            case WRONG_PASSWORD_FORMAT:
            case EMAIL_NOT_EXISTS:
            case TOKEN_NOT_FOUND:
            case TOKEN_ALREADY_ASSIGNED:
            case TOKEN_EXPIRED:
            case NOT_USER_TOKEN:
            case PASSWORDS_ARE_NOT_THE_SAME:
                return getErrorResponse(exception, BAD_REQUEST);
            default:
                return new ResponseEntity<>(INTERNAL_SERVER_ERROR);
        }
    }

    private ResponseEntity<ResponseErrorMessage> getErrorResponse(UserBaseException exception, HttpStatus status) {
        ResponseErrorMessage error = new ResponseErrorMessage(exception.getFailMessage().toString(), status.toString());
        return new ResponseEntity<>(error, status);
    }

}
