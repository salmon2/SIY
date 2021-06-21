package com.siy.siyresource.common.api.request;

import lombok.Data;

@Data
public class CreateContestRequest extends CreatePostRequest{
    private String contestCategory;
    private String hostOrganization;
    private String qualification;
    private String homepage;

}
