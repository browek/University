package pl.nasza.uczelnia.project.usecase.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pl.nasza.uczelnia.project.core.ExceptionFactory;
import pl.nasza.uczelnia.project.entrypoint.user.EditUserCommand;
import pl.nasza.uczelnia.project.infrastructure.domain.user.Role;
import pl.nasza.uczelnia.project.infrastructure.domain.user.RoleRepository;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;
import pl.nasza.uczelnia.project.infrastructure.domain.user.UserRepository;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UserCommandHandler {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public void create(@Valid CreateUserCommand createUserCommand) {
        checkIfUserIsAlreadyRegistered(createUserCommand.getEmail());

        User userEntity = new User();
        userEntity.setEmail(createUserCommand.getEmail());
        userEntity.setFirstName(createUserCommand.getFirstName());
        userEntity.setLastName(createUserCommand.getLastName());
        userEntity.setPassword("{bcrypt}" + bCryptPasswordEncoder.encode(createUserCommand.getPassword()));
        userEntity.setDepartment(createUserCommand.getDepartment());
        userEntity.setCollege(createUserCommand.getCollege());
        userEntity.setSubject(createUserCommand.getSubject());
        userEntity.setAccountNonExpired(true);
        userEntity.setAccountNonLocked(true);
        userEntity.setCredentialsNonExpired(true);
        userEntity.setEnabled(true);
        if (createUserCommand.getRole().equals("TEACHER")) {
            userEntity.setRoles(new HashSet<>(Arrays.asList(roleRepository.findByName(Role.RoleType.TEACHER))));
        } else {
            userEntity.setRoles(new HashSet<>(Arrays.asList(roleRepository.findByName(Role.RoleType.STUDENT))));
        }
        userRepository.save(userEntity);
    }

    public void partialUpdate(EditUserCommand editUserCommand, User user) {

        if (editUserCommand.getFirstName().isPresent()) {
            user.setFirstName(editUserCommand.getFirstName().get());
        }
        if (editUserCommand.getLastName().isPresent()) {
            user.setLastName(editUserCommand.getLastName().get());
        }
        if (editUserCommand.getCollege().isPresent()) {
            user.setCollege(editUserCommand.getCollege().get());
        }
        if (editUserCommand.getDepartment().isPresent()) {
            user.setDepartment(editUserCommand.getDepartment().get());
        }
        if (editUserCommand.getSubject().isPresent()) {
            user.setSubject(editUserCommand.getSubject().get());
        }
        if (editUserCommand.getEmail().isPresent()) {
            user.setEmail(editUserCommand.getEmail().get());
        }

        userRepository.save(user);
    }

    private void checkIfUserIsAlreadyRegistered(final String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            throw ExceptionFactory.userExists();
        }
    }
}
