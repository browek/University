package pl.nasza.uczelnia.project.usecase.posts;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.nasza.uczelnia.project.entrypoint.posts.CreateCommentCommand;
import pl.nasza.uczelnia.project.entrypoint.posts.CreatePostCommand;
import pl.nasza.uczelnia.project.infrastructure.domain.group.GroupRepository;
import pl.nasza.uczelnia.project.infrastructure.domain.post.Comment;
import pl.nasza.uczelnia.project.infrastructure.domain.post.CommentRepository;
import pl.nasza.uczelnia.project.infrastructure.domain.post.Post;
import pl.nasza.uczelnia.project.infrastructure.domain.post.PostRepository;
import pl.nasza.uczelnia.project.infrastructure.domain.uploadFile.UploadFile;
import pl.nasza.uczelnia.project.infrastructure.domain.uploadFile.UploadFileRepository;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;
import pl.nasza.uczelnia.project.usecase.files.FilesCommandHandler;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PostCommandHandler {

    private final PostRepository postRepository;
    private final ModelMapper modelMapper;
    private final FilesCommandHandler filesCommandHandler;
    private final CommentRepository commentRepository;
    private final GroupRepository groupRepository;
    private final UploadFileRepository uploadFileRepository;

    public void saveSinglePost(CreatePostCommand createPostCommand, User user) {
        Post post = modelMapper.map(createPostCommand, Post.class);
        post.setAuthor(user);
        post.setCreationDate(LocalDateTime.now());

        postRepository.save(createPost(createPostCommand, user));
    }

    //TODO refactor
    public void savePostWithFile(MultipartFile file, String title, String content, String groupId, User user) throws IOException {
        UploadFile uploadFile = filesCommandHandler.save(file, user, groupId);
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setAuthor(user);
        post.setCreationDate(LocalDateTime.now());
        post.setUploadFile(uploadFile);

        if(!groupId.equals("empty")){
            post.setGroup(groupRepository.getOne(UUID.fromString(groupId)));
        }

        postRepository.save(post);
    }

    public void saveComment(CreateCommentCommand command, User user) {
        commentRepository.save(Comment.builder()
                .author(user)
                .content(command.getContent())
                .creationDate(LocalDateTime.now())
                .post(postRepository.getOne(command.getPostId()))
                .build());
    }

    //TODO refactor
    public void deletePost(UUID id) {
        if (postRepository.findById(id).get().getUploadFile() != null) {
            uploadFileRepository.deleteById(postRepository.findById(id).get().getUploadFile().getId());
            postRepository.deleteById(id);
        } else {
            postRepository.deleteById(id);
        }
    }

    public void deleteComment(UUID id) {
        commentRepository.deleteById(id);
    }

    private Post createPost(CreatePostCommand createPostCommand, User user) {
        Post post = modelMapper.map(createPostCommand, Post.class);
        post.setAuthor(user);
        post.setCreationDate(LocalDateTime.now());
        return post;
    }

}
