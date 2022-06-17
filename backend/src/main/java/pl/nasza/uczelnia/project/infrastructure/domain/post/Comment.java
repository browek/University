package pl.nasza.uczelnia.project.infrastructure.domain.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Builder
@Table(name = "comments")
@NoArgsConstructor
@AllArgsConstructor
public class Comment {


    @Id
    @GeneratedValue
    private UUID id;

    private String content;

    @ManyToOne(optional = false)
    @JoinColumn(name = "author_id")
    private User author;

    private LocalDateTime creationDate;

    @ManyToOne(optional = false)
    @JoinColumn(name = "post_id")
    private Post post;
}
