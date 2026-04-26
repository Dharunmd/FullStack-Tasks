# Task 23: Vibe Coding & Prompt Engineering

This project demonstrates the application of modern AI-assisted development techniques to build a multi-layered system.

## Project Components

1.  **`student-api/`**: A Spring Boot REST API for managing students.
    - Features: CRUD, Layered Architecture, Validation, Exception Handling, Pagination.
2.  **`cloud-config/`**: AWS CloudFormation template.
    - Resources: S3, EC2, Auto Scaling, Security Groups.
3.  **`student-ml/`**: Python Machine Learning script.
    - Goal: Predict student performance based on study hours and attendance.
4.  **`EVALUATION.md`**: Comparison of prompt engineering styles.

## How to Run

### Spring Boot API
```bash
cd student-api
./gradlew bootRun
```

### Python ML Script
```bash
cd student-ml
python3 predict_performance.py
```
*(Requires: pandas, numpy, scikit-learn)*
