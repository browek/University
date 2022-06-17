package pl.nasza.uczelnia.project.usecase.user;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import pl.nasza.uczelnia.project.entrypoint.user.UserDto;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;
import pl.nasza.uczelnia.project.infrastructure.domain.user.UserRepository;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserQueryHandler {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public UserDto findById(UUID id) {
        return modelMapper.map(userRepository.findById(id).get(), UserDto.class);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }
}
