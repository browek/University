package pl.nasza.uczelnia.project.entrypoint.password;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class PasswordResetCommand {

    @NotBlank
    @Email
    private String email;
}