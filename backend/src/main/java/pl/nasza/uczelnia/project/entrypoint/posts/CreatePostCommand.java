package pl.nasza.uczelnia.project.entrypoint.posts;

import lombok.Getter;

import java.util.UUID;

@Getter
public class CreatePostCommand {
    private String title;
    private String content;
    private UUID groupId;
}
