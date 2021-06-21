package com.siy.siyresource.domain.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.siy.siyresource.domain.entity.post.Post;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

import java.time.LocalDateTime;

import static javax.persistence.FetchType.*;


@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@ToString(of = {"content"})
@Table(name = "APPLICATION")
@EntityListeners(AuditingEntityListener.class)
public class Application {

    @Id
    @GeneratedValue
    @Column(name = "application_id")
    private Long id;

    private String content;

    @CreatedDate
    private LocalDateTime createdAt; //생성 시간

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "post_id")
    @JsonIgnore
    private Post post;

    private String username;

    public Application(String username, String content, Post post) {
        this.content = content;
        this.post = post;
        this.username = username;
        post.getApplications().add(this);
    }


}
