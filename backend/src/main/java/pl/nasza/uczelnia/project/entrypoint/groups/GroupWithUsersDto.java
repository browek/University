package pl.nasza.uczelnia.project.entrypoint.groups;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;

import java.util.List;
import java.util.UUID;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class GroupWithUsersDto {

    private UUID id;
    private String name;
    private User owner;
    private List<User> users;
}
