package pl.nasza.uczelnia.project.infrastructure.domain.post;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {

    List<Post> findAllByGroup_Id(UUID groupId);

    List<Post> findAllByAuthorId(UUID authorId);
}
