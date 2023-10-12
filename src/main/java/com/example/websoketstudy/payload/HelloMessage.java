package com.example.websoketstudy.payload;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class HelloMessage {

    private String name;

    public HelloMessage(String name) {
        this.name = name;
    }

}
