-- MySQL Script generated by MySQL Workbench
-- 05/05/16 16:45:53
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mytrails
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mytrails` ;

-- -----------------------------------------------------
-- Schema mytrails
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mytrails` DEFAULT CHARACTER SET utf8 ;
USE `mytrails` ;

-- -----------------------------------------------------
-- Table `mytrails`.`hist_trail_version_path`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mytrails`.`hist_trail_version_path` ;

CREATE TABLE IF NOT EXISTS `mytrails`.`hist_trail_version_path` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_version` INT(10) UNSIGNED NOT NULL,
  `lat` DOUBLE NOT NULL,
  `lon` DOUBLE NOT NULL,
  `elevation` FLOAT NULL DEFAULT NULL,
  `prev_dist` DOUBLE NULL DEFAULT NULL,
  `prev_elev` DOUBLE NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `id_version`))
ENGINE = InnoDB
AUTO_INCREMENT = 468
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mytrails`.`hist_trail_version_points`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mytrails`.`hist_trail_version_points` ;

CREATE TABLE IF NOT EXISTS `mytrails`.`hist_trail_version_points` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_version` INT(10) UNSIGNED NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `desc` VARCHAR(1000) NULL DEFAULT NULL,
  `lat` DOUBLE NULL DEFAULT NULL,
  `lon` DOUBLE NULL DEFAULT NULL,
  `elevation` DOUBLE NULL DEFAULT NULL,
  `elevgain` DOUBLE NULL DEFAULT NULL,
  `elevloss` DOUBLE NULL DEFAULT NULL,
  `nextelevgain` DOUBLE NULL DEFAULT NULL,
  `nextelevloss` DOUBLE NULL DEFAULT NULL,
  `odometer` DOUBLE NULL DEFAULT NULL,
  `nextstepdist` DOUBLE NULL DEFAULT NULL,
  `symbol` VARCHAR(5) NULL DEFAULT NULL,
  `pictogram` VARCHAR(100) NULL DEFAULT NULL,
  `pictureurl` VARCHAR(500) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `id_version`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mytrails`.`repo_regions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mytrails`.`repo_regions` ;

CREATE TABLE IF NOT EXISTS `mytrails`.`repo_regions` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_parent` INT(10) UNSIGNED NULL DEFAULT NULL,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `type` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `child_parent`
    FOREIGN KEY (`id_parent`)
    REFERENCES `mytrails`.`repo_regions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mytrails`.`repo_types`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mytrails`.`repo_types` ;

CREATE TABLE IF NOT EXISTS `mytrails`.`repo_types` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `desc` VARCHAR(500) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mytrails`.`trails`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mytrails`.`trails` ;

CREATE TABLE IF NOT EXISTS `mytrails`.`trails` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_mnt` INT(10) UNSIGNED NULL DEFAULT NULL,
  `name` VARCHAR(100) CHARACTER SET 'utf8' NOT NULL,
  `desc` LONGTEXT CHARACTER SET 'utf8' NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC, `id_mnt` ASC),
  CONSTRAINT `region_trail`
    FOREIGN KEY (`id_mnt`)
    REFERENCES `mytrails`.`repo_regions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 25
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_slovenian_ci;


-- -----------------------------------------------------
-- Table `mytrails`.`trail_versions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mytrails`.`trail_versions` ;

CREATE TABLE IF NOT EXISTS `mytrails`.`trail_versions` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_trail` INT(10) UNSIGNED NOT NULL,
  `date` DATE NULL DEFAULT NULL,
  `active` INT(11) NOT NULL DEFAULT '1',
  `trail_type` INT(10) UNSIGNED NULL DEFAULT NULL,
  `distance` FLOAT NULL DEFAULT NULL,
  `elev_gain` FLOAT NULL DEFAULT NULL,
  `elev_loss` FLOAT NULL DEFAULT NULL,
  `review_landscape` INT(11) NULL DEFAULT NULL,
  `review_fun` INT(11) NULL DEFAULT NULL,
  `required_fitness` INT(11) NULL DEFAULT NULL,
  `required_technique` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `id_trail`, `active`),
  INDEX `indexirano` (`id` ASC, `id_trail` ASC, `trail_type` ASC),
  CONSTRAINT `version_trail`
    FOREIGN KEY (`id_trail`)
    REFERENCES `mytrails`.`trails` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `version_trail_type`
    FOREIGN KEY (`trail_type`)
    REFERENCES `mytrails`.`repo_types` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 38
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mytrails`.`trail_version_path`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mytrails`.`trail_version_path` ;

CREATE TABLE IF NOT EXISTS `mytrails`.`trail_version_path` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_version` INT(10) UNSIGNED NOT NULL,
  `lat` DOUBLE NOT NULL,
  `lon` DOUBLE NOT NULL,
  `elevation` FLOAT NULL DEFAULT NULL,
  `prev_dist` DOUBLE NULL DEFAULT NULL,
  `prev_elev` DOUBLE NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `id_version`),
  CONSTRAINT `version_points0`
    FOREIGN KEY (`id_version`)
    REFERENCES `mytrails`.`trail_versions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1273
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mytrails`.`trail_version_points`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mytrails`.`trail_version_points` ;

CREATE TABLE IF NOT EXISTS `mytrails`.`trail_version_points` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_version` INT(10) UNSIGNED NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `desc` VARCHAR(1000) NULL DEFAULT NULL,
  `lat` DOUBLE NULL DEFAULT NULL,
  `lon` DOUBLE NULL DEFAULT NULL,
  `elevation` DOUBLE NULL DEFAULT NULL,
  `elevgain` DOUBLE NULL DEFAULT NULL,
  `elevloss` DOUBLE NULL DEFAULT NULL,
  `nextelevgain` DOUBLE NULL DEFAULT NULL,
  `nextelevloss` DOUBLE NULL DEFAULT NULL,
  `odometer` DOUBLE NULL DEFAULT NULL,
  `nextstepdist` DOUBLE NULL DEFAULT NULL,
  `symbol` VARCHAR(5) NULL DEFAULT NULL,
  `pictogram` VARCHAR(100) NULL DEFAULT NULL,
  `pictureurl` VARCHAR(500) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `id_version`),
  CONSTRAINT `version_points`
    FOREIGN KEY (`id_version`)
    REFERENCES `mytrails`.`trail_versions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;