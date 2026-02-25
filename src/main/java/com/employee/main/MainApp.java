package com.employee.main;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import com.employee.service.EmployeeService;

public class MainApp {
    public static void main(String[] args) {
        BeanFactory factory = 
            new ClassPathXmlApplicationContext("beans.xml");
        EmployeeService service = 
            factory.getBean(EmployeeService.class);

        service.createEmployee(101, "Arun", "IT");
        service.createEmployee(102, "Priya", "HR");
        service.displayEmployees();
    }
}