package pl.nasza.uczelnia.project.entrypoint.posts;

import lombok.Data;
import lombok.NoArgsConstructor;
import pl.nasza.uczelnia.project.entrypoint.user.UserDto;

import java.time.LocalDateTime;
import java.util.UUID;


@Data
@NoArgsConstructor
public class CommentDto {

    private UUID id;
    private String content;
    private UserDto author;
    private LocalDateTime creationDate;

}
