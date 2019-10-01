/* Replace with your SQL commands */

/* Tables */
CREATE TABLE IF NOT EXISTS `admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  PRIMARY KEY (id)
);
