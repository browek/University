package pl.nasza.uczelnia.project.usecase.conversation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.nasza.uczelnia.project.entrypoint.conversation.ConversationResponse;
import pl.nasza.uczelnia.project.entrypoint.conversation.ConversationUserDto;
import pl.nasza.uczelnia.project.infrastructure.domain.conversation.ConversationRepository;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;
import pl.nasza.uczelnia.project.infrastructure.domain.user.UserRepository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConversationQueryHandler {

    private final ConversationRepository conversationRepository;
    private final UserRepository userRepository;

    public List<ConversationResponse> findConversation(User sender, UUID receiverId) {
        return conversationRepository.findConversation(sender.getId(), receiverId).stream().map(c ->
                ConversationResponse.builder()
                        .message(c.getMessage())
                        .date(c.getDate())
                        .sender(createConversationUserDto(c.getSenderId()))
                        .receiver(createConversationUserDto(c.getReceiverId()))
                        .build()
        ).collect(Collectors.toList());
    }

    private ConversationUserDto createConversationUserDto(UUID userId) {
        User user = userRepository.findById(userId).get();
        return ConversationUserDto.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .build();
    }
}
