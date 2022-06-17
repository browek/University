package pl.nasza.uczelnia.project.entrypoint.posts;

import lombok.Data;
import lombok.NoArgsConstructor;
import pl.nasza.uczelnia.project.entrypoint.user.UserDto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;


@Data
@NoArgsConstructor
public class PostsWithCommentsDto {

    private UUID id;
    private String title;
    private String content;
    private UserDto author;
    private LocalDateTime creationDate;
    private List<CommentDto> comments;
    private String fileName;
    private UUID fileId;

}
