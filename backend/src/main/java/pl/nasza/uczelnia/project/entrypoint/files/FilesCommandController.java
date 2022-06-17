package pl.nasza.uczelnia.project.entrypoint.files;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;
import pl.nasza.uczelnia.project.usecase.files.FilesCommandHandler;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/files")
public class FilesCommandController {

    private final FilesCommandHandler filesCommandHandler;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> savePhoto(@RequestPart("file") MultipartFile file,
                                       @AuthenticationPrincipal User user) throws IOException {
       // filesCommandHandler.save(file, user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
