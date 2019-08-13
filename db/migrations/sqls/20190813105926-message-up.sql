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
INSERT INTO `message` (sender_name, sender_email, message_text, is_read, date, time) VALUES (
  'Amir Hosein', 'ahosein.salimi@gmail.com', 'This is a message', 0, '1999-10-10', '09:09:09'
);
