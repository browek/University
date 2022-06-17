package pl.nasza.uczelnia.project.entrypoint.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.nasza.uczelnia.project.infrastructure.domain.user.Role;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private String subject;
    private String department;
    private String college;
    private List<UserGroupDto> groups;
    private Set<Role> roles;
}

