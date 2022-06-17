package pl.nasza.uczelnia.project.entrypoint.posts;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;
import pl.nasza.uczelnia.project.usecase.posts.PostCommandHandler;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostCommandController {

    private final PostCommandHandler postCommandHandler;

    @PostMapping
    public void saveSinglePost(@RequestBody CreatePostCommand command, @AuthenticationPrincipal User user) {
        postCommandHandler.saveSinglePost(command, user);
    }

    @PostMapping(value = "/file", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> savePostWithFile(@RequestPart("file") MultipartFile file,
                                              @RequestPart("title") String title,
                                              @RequestPart("content") String content,
                                              @RequestPart("groupId") String groupId,
                                              @AuthenticationPrincipal User user) throws IOException {
        postCommandHandler.savePostWithFile(file, title, content, groupId, user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/comment")
    public void saveComment(@RequestBody CreateCommentCommand command, @AuthenticationPrincipal User user) {
        postCommandHandler.saveComment(command, user);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable("id") UUID id){
        postCommandHandler.deletePost(id);
    }
}
