package com.example.studentservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class StudentController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/students")
    public String getStudents() {
        return "Student Service Running Successfully";
    }

    @GetMapping("/course-info")
    public String courseInfo() {
        return restTemplate.getForObject("http://course-service/courses", String.class);
    }
}
