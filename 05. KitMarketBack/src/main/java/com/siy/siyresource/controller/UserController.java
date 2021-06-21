package com.siy.siyresource.controller;

import com.siy.siyresource.domain.condition.AccountSearchCondition;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {

    @GetMapping(value = "/user")
    public String findAllUser() {
        return "asdf";
    }
}
