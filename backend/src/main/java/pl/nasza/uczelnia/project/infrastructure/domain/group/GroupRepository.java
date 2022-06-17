package pl.nasza.uczelnia.project.infrastructure.domain.group;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;

import java.util.List;
import java.util.UUID;

public interface GroupRepository extends JpaRepository<Group, UUID> {

    List<Group> findAll();
    List<Group> findAllByOwner(User user);


}
