/* Replace with your SQL commands */

/* Tables */
CREATE TABLE IF NOT EXISTS  `message` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `sender_name` VARCHAR(128) NOT NULL,
  `sender_email` VARCHAR(128) NOT NULL,
  `message_text` TEXT NOT NULL,
  `is_read` TINYINT(1) NOT NULL,
  `date` TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);

/* Seed table */
INSERT INTO `message` (sender_name, sender_email, message_text, is_read) VALUES
    ('Amir Hosein', 'ahosein.salimi@gmail.com', 'This is a message', 0),
    ('Amir Mohammad', 'amohammad.salimi@gmail.com', 'This is a message', 0),
    ('Fatemeh', 'ftad3v@gmail.com', 'This is a message', 1),
    ('Saeed', 'saeedev@gmail.com', 'This is a message', 0),
    ('Milad', 'mikdev@gmail.com', 'This is a message', 1),
    ('Hamid', 'hrbdev@gmail.com', 'This is a message', 0),
    ('Mahboubeh', 'mahidev@gmail.com', 'This is a message', 0),
    ('Amir', 'amiagr@gmail.com', 'This is a message', 0),
    ('Marzieh', 'marzidev@gmail.com', 'This is a message', 1),
    ('Ali', 'aliux@gmail.com', 'This is a message', 1),
    ('Mohammad Amin', 'danshoor@gmail.com', 'This is a message', 0);
