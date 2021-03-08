DROP DATABASE IF EXISTS `Mysql_Auth`;
CREATE DATABASE IF NOT EXISTS `Mysql_Auth`
  DEFAULT CHARACTER SET utf8
  COLLATE utf8_general_ci;
USE `Mysql_Auth`;


DROP TABLE IF EXISTS `User`;
CREATE TABLE IF NOT EXISTS `User` (
  `id`   BIGINT NOT NULL AUTO_INCREMENT,
  `uuid` binary(36) NOT NULL UNIQUE,
  `firstName` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NOT NULL,
  `email`    VARCHAR(255) NOT NULL,
  `password`    VARCHAR(1024) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY id_pk (`id`)
) ENGINE=MYISAM CHARSET=utf8;

INSERT INTO User SET uuid="273c92be-18c6-45ed-8b9e-8171deab4839", firstName="Lorem", lastName="Ipsum", email="lorem.ipsum@example.com", password=SHA2("loremipsum123", 256);