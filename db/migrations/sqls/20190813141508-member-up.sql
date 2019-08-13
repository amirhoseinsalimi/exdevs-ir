/* Replace with your SQL commands */

/* Tables */
CREATE TABLE IF NOT EXISTS `member` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `team` VARCHAR(50) NOT NULL,
  `position` VARCHAR(50) NOT NULL,
  `brief_text` VARCHAR(1000) NOT NULL,
  `github` VARCHAR(50) NOT NULL,
  `linkedin` VARCHAR(50) NOT NULL,
  `twitter` VARCHAR(50) NOT NULL,
  `telegram` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);
