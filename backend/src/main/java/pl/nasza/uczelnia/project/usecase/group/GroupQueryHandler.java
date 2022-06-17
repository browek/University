package pl.nasza.uczelnia.project.usecase.group;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import pl.nasza.uczelnia.project.core.ExceptionFactory;
import pl.nasza.uczelnia.project.entrypoint.groups.GroupDto;
import pl.nasza.uczelnia.project.entrypoint.groups.GroupWithUsersDto;
import pl.nasza.uczelnia.project.infrastructure.domain.group.GroupRepository;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupQueryHandler {

    private final ModelMapper modelMapper;
    private final GroupRepository groupRepository;

    public List<GroupDto> getAllGroups() {
        return groupRepository.findAll().stream().map(group ->
                modelMapper.map(group, GroupDto.class)).collect(Collectors.toList());
    }

    public GroupWithUsersDto getGroup(UUID id) {
        return modelMapper.map(groupRepository.findById(id).orElseThrow(ExceptionFactory::groupNotExists), GroupWithUsersDto.class);
    }

    public List<GroupDto> getGroupsByOwner(User user) {
        return groupRepository.findAllByOwner(user).stream().map(group ->
                modelMapper.map(group, GroupDto.class)).collect(Collectors.toList());
    }

}
