package pl.nasza.uczelnia.project.infrastructure.domain.password;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByToken(String token);

    Optional<PasswordResetToken> findByUserId(UUID id);

    void deleteByExpiryDateBefore(LocalDateTime now);

    Optional<PasswordResetToken> findByUserIdAndExpiryDateBefore(UUID id, LocalDateTime now);
}
