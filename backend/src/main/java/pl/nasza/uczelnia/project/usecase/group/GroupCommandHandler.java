package pl.nasza.uczelnia.project.usecase.group;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.nasza.uczelnia.project.core.ExceptionFactory;
import pl.nasza.uczelnia.project.entrypoint.groups.AddUsersToGroupCommand;
import pl.nasza.uczelnia.project.entrypoint.groups.CreateGroupCommand;
import pl.nasza.uczelnia.project.infrastructure.domain.group.Group;
import pl.nasza.uczelnia.project.infrastructure.domain.group.GroupRepository;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;
import pl.nasza.uczelnia.project.infrastructure.domain.user.UserRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GroupCommandHandler {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    public void createEmptyGroup(CreateGroupCommand createGroupCommand, User user) {
        groupRepository.save(Group.builder()
                .name(createGroupCommand.getName())
                .owner(user)
                .users(new ArrayList<>())
                .build());
    }

    @Transactional
    public void addUsersToGroup(UUID groupId, AddUsersToGroupCommand command) {
        Group group = groupRepository.findById(groupId).orElseThrow(ExceptionFactory::groupNotExists);

        for (UUID uuid : command.getUsersUUID()) {
            if (!group.getUsers().contains(userRepository.getOne(uuid))) {
                group.getUsers().add(userRepository.getOne(uuid));
            }
        }
    }
}
