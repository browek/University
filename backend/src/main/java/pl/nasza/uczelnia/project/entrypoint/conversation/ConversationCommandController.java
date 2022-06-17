package pl.nasza.uczelnia.project.entrypoint.conversation;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;
import pl.nasza.uczelnia.project.usecase.conversation.ConversationCommandHandler;

@RestController
@RequiredArgsConstructor
@RequestMapping("/conversation")
public class ConversationCommandController {

    private final ConversationCommandHandler conversationCommandHandler;

    @PostMapping
    public ResponseEntity<?> saveMessage(@RequestBody CreateConversationCommand command,
                                         @AuthenticationPrincipal User user) {
        conversationCommandHandler.createMessage(command, user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
