package pl.nasza.uczelnia.project.entrypoint.files;

import lombok.Data;
import lombok.NoArgsConstructor;
import pl.nasza.uczelnia.project.entrypoint.user.UserDto;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
public class FileDto {

        private UUID id;
        private String name;
        private UserDto user;
        private LocalDateTime creationDate;
        private byte[] file;

}
