package pl.nasza.uczelnia.project.infrastructure.domain.user;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import pl.nasza.uczelnia.project.infrastructure.domain.AuditBase;
import pl.nasza.uczelnia.project.infrastructure.domain.group.Group;
import pl.nasza.uczelnia.project.infrastructure.domain.post.Comment;
import pl.nasza.uczelnia.project.infrastructure.domain.post.Post;
import pl.nasza.uczelnia.project.infrastructure.domain.uploadFile.UploadFile;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.*;
import java.util.stream.Collectors;

@Data
@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
public class User extends AuditBase implements UserDetails {

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    @Email
    private String email;

    @JsonIgnore
    @NotBlank
    private String password;

    private String subject;

    private String department;

    private String college;

    @JsonIgnore
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
    private List<Post> posts;

    @JsonIgnore
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
    private List<Comment> comments;

    @JsonIgnore
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Group> ownGroups;

    @JsonIgnore
    @ManyToMany(mappedBy = "users" ,fetch = FetchType.EAGER)
    private List<Group> groups;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UploadFile> files;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<Role> roles;

    private boolean enabled;

    private boolean accountNonExpired;

    private boolean accountNonLocked;

    private boolean credentialsNonExpired;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        this.roles.stream().forEach(role ->
                authorities.add(new SimpleGrantedAuthority(role.getName().name()))
        );
        return authorities;
    }

    public List<Role> getRoles() {
        return roles.stream().collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return email;
    }
}
