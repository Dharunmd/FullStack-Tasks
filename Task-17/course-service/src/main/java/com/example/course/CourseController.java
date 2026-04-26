package com.example.course;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/course")
public class CourseController {

    @Autowired
    private RestTemplate restTemplate;

    private static final String STUDENT_SERVICE_URL = "http://localhost:8081/students/";

    @GetMapping("/student/{id}")
    @CircuitBreaker(name = "studentService", fallbackMethod = "studentFallback")
    public Object getStudentFromCourse(@PathVariable Long id) {
        return restTemplate.getForObject(STUDENT_SERVICE_URL + id, Object.class);
    }

    public Object studentFallback(Long id, Exception e) {
        return "Fallback Response: Student Service is currently unavailable. " +
               "Please try again later. Error: " + e.getMessage();
    }
}

@Configuration
class AppConfig {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
