package com.example.websoketstudy.payload;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class Greeting {

    private String content;

    public Greeting(String content) {
        this.content = content;
    }

}
