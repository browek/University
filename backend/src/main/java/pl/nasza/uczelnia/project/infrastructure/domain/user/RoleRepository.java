package pl.nasza.uczelnia.project.infrastructure.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {
    Role findByName(Role.RoleType name);
}
