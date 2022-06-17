package pl.nasza.uczelnia.project.entrypoint.groups;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import pl.nasza.uczelnia.project.core.ResponseErrorMessage;
import pl.nasza.uczelnia.project.infrastructure.exception.GroupBaseException;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@ControllerAdvice
public class GroupExceptionHandler {

    @ExceptionHandler(value = GroupBaseException.class)
    public ResponseEntity<ResponseErrorMessage> handle(final GroupBaseException exception) {
        switch (exception.getFailMessage()) {
            case GROUP_NOT_EXISTS:
                return getErrorResponse(exception, NOT_FOUND);
            default:
                return new ResponseEntity<>(INTERNAL_SERVER_ERROR);
        }
    }

    private ResponseEntity<ResponseErrorMessage> getErrorResponse(GroupBaseException exception, HttpStatus status) {
        ResponseErrorMessage error = new ResponseErrorMessage(exception.getFailMessage().toString(), status.toString());
        return new ResponseEntity<>(error, status);
    }
}
