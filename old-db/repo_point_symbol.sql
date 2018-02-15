-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2016 at 10:12 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mytrails`
--

-- --------------------------------------------------------

--
-- Table structure for table `repo_point_symbol`
--

CREATE TABLE IF NOT EXISTS `repo_point_symbol` (
  `symbol_code` varchar(15) NOT NULL,
  `desc` varchar(100) DEFAULT NULL,
  `desc_en` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`symbol_code`),
  UNIQUE KEY `symbol_code_UNIQUE` (`symbol_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `repo_point_symbol`
--

TRUNCATE TABLE `repo_point_symbol`;
--
-- Dumping data for table `repo_point_symbol`
--

INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('CROSSROAD', 'Raskrsnica', 'Cross road');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('DANGER', 'Oprez', 'Danger');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('END', 'Ciljna tacka', 'End point');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('FOOD', 'Hrana', 'Food');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('MINES', 'Mine', 'Mine');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('PASS', 'Prevoj', 'Pass');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('PHOTO', 'Fotografija', 'Photo');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('PLACE', 'Mjesto', 'Place');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('SLEEP', 'Prenociste', 'Place to sleep');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('START', 'Polazna tacka', 'Start point');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('SUMMIT', 'Vrh', 'Summit');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('WATER', 'Voda', 'Water');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
