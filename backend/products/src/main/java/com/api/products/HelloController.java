package com.api.products;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/products")
    public String hello() {
        return "Hello from " + System.getenv("HOSTNAME");
    }
}
