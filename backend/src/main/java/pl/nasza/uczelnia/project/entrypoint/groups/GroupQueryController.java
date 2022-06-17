package pl.nasza.uczelnia.project.entrypoint.groups;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;
import pl.nasza.uczelnia.project.usecase.group.GroupQueryHandler;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/groups")
public class GroupQueryController {

    private final GroupQueryHandler groupQueryHandler;

    @GetMapping("/{id}")
    public ResponseEntity<GroupWithUsersDto> getGroup(@PathVariable UUID id){
        return ResponseEntity.ok(groupQueryHandler.getGroup(id));
    }

    @GetMapping("/list")
    public ResponseEntity<List<GroupDto>> getAllGruops() {
        return ResponseEntity.ok(groupQueryHandler.getAllGroups());
    }

    @GetMapping("/own")
    public ResponseEntity<List<GroupDto>> getGroupsByOwner(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(groupQueryHandler.getGroupsByOwner(user));
    }
}
