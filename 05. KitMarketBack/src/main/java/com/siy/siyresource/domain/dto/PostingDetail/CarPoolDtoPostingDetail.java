package com.siy.siyresource.domain.dto.PostingDetail;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import com.siy.siyresource.domain.dto.ApplicationDto;
import com.siy.siyresource.domain.dto.DepartTime;
import com.siy.siyresource.domain.entity.post.CarPool.CarPool;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embedded;
import java.util.Set;

@Data
@NoArgsConstructor
public class CarPoolDtoPostingDetail extends PostDtoPostingDetail {
    private String Gender;
    private String fare;
    private String departure;
    private String destination;

    @Embedded
    private DepartTime departTime;

    @JsonProperty("long")
    private Double Long;

    private Double lat;

    @QueryProjection
    public CarPoolDtoPostingDetail(CarPool carPool, Set<ApplicationDto> applications){
        super(carPool, applications);

        this.Gender = carPool.getQualifyGender().toString();
        this.fare = carPool.getFare().toString();
        this.departure = carPool.getDeparture();
        this.destination = carPool.getDestination();
        this.departTime = DepartTime.LocalDateTimeToDepartTime(carPool.getDepartHours(), carPool.getDepartMinutes());
        this.Long = carPool.getLong_();
        this.lat = carPool.getLat();
    }

}
