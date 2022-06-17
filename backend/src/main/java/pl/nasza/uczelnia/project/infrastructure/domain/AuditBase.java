package pl.nasza.uczelnia.project.infrastructure.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import pl.nasza.uczelnia.project.infrastructure.domain.user.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

@MappedSuperclass
@AllArgsConstructor
@NoArgsConstructor
@Data
@EntityListeners(AuditingEntityListener.class)
public abstract class AuditBase {

    @Id
    @GeneratedValue
    private UUID id;

    @CreatedDate
    @NotNull
    @Column(name = "creation_time")
    private LocalDateTime createdOn = LocalDateTime.now();

    @LastModifiedDate
    @NotNull
    @Column(name = "modification_time")
    private LocalDateTime modifiedOn = LocalDateTime.now();

//    @CreatedBy
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "created_by")
//    private User createdBy;
//
//    @LastModifiedBy
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "modified_by")
//    private User modifiedBy;

}