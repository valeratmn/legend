CREATE TABLE IF NOT EXISTS gifts (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
balance DECIMAL(10, 2),
dateUntil DATE,
nominal DECIMAL(10, 2)
);