package pl.nasza.uczelnia.project.infrastructure.domain.uploadFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.nasza.uczelnia.project.infrastructure.domain.post.Post;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@Entity
@Table(name = "upload_file")
@NoArgsConstructor
@AllArgsConstructor
public class UploadFile {

    @Id
    @GeneratedValue
    private UUID id;

    @NotBlank
    private String name;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotBlank
    private String path;

    private LocalDateTime creationDate;

    @OneToOne(mappedBy = "uploadFile")
    private Post post;

    private UUID groupId;

    public UploadFile(String name, User user, String path) {
        this.name = name;
        this.user = user;
        this.path = path;
    }

}
