CREATE TABLE Student (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

INSERT INTO Student (id, name, email) VALUES (1, 'John Doe', 'john.doe@example.com');
INSERT INTO Student (id, name, email) VALUES (2, 'Jane Smith', 'jane.smith@example.com');
