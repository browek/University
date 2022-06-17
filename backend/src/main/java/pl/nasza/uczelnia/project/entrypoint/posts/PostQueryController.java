package pl.nasza.uczelnia.project.entrypoint.posts;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.nasza.uczelnia.project.usecase.posts.PostQueryHandler;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping
public class PostQueryController {

    private final PostQueryHandler postQueryHandler;

    @GetMapping("/group/{groupId}/posts")
    public ResponseEntity<List<PostsWithCommentsDto>> getGroupPosts(@PathVariable("groupId") UUID groupId) {
        return ResponseEntity.ok(postQueryHandler.getGroupPosts(groupId));
    }

    @GetMapping("/user/{userId}/posts")
    public ResponseEntity<List<PostsWithCommentsDto>> getUserPosts(@PathVariable("userId") UUID userId) {
        return ResponseEntity.ok(postQueryHandler.getUserPosts(userId));
    }

}
