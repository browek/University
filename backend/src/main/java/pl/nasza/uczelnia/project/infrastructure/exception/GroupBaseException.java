package pl.nasza.uczelnia.project.infrastructure.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class GroupBaseException extends RuntimeException {

    private final Message failMessage;

    public enum Message {
       GROUP_NOT_EXISTS
    }
}
