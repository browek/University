package pl.nasza.uczelnia.project.entrypoint.posts;

import lombok.Getter;

import java.util.UUID;

@Getter
public class CreateCommentCommand {

   private String content;
   private UUID postId;
}
