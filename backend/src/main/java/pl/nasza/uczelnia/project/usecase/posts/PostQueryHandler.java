package pl.nasza.uczelnia.project.usecase.posts;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import pl.nasza.uczelnia.project.entrypoint.posts.PostsWithCommentsDto;
import pl.nasza.uczelnia.project.infrastructure.domain.post.PostRepository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostQueryHandler {

    private final PostRepository postRepository;
    private final ModelMapper modelMapper;

    public List<PostsWithCommentsDto> getGroupPosts(UUID groupId) {
        return postRepository.findAllByGroup_Id(groupId)
                .stream()
                .map(post -> {
                    PostsWithCommentsDto dto = modelMapper.map(post, PostsWithCommentsDto.class);
                    if (post.getUploadFile() != null) {
                        dto.setFileName(post.getUploadFile().getName());
                        dto.setFileId(post.getUploadFile().getId());
                    }
                    return dto;
                }).collect(Collectors.toList());
    }


    public List<PostsWithCommentsDto> getUserPosts(UUID userId) {
        return postRepository.findAllByAuthorId(userId)
                .stream()
                .filter(post -> post.getGroup()==null)
                .map(post -> {
                    PostsWithCommentsDto dto = modelMapper.map(post, PostsWithCommentsDto.class);
                    if (post.getUploadFile() != null) {
                        dto.setFileName(post.getUploadFile().getName());
                        dto.setFileId(post.getUploadFile().getId());
                    }
                    return dto;
                }).collect(Collectors.toList());
    }
}
