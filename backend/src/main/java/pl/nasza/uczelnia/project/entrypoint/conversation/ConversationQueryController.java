package pl.nasza.uczelnia.project.entrypoint.conversation;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;
import pl.nasza.uczelnia.project.usecase.conversation.ConversationQueryHandler;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/conversation")
public class ConversationQueryController {

    private final ConversationQueryHandler conversationQueryHandler;

    @GetMapping("/{senderId}")
    public List<ConversationResponse> findConversation(@AuthenticationPrincipal User user, @PathVariable("senderId") UUID senderId) {
        return conversationQueryHandler.findConversation(user, senderId);
    }
}
