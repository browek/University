package pl.nasza.uczelnia.project.usecase.files;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import pl.nasza.uczelnia.project.entrypoint.files.FileDto;
import pl.nasza.uczelnia.project.infrastructure.domain.uploadFile.UploadFile;
import pl.nasza.uczelnia.project.infrastructure.domain.uploadFile.UploadFileRepository;
import pl.nasza.uczelnia.project.infrastructure.domain.user.UserRepository;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class FilesQueryHandler {

    private final UploadFileRepository uploadFileRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;


    @Transactional
    public FileDto findById(UUID id) throws IOException {
        UploadFile fileEntity = getFile(id);
        FileDto foundfile = modelMapper.map(fileEntity, FileDto.class);

        return getFileInBytes(foundfile, fileEntity);
    }

    public List<FileDto> getAllUserFiles(UUID userId) {
        return uploadFileRepository.findAllByUser(userRepository.getOne(userId)).stream().map(entity-> {
            FileDto foundFile = modelMapper.map(entity, FileDto.class);
            try {
                getFileInBytes(foundFile, entity);
            } catch (IOException e) {
                e.printStackTrace();
            }
            return foundFile;
        }).collect(Collectors.toList());
    }

    public List<FileDto> getAllGroupFiles(UUID groupId) {
        return uploadFileRepository.findAllByGroupId(groupId).stream().map(entity-> {
            FileDto foundFile = modelMapper.map(entity, FileDto.class);
            try {
                getFileInBytes(foundFile, entity);
            } catch (IOException e) {
                e.printStackTrace();
            }
            return foundFile;
        }).collect(Collectors.toList());
    }

    private UploadFile getFile(UUID id) {
        return uploadFileRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    private FileDto getFileInBytes(FileDto fileDto, UploadFile foundfile) throws IOException {
        try {
            byte[] fileInBytes = Files.readAllBytes(Paths.get(foundfile.getPath()));
            fileDto.setFile(fileInBytes);
            return fileDto;
        } catch (IOException ex) {
            throw ex;
        }
    }

}
