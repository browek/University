package pl.nasza.uczelnia.project.entrypoint.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
class UserGroupDto {
    private UUID id;
    private String name;
}
