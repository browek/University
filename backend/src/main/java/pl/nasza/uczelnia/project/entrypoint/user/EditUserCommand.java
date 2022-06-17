package pl.nasza.uczelnia.project.entrypoint.user;

import lombok.Getter;

import java.util.Optional;

@Getter
public class EditUserCommand {

    private Optional<String> firstName;
    private Optional<String> lastName;
    private Optional<String> email;
    private Optional<String> subject;
    private Optional<String> department;
    private Optional<String> college;
}
