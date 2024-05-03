CREATE TABLE IF NOT EXISTS campaigns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    giftsCount INT,
    daysToTakeGift INT,
    daysToReceiveGift INT,
    cardNumbers TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    giftId INT,
    FOREIGN KEY (giftId) REFERENCES gifts(id)
);

