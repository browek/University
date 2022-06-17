package pl.nasza.uczelnia.project.entrypoint.password;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.nasza.uczelnia.project.usecase.password.PasswordResetUsecase;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("users/password")
public class PasswordResetController {

    private final PasswordResetUsecase passwordResetUsecase;

    @PostMapping
    public void resetPassword(@RequestBody @Valid PasswordResetCommand passwordResetCommand) {
        passwordResetUsecase.resetPassword(passwordResetCommand);
    }

    @PutMapping
    public void updatePassword(@RequestBody @Valid UpdateUserPasswordCommand password, @RequestParam String token) {
        passwordResetUsecase.updatePassword(password, token);
    }


}
