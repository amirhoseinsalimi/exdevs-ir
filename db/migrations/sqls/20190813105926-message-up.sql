/* Replace with your SQL commands */

/* Tables */
CREATE TABLE IF NOT EXISTS  `message` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `sender_name` VARCHAR(128) NOT NULL,
  `sender_email` VARCHAR(128) NOT NULL,
  `message_text` TEXT NOT NULL,
  `is_read` TINYINT(1) NOT NULL,
  `date` DATE NOT NULL,
  `time` TIME NOT NULL,
  PRIMARY KEY (id)
);

/* Seed table */
INSERT INTO `message` (sender_name, sender_email, message_text, is_read, date, time) VALUES
    ('Amir Hosein', 'ahosein.salimi@gmail.com', 'This is a message', 0, '2001-10-10', '09:09:09'),
    ('Amir Mohammad', 'amohammad.salimi@gmail.com', 'This is a message', 0, '2019-01-10', '10:10:10'),
    ('Fatemeh', 'ftad3v@gmail.com', 'This is a message', 1, '1999-10-10', '11:11:11'),
    ('Saeed', 'saeedev@gmail.com', 'This is a message', 0, '1999-10-10', '12:12:12'),
    ('Milad', 'mikdev@gmail.com', 'This is a message', 1, '1999-10-10', '13:13:13'),
    ('Hamid', 'hrbdev@gmail.com', 'This is a message', 0, '1999-10-10', '14:14:14'),
    ('Mahboubeh', 'mahidev@gmail.com', 'This is a message', 0, '1999-10-10', '15:15:15'),
    ('Amir', 'amiagr@gmail.com', 'This is a message', 0, '1999-10-10', '15:15:15'),
    ('Marzieh', 'marzidev@gmail.com', 'This is a message', 1, '1999-10-10', '15:15:15'),
    ('Ali', 'aliux@gmail.com', 'This is a message', 1, '1999-10-10', '15:15:15'),
    ('Mohammad Amin', 'danshoor@gmail.com', 'This is a message', 0, '1999-10-10', '15:15:15');
