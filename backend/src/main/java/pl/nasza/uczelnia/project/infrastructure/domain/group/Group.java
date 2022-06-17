package pl.nasza.uczelnia.project.infrastructure.domain.group;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.nasza.uczelnia.project.infrastructure.domain.post.Post;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@Entity
@Table(name = "groups")
@NoArgsConstructor
@AllArgsConstructor
public class Group {

    @Id
    @GeneratedValue
    private UUID id;

    @NotNull
    private String name;

    @NotNull
    @ManyToOne
    @JoinColumn(name= "user_id", nullable = false)
    private User owner;

    @ManyToMany()
    @JoinTable(
            name = "user_group",
            joinColumns = @JoinColumn(name = "group_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    private List<User> users = new ArrayList<>();

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
    private List<Post> posts = new ArrayList<>();
}
