package pl.nasza.uczelnia.project.core;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import pl.nasza.uczelnia.project.infrastructure.exception.GroupBaseException;
import pl.nasza.uczelnia.project.infrastructure.exception.UserBaseException;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ExceptionFactory {

    public static UserBaseException userExists() {
        return new UserBaseException(UserBaseException.Message.USER_ALREADY_EXISTS);
    }

    public static UserBaseException wrongPasswordFormat() {
        return new UserBaseException(UserBaseException.Message.WRONG_PASSWORD_FORMAT);
    }

    public static UserBaseException emailNotExists() {
        return new UserBaseException(UserBaseException.Message.EMAIL_NOT_EXISTS);
    }

    public static UserBaseException tokenNotFound() {
        return new UserBaseException(UserBaseException.Message.TOKEN_NOT_FOUND);
    }

    public static UserBaseException tokenAlreadyAssigned() {
        return new UserBaseException(UserBaseException.Message.TOKEN_ALREADY_ASSIGNED);
    }

    public static UserBaseException tokenExpired() {
        return new UserBaseException(UserBaseException.Message.TOKEN_EXPIRED);
    }

    public static UserBaseException notUsersToken() {
        return new UserBaseException(UserBaseException.Message.NOT_USER_TOKEN);
    }

    public static UserBaseException passwordsAreNotTheSame() {
        return new UserBaseException(UserBaseException.Message.PASSWORDS_ARE_NOT_THE_SAME);
    }

    public static GroupBaseException groupNotExists() {
        return new GroupBaseException(GroupBaseException.Message.GROUP_NOT_EXISTS);
    }

}
