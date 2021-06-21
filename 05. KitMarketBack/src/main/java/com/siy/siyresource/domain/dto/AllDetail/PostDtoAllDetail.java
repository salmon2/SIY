package com.siy.siyresource.domain.dto.AllDetail;

import com.siy.siyresource.domain.dto.ParticipantsDetail;
import com.siy.siyresource.domain.dto.ApplicationDto;
import com.siy.siyresource.domain.entity.post.Post;
import com.siy.siyresource.domain.entity.post.Study.Study;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import static java.time.temporal.ChronoUnit.DAYS;

@Getter
@Setter
@NoArgsConstructor
public class PostDtoAllDetail {
    private Long id;
    private String writer;
    private String title;
    private String content;
    private String dueDate;
    private String deadLine;
    private String createdAt;
    private Integer maxNum;
    private Integer curNum;
    private String category;
    private String status;

    // 대기 중인사람
    private Set<ParticipantsDetail> participants = new HashSet<>();
    private Set<ApplicationDto> applications = new HashSet<>();


    public String calDeadLine(LocalDateTime deadLine){
        LocalDate currentDay = LocalDate.now();

        long between = DAYS.between(currentDay, deadLine);

        return String.valueOf(between);
    }

    public  PostDtoAllDetail(Post post, Set<ApplicationDto> application, Set<ParticipantsDetail> participants) {
        this.id = post.getId();
        this.writer = post.getWriter();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.dueDate = calDeadLine(post.getDueDate());
        this.deadLine = post.getDueDate().toString();
        this.createdAt = post.getCreatedAt().toString();
        this.maxNum = post.getMaxNumber();
        this.curNum = post.getCurrentNumber();
        this.category = post.getCategory();
        this.status = post.getPostStatus().toString();

        this.applications = application;
        this.participants = participants;
    }
}
