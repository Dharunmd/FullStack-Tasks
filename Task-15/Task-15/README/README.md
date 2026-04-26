Eureka Server and User Service

This workspace contains two Maven projects:

1. eureka-server - A Spring Boot application acting as a Netflix Eureka Server (port 8761).
2. user-service - A Spring Boot microservice that registers with the Eureka Server (port 8081).

How to run:

- Build each project: mvn clean package
- Run the Eureka server: mvn spring-boot:run (in eureka-server folder)
- Run the user service: mvn spring-boot:run (in user-service folder)

Verify:
- Access Eureka dashboard: http://localhost:8761
- Verify user-service registers and call: http://localhost:8081/users
