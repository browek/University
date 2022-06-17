package pl.nasza.uczelnia.project.usecase.conversation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.nasza.uczelnia.project.entrypoint.conversation.CreateConversationCommand;
import pl.nasza.uczelnia.project.infrastructure.domain.conversation.Conversation;
import pl.nasza.uczelnia.project.infrastructure.domain.conversation.ConversationRepository;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ConversationCommandHandler {

    private final ConversationRepository conversationRepository;

    public void createMessage(CreateConversationCommand command, User user) {
        conversationRepository.save(Conversation.builder()
                .senderId(user.getId())
                .receiverId(command.getReceiverId())
                .message(command.getMessage())
                .date(LocalDateTime.now())
                .build());
    }


}
