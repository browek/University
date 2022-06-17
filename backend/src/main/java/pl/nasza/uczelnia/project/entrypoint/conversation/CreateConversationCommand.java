package pl.nasza.uczelnia.project.entrypoint.conversation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class CreateConversationCommand {

    private UUID receiverId;
    private String message;

}
