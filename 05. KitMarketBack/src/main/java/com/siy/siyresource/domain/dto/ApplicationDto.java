package com.siy.siyresource.domain.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ApplicationDto {
    private Long id;

    private String username;
    private String content;
    private String createdAt; //어플리케이션 시간



    @QueryProjection
    public ApplicationDto(Long id, String content, LocalDateTime createdAt, String username) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt.toString();
        this.username = username;
    }
}
