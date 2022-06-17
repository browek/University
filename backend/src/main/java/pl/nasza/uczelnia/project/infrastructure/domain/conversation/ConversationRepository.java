package pl.nasza.uczelnia.project.infrastructure.domain.conversation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ConversationRepository extends JpaRepository<Conversation, UUID> {

    @Query("select c " +
            "from Conversation c " +
            "where (c.receiverId = :sender or c.senderId = :sender)" +
            "and (c.receiverId = :receiver or c.senderId = :receiver)")
    List<Conversation> findConversation(@Param("sender") UUID sender, @Param("receiver") UUID receiver);
}
