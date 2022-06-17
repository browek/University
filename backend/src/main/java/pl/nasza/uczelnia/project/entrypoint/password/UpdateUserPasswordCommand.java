package pl.nasza.uczelnia.project.entrypoint.password;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserPasswordCommand {

    private String password;
    private String repeatPassword;
    private String email;
}
