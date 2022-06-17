package pl.nasza.uczelnia.project.entrypoint.groups;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class AddUsersToGroupCommand {

    private List<UUID> usersUUID;
}
