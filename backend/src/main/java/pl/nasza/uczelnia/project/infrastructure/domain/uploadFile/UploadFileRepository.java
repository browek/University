package pl.nasza.uczelnia.project.infrastructure.domain.uploadFile;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;

import java.util.List;
import java.util.UUID;

public interface UploadFileRepository extends JpaRepository<UploadFile, UUID> {
    List<UploadFile> findAllByUser(User user);
    List<UploadFile> findAllByGroupId(UUID groupId);
}
