package pl.nasza.uczelnia.project.usecase.user;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Data
public class CreateUserCommand {

    @Length(min = 1)
    private String firstName;
    @Length(min = 1)
    private String lastName;
    @Length(min = 6)
    private String password;
    @Email
    @Length(max = 32)
    private String email;
    @NotNull
    private String role;
    private String department;
    private String subject;
    private String college;
}
