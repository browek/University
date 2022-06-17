package pl.nasza.uczelnia.project.entrypoint.groups;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;
import pl.nasza.uczelnia.project.usecase.group.GroupCommandHandler;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/groups")
public class GroupCommandController {

    private final GroupCommandHandler groupCommandHandler;

    @PostMapping
    public void createEmptyGroup(@RequestBody CreateGroupCommand createGroupCommand, @AuthenticationPrincipal User user) {
        groupCommandHandler.createEmptyGroup(createGroupCommand, user);
    }

    @PostMapping("/{groupId}/addUsers")
    public void addUsersToGroup(@PathVariable UUID groupId, @RequestBody AddUsersToGroupCommand command) {
        groupCommandHandler.addUsersToGroup(groupId, command);
    }
}
