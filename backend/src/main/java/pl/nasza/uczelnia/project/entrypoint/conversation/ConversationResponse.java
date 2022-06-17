package pl.nasza.uczelnia.project.entrypoint.conversation;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConversationResponse {

    private ConversationUserDto sender;
    private ConversationUserDto receiver;
    private String message;
    private LocalDateTime date;

}
