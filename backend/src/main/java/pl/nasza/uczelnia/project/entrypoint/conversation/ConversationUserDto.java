package pl.nasza.uczelnia.project.entrypoint.conversation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConversationUserDto {

    private String firstName;
    private String lastName;
    private String email;
}
