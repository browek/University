package pl.nasza.uczelnia.project.entrypoint.files;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.nasza.uczelnia.project.usecase.files.FilesQueryHandler;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping
public class FilesQueryController {

    private final FilesQueryHandler filesQueryHandler;

    @GetMapping(value = "/files/{id}")
    public ResponseEntity<FileDto> getFile(@PathVariable UUID id) {
        try {
            return ResponseEntity.ok(filesQueryHandler.findById(id));
        } catch (IOException ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/user/{id}/files")
    public ResponseEntity<List<FileDto>> getAllFiles(@PathVariable UUID id) {
        return ResponseEntity.ok(filesQueryHandler.getAllUserFiles(id));
    }

    @GetMapping(value = "/group/{id}/files")
    public ResponseEntity<List<FileDto>> getAllFilesByGroupId(@PathVariable UUID id) {
        return ResponseEntity.ok(filesQueryHandler.getAllGroupFiles(id));

    }

}
