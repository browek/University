package pl.nasza.uczelnia.project.config;

import lombok.NoArgsConstructor;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;

import java.util.Optional;

@Component
@NoArgsConstructor
public class AuditorAwareImpl implements AuditorAware<User> {

    @Override
    public Optional<User> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getPrincipal().equals("anonymousUser")) {
            return Optional.empty();
        }

        return Optional.of(((User) authentication.getPrincipal()));
    }


}
