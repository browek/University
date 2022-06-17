package pl.nasza.uczelnia.project.entrypoint.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;
import pl.nasza.uczelnia.project.usecase.user.CreateUserCommand;
import pl.nasza.uczelnia.project.usecase.user.UserCommandHandler;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/users")
@Slf4j
@RequiredArgsConstructor
public class UserCommandController {

    private final UserCommandHandler userCommandHandler;

    @PostMapping(path = "/registration")
    public void createUser(@Valid @RequestBody CreateUserCommand createUserCommand) {
        log.debug("create user with name:{}", createUserCommand.getEmail());
        userCommandHandler.create(createUserCommand);
    }

    @PutMapping("/update")
    public void updateUser(@RequestBody EditUserCommand editUserCommand,
                           @AuthenticationPrincipal User user) {
        userCommandHandler.partialUpdate(editUserCommand, user);
    }
}
