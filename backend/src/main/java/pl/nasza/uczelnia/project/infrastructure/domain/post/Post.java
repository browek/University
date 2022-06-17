package pl.nasza.uczelnia.project.infrastructure.domain.post;

import lombok.Data;
import lombok.NoArgsConstructor;
import pl.nasza.uczelnia.project.infrastructure.domain.group.Group;
import pl.nasza.uczelnia.project.infrastructure.domain.uploadFile.UploadFile;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "posts")
@NoArgsConstructor
public class Post {

    @Id
    @GeneratedValue
    private UUID id;

    private String title;

    private String content;

    @JoinColumn(name = "author_id")
    @ManyToOne(optional = false)
    private User author;

    private LocalDateTime creationDate;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @JoinColumn(name = "group_id")
    @ManyToOne
    private Group group;

    @JoinColumn(name = "file_id")
    @OneToOne
    private UploadFile uploadFile;

}
