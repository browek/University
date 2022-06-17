package pl.nasza.uczelnia.project.usecase.files;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.nasza.uczelnia.project.infrastructure.domain.uploadFile.UploadFile;
import pl.nasza.uczelnia.project.infrastructure.domain.uploadFile.UploadFileRepository;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FilesCommandHandler {


    private final UploadFileRepository uploadFileRepository;

    @Transactional
    public UploadFile save(MultipartFile file, User user, String groupId) throws IOException {

        UploadFile uploadFile = uploadFileRepository.save(new UploadFile(file.getOriginalFilename(), user, "x"));

        Path filePath = Paths.get("src/main/resources/files"
                + "/" + user.getUsername()
                + "/" + UUID.randomUUID()
                + "/" + file.getOriginalFilename());
        Files.createDirectories(filePath.getParent());
        new File(filePath.toString());
        Files.write(filePath, file.getBytes());

        uploadFile.setPath(filePath.toString());
        uploadFile.setCreationDate(LocalDateTime.now());

        if (!groupId.equals("empty")) {
            uploadFile.setGroupId(UUID.fromString(groupId));
        }
        return uploadFileRepository.save(uploadFile);
    }


}
