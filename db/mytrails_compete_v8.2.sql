-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 25, 2016 at 05:03 PM
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
CREATE DATABASE IF NOT EXISTS `mytrails` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `mytrails`;

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `calc_bounds`(IN `p_trail_id` INT)
BEGIN
	declare maxLon double;
    declare minLon double;
    declare maxLat double;
    declare minLat double;
	declare latDelta double;
    declare lonDelta double;
    declare elevMax double;
    declare elevMin double;
    
    SELECT max(p.lon) into maxLon from active_path as p where p.trail_id = p_trail_id; 	
    SELECT min(p.lon) into minLon from active_path as p where p.trail_id = p_trail_id; 	
    SELECT max(p.lat) into maxLat from active_path as p where p.trail_id = p_trail_id; 	
    SELECT min(p.lat) into minLat from active_path as p where p.trail_id = p_trail_id;     
    SELECT max(p.elevation) into elevMax from active_path as p where p.trail_id = p_trail_id; 	
    SELECT min(p.elevation) into elevMin from active_path as p where p.trail_id = p_trail_id; 
    
    update `trail_versions`
    set 
    `bounds` =  CONCAT('[[', (maxLat + (maxLat - minLat) / 3) ,',', (maxLon + (maxLon - minLon) / 3) ,'],[', (minLat - (maxLat - minLat) / 3) , ',', (minLon - (maxLon - minLon) / 3) ,']]'),
    `lat_center` = (maxLat + minLat)/2, 
    `lon_center` = (maxLon + minLon)/2,
    `elev_min` = elevMin,
    `elev_max` = elevMax
    where `id_trail` = p_trail_id
    and `active` = 1;
	
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `logevent`(IN `puser` TEXT, IN `ptext` TEXT, IN `perror` TEXT)
    NO SQL
BEGIN
	INSERT INTO `eventlog` (`date`, `time`, `user`, `text`, `error`)
    VALUES(CURDATE(), NOW(), puser, ptext, perror);
END$$

--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `numoftrails`(`p_region_id` INT) RETURNS int(11)
    NO SQL
return (SELECT count(*) FROM `trail_regions` where `id_mnt` = p_region_id)$$

CREATE DEFINER=`root`@`localhost` FUNCTION `slug`(`pname` TEXT) RETURNS text CHARSET utf8
    NO SQL
RETURN LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(TRIM(LOWER(pname)), 'ć', 'c'), 'č', 'c'), 'đ', 'dj'), 'ž', 'z'), 'š', 's'), ',', ''), '.', ''), '/', '-'),  ' ', '-'), '--', '-'))$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `active_path`
--
CREATE TABLE IF NOT EXISTS `active_path` (
`trail_id` int(10) unsigned
,`point_id` int(10) unsigned
,`lon` double
,`lat` double
,`elevation` float
,`prev_dist` double
,`prev_elev` double
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `active_trails`
--
CREATE TABLE IF NOT EXISTS `active_trails` (
`trail_id` int(10) unsigned
,`trail_name` varchar(100)
,`trail_slug` varchar(500)
,`trail_desc` longtext
,`type_name` varchar(100)
,`type_desc` varchar(500)
,`distance` float
,`elev_min` float
,`elev_max` float
,`elev_gain` float
,`elev_loss` float
,`surface` varchar(500)
,`review_landscape` int(11)
,`review_fun` int(11)
,`required_fitness` int(11)
,`required_technique` int(11)
,`lat_center` double
,`lon_center` double
,`bounds` varchar(500)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `active_waypoints`
--
CREATE TABLE IF NOT EXISTS `active_waypoints` (
`trail_id` int(10) unsigned
,`point_id` int(10) unsigned
,`point_name` varchar(50)
,`point_desc` varchar(1000)
,`lon` double
,`lat` double
,`elevation` double
,`elevgain` double
,`elevloss` double
,`nextelevgain` double
,`nextelevloss` double
,`odometer` double
,`nextstepdist` double
,`symbol` varchar(15)
,`pictogram` varchar(100)
,`pictureurl` varchar(500)
,`time` varchar(500)
);
-- --------------------------------------------------------

--
-- Table structure for table `eventlog`
--

CREATE TABLE IF NOT EXISTS `eventlog` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `user` varchar(100) DEFAULT NULL,
  `text` text NOT NULL,
  `error` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`,`date`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Table structure for table `hist_trail_version_path`
--

CREATE TABLE IF NOT EXISTS `hist_trail_version_path` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_version` int(10) unsigned NOT NULL,
  `lat` double NOT NULL,
  `lon` double NOT NULL,
  `elevation` float DEFAULT NULL,
  `prev_dist` double DEFAULT NULL,
  `prev_elev` double DEFAULT NULL,
  PRIMARY KEY (`id`,`id_version`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=468 ;

-- --------------------------------------------------------

--
-- Table structure for table `hist_trail_version_points`
--

CREATE TABLE IF NOT EXISTS `hist_trail_version_points` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_version` int(10) unsigned NOT NULL,
  `name` varchar(50) NOT NULL,
  `desc` varchar(1000) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lon` double DEFAULT NULL,
  `elevation` double DEFAULT NULL,
  `elevgain` double DEFAULT NULL,
  `elevloss` double DEFAULT NULL,
  `nextelevgain` double DEFAULT NULL,
  `nextelevloss` double DEFAULT NULL,
  `odometer` double DEFAULT NULL,
  `nextstepdist` double DEFAULT NULL,
  `symbol` varchar(15) DEFAULT NULL,
  `pictogram` varchar(100) DEFAULT NULL,
  `pictureurl` varchar(500) DEFAULT NULL,
  `time` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`,`id_version`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

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

-- --------------------------------------------------------

--
-- Table structure for table `repo_regions`
--

CREATE TABLE IF NOT EXISTS `repo_regions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_parent` int(10) unsigned DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `slug` varchar(500) DEFAULT NULL,
  `desc` longtext NOT NULL,
  `maxelev` int(11) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `lat_center` double DEFAULT NULL,
  `lon_center` double DEFAULT NULL,
  `bounds` varchar(500) DEFAULT NULL,
  `lon_min` double DEFAULT NULL,
  `lon_max` double DEFAULT NULL,
  `lat_min` double DEFAULT NULL,
  `lat_max` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `child_parent` (`id_parent`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=184 ;

--
-- Dumping data for table `repo_regions`
--

INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(0, NULL, 'NEPOZNATO', NULL, NULL, '', NULL, 'Country', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(1, NULL, 'Bosna i Hercegovina', NULL, NULL, '', NULL, 'Country', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(2, NULL, 'Hrvatska', NULL, NULL, '', NULL, 'Country', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(3, NULL, 'Srbija', NULL, NULL, '', NULL, 'Country', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(4, NULL, 'Crna Gora', NULL, NULL, '', NULL, 'Country', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(5, NULL, 'Makedonija', NULL, NULL, '', NULL, 'Country', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(6, NULL, 'Slovenija', NULL, NULL, '', NULL, 'Country', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(7, NULL, 'Italija', NULL, NULL, '', NULL, 'Country', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(8, NULL, 'Rumunija', NULL, NULL, '', NULL, 'Country', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(9, NULL, 'Bugarska', NULL, NULL, '', NULL, 'Country', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(10, NULL, 'Grčka', NULL, NULL, '', NULL, 'Country', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(101, 1, 'Maglić', 'Foča', 'maglic-foca', '', 2386, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(102, 1, 'Volujak', 'Foča', 'volujak-foca', '', 2336, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(103, 1, 'Velika Ljubušnja', 'Foča', 'velika-ljubusnja-foca', '', 2238, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(104, 1, 'Čvrsnica', 'Posušje', 'cvrsnica-posusje', '', 2226, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(105, 1, 'Vranica', 'Gornji Vakuf', 'vranica-gornji-vakuf', '', 2110, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(106, 1, 'Prenj', 'Mostar', 'prenj-mostar', '', 2103, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(107, 1, 'Treskavica', 'Trnovo', 'treskavica-trnovo', '', 2086, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(108, 1, 'Vran', 'Jablanica', 'vran-jablanica', '', 2074, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(109, 1, 'Bjelašnica', 'Trnovo', 'bjelasnica-trnovo', '', 2067, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(110, 1, 'Lelija', 'Kalinovik', 'lelija-kalinovik', '', 2032, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(111, 1, 'Zelengora', 'Foča', 'zelengora-foca', '', 2014, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(112, 1, 'Cincar', 'Glamoč', 'cincar-glamoc', '', 2006, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(113, 1, 'Velež', 'Mostar', 'velez-mostar', '', 1968, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(114, 1, 'Visočica', 'Konjic', 'visocica-konjic', '', 1967, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(115, 1, 'Klekovača', 'Drvar', 'klekovaca-drvar', '', 1962, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(116, 1, 'Raduša', 'Prozor', 'radusa-prozor', '', 1956, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(117, 1, 'Vlašić', 'Travnik', 'vlasic-travnik', '', 1933, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(118, 1, 'Crvanj', 'Nevesinje', 'crvanj-nevesinje', '', 1921, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(119, 1, 'Dinara', 'Livno', 'dinara-livno', '', 1913, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(120, 1, 'Jahorina', 'Pale', 'jahorina-pale', '', 1910, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(121, 1, 'Vitorog', 'Šipovo/Glamoč', 'vitorog-sipovo-glamoc', '', 1907, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(122, 1, 'Orjen', 'Trebinje', 'orjen-trebinje', '', 1894, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(123, 1, 'Velika Golija', 'Livno', 'velika-golija-livno', '', 1890, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(124, 1, 'Šator', 'Glamoč/Bosansko Grahovo', 'sator-glamoc-bosansko-grahovo', '', 1873, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(125, 1, 'Trebova', 'Foča', 'trebova-foca', '', 1872, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(126, 1, 'Bjelašnica', 'Gacko', 'bjelasnica-gacko', '', 1867, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(127, 1, 'Kamešnica', 'Livno', 'kamesnica-livno', '', 1856, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(128, 1, 'Lovnica', 'Konjic', 'lovnica-konjic', '', 1856, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(129, 1, 'Zec Planina', 'Fojnica', 'zec-planina-fojnica', '', 18475, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(130, 1, 'Malovan', 'Kupres', 'malovan-kupres', '', 1826, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(131, 1, 'Osječanica', 'Glamoč', 'osjecanica-glamoc', '', 1798, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(132, 1, 'Ljubuša', 'Tomislavgrad/Prozor/Kupres', 'ljubusa-tomislavgrad-prozor-kupres', '', 1797, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(133, 1, 'Čabulja', 'Mostar', 'cabulja-mostar', '', 1786, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(134, 1, 'Šćit', 'Kiseljak', 'scit-kiseljak', '', 1781, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(135, 1, 'Plazenica', 'Donji Vakuf/Kupres', 'plazenica-donji-vakuf-kupres', '', 1765, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(136, 1, 'Stožer', 'Bugojno/Kupres', 'stozer-bugojno-kupres', '', 1758, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(137, 1, 'Slovinj', 'Glamoč', 'slovinj-glamoc', '', 1743, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(138, 1, 'Baba', 'Bileća/Gacko', 'baba-bileca-gacko', '', 1735, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(139, 1, 'Lunjevača', 'Drvar', 'lunjevaca-drvar', '', 1707, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(140, 1, 'Rujište', 'Mostar', 'rujiste-mostar', '', 1703, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(141, 1, 'Bitovnja', 'Konjic/Kreševo', 'bitovnja-konjic-kresevo', '', 1700, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(142, 1, 'Kruščica', 'Travnik/Fojnica', 'kruscica-travnik-fojnica', '', 1673, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(143, 1, 'Ujilica', 'Drvar/Bosansko Grahovo', 'ujilica-drvar-bosansko-grahovo', '', 1654, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(144, 1, 'Romanija', 'Pale', 'romanija-pale', '', 1652, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(145, 1, 'Igman', 'Hadžići/Ilidža', 'igman-hadzici-ilidza', '', 1647, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(146, 1, 'Kapić', 'Gacko', 'kapic-gacko', '', 1644, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(147, 1, 'Staretina', 'Livno/Glamoč', 'staretina-livno-glamoc', '', 1633, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(148, 1, 'Trebević', 'Sarajevo', 'trebevic-sarajevo', '', 1629, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(149, 1, 'Osječanica', 'Drvar', 'osjecanica-drvar', '', 1627, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(150, 1, 'Grmeč', 'Bosanski Petrovac/Bosanska Krupa/Bihać', 'grmec-bosanski-petrovac-bosanska-krupa-bihac', '', 1605, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(151, 1, 'Mjedena Glava', 'Gacko', 'mjedena-glava-gacko', '', 1602, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(152, 1, 'Ravašnica', 'Kupres/Bugojno', 'ravasnica-kupres-bugojno', '', 1565, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(153, 1, 'Javor', 'Gacko/Nevesinje', 'javor-gacko-nevesinje', '', 1553, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(154, 1, 'Hrbljina', 'Glamoč', 'hrbljina-glamoc', '', 1543, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(155, 1, 'Vijenac', 'Bosansko Grahovo', 'vijenac-bosansko-grahovo', '', 1539, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(156, 1, 'Žep', 'Han Pijesak', 'zep-han-pijesak', '', 1537, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(157, 1, 'Ivan planina', 'Hadžići/Konjic/Kreševo', 'ivan-planina-hadzici-konjic-kresevo', '', 1534, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(158, 1, 'Ozren', 'Sarajevo', 'ozren-sarajevo', '', 1534, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(159, 1, 'Kovač planina', 'Čajniče', 'kovac-planina-cajnice', '', 1532, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(160, 1, 'Bačina planina', 'Prozor', 'bacina-planina-prozor', '', 1530, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(161, 1, 'Komar', 'Donji Vakuf/Travnik/Bugojno', 'komar-donji-vakuf-travnik-bugojno', '', 1510, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(162, 1, 'Kmur', 'Foča', 'kmur-foca', '', 1508, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(163, 2, 'Dinara', 'Šibensko-kninska', 'dinara-sibensko-kninska', 'Sinjal', 1831, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(164, 2, 'Biokovo', 'Splitsko-dalmatinska', 'biokovo-splitsko-dalmatinska', 'Sveti Jure', 1762, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(165, 2, 'Velebit', 'Ličko-senjska', 'velebit-licko-senjska', 'Vaganski vrh', 1758, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(166, 2, 'Plješivica', 'Zadarska', 'pljesivica-zadarska', 'Kremen', 1591, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(167, 2, 'Bjelolasica', 'Primorsko-goranska', 'bjelolasica-primorsko-goranska', 'Kula', 1533, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(168, 2, 'Velika Kapela', 'Karlovačka', 'velika-kapela-karlovacka', 'Velika Javornica', 1374, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(169, 2, 'Ćićarija', 'Istarska', 'cicarija-istarska', 'Veliki Planik', 1272, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(170, 2, 'Sniježnica', 'Dubrovačko-neretvanska', 'snijeznica-dubrovacko-neretvanska', 'Sveti Ilija', 1234, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(171, 2, 'Ivanščica', 'Krapinsko-zagorska', 'ivanscica-krapinsko-zagorska', 'Ivanščica', 1060, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(172, 2, 'Medvednica', 'Grad Zagreb', 'medvednica-grad-zagreb', 'Sljeme', 1033, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(173, 2, 'Žumberačka gora', 'Zagrebačka', 'zumberacka-gora-zagrebacka', 'bezimeni vrh', 1006, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(174, 2, 'Psunj', 'Požeško-slavonska', 'psunj-pozesko-slavonska', 'Brezovo polje', 985, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(175, 2, 'Papuk', 'Virovitičko-podravska', 'papuk-viroviticko-podravska', 'Papuk', 954, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(176, 2, 'Papuk', 'Bjelovarsko-bilogorska', 'papuk-bjelovarsko-bilogorska', 'Crni vrh', 863, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(177, 2, 'Krndija', 'Osječko-baranjska', 'krndija-osjecko-baranjska', 'Petrov vrh', 701, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(178, 2, 'Ravna gora', 'Varaždinska', 'ravna-gora-varazdinska', 'Ravna gora', 686, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(179, 2, 'Kalnička gora', 'Koprivničko-križevačka', 'kalnicka-gora-koprivnicko-krizevacka', 'Vranilac/Kalnik', 643, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(180, 2, 'Babja gora', 'Brodsko-posavska', 'babja-gora-brodsko-posavska', 'Kapovac', 618, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(181, 2, 'Zrinska gora', 'Sisačko-moslavačka', 'zrinska-gora-sisacko-moslavacka', 'Piramida', 616, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(182, 2, 'Međimurske gorice', 'Međimurska', 'medjimurske-gorice-medjimurska', 'Mohokos', 344, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `region`, `slug`, `desc`, `maxelev`, `type`, `lat_center`, `lon_center`, `bounds`, `lon_min`, `lon_max`, `lat_min`, `lat_max`) VALUES(183, 2, 'Fruška gora', 'Vukovarsko-srijemska', 'fruska-gora-vukovarsko-srijemska', 'Liska', 297, 'Mountain', 0, 0, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `repo_types`
--

CREATE TABLE IF NOT EXISTS `repo_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `desc` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `repo_types`
--

INSERT INTO `repo_types` (`id`, `name`, `desc`) VALUES(0, 'N/A', 'Nepoznato');
INSERT INTO `repo_types` (`id`, `name`, `desc`) VALUES(1, 'REK', 'Staza za rekreativce i pocetnike');
INSERT INTO `repo_types` (`id`, `name`, `desc`) VALUES(2, 'XC', 'CrossCountry staza');
INSERT INTO `repo_types` (`id`, `name`, `desc`) VALUES(3, 'ALM', 'All Mountain');
INSERT INTO `repo_types` (`id`, `name`, `desc`) VALUES(4, 'DH', 'Downhill');

-- --------------------------------------------------------

--
-- Table structure for table `trails`
--

CREATE TABLE IF NOT EXISTS `trails` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(500) DEFAULT NULL,
  `desc` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=39 ;

--
-- Dumping data for table `trails`
--

INSERT INTO `trails` (`id`, `name`, `slug`, `desc`) VALUES(1, 'Mountain biking association of B&H ', 'mountain-biking-association-of-bh-', 'Naravno, ne svratismo u kafanu jer nam valja, ohoho, na vrh brda, put je dug a dan kratak. Malo dalje, na samoj Neretvici nalazi se lovaÄki dom. Za razliku od proÅ¡le godine kad je bio prazan, ovaj put zatekosmo svu silu meraklija u zelenim odorama. PuÅ¡ke su odloÅ¾ili i danas ne love. Imaju godiÅ¡nji skup, valjda neka skupÅ¡tina, Å¡ta li? OduÅ¡evljeno nas pozdravljaju, goste toplim Äajem, nude da Å¡ta prezalogajimo, roÅ¡tilj se puÅ¡i a gajbe uredno posloÅ¾ene. ÄŒitaju, kaÅ¾u, naÅ¡e reportaÅ¾e jer se i sami kreÄ‡u istim planinama. Jedan kroz Å¡alu izjavljuje kako i on koristi bicikl. TaÄnije, na â€œDan bez automobilaâ€ ode do posla biciklom. A sumnjiÄavo vrti glavom kad rekosmo kuda idemo.');
INSERT INTO `trails` (`id`, `name`, `slug`, `desc`) VALUES(2, 'Vitreuša isti smjer', 'vitreusa-isti-smjer', 'een the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with d');
INSERT INTO `trails` (`id`, `name`, `slug`, `desc`) VALUES(3, 'Vitreuša isti smjer', 'vitreusa-isti-smjer', 'een the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with d');
INSERT INTO `trails` (`id`, `name`, `slug`, `desc`) VALUES(4, 'Nova vitreusa', 'nova-vitreusa', 'Za razliku od Ministarstva finansija BiH i Parlamentarne skupÅ¡tine BiH koji na transparentan naÄin dostavljaju informacije o primanjima najviÅ¡ih zvaniÄnika, entitetska ministarstva finansija i porezne uprave od bh. javnosti kriju podatke o plaÄ‡ama drÅ¾avnih funkcionera. \n\nNaime, u ovom kontekstu podaci koji se odnose na primanja i naknade nisu zaÅ¡tiÄ‡eni Zakonom o zaÅ¡titi liÄnih podataka te bi iz tog razloga trebali bit dostupni graÄ‘anima. Entitetske institucije mogu zaÅ¡titi odreÄ‘ene dijelove podataka poput adrese stanovanje ili kreditnih zaduÅ¾enja, ali generalno ne bi smjele zbog transparentnosti uskraÄ‡ivati graÄ‘anima pravo da znaju koga to plaÄ‡aju. \n');
INSERT INTO `trails` (`id`, `name`, `slug`, `desc`) VALUES(5, 'Busovacke staje', 'busovacke-staje', 'Busovačke staje su od Busovače udaljene 15 kilometara, a Pridolci 12. Ceste nisu asfaltirane i prema iskustvu jednog od naših čitalaca sa sobom je dobro imati lance, mada će i dobre zimske gume biti sasvim dovoljne.\nNa ulazu u Busovaču iz smjera Sarajeva (stara cesta) skrene se lijevo i prati putokaz za Tisovac i Ravan. Iz smjera Lašve je desno na izlazu iz Busovače.Vozi se oko 3 km asfaltom ravno dok se ne dođe do rampe (koja je podignuta) i kućice šumarije.\nRavno kroz rampu nakon 1 km se nalazi križanje lijevo (na slikama dole) prema Pridolcima (7 km) ili desno na Busovačke staje (10 km).');
INSERT INTO `trails` (`id`, `name`, `slug`, `desc`) VALUES(6, 'Čabulja', '', 'Čabulja je planina u Hercegovini između rijeke Neretve i njene desne pritoke Drežanke. Najviši vrh je Velika Vlajna 1776 m.  Građena je od mezozojskih vanpenaca, a djelomično i od dolomita. Morfotektonski je produžetak planine Velež. Prema dolini Drežanke oštro je oivičena nekoliko stotina metara visokim tektonskim strinama, dok prema jugozapadu prelazi u podgorinu. Snažna pleistocenska glacijacija ostavila je na mnogim mjestima duž obe podgorine planine, a naročito duž jugozapadne velike komplekse morenskih nasipa.  Čabulja je uglavnom gola, krševita i bezvodna, sa malo obradive zemlje u uskim udolinama jugozapadne podgorine, gdje se nalaze malobrojna razbijena seoska naselja. U većem dijelu Čabulja je područje ljetnjih ispaša sa sezonskim stočarskim naseljima, među njima i stočara iz submediteranske zapadne Hercegovine.');

-- --------------------------------------------------------

--
-- Table structure for table `trail_regions`
--

CREATE TABLE IF NOT EXISTS `trail_regions` (
  `id_trail` int(10) unsigned NOT NULL,
  `id_mnt` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_trail`,`id_mnt`),
  KEY `regions_fk_idx` (`id_mnt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `trail_regions`
--

INSERT INTO `trail_regions` (`id_trail`, `id_mnt`) VALUES(5, 101);
INSERT INTO `trail_regions` (`id_trail`, `id_mnt`) VALUES(1, 104);
INSERT INTO `trail_regions` (`id_trail`, `id_mnt`) VALUES(2, 105);
INSERT INTO `trail_regions` (`id_trail`, `id_mnt`) VALUES(3, 105);
INSERT INTO `trail_regions` (`id_trail`, `id_mnt`) VALUES(4, 109);
INSERT INTO `trail_regions` (`id_trail`, `id_mnt`) VALUES(1, 112);
INSERT INTO `trail_regions` (`id_trail`, `id_mnt`) VALUES(2, 129);
INSERT INTO `trail_regions` (`id_trail`, `id_mnt`) VALUES(3, 129);
INSERT INTO `trail_regions` (`id_trail`, `id_mnt`) VALUES(5, 130);
INSERT INTO `trail_regions` (`id_trail`, `id_mnt`) VALUES(6, 133);
INSERT INTO `trail_regions` (`id_trail`, `id_mnt`) VALUES(4, 141);

-- --------------------------------------------------------

--
-- Table structure for table `trail_versions`
--

CREATE TABLE IF NOT EXISTS `trail_versions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_trail` int(10) unsigned NOT NULL,
  `date` date DEFAULT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  `trail_type` int(10) unsigned DEFAULT NULL,
  `distance` float DEFAULT NULL,
  `elev_gain` float DEFAULT NULL,
  `elev_loss` float DEFAULT NULL,
  `elev_min` float DEFAULT NULL,
  `elev_max` float DEFAULT NULL,
  `surface` varchar(500) DEFAULT NULL,
  `review_landscape` int(11) DEFAULT NULL,
  `review_fun` int(11) DEFAULT NULL,
  `required_fitness` int(11) DEFAULT NULL,
  `required_technique` int(11) DEFAULT NULL,
  `lat_center` double DEFAULT NULL,
  `lon_center` double DEFAULT NULL,
  `bounds` varchar(500) DEFAULT NULL,
  `inputfilename` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`,`id_trail`,`active`),
  KEY `indexirano` (`id`,`id_trail`,`trail_type`),
  KEY `version_trail` (`id_trail`),
  KEY `version_trail_type` (`trail_type`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=63 ;

--
-- Dumping data for table `trail_versions`
--

INSERT INTO `trail_versions` (`id`, `id_trail`, `date`, `active`, `trail_type`, `distance`, `elev_gain`, `elev_loss`, `elev_min`, `elev_max`, `surface`, `review_landscape`, `review_fun`, `required_fitness`, `required_technique`, `lat_center`, `lon_center`, `bounds`, `inputfilename`) VALUES(58, 1, '2016-05-24', 1, 2, 46.027, 1696.68, -1699.57, 411.58, 1924.7, '[]', NULL, NULL, NULL, NULL, 43.8370195263995, 17.840850013308497, '[[43.923915345222,17.911683311685998],[43.750123707577,17.770016714931]]', NULL);
INSERT INTO `trail_versions` (`id`, `id_trail`, `date`, `active`, `trail_type`, `distance`, `elev_gain`, `elev_loss`, `elev_min`, `elev_max`, `surface`, `review_landscape`, `review_fun`, `required_fitness`, `required_technique`, `lat_center`, `lon_center`, `bounds`, `inputfilename`) VALUES(59, 3, '2016-05-24', 1, 2, 60.9479, 1651.54, -1615.97, NULL, NULL, '[[3,"M"],[29,"S"],[31,"M"],[56,"A"]]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `trail_versions` (`id`, `id_trail`, `date`, `active`, `trail_type`, `distance`, `elev_gain`, `elev_loss`, `elev_min`, `elev_max`, `surface`, `review_landscape`, `review_fun`, `required_fitness`, `required_technique`, `lat_center`, `lon_center`, `bounds`, `inputfilename`) VALUES(60, 4, '2016-05-25', 1, 1, 46.027, 1696.68, -1699.57, 411.58, 1924.7, '[[0,"A"],[5,"M"],[12,"S"]]', NULL, NULL, NULL, NULL, 43.8370195263995, 17.840850013308497, '[[43.923915345222,17.911683311685998],[43.750123707577,17.770016714931]]', NULL);
INSERT INTO `trail_versions` (`id`, `id_trail`, `date`, `active`, `trail_type`, `distance`, `elev_gain`, `elev_loss`, `elev_min`, `elev_max`, `surface`, `review_landscape`, `review_fun`, `required_fitness`, `required_technique`, `lat_center`, `lon_center`, `bounds`, `inputfilename`) VALUES(61, 5, '2016-05-25', 1, 2, 46.0162, 1660.3, -1669.5, 399, 1612, '[[0,"M"],[5,"S"],[10,"N"]]', NULL, NULL, NULL, NULL, 44.1013736, 17.7801762, '[[44.18406626666666,17.824036533333334],[44.018680933333336,17.736315866666665]]', '');
INSERT INTO `trail_versions` (`id`, `id_trail`, `date`, `active`, `trail_type`, `distance`, `elev_gain`, `elev_loss`, `elev_min`, `elev_max`, `surface`, `review_landscape`, `review_fun`, `required_fitness`, `required_technique`, `lat_center`, `lon_center`, `bounds`, `inputfilename`) VALUES(62, 6, '2016-05-25', 1, 1, 33.664, 977.23, -1046.44, NULL, NULL, '[[0,"M"],[15,"S"],[16,"M"]]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `trail_version_path`
--

CREATE TABLE IF NOT EXISTS `trail_version_path` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_version` int(10) unsigned NOT NULL,
  `lat` double NOT NULL,
  `lon` double NOT NULL,
  `elevation` float DEFAULT NULL,
  `prev_dist` double DEFAULT NULL,
  `prev_elev` double DEFAULT NULL,
  PRIMARY KEY (`id`,`id_version`),
  KEY `version_points0` (`id_version`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1245 ;

--
-- Dumping data for table `trail_version_path`
--

INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1, 58, 43.784948000684, 17.821203041822, 414.47, 0, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1, 60, 43.784948000684, 17.821203041822, 414.47, 0, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1, 61, 44.1509892, 17.8064924, 409.3, 0, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1, 62, 43.526915, 17.712921, 136.16, 0, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(2, 58, 43.785084960982, 17.821438992396, 413.98, 0.0243, -0.49);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(2, 60, 43.785084960982, 17.821438992396, 413.98, 0.0243, -0.49);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(2, 61, 44.149704, 17.805561, 400.1, 0.16107, -9.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(2, 62, 43.526452, 17.713613, 138.09, 0.07592, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(3, 58, 43.785576978698, 17.821887005121, 414.47, 0.06547, 0.49);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(3, 60, 43.785576978698, 17.821887005121, 414.47, 0.06547, 0.49);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(3, 61, 44.14882, 17.804184, 399.4, 0.14742, -0.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(3, 62, 43.525768, 17.712975, 138.57, 0.09182, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(4, 58, 43.786350963637, 17.822329988703, 417.83, 0.09312, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(4, 60, 43.786350963637, 17.822329988703, 417.83, 0.09312, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(4, 61, 44.146595, 17.802073, 401.1, 0.2993, 1.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(4, 62, 43.525524, 17.713094, 138.57, 0.02878, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(5, 58, 43.78677399829, 17.822501985356, 420.23, 0.04902, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(5, 60, 43.78677399829, 17.822501985356, 420.23, 0.04902, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(5, 61, 44.145992, 17.799797, 401.6, 0.19358, 0.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(5, 62, 43.524715, 17.714781, 138.57, 0.16307, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(6, 58, 43.787695001811, 17.822987968102, 424.08, 0.10959, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(6, 60, 43.787695001811, 17.822987968102, 424.08, 0.10959, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(6, 61, 44.14329, 17.798697, 409.9, 0.31301, 8.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(6, 62, 43.524029, 17.715417, 140.97, 0.09191, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(7, 58, 43.788925968111, 17.823848035187, 427.92, 0.1533, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(7, 60, 43.788925968111, 17.823848035187, 427.92, 0.1533, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(7, 61, 44.1396, 17.797745, 414.7, 0.41728, 4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(7, 62, 43.523446, 17.716323, 146.74, 0.09766, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(8, 58, 43.789302986115, 17.824492016807, 431.29, 0.06656, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(8, 60, 43.789302986115, 17.824492016807, 431.29, 0.06656, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(8, 61, 44.135098, 17.79376, 421, 0.59307, 6.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(8, 62, 43.522803, 17.717479, 149.14, 0.11747, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(9, 58, 43.790332032368, 17.824828969315, 433.69, 0.11758, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(9, 60, 43.790332032368, 17.824828969315, 433.69, 0.11758, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(9, 61, 44.132816, 17.792238, 429.3, 0.28132, 8.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(9, 62, 43.522478, 17.717679, 150.1, 0.03957, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(10, 58, 43.791374992579, 17.824914967641, 435.13, 0.11618, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(10, 60, 43.791374992579, 17.824914967641, 435.13, 0.11618, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(10, 61, 44.131577, 17.790867, 433.6, 0.17593, 4.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(10, 62, 43.521251, 17.717039, 147.22, 0.14587, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(11, 58, 43.79213497974, 17.825786015019, 438.5, 0.10968, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(11, 60, 43.79213497974, 17.825786015019, 438.5, 0.10968, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(11, 61, 44.13089, 17.788992, 438.1, 0.16801, 4.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(11, 62, 43.520386, 17.717023, 147.22, 0.09619, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(12, 58, 43.793183974922, 17.826537033543, 446.67, 0.1313, 8.17);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(12, 60, 43.793183974922, 17.826537033543, 446.67, 0.1313, 8.17);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(12, 61, 44.128624, 17.787228, 446.6, 0.28863, 8.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(12, 62, 43.519394, 17.716455, 152.99, 0.11944, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(13, 58, 43.793206019327, 17.826559999958, 443.31, 0.00307, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(13, 60, 43.793206019327, 17.826559999958, 443.31, 0.00307, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(13, 61, 44.128174, 17.78703, 447.7, 0.05247, 1.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(13, 62, 43.516291, 17.716312, 175.1, 0.34523, 22.11);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(14, 58, 43.793251030147, 17.82661003992, 438.98, 0.00642, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(14, 60, 43.793251030147, 17.82661003992, 438.98, 0.00642, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(14, 61, 44.125263, 17.785393, 445.4, 0.34906, -2.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(14, 62, 43.515893, 17.716867, 178.46, 0.06294, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(15, 58, 43.793270979077, 17.826639041305, 441.38, 0.00322, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(15, 60, 43.793270979077, 17.826639041305, 441.38, 0.00322, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(15, 61, 44.123, 17.78189, 452.6, 0.37616, 7.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(15, 62, 43.515623, 17.717031, 180.38, 0.03281, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(16, 58, 43.793291011825, 17.826666031033, 445.71, 0.00311, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(16, 60, 43.793291011825, 17.826666031033, 445.71, 0.00311, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(16, 61, 44.122375, 17.780212, 460.5, 0.1509, 7.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(16, 62, 43.512964, 17.717073, 193.36, 0.29569, 12.98);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(17, 58, 43.793308027089, 17.826694026589, 443.31, 0.00294, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(17, 60, 43.793308027089, 17.826694026589, 443.31, 0.00294, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(17, 61, 44.12215, 17.779602, 461.2, 0.05474, 0.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(17, 62, 43.511975, 17.717748, 197.69, 0.12271, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(18, 58, 43.793570967391, 17.82713198103, 443.79, 0.04572, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(18, 60, 43.793570967391, 17.82713198103, 443.79, 0.04572, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(18, 61, 44.12164, 17.777489, 463.9, 0.17794, 2.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(18, 62, 43.510998, 17.717763, 203.94, 0.10864, 6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(19, 58, 43.794030966237, 17.827472034842, 445.71, 0.05798, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(19, 60, 43.794030966237, 17.827472034842, 445.71, 0.05798, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(19, 61, 44.121407, 17.773981, 474, 0.28121, 10.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(19, 62, 43.509588, 17.718692, 219.8, 0.17376, 15.86);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(20, 58, 43.794461963698, 17.827794989571, 446.67, 0.05449, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(20, 60, 43.794461963698, 17.827794989571, 446.67, 0.05449, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(20, 61, 44.121185, 17.773455, 474.5, 0.04871, 0.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(20, 62, 43.509057, 17.718775, 227.01, 0.05942, 7.21);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(21, 58, 43.795138970017, 17.828496973962, 448.59, 0.09403, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(21, 60, 43.795138970017, 17.828496973962, 448.59, 0.09403, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(21, 61, 44.118256, 17.773125, 489.8, 0.32675, 15.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(21, 62, 43.507781, 17.718569, 243.83, 0.14285, 16.82);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(22, 58, 43.795437030494, 17.828479036689, 451.48, 0.03317, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(22, 60, 43.795437030494, 17.828479036689, 451.48, 0.03317, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(22, 61, 44.11711, 17.772526, 500.8, 0.13611, 11);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(22, 62, 43.506837, 17.717815, 258.25, 0.12131, 14.42);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(23, 58, 43.795777000487, 17.828680034727, 454.36, 0.0411, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(23, 60, 43.795777000487, 17.828680034727, 454.36, 0.0411, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(23, 61, 44.11696, 17.771872, 504.1, 0.05481, 3.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(23, 62, 43.506126, 17.71773, 268.35, 0.07936, 10.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(24, 58, 43.79601999186, 17.828948004171, 456.28, 0.03453, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(24, 60, 43.79601999186, 17.828948004171, 456.28, 0.03453, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(24, 61, 44.116417, 17.769789, 503.9, 0.17691, -0.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(24, 62, 43.505502, 17.717353, 276.04, 0.07576, 7.69);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(25, 58, 43.796279998496, 17.829267019406, 459.65, 0.03862, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(25, 60, 43.796279998496, 17.829267019406, 459.65, 0.03862, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(25, 61, 44.113865, 17.768612, 521.5, 0.29892, 17.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(25, 62, 43.505237, 17.717395, 278.44, 0.02966, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(26, 58, 43.796589039266, 17.829404985532, 463.01, 0.0361, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(26, 60, 43.796589039266, 17.829404985532, 463.01, 0.0361, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(26, 61, 44.11346, 17.767668, 514.8, 0.08779, -6.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(26, 62, 43.505141, 17.717729, 280.36, 0.02898, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(27, 58, 43.797088013962, 17.829543035477, 467.34, 0.05658, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(27, 60, 43.797088013962, 17.829543035477, 467.34, 0.05658, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(27, 61, 44.112812, 17.767406, 519.3, 0.07503, 4.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(27, 62, 43.505503, 17.717909, 282.28, 0.04279, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(28, 58, 43.797345003113, 17.829932039604, 470.7, 0.04232, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(28, 60, 43.797345003113, 17.829932039604, 470.7, 0.04232, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(28, 61, 44.11258, 17.766956, 518.1, 0.04423, -1.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(28, 62, 43.506094, 17.718679, 285.17, 0.09042, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(29, 58, 43.797601992264, 17.830637963489, 473.59, 0.06346, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(29, 60, 43.797601992264, 17.830637963489, 473.59, 0.06346, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(29, 61, 44.111076, 17.767565, 534, 0.17416, 15.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(29, 62, 43.507002, 17.719254, 292.38, 0.11111, 7.21);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(30, 58, 43.797654965892, 17.830698983744, 474.07, 0.00766, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(30, 60, 43.797654965892, 17.830698983744, 474.07, 0.00766, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(30, 61, 44.110817, 17.76658, 515.8, 0.08375, -18.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(30, 62, 43.507251, 17.719799, 297.18, 0.05195, 4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(31, 58, 43.798170033842, 17.831353023648, 478.87, 0.07769, 4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(31, 60, 43.798170033842, 17.831353023648, 478.87, 0.07769, 4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(31, 61, 44.109543, 17.766302, 534.9, 0.14339, 19.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(31, 62, 43.507792, 17.720105, 303.43, 0.06502, 6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(32, 58, 43.798589967191, 17.831830959767, 482.72, 0.06043, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(32, 60, 43.798589967191, 17.831830959767, 482.72, 0.06043, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(32, 61, 44.10945, 17.765762, 530.3, 0.04434, -4.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(32, 62, 43.508431, 17.720749, 310.16, 0.08801, 6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(33, 58, 43.798894984648, 17.832449963316, 487.05, 0.06015, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(33, 60, 43.798894984648, 17.832449963316, 487.05, 0.06015, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(33, 61, 44.10887, 17.765207, 535.6, 0.07825, 5.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(33, 62, 43.510826, 17.722197, 333.23, 0.29079, 23.07);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(34, 58, 43.798963967711, 17.833036025986, 490.41, 0.04766, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(34, 60, 43.798963967711, 17.833036025986, 490.41, 0.04766, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(34, 61, 44.108677, 17.764963, 534.4, 0.02898, -1.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(34, 62, 43.511438, 17.723647, 346.21, 0.13529, 12.98);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(35, 58, 43.799413992092, 17.833876982331, 494.26, 0.08402, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(35, 60, 43.799413992092, 17.833876982331, 494.26, 0.08402, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(35, 61, 44.106316, 17.763819, 548.4, 0.27797, 14);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(35, 62, 43.511981, 17.724141, 351.98, 0.07234, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(36, 58, 43.799480041489, 17.833994999528, 494.26, 0.01199, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(36, 60, 43.799480041489, 17.833994999528, 494.26, 0.01199, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(36, 61, 44.10577, 17.76303, 543.8, 0.08749, -4.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(36, 62, 43.512156, 17.724623, 355.34, 0.04347, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(37, 58, 43.799609960988, 17.834333041683, 496.18, 0.03074, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(37, 60, 43.799609960988, 17.834333041683, 496.18, 0.03074, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(37, 61, 44.10388, 17.762127, 550.8, 0.22218, 7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(37, 62, 43.512246, 17.724831, 356.31, 0.01953, 0.97);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(38, 58, 43.7996210251, 17.834537979215, 497.14, 0.01649, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(38, 60, 43.7996210251, 17.834537979215, 497.14, 0.01649, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(38, 61, 44.10254, 17.762062, 565.9, 0.14909, 15.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(38, 62, 43.513006, 17.725222, 364, 0.0902, 7.69);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(39, 58, 43.799606021494, 17.834782982245, 497.62, 0.01973, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(39, 60, 43.799606021494, 17.834782982245, 497.62, 0.01973, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(39, 61, 44.101727, 17.762688, 559.2, 0.1033, -6.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(39, 62, 43.513362, 17.726432, 376.01, 0.1053, 12.01);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(40, 58, 43.799633011222, 17.835115995258, 498.58, 0.02689, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(40, 60, 43.799633011222, 17.835115995258, 498.58, 0.02689, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(40, 61, 44.10115, 17.761175, 577.6, 0.13679, 18.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(40, 62, 43.514169, 17.726667, 385.15, 0.09171, 9.14);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(41, 58, 43.799792015925, 17.835691999644, 499.54, 0.04949, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(41, 60, 43.799792015925, 17.835691999644, 499.54, 0.04949, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(41, 61, 44.100304, 17.760159, 580.5, 0.12422, 2.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(41, 62, 43.514948, 17.72633, 394.76, 0.09078, 9.61);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(42, 58, 43.800354022533, 17.836498003453, 504.35, 0.08994, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(42, 60, 43.800354022533, 17.836498003453, 504.35, 0.08994, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(42, 61, 44.09822, 17.759851, 589.8, 0.23303, 9.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(42, 62, 43.515114, 17.726556, 396.2, 0.02594, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(43, 58, 43.800584021956, 17.836976023391, 507.23, 0.04611, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(43, 60, 43.800584021956, 17.836976023391, 507.23, 0.04611, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(43, 61, 44.09795, 17.760126, 590.6, 0.0372, 0.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(43, 62, 43.514219, 17.729003, 401.49, 0.221, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(44, 58, 43.800583016127, 17.837872970849, 511.56, 0.07198, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(44, 60, 43.800583016127, 17.837872970849, 511.56, 0.07198, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(44, 61, 44.097244, 17.759216, 597.9, 0.10697, 7.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(44, 62, 43.513948, 17.731112, 405.33, 0.17272, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(45, 58, 43.800597013906, 17.837981013581, 511.56, 0.00881, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(45, 60, 43.800597013906, 17.837981013581, 511.56, 0.00881, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(45, 61, 44.096336, 17.758753, 633.2, 0.10752, 35.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(45, 62, 43.513501, 17.73141, 406.29, 0.05521, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(46, 58, 43.800636995584, 17.83881300129, 513.96, 0.06692, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(46, 60, 43.800636995584, 17.83881300129, 513.96, 0.06692, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(46, 61, 44.095688, 17.75884, 636.1, 0.07239, 2.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(46, 62, 43.513311, 17.731767, 407.26, 0.03571, 0.97);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(47, 58, 43.800833970308, 17.839544992894, 515.4, 0.0627, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(47, 60, 43.800833970308, 17.839544992894, 515.4, 0.0627, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(47, 61, 44.094963, 17.759287, 624.5, 0.08817, -11.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(47, 62, 43.512857, 17.733108, 411.1, 0.11934, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(48, 58, 43.801149968058, 17.840371029451, 518.29, 0.07503, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(48, 60, 43.801149968058, 17.840371029451, 518.29, 0.07503, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(48, 61, 44.094593, 17.758757, 639.8, 0.05903, 15.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(48, 62, 43.512668, 17.734556, 423.6, 0.11864, 12.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(49, 58, 43.801441993564, 17.841336037964, 520.69, 0.08398, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(49, 60, 43.801441993564, 17.841336037964, 520.69, 0.08398, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(49, 61, 44.09434, 17.758394, 639.4, 0.0404, -0.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(49, 62, 43.511844, 17.736924, 445.71, 0.2118, 22.11);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(50, 58, 43.801775006577, 17.842268021777, 524.06, 0.08346, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(50, 60, 43.801775006577, 17.842268021777, 524.06, 0.08346, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(50, 61, 44.09383, 17.758066, 652.1, 0.06247, 12.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(50, 62, 43.511833, 17.737051, 445.71, 0.01031, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(51, 58, 43.802060997114, 17.843681965023, 522.61, 0.11785, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(51, 60, 43.802060997114, 17.843681965023, 522.61, 0.11785, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(51, 61, 44.09325, 17.757877, 657.5, 0.06624, 5.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(51, 62, 43.511585, 17.737047, 448.59, 0.02758, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(52, 58, 43.802048005164, 17.843887992203, 521.17, 0.0166, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(52, 60, 43.802048005164, 17.843887992203, 521.17, 0.0166, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(52, 61, 44.092995, 17.75787, 659.1, 0.02836, 1.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(52, 62, 43.510626, 17.737712, 462.53, 0.11936, 13.94);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(53, 58, 43.802058985457, 17.844039034098, 521.17, 0.01218, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(53, 60, 43.802058985457, 17.844039034098, 521.17, 0.01218, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(53, 61, 44.091908, 17.757393, 654.9, 0.12673, -4.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(53, 62, 43.510224, 17.737413, 467.34, 0.05079, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(54, 58, 43.802092010155, 17.844598023221, 522.13, 0.04501, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(54, 60, 43.802092010155, 17.844598023221, 522.13, 0.04501, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(54, 61, 44.09136, 17.756487, 658.3, 0.0946, 3.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(54, 62, 43.508939, 17.736678, 475.99, 0.15469, 8.65);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(55, 58, 43.802096033469, 17.844659965485, 521.65, 0.00499, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(55, 60, 43.802096033469, 17.844659965485, 521.65, 0.00499, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(55, 61, 44.090153, 17.755968, 661.9, 0.14047, 3.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(55, 62, 43.508574, 17.736122, 477.91, 0.06048, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(56, 58, 43.802442038432, 17.845363039523, 525.5, 0.06829, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(56, 60, 43.802442038432, 17.845363039523, 525.5, 0.06829, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(56, 61, 44.088406, 17.756037, 709.9, 0.19434, 48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(56, 62, 43.508423, 17.735328, 478.39, 0.0662, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(57, 58, 43.80265602842, 17.845515003428, 526.46, 0.02674, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(57, 60, 43.80265602842, 17.845515003428, 526.46, 0.02674, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(57, 61, 44.087746, 17.756443, 709.8, 0.08023, -0.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(57, 62, 43.508182, 17.735047, 479.35, 0.0351, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(58, 58, 43.803449962288, 17.846047002822, 530.3, 0.09806, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(58, 60, 43.803449962288, 17.846047002822, 530.3, 0.09806, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(58, 61, 44.08583, 17.756187, 740.4, 0.21403, 30.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(58, 62, 43.506813, 17.735554, 492.33, 0.15762, 12.98);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(59, 58, 43.803619025275, 17.846366018057, 530.3, 0.03176, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(59, 60, 43.803619025275, 17.846366018057, 530.3, 0.03176, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(59, 61, 44.083508, 17.75782, 740.1, 0.28927, -0.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(59, 62, 43.505897, 17.73624, 500.02, 0.11591, 7.69);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(60, 58, 43.80359698087, 17.846931964159, 531.75, 0.04548, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(60, 60, 43.80359698087, 17.846931964159, 531.75, 0.04548, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(60, 61, 44.08231, 17.757002, 753.2, 0.14837, 13.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(60, 62, 43.50444, 17.738436, 492.81, 0.24003, -7.21);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(61, 58, 43.80362296477, 17.847280986607, 530.79, 0.02816, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(61, 60, 43.80362296477, 17.847280986607, 530.79, 0.02816, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(61, 61, 44.081425, 17.756393, 754, 0.10977, 0.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(61, 62, 43.503484, 17.738751, 495.7, 0.1093, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(62, 58, 43.803621958941, 17.847388023511, 531.27, 0.00859, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(62, 60, 43.803621958941, 17.847388023511, 531.27, 0.00859, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(62, 61, 44.08045, 17.75668, 760.3, 0.11081, 6.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(62, 62, 43.502705, 17.738813, 495.22, 0.08677, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(63, 58, 43.803955977783, 17.847966039553, 528.38, 0.05942, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(63, 60, 43.803955977783, 17.847966039553, 528.38, 0.05942, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(63, 61, 44.08012, 17.75664, 761.8, 0.03683, 1.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(63, 62, 43.501628, 17.739569, 495.22, 0.13439, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(64, 58, 43.803998976946, 17.847985988483, 528.38, 0.00504, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(64, 60, 43.803998976946, 17.847985988483, 528.38, 0.00504, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(64, 61, 44.079453, 17.75774, 779.8, 0.11498, 18);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(64, 62, 43.501205, 17.740091, 495.22, 0.06313, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(65, 58, 43.804048011079, 17.848006021231, 527.9, 0.00568, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(65, 60, 43.804048011079, 17.848006021231, 527.9, 0.00568, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(65, 61, 44.078735, 17.758038, 781.7, 0.08331, 1.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(65, 62, 43.500598, 17.74085, 494.74, 0.09112, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(66, 58, 43.804655028507, 17.8481490165, 526.94, 0.06847, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(66, 60, 43.804655028507, 17.8481490165, 526.94, 0.06847, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(66, 61, 44.076633, 17.757942, 810.6, 0.23386, 28.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(66, 62, 43.500355, 17.741104, 493.29, 0.03391, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(67, 58, 43.805300015956, 17.848217999563, 527.9, 0.07193, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(67, 60, 43.805300015956, 17.848217999563, 527.9, 0.07193, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(67, 61, 44.076393, 17.758015, 810.3, 0.02732, -0.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(67, 62, 43.500346, 17.741111, 491.85, 0.00115, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(68, 58, 43.805622970685, 17.849102960899, 532.71, 0.07958, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(68, 60, 43.805622970685, 17.849102960899, 532.71, 0.07958, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(68, 61, 44.075386, 17.759676, 812.6, 0.17362, 2.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(68, 62, 43.500346, 17.741113, 488.49, 0.00016, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(69, 58, 43.805818017572, 17.849565977231, 535.59, 0.04302, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(69, 60, 43.805818017572, 17.849565977231, 535.59, 0.04302, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(69, 61, 44.074356, 17.75993, 813.8, 0.11631, 1.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(69, 62, 43.500346, 17.741113, 493.29, 0, 4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(70, 58, 43.80609696731, 17.850430989638, 539.44, 0.07603, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(70, 60, 43.80609696731, 17.850430989638, 539.44, 0.07603, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(70, 61, 44.074078, 17.759739, 818.7, 0.03447, 4.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(70, 62, 43.500344, 17.741113, 494.26, 0.00022, 0.97);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(71, 58, 43.80610995926, 17.850972963497, 539.44, 0.04352, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(71, 60, 43.80610995926, 17.850972963497, 539.44, 0.04352, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(71, 61, 44.073795, 17.758448, 827.4, 0.10783, 8.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(71, 62, 43.500337, 17.741114, 492.81, 0.00078, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(72, 58, 43.806685963646, 17.851379988715, 542.32, 0.0719, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(72, 60, 43.806685963646, 17.851379988715, 542.32, 0.0719, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(72, 61, 44.07224, 17.757095, 832.5, 0.20391, 5.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(72, 62, 43.500325, 17.741111, 492.81, 0.00136, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(73, 58, 43.807032974437, 17.851705960929, 544.24, 0.04662, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(73, 60, 43.807032974437, 17.851705960929, 544.24, 0.04662, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(73, 61, 44.07123, 17.755384, 847.9, 0.17691, 15.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(73, 62, 43.500313, 17.741114, 493.29, 0.00136, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(74, 58, 43.807060969993, 17.851745020598, 544.72, 0.00442, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(74, 60, 43.807060969993, 17.851745020598, 544.72, 0.00442, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(74, 61, 44.070503, 17.754725, 854.5, 0.09647, 6.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(74, 62, 43.499517, 17.741086, 494.74, 0.08854, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(75, 58, 43.807416027412, 17.852651020512, 548.09, 0.08273, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(75, 60, 43.807416027412, 17.852651020512, 548.09, 0.08273, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(75, 61, 44.070354, 17.75463, 855.5, 0.01822, 1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(75, 62, 43.499583, 17.741167, 497.62, 0.00983, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(76, 58, 43.807870997116, 17.852841038257, 550.97, 0.05284, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(76, 60, 43.807870997116, 17.852841038257, 550.97, 0.05284, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(76, 61, 44.069214, 17.75386, 856.9, 0.1409, 1.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(76, 62, 43.500313, 17.741114, 493.29, 0.08128, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(77, 58, 43.808495029807, 17.853001970798, 554.82, 0.07058, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(77, 60, 43.808495029807, 17.853001970798, 554.82, 0.07058, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(77, 61, 44.06737, 17.754488, 878.9, 0.21109, 22);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(77, 62, 43.499482, 17.741052, 499.54, 0.09254, 6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(78, 58, 43.809148985893, 17.853224007413, 559.14, 0.07487, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(78, 60, 43.809148985893, 17.853224007413, 559.14, 0.07487, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(78, 61, 44.067154, 17.754679, 880.8, 0.02846, 1.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(78, 62, 43.498828, 17.739679, 503.87, 0.13249, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(79, 58, 43.809641003609, 17.853508992121, 561.55, 0.0593, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(79, 60, 43.809641003609, 17.853508992121, 561.55, 0.0593, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(79, 61, 44.066654, 17.75495, 876.4, 0.05966, -4.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(79, 62, 43.498587, 17.739364, 503.87, 0.03693, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(80, 58, 43.810163028538, 17.853238005191, 565.39, 0.06199, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(80, 60, 43.810163028538, 17.853238005191, 565.39, 0.06199, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(80, 61, 44.06614, 17.755608, 892, 0.07766, 15.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(80, 62, 43.497634, 17.738847, 513.48, 0.11388, 9.61);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(81, 58, 43.810234023258, 17.853173967451, 565.39, 0.00942, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(81, 60, 43.810234023258, 17.853173967451, 565.39, 0.00942, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(81, 61, 44.065514, 17.756128, 898.8, 0.08106, 6.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(81, 62, 43.497197, 17.73807, 519.25, 0.0793, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(82, 58, 43.810371989384, 17.853003982455, 566.83, 0.02053, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(82, 60, 43.810371989384, 17.853003982455, 566.83, 0.02053, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(82, 61, 44.06533, 17.756603, 899.7, 0.04312, 0.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(82, 62, 43.496945, 17.737872, 523.09, 0.03225, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(83, 58, 43.811040027067, 17.852876996621, 569.24, 0.07498, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(83, 60, 43.811040027067, 17.852876996621, 569.24, 0.07498, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(83, 61, 44.06459, 17.757294, 909.7, 0.09909, 10);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(83, 62, 43.496695, 17.737703, 525.02, 0.03096, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(84, 58, 43.811613013968, 17.852758979425, 573.08, 0.06441, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(84, 60, 43.811613013968, 17.852758979425, 573.08, 0.06441, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(84, 61, 44.06441, 17.7581, 911.8, 0.06744, 2.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(84, 62, 43.496394, 17.737429, 527.42, 0.04011, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(85, 58, 43.811842007563, 17.852653032169, 574.04, 0.02684, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(85, 60, 43.811842007563, 17.852653032169, 574.04, 0.02684, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(85, 61, 44.06393, 17.75852, 917.6, 0.06305, 5.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(85, 62, 43.495685, 17.737435, 530.3, 0.07884, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(86, 58, 43.811997994781, 17.852337034419, 574.53, 0.03072, 0.49);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(86, 60, 43.811997994781, 17.852337034419, 574.53, 0.03072, 0.49);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(86, 61, 44.06378, 17.759636, 929.7, 0.09072, 12.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(86, 62, 43.494824, 17.738091, 539.44, 0.10939, 9.14);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(87, 58, 43.812264958397, 17.851969990879, 575.97, 0.04182, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(87, 60, 43.812264958397, 17.851969990879, 575.97, 0.04182, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(87, 61, 44.063183, 17.760302, 930.6, 0.08508, 0.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(87, 62, 43.494303, 17.738238, 545.69, 0.05913, 6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(88, 58, 43.812579028308, 17.85162800923, 579.33, 0.04441, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(88, 60, 43.812579028308, 17.85162800923, 579.33, 0.04441, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(88, 61, 44.062813, 17.761812, 948.2, 0.12747, 17.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(88, 62, 43.493725, 17.738243, 548.57, 0.06427, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(89, 58, 43.812671983615, 17.851371020079, 582.7, 0.02307, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(89, 60, 43.812671983615, 17.851371020079, 582.7, 0.02307, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(89, 61, 44.06224, 17.762533, 953.8, 0.0859, 5.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(89, 62, 43.493304, 17.737488, 552.9, 0.07682, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(90, 58, 43.813239019364, 17.851253002882, 585.1, 0.06376, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(90, 60, 43.813239019364, 17.851253002882, 585.1, 0.06376, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(90, 61, 44.062515, 17.763401, 960.7, 0.0758, 6.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(90, 62, 43.491982, 17.736432, 565.39, 0.1699, 12.49);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(91, 58, 43.813326023519, 17.851306982338, 585.58, 0.0106, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(91, 60, 43.813326023519, 17.851306982338, 585.58, 0.0106, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(91, 61, 44.06197, 17.763895, 960, 0.07232, -0.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(91, 62, 43.491602, 17.736017, 566.83, 0.05391, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(92, 58, 43.813354019076, 17.85132500343, 586.54, 0.00343, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(92, 60, 43.813354019076, 17.85132500343, 586.54, 0.00343, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(92, 61, 44.06189, 17.764324, 960.7, 0.03541, 0.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(92, 62, 43.48957, 17.735238, 587.98, 0.23452, 21.15);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(93, 58, 43.813863974065, 17.851772010326, 591.35, 0.0671, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(93, 60, 43.813863974065, 17.851772010326, 591.35, 0.0671, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(93, 61, 44.06168, 17.764414, 956.2, 0.02443, -4.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(93, 62, 43.489424, 17.734951, 588.46, 0.02828, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(94, 58, 43.813955001533, 17.851814003661, 592.79, 0.01067, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(94, 60, 43.813955001533, 17.851814003661, 592.79, 0.01067, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(94, 61, 44.061806, 17.765392, 972.8, 0.07939, 16.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(94, 62, 43.489417, 17.733577, 595.19, 0.11085, 6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(95, 58, 43.814480965957, 17.851778967306, 594.71, 0.05855, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(95, 60, 43.814480965957, 17.851778967306, 594.71, 0.05855, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(95, 61, 44.061237, 17.765821, 976, 0.07196, 3.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(95, 62, 43.488751, 17.732879, 606.73, 0.09303, 11.54);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(96, 58, 43.814958985895, 17.851435979828, 597.12, 0.05986, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(96, 60, 43.814958985895, 17.851435979828, 597.12, 0.05986, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(96, 61, 44.061146, 17.766417, 978.8, 0.04869, 2.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(96, 62, 43.488242, 17.733223, 615.38, 0.06304, 8.65);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(97, 58, 43.815436000004, 17.85142198205, 600.48, 0.05305, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(97, 60, 43.815436000004, 17.85142198205, 600.48, 0.05305, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(97, 61, 44.06031, 17.767721, 997, 0.13964, 18.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(97, 62, 43.487945, 17.733235, 619.23, 0.03304, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(98, 58, 43.815827015787, 17.851572018117, 602.88, 0.04511, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(98, 60, 43.815827015787, 17.851572018117, 602.88, 0.04511, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(98, 61, 44.06018, 17.767862, 998.9, 0.01833, 1.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(98, 62, 43.487697, 17.733568, 624.03, 0.0385, 4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(99, 58, 43.815890969709, 17.851706966758, 604.81, 0.01295, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(99, 60, 43.815890969709, 17.851706966758, 604.81, 0.01295, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(99, 61, 44.058304, 17.76872, 1030.7, 0.21958, 31.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(99, 62, 43.48749, 17.73396, 625.47, 0.03911, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(100, 58, 43.815923994407, 17.851795982569, 604.81, 0.00803, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(100, 60, 43.815923994407, 17.851795982569, 604.81, 0.00803, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(100, 61, 44.0571984, 17.7696265, 1044.9, 0.14269, 14.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(100, 62, 43.4867, 17.734753, 629.8, 0.10867, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(101, 58, 43.816355997697, 17.852051965892, 607.21, 0.05224, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(101, 60, 43.816355997697, 17.852051965892, 607.21, 0.05224, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(101, 61, 44.0560565, 17.7714066, 1063.4, 0.19068, 18.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(101, 62, 43.486459, 17.735023, 630.76, 0.03453, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(102, 58, 43.816768974066, 17.851965967566, 610.57, 0.04644, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(102, 60, 43.816768974066, 17.851965967566, 610.57, 0.04644, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(102, 61, 44.0562139, 17.7717366, 1063.7, 0.03165, 0.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(102, 62, 43.486131, 17.73513, 635.09, 0.03748, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(103, 58, 43.817268032581, 17.851966973394, 613.94, 0.05549, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(103, 60, 43.817268032581, 17.851966973394, 613.94, 0.05549, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(103, 61, 44.0581068, 17.7705304, 1053.5, 0.2315, -10.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(103, 62, 43.485638, 17.735869, 645.18, 0.08099, 10.09);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(104, 58, 43.817851999775, 17.852454967797, 617.78, 0.07582, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(104, 60, 43.817851999775, 17.852454967797, 617.78, 0.07582, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(104, 61, 44.060115, 17.7702281, 1078.1, 0.2246, 24.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(104, 62, 43.485893, 17.733708, 664.89, 0.17663, 19.71);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(105, 58, 43.818060038611, 17.852707011625, 620.19, 0.03073, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(105, 60, 43.818060038611, 17.852707011625, 620.19, 0.03073, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(105, 61, 44.0609107, 17.7694345, 1065.6, 0.10886, -12.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(105, 62, 43.48722, 17.729884, 705.75, 0.34198, 40.86);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(106, 58, 43.818049980327, 17.852696031332, 619.23, 0.00142, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(106, 60, 43.818049980327, 17.852696031332, 619.23, 0.00142, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(106, 61, 44.0616392, 17.7698207, 1084.3, 0.08668, 18.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(106, 62, 43.487531, 17.728531, 717.76, 0.1145, 12.01);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(107, 58, 43.818402020261, 17.853071959689, 622.59, 0.04942, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(107, 60, 43.818402020261, 17.853071959689, 622.59, 0.04942, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(107, 61, 44.061982, 17.770568, 1111.7, 0.07084, 27.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(107, 62, 43.487491, 17.727577, 724.97, 0.07709, 7.21);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(108, 58, 43.818566976115, 17.853384017944, 624.03, 0.03104, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(108, 60, 43.818566976115, 17.853384017944, 624.03, 0.03104, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(108, 61, 44.0620059, 17.7706167, 1113, 0.00471, 1.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(108, 62, 43.487955, 17.725286, 743.24, 0.19189, 18.27);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(109, 58, 43.8188470155, 17.853578981012, 625.96, 0.03485, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(109, 60, 43.8188470155, 17.853578981012, 625.96, 0.03485, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(109, 61, 44.0621546, 17.7707806, 1116, 0.02109, 3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(109, 62, 43.487742, 17.724126, 751.41, 0.09653, 8.17);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(110, 58, 43.819084977731, 17.853725999594, 626.92, 0.02897, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(110, 60, 43.819084977731, 17.853725999594, 626.92, 0.02897, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(110, 61, 44.0622794, 17.7707768, 1113.7, 0.01388, -2.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(110, 62, 43.487529, 17.723872, 753.81, 0.03132, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(111, 58, 43.819292010739, 17.853320986032, 629.32, 0.03982, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(111, 60, 43.819292010739, 17.853320986032, 629.32, 0.03982, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(111, 61, 44.0627395, 17.7688074, 1083, 0.16547, -30.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(111, 62, 43.487059, 17.723868, 758.14, 0.05226, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(112, 58, 43.819675985724, 17.852859981358, 631.72, 0.05649, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(112, 60, 43.819675985724, 17.852859981358, 631.72, 0.05649, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(112, 61, 44.0638398, 17.7686624, 1107.4, 0.1229, 24.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(112, 62, 43.486565, 17.723363, 767.75, 0.06839, 9.61);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(113, 58, 43.819972034544, 17.852915972471, 633.17, 0.03322, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(113, 60, 43.819972034544, 17.852915972471, 633.17, 0.03322, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(113, 61, 44.0649043, 17.7676349, 1115.3, 0.14405, 7.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(113, 62, 43.486137, 17.723064, 773.04, 0.05336, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(114, 58, 43.82007102482, 17.853117976338, 634.13, 0.01959, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(114, 60, 43.82007102482, 17.853117976338, 634.13, 0.01959, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(114, 61, 44.065334, 17.766869, 1125.4, 0.07764, 10.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(114, 62, 43.485686, 17.722339, 784.09, 0.07705, 11.05);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(115, 58, 43.820093991235, 17.853161981329, 634.13, 0.00436, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(115, 60, 43.820093991235, 17.853161981329, 634.13, 0.00436, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(115, 61, 44.065147, 17.765953, 1113.7, 0.07608, -11.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(115, 62, 43.485697, 17.721639, 792.74, 0.05649, 8.65);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(116, 58, 43.820234974846, 17.853471022099, 635.57, 0.02933, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(116, 60, 43.820234974846, 17.853471022099, 635.57, 0.02933, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(116, 61, 44.065712, 17.764692, 1119.6, 0.11874, 5.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(116, 62, 43.485583, 17.720531, 803.8, 0.09028, 11.06);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(117, 58, 43.820626996458, 17.853649975732, 637.97, 0.04589, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(117, 60, 43.820626996458, 17.853649975732, 637.97, 0.04589, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(117, 61, 44.066555, 17.764084, 1124.4, 0.10558, 4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(117, 62, 43.485677, 17.720182, 805.72, 0.03003, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(118, 58, 43.8215080183, 17.853536987677, 641.82, 0.09838, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(118, 60, 43.8215080183, 17.853536987677, 641.82, 0.09838, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(118, 61, 44.068127, 17.763718, 1141.3, 0.17723, 16.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(118, 62, 43.485459, 17.71942, 808.13, 0.06608, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(119, 58, 43.822753988206, 17.853327021003, 643.26, 0.13957, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(119, 60, 43.822753988206, 17.853327021003, 643.26, 0.13957, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(119, 61, 44.06833, 17.763632, 1142.8, 0.0236, 1.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(119, 62, 43.486022, 17.718596, 815.34, 0.09131, 7.21);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(120, 58, 43.823367962614, 17.853417964652, 646.14, 0.06866, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(120, 60, 43.823367962614, 17.853417964652, 646.14, 0.06866, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(120, 61, 44.06885, 17.76364, 1140.1, 0.05782, -2.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(120, 62, 43.486446, 17.718778, 819.18, 0.04938, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(121, 58, 43.823766019195, 17.85383102484, 647.1, 0.05529, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(121, 60, 43.823766019195, 17.85383102484, 647.1, 0.05529, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(121, 61, 44.06922, 17.764894, 1162.1, 0.10831, 22);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(121, 62, 43.486625, 17.718761, 820.62, 0.01995, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(122, 58, 43.824288966134, 17.854538038373, 649.03, 0.08123, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(122, 60, 43.824288966134, 17.854538038373, 649.03, 0.08123, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(122, 61, 44.069405, 17.765049, 1163.1, 0.02401, 1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(122, 62, 43.486485, 17.71844, 824.47, 0.03022, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(123, 58, 43.82441402413, 17.854773988947, 649.99, 0.02349, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(123, 60, 43.82441402413, 17.854773988947, 649.99, 0.02349, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(123, 61, 44.0701, 17.764929, 1148.9, 0.07787, -14.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(123, 62, 43.486283, 17.718157, 827.83, 0.03203, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(124, 58, 43.824958009645, 17.85513298586, 653.35, 0.06699, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(124, 60, 43.824958009645, 17.85513298586, 653.35, 0.06699, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(124, 61, 44.07039, 17.765242, 1150.8, 0.04081, 1.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(124, 62, 43.486106, 17.718033, 828.79, 0.02208, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(125, 58, 43.82518096827, 17.855357034132, 653.83, 0.03062, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(125, 60, 43.82518096827, 17.855357034132, 653.83, 0.03062, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(125, 61, 44.07055, 17.766104, 1162.7, 0.07113, 11.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(125, 62, 43.485556, 17.718176, 837.93, 0.06224, 9.14);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(126, 58, 43.825803995132, 17.856001015753, 656.72, 0.08642, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(126, 60, 43.825803995132, 17.856001015753, 656.72, 0.08642, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(126, 61, 44.071415, 17.768116, 1161.7, 0.18732, -1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(126, 62, 43.485511, 17.71819, 838.41, 0.00513, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(127, 58, 43.826460968703, 17.85666603595, 659.6, 0.09046, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(127, 60, 43.826460968703, 17.85666603595, 659.6, 0.09046, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(127, 61, 44.071564, 17.769348, 1164.2, 0.09981, 2.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(127, 62, 43.484645, 17.718724, 848.98, 0.10549, 10.57);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(128, 58, 43.82664302364, 17.857080018148, 661.52, 0.03889, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(128, 60, 43.82664302364, 17.857080018148, 661.52, 0.03889, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(128, 61, 44.071198, 17.770098, 1167.5, 0.07243, 3.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(128, 62, 43.483402, 17.718491, 864.36, 0.13949, 15.38);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(129, 58, 43.826561970636, 17.858008984476, 662.49, 0.07507, 0.97);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(129, 60, 43.826561970636, 17.858008984476, 662.49, 0.07507, 0.97);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(129, 61, 44.07051, 17.770124, 1179.9, 0.07653, 12.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(129, 62, 43.482693, 17.718685, 877.34, 0.08038, 12.98);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(130, 58, 43.826673030853, 17.858840972185, 662.01, 0.06788, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(130, 60, 43.826673030853, 17.858840972185, 662.01, 0.06788, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(130, 61, 44.070423, 17.770193, 1181, 0.01113, 1.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(130, 62, 43.481702, 17.718186, 885.99, 0.11732, 8.65);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(131, 58, 43.826686022803, 17.859109025449, 661.04, 0.02155, -0.97);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(131, 60, 43.826686022803, 17.859109025449, 661.04, 0.02155, -0.97);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(131, 61, 44.06951, 17.771832, 1197.9, 0.16569, 16.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(131, 62, 43.481187, 17.718376, 894.16, 0.05928, 8.17);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(132, 58, 43.826728016138, 17.85917901434, 660.56, 0.0073, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(132, 60, 43.826728016138, 17.85917901434, 660.56, 0.0073, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(132, 61, 44.06971, 17.774395, 1209.7, 0.20597, 11.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(132, 62, 43.480779, 17.717873, 902.33, 0.06087, 8.17);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(133, 58, 43.826781995595, 17.859318992123, 661.52, 0.01273, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(133, 60, 43.826781995595, 17.859318992123, 661.52, 0.01273, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(133, 61, 44.069336, 17.775875, 1227.3, 0.12534, 17.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(133, 62, 43.48007, 17.717353, 909.06, 0.08931, 6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(134, 58, 43.82675902918, 17.859563995153, 661.52, 0.01982, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(134, 60, 43.82675902918, 17.859563995153, 661.52, 0.01982, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(134, 61, 44.069767, 17.778746, 1245.8, 0.23433, 18.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(134, 62, 43.479948, 17.717143, 909.54, 0.02171, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(135, 58, 43.826860031113, 17.859885022044, 662.97, 0.0281, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(135, 60, 43.826860031113, 17.859885022044, 662.97, 0.0281, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(135, 61, 44.0706, 17.781487, 1248.3, 0.23777, 2.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(135, 62, 43.479492, 17.717067, 909.06, 0.05107, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(136, 58, 43.826862964779, 17.859898013994, 663.45, 0.00109, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(136, 60, 43.826862964779, 17.859898013994, 663.45, 0.00109, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(136, 61, 44.070557, 17.782057, 1245.7, 0.04579, -2.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(136, 62, 43.479184, 17.716708, 908.58, 0.04485, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(137, 58, 43.826949968934, 17.859998010099, 663.93, 0.01257, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(137, 60, 43.826949968934, 17.859998010099, 663.93, 0.01257, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(137, 61, 44.069572, 17.782673, 1269.7, 0.12008, 24);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(137, 62, 43.478881, 17.716682, 910.03, 0.03376, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(138, 58, 43.827129006386, 17.860217029229, 664.89, 0.02655, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(138, 60, 43.827129006386, 17.860217029229, 664.89, 0.02655, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(138, 61, 44.069458, 17.78188, 1275.3, 0.06461, 5.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(138, 62, 43.478305, 17.716706, 909.06, 0.06408, -0.97);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(139, 58, 43.82729396224, 17.860926976427, 665.85, 0.05983, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(139, 60, 43.82729396224, 17.860926976427, 665.85, 0.05983, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(139, 61, 44.069332, 17.781555, 1279.5, 0.0295, 4.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(139, 62, 43.477598, 17.717091, 910.51, 0.08453, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(140, 58, 43.827201006934, 17.861286979169, 667.29, 0.03067, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(140, 60, 43.827201006934, 17.861286979169, 667.29, 0.03067, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(140, 61, 44.06929, 17.781036, 1281.6, 0.04173, 2.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(140, 62, 43.477012, 17.718094, 914.35, 0.1039, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(141, 58, 43.827128000557, 17.86145998165, 666.81, 0.01608, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(141, 60, 43.827128000557, 17.86145998165, 666.81, 0.01608, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(141, 61, 44.069157, 17.78122, 1286.5, 0.02085, 4.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(141, 62, 43.476754, 17.718885, 915.31, 0.06998, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(142, 58, 43.827060023323, 17.861790983006, 666.33, 0.02761, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(142, 60, 43.827060023323, 17.861790983006, 666.33, 0.02761, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(142, 61, 44.069115, 17.781847, 1287.3, 0.05031, 0.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(142, 62, 43.475985, 17.718945, 918.68, 0.08565, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(143, 58, 43.827079972252, 17.862228015438, 667.29, 0.03513, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(143, 60, 43.827079972252, 17.862228015438, 667.29, 0.03513, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(143, 61, 44.069027, 17.783339, 1287.3, 0.1196, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(143, 62, 43.475636, 17.719469, 916.75, 0.05739, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(144, 58, 43.827010989189, 17.862502019852, 667.77, 0.02328, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(144, 60, 43.827010989189, 17.862502019852, 667.77, 0.02328, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(144, 61, 44.06885, 17.783182, 1296.2, 0.02334, 8.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(144, 62, 43.474795, 17.719207, 917.24, 0.09587, 0.49);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(145, 58, 43.826990034431, 17.862513000146, 667.29, 0.00249, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(145, 60, 43.826990034431, 17.862513000146, 667.29, 0.00249, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(145, 61, 44.068737, 17.781893, 1303.8, 0.10375, 7.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(145, 62, 43.474239, 17.719463, 914.83, 0.06518, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(146, 58, 43.826683005318, 17.862939974293, 667.77, 0.04836, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(146, 60, 43.826683005318, 17.862939974293, 667.77, 0.04836, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(146, 61, 44.068428, 17.780859, 1316.3, 0.08947, 12.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(146, 62, 43.473523, 17.719266, 914.83, 0.08119, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(147, 58, 43.826671019197, 17.86297400482, 667.77, 0.00304, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(147, 60, 43.826671019197, 17.86297400482, 667.77, 0.00304, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(147, 61, 44.06773, 17.77882, 1322.9, 0.18045, 6.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(147, 62, 43.473281, 17.719405, 918.2, 0.02915, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(148, 58, 43.826617961749, 17.863234011456, 668.25, 0.02168, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(148, 60, 43.826617961749, 17.863234011456, 668.25, 0.02168, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(148, 61, 44.06661, 17.777779, 1338.4, 0.14976, 15.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(148, 62, 43.472949, 17.719597, 919.16, 0.04004, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(149, 58, 43.826584015042, 17.863406008109, 668.73, 0.0143, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(149, 60, 43.826584015042, 17.863406008109, 668.73, 0.0143, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(149, 61, 44.065952, 17.776836, 1341.3, 0.10502, 2.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(149, 62, 43.472604, 17.71974, 920.12, 0.04006, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(150, 58, 43.826545039192, 17.864046972245, 670.66, 0.0516, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(150, 60, 43.826545039192, 17.864046972245, 670.66, 0.0516, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(150, 61, 44.065136, 17.778395, 1359.3, 0.15411, 18);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(150, 62, 43.471591, 17.720256, 915.79, 0.12009, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(151, 58, 43.8265789859, 17.864126013592, 670.66, 0.00738, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(151, 60, 43.8265789859, 17.864126013592, 670.66, 0.00738, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(151, 61, 44.06339, 17.781397, 1383.8, 0.30859, 24.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(151, 62, 43.471079, 17.720598, 919.16, 0.06327, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(152, 58, 43.826713012531, 17.864645021036, 670.18, 0.04422, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(152, 60, 43.826713012531, 17.864645021036, 670.18, 0.04422, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(152, 61, 44.06101, 17.782736, 1394.8, 0.28545, 11);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(152, 62, 43.47052, 17.721118, 916.75, 0.075, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(153, 58, 43.826776966453, 17.864780975506, 670.18, 0.01302, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(153, 60, 43.826776966453, 17.864780975506, 670.18, 0.01302, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(153, 61, 44.06046, 17.783415, 1406.5, 0.08175, 11.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(153, 62, 43.470264, 17.721264, 916.75, 0.03081, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(154, 58, 43.826921973377, 17.865113988519, 669.7, 0.0312, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(154, 60, 43.826921973377, 17.865113988519, 669.7, 0.0312, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(154, 61, 44.060043, 17.783813, 1408.1, 0.05623, 1.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(154, 62, 43.4699, 17.721312, 920.12, 0.04066, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(155, 58, 43.826980981976, 17.865455970168, 670.18, 0.02821, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(155, 60, 43.826980981976, 17.865455970168, 670.18, 0.02821, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(155, 61, 44.05992, 17.784956, 1423.6, 0.09235, 15.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(155, 62, 43.469003, 17.721682, 922.04, 0.10412, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(156, 58, 43.827020041645, 17.865664009005, 670.18, 0.01724, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(156, 60, 43.827020041645, 17.865664009005, 670.18, 0.01724, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(156, 61, 44.058304, 17.787043, 1423.6, 0.24515, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(156, 62, 43.468709, 17.721939, 924.93, 0.03872, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(157, 58, 43.827062034979, 17.865933990106, 670.66, 0.02216, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(157, 60, 43.827062034979, 17.865933990106, 670.66, 0.02216, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(157, 61, 44.058296, 17.788446, 1439.8, 0.11211, 16.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(157, 62, 43.468291, 17.722738, 934.06, 0.07949, 9.13);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(158, 58, 43.827057005838, 17.865989981219, 670.66, 0.00453, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(158, 60, 43.827057005838, 17.865989981219, 670.66, 0.00453, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(158, 61, 44.058155, 17.79013, 1448.3, 0.13548, 8.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(158, 62, 43.467975, 17.722727, 937.42, 0.03515, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(159, 58, 43.827316006646, 17.866705963388, 672.1, 0.06425, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(159, 60, 43.827316006646, 17.866705963388, 672.1, 0.06425, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(159, 61, 44.057705, 17.791025, 1453.5, 0.08728, 5.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(159, 62, 43.467397, 17.723064, 946.56, 0.06979, 9.14);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(160, 58, 43.82766100578, 17.867358997464, 674.02, 0.06493, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(160, 60, 43.82766100578, 17.867358997464, 674.02, 0.06493, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(160, 61, 44.057743, 17.791521, 1468.1, 0.03986, 14.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(160, 62, 43.467334, 17.723123, 947.52, 0.00847, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(161, 58, 43.82779603824, 17.867583967745, 674.02, 0.02348, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(161, 60, 43.82779603824, 17.867583967745, 674.02, 0.02348, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(161, 61, 44.057095, 17.791027, 1450.8, 0.08216, -17.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(161, 62, 43.466944, 17.723381, 951.84, 0.04811, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(162, 58, 43.827834008262, 17.867720006034, 674.98, 0.0117, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(162, 60, 43.827834008262, 17.867720006034, 674.98, 0.0117, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(162, 61, 44.055634, 17.791325, 1473.8, 0.16419, 23);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(162, 62, 43.466167, 17.723719, 953.28, 0.0906, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(163, 58, 43.827980021015, 17.868140023202, 674.02, 0.0374, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(163, 60, 43.827980021015, 17.868140023202, 674.02, 0.0374, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(163, 61, 44.054577, 17.790508, 1482.2, 0.13445, 8.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(163, 62, 43.465179, 17.72309, 956.17, 0.12102, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(164, 58, 43.828026037663, 17.868347978219, 674.5, 0.01745, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(164, 60, 43.828026037663, 17.868347978219, 674.5, 0.01745, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(164, 61, 44.054184, 17.789831, 1484.2, 0.06955, 2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(164, 62, 43.464655, 17.723144, 962.42, 0.05843, 6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(165, 58, 43.828107006848, 17.868630029261, 674.98, 0.02435, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(165, 60, 43.828107006848, 17.868630029261, 674.98, 0.02435, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(165, 61, 44.052895, 17.789467, 1485.4, 0.14625, 1.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(165, 62, 43.464326, 17.723151, 960.49, 0.03659, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(166, 58, 43.828460974619, 17.869657985866, 677.39, 0.09137, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(166, 60, 43.828460974619, 17.869657985866, 677.39, 0.09137, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(166, 61, 44.052444, 17.78957, 1490.1, 0.05082, 4.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(166, 62, 43.463794, 17.72369, 964.82, 0.07343, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(167, 58, 43.828462986276, 17.869901983067, 677.39, 0.01957, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(167, 60, 43.828462986276, 17.869901983067, 677.39, 0.01957, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(167, 61, 44.052944, 17.790302, 1504, 0.0807, 13.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(167, 62, 43.463091, 17.724699, 960.01, 0.11288, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(168, 58, 43.828480001539, 17.870406992733, 677.87, 0.04055, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(168, 60, 43.828480001539, 17.870406992733, 677.87, 0.04055, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(168, 61, 44.052658, 17.790567, 1512.3, 0.03821, 8.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(168, 62, 43.462482, 17.72503, 955.69, 0.0728, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(169, 58, 43.828948969021, 17.870850982144, 679.31, 0.06315, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(169, 60, 43.828948969021, 17.870850982144, 679.31, 0.06315, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(169, 61, 44.05232, 17.790876, 1523, 0.04497, 10.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(169, 62, 43.461858, 17.725634, 958.57, 0.0848, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(170, 58, 43.829279970378, 17.871076036245, 682.19, 0.04099, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(170, 60, 43.829279970378, 17.871076036245, 682.19, 0.04099, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(170, 61, 44.051758, 17.79121, 1535.4, 0.06795, 12.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(170, 62, 43.460534, 17.726596, 948, 0.16644, -10.57);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(171, 58, 43.829146027565, 17.871417012066, 683.63, 0.03114, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(171, 60, 43.829146027565, 17.871417012066, 683.63, 0.03114, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(171, 61, 44.052147, 17.79304, 1549.9, 0.15251, 14.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(171, 62, 43.460115, 17.726546, 945.59, 0.04677, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(172, 58, 43.829119037837, 17.872012965381, 687, 0.0479, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(172, 60, 43.829119037837, 17.872012965381, 687, 0.0479, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(172, 61, 44.054234, 17.794138, 1572.9, 0.2481, 23);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(172, 62, 43.459367, 17.725534, 933.1, 0.11657, -12.49);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(173, 58, 43.829153990373, 17.87210399285, 687, 0.00827, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(173, 60, 43.829153990373, 17.87210399285, 687, 0.00827, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(173, 61, 44.054573, 17.79494, 1583, 0.07435, 10.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(173, 62, 43.458779, 17.725129, 931.17, 0.0731, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(174, 58, 43.829315006733, 17.872490985319, 688.92, 0.03584, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(174, 60, 43.829315006733, 17.872490985319, 688.92, 0.03584, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(174, 61, 44.05504, 17.795095, 1587.3, 0.05338, 4.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(174, 62, 43.457611, 17.725603, 925.89, 0.13539, -5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(175, 58, 43.829676015303, 17.873222976923, 692.29, 0.07113, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(175, 60, 43.829676015303, 17.873222976923, 692.29, 0.07113, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(175, 61, 44.055244, 17.79553, 1594.2, 0.04151, 6.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(175, 62, 43.457492, 17.725662, 922.52, 0.01406, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(176, 58, 43.829445010051, 17.873433027416, 691.81, 0.03072, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(176, 60, 43.829445010051, 17.873433027416, 691.81, 0.03072, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(176, 61, 44.057026, 17.796658, 1611.8, 0.21769, 17.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(176, 62, 43.456732, 17.726277, 918.2, 0.09801, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(177, 58, 43.829290028661, 17.873527994379, 691.81, 0.01884, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(177, 60, 43.829290028661, 17.873527994379, 691.81, 0.01884, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(177, 61, 44.057487, 17.797249, 1608.8, 0.0697, -3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(177, 62, 43.455427, 17.726772, 907.62, 0.15051, -10.58);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(178, 58, 43.829224985093, 17.873737039044, 691.81, 0.01826, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(178, 60, 43.829224985093, 17.873737039044, 691.81, 0.01826, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(178, 61, 44.0589045, 17.7979014, 1606.6, 0.16602, -2.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(178, 62, 43.45463, 17.727355, 903.3, 0.10034, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(179, 58, 43.829287011176, 17.874382026494, 691.81, 0.0522, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(179, 60, 43.829287011176, 17.874382026494, 691.81, 0.0522, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(179, 61, 44.0590978, 17.7980985, 1605.7, 0.02665, -0.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(179, 62, 43.454121, 17.72764, 897.05, 0.06109, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(180, 58, 43.829657994211, 17.874830039218, 692.77, 0.05471, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(180, 60, 43.829657994211, 17.874830039218, 692.77, 0.05471, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(180, 61, 44.0608709, 17.799226, 1589.9, 0.21677, -15.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(180, 62, 43.453764, 17.727611, 891.76, 0.03977, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(181, 58, 43.829824039713, 17.875230023637, 695.65, 0.03702, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(181, 60, 43.829824039713, 17.875230023637, 695.65, 0.03702, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(181, 61, 44.0611781, 17.799635, 1583, 0.04727, -6.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(181, 62, 43.452969, 17.727048, 882.15, 0.0994, -9.61);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(182, 58, 43.829487003386, 17.875893032178, 699.98, 0.06506, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(182, 60, 43.829487003386, 17.875893032178, 699.98, 0.06506, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(182, 61, 44.0607822, 17.7998423, 1576.4, 0.04704, -6.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(182, 62, 43.452612, 17.726885, 876.38, 0.04182, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(183, 58, 43.829057011753, 17.876170976087, 704.3, 0.05276, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(183, 60, 43.829057011753, 17.876170976087, 704.3, 0.05276, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(183, 61, 44.0614594, 17.8001058, 1574.8, 0.07819, -1.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(183, 62, 43.451858, 17.725906, 861.48, 0.11522, -14.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(184, 58, 43.82870497182, 17.876138035208, 705.26, 0.03923, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(184, 60, 43.82870497182, 17.876138035208, 705.26, 0.03923, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(184, 61, 44.0615024, 17.8002655, 1571, 0.01363, -3.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(184, 62, 43.451015, 17.726005, 866.77, 0.09408, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(185, 58, 43.829211993143, 17.876709010452, 705.75, 0.07264, 0.49);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(185, 60, 43.829211993143, 17.876709010452, 705.75, 0.07264, 0.49);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(185, 61, 44.0588302, 17.8001174, 1568.6, 0.29737, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(185, 62, 43.450654, 17.726441, 871.09, 0.05339, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(186, 58, 43.829501001164, 17.876891987398, 706.71, 0.03533, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(186, 60, 43.829501001164, 17.876891987398, 706.71, 0.03533, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(186, 61, 44.0587778, 17.8002172, 1566, 0.00988, -2.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(186, 62, 43.450027, 17.726772, 873.98, 0.07466, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(187, 58, 43.829842982814, 17.877462040633, 711.03, 0.05947, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(187, 60, 43.829842982814, 17.877462040633, 711.03, 0.05947, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(187, 61, 44.0613334, 17.8009452, 1552.5, 0.29006, -13.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(187, 62, 43.449807, 17.726604, 873.5, 0.02797, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(188, 58, 43.829901991412, 17.877473020926, 711.03, 0.00662, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(188, 60, 43.829901991412, 17.877473020926, 711.03, 0.00662, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(188, 61, 44.0611614, 17.8039585, 1521.4, 0.24153, -31.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(188, 62, 43.449436, 17.725609, 865.32, 0.0903, -8.18);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(189, 58, 43.829936021939, 17.877480983734, 710.55, 0.00384, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(189, 60, 43.829936021939, 17.877480983734, 710.55, 0.00384, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(189, 61, 44.0613334, 17.8009452, 1552.5, 0.24153, 31.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(189, 62, 43.449083, 17.725232, 860.52, 0.04967, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(190, 58, 43.829936021939, 17.877480983734, 711.03, 0, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(190, 60, 43.829936021939, 17.877480983734, 711.03, 0, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(190, 61, 44.0587778, 17.8002172, 1566, 0.29006, 13.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(190, 62, 43.44787, 17.72505, 846.1, 0.13568, -14.42);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(191, 58, 43.830049009994, 17.877942994237, 713.44, 0.03913, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(191, 60, 43.830049009994, 17.877942994237, 713.44, 0.03913, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(191, 61, 44.0615024, 17.8002655, 1571, 0.30299, 5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(191, 62, 43.44647, 17.725354, 830.72, 0.1576, -15.38);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(192, 58, 43.830009028316, 17.878584964201, 718.72, 0.05169, 5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(192, 60, 43.830009028316, 17.878584964201, 718.72, 0.05169, 5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(192, 61, 44.0607822, 17.7998423, 1576.4, 0.08693, 5.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(192, 62, 43.443661, 17.727103, 795.63, 0.34278, -35.09);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(193, 58, 43.829994024709, 17.878726031631, 718.72, 0.01144, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(193, 60, 43.829994024709, 17.878726031631, 718.72, 0.01144, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(193, 61, 44.0611742, 17.7994992, 1585.8, 0.05149, 9.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(193, 62, 43.442045, 17.727054, 774.96, 0.17973, -20.67);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(194, 58, 43.829991007224, 17.878987966105, 721.13, 0.02101, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(194, 60, 43.829991007224, 17.878987966105, 721.13, 0.02101, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(194, 61, 44.0603699, 17.7989555, 1594.9, 0.09943, 9.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(194, 62, 43.441659, 17.727194, 769.19, 0.04438, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(195, 58, 43.830163003877, 17.87959096022, 724.01, 0.05201, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(195, 60, 43.830163003877, 17.87959096022, 724.01, 0.05201, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(195, 61, 44.0590978, 17.7980985, 1605.7, 0.15716, 10.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(195, 62, 43.441102, 17.727795, 761.98, 0.07868, -7.21);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(196, 58, 43.83058000356, 17.880062023178, 725.45, 0.05981, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(196, 60, 43.83058000356, 17.880062023178, 725.45, 0.05981, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(196, 61, 44.0582692, 17.7975179, 1606.2, 0.10316, 0.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(196, 62, 43.440869, 17.7284, 752.85, 0.05529, -9.13);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(197, 58, 43.83104997687, 17.880727965385, 727.37, 0.07473, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(197, 60, 43.83104997687, 17.880727965385, 727.37, 0.07473, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(197, 61, 44.057487, 17.797249, 1608.8, 0.08959, 2.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(197, 62, 43.441657, 17.729681, 743.72, 0.13555, -9.13);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(198, 58, 43.831186015159, 17.880993001163, 728.82, 0.02609, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(198, 60, 43.831186015159, 17.880993001163, 728.82, 0.02609, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(198, 61, 44.057053, 17.796753, 1612, 0.06245, 3.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(198, 62, 43.441691, 17.729791, 741.79, 0.00965, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(199, 58, 43.831219961867, 17.881566993892, 730.26, 0.0462, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(199, 60, 43.831219961867, 17.881566993892, 730.26, 0.0462, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(199, 61, 44.05683, 17.796288, 1605.9, 0.04467, -6.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(199, 62, 43.441625, 17.730073, 739.39, 0.02392, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(200, 58, 43.831216022372, 17.882040990517, 729.78, 0.03802, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(200, 60, 43.831216022372, 17.882040990517, 729.78, 0.03802, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(200, 61, 44.055714, 17.795809, 1599.4, 0.12986, -6.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(200, 62, 43.441364, 17.730194, 736.99, 0.03062, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(201, 58, 43.831201018766, 17.882254980505, 729.3, 0.01725, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(201, 60, 43.831201018766, 17.882254980505, 729.3, 0.01725, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(201, 61, 44.055244, 17.79553, 1594.2, 0.05682, -5.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(201, 62, 43.440046, 17.730158, 724.97, 0.14658, -12.02);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(202, 58, 43.831848017871, 17.882975991815, 731.22, 0.09231, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(202, 60, 43.831848017871, 17.882975991815, 731.22, 0.09231, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(202, 61, 44.05504, 17.795095, 1587.3, 0.04151, -6.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(202, 62, 43.439044, 17.730539, 719.2, 0.11559, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(203, 58, 43.832524018362, 17.883042963222, 731.7, 0.07536, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(203, 60, 43.832524018362, 17.883042963222, 731.7, 0.07536, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(203, 61, 44.054573, 17.79494, 1583, 0.05338, -4.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(203, 62, 43.438197, 17.730592, 716.8, 0.09428, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(204, 58, 43.833258021623, 17.883162992075, 732.18, 0.08218, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(204, 60, 43.833258021623, 17.883162992075, 732.18, 0.08218, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(204, 61, 44.054234, 17.794138, 1572.9, 0.07435, -10.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(204, 62, 43.436514, 17.730064, 706.71, 0.19194, -10.09);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(205, 58, 43.834309028462, 17.883349992335, 733.62, 0.11783, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(205, 60, 43.834309028462, 17.883349992335, 733.62, 0.11783, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(205, 61, 44.052147, 17.79304, 1549.9, 0.2481, -23);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(205, 62, 43.436109, 17.72984, 701.42, 0.04853, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(206, 58, 43.834838010371, 17.883067019284, 735.07, 0.06305, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(206, 60, 43.834838010371, 17.883067019284, 735.07, 0.06305, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(206, 61, 44.051945, 17.791672, 1542, 0.11161, -7.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(206, 62, 43.434637, 17.730145, 696.13, 0.16552, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(207, 58, 43.835044037551, 17.883031982929, 735.07, 0.02308, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(207, 60, 43.835044037551, 17.883031982929, 735.07, 0.02308, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(207, 61, 44.051758, 17.79121, 1535.4, 0.04237, -6.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(207, 62, 43.432229, 17.729462, 686.52, 0.27338, -9.61);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(208, 58, 43.835275964811, 17.882969034836, 735.55, 0.02628, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(208, 60, 43.835275964811, 17.882969034836, 735.55, 0.02628, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(208, 61, 44.052853, 17.790445, 1507.9, 0.13625, -27.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(208, 62, 43.430526, 17.729502, 687, 0.18939, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(209, 58, 43.835778962821, 17.882921006531, 738.91, 0.05606, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(209, 60, 43.835778962821, 17.882921006531, 738.91, 0.05606, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(209, 61, 44.052444, 17.78957, 1490.1, 0.08341, -17.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(209, 62, 43.429784, 17.729754, 684.6, 0.08498, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(210, 58, 43.836512966082, 17.882609032094, 737.47, 0.08537, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(210, 60, 43.836512966082, 17.882609032094, 737.47, 0.08537, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(210, 61, 44.052895, 17.789467, 1485.4, 0.05082, -4.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(210, 62, 43.427507, 17.731151, 681.23, 0.27719, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(211, 58, 43.836925020441, 17.882331004366, 737.95, 0.05096, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(211, 60, 43.836925020441, 17.882331004366, 737.95, 0.05096, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(211, 61, 44.053932, 17.78965, 1483, 0.11623, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(211, 62, 43.425465, 17.732993, 678.35, 0.27145, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(212, 58, 43.83698402904, 17.882312983274, 738.43, 0.00672, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(212, 60, 43.83698402904, 17.882312983274, 738.43, 0.00672, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(212, 61, 44.054184, 17.789831, 1484.2, 0.03153, 1.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(212, 62, 43.424392, 17.733788, 675.94, 0.13549, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(213, 58, 43.837541006505, 17.88232899271, 739.39, 0.06195, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(213, 60, 43.837541006505, 17.88232899271, 739.39, 0.06195, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(213, 61, 44.05441, 17.78999, 1479.4, 0.02816, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(213, 62, 43.422192, 17.734731, 674.98, 0.25621, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(214, 58, 43.838364025578, 17.882615989074, 739.39, 0.09437, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(214, 60, 43.838364025578, 17.882615989074, 739.39, 0.09437, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(214, 61, 44.054577, 17.790508, 1482.2, 0.04537, 2.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(214, 62, 43.418257, 17.737328, 673.54, 0.48523, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(215, 58, 43.838623026386, 17.882495960221, 715.36, 0.03037, -24.03);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(215, 60, 43.838623026386, 17.882495960221, 715.36, 0.03037, -24.03);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(215, 61, 44.055634, 17.791325, 1473.8, 0.13445, -8.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(215, 62, 43.417807, 17.737607, 672.1, 0.05488, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(216, 58, 43.838899964467, 17.882543988526, 715.84, 0.03103, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(216, 60, 43.838899964467, 17.882543988526, 715.84, 0.03103, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(216, 61, 44.057095, 17.791027, 1450.8, 0.16419, -23);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(216, 62, 43.416983, 17.738574, 672.58, 0.1204, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(217, 58, 43.839027034119, 17.88245103322, 715.84, 0.01598, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(217, 60, 43.839027034119, 17.88245103322, 715.84, 0.01598, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(217, 61, 44.057743, 17.791521, 1468.1, 0.08216, 17.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(217, 62, 43.41588, 17.73974, 669.22, 0.15463, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(218, 58, 43.839261978865, 17.882260009646, 716.8, 0.03029, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(218, 60, 43.839261978865, 17.882260009646, 716.8, 0.03029, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(218, 61, 44.058296, 17.788446, 1439.8, 0.2533, -28.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(218, 62, 43.415611, 17.739902, 671.14, 0.03265, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(219, 58, 43.839799007401, 17.881698003039, 718.24, 0.07482, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(219, 60, 43.839799007401, 17.881698003039, 718.24, 0.07482, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(219, 61, 44.058304, 17.787043, 1423.6, 0.11211, -16.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(219, 62, 43.414858, 17.740143, 667.29, 0.08596, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(220, 58, 43.839831026271, 17.881671013311, 718.72, 0.00417, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(220, 60, 43.839831026271, 17.881671013311, 718.72, 0.00417, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(220, 61, 44.05992, 17.784956, 1423.6, 0.24515, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(220, 62, 43.414733, 17.740285, 670.18, 0.01802, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(221, 58, 43.840357996523, 17.881584009156, 721.13, 0.05901, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(221, 60, 43.840357996523, 17.881584009156, 721.13, 0.05901, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(221, 61, 44.05997, 17.78477, 1422.2, 0.01587, -1.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(221, 62, 43.413805, 17.740829, 667.29, 0.11215, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(222, 58, 43.840589001775, 17.881551990286, 721.61, 0.02581, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(222, 60, 43.840589001775, 17.881551990286, 721.61, 0.02581, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(222, 61, 44.060043, 17.783813, 1408.1, 0.0769, -14.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(222, 62, 43.412228, 17.740831, 660.08, 0.17535, -7.21);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(223, 58, 43.841284029186, 17.881201962009, 724.49, 0.08222, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(223, 60, 43.841284029186, 17.881201962009, 724.49, 0.08222, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(223, 61, 44.06056, 17.783289, 1405.1, 0.07112, -3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(223, 62, 43.410812, 17.741748, 661.52, 0.17401, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(224, 58, 43.841458959505, 17.881143959239, 724.49, 0.02, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(224, 60, 43.841458959505, 17.881143959239, 724.49, 0.02, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(224, 61, 44.06101, 17.782736, 1394.8, 0.06676, -10.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(224, 62, 43.409428, 17.742214, 659.12, 0.15843, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(225, 58, 43.842085003853, 17.880758978426, 726.41, 0.07615, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(225, 60, 43.842085003853, 17.880758978426, 726.41, 0.07615, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(225, 61, 44.06339, 17.781397, 1383.8, 0.28545, -11);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(225, 62, 43.408962, 17.742514, 658.16, 0.0572, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(226, 58, 43.842606022954, 17.880541970953, 729.78, 0.06049, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(226, 60, 43.842606022954, 17.880541970953, 729.78, 0.06049, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(226, 61, 44.065136, 17.778395, 1359.3, 0.30859, -24.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(226, 62, 43.407971, 17.743606, 659.12, 0.14115, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(227, 58, 43.842726973817, 17.880413979292, 730.74, 0.01692, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(227, 60, 43.842726973817, 17.880413979292, 730.74, 0.01692, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(227, 61, 44.065952, 17.776836, 1341.3, 0.15411, -18);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(227, 62, 43.406265, 17.744646, 658.64, 0.20747, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(228, 58, 43.843562984839, 17.879743007943, 732.18, 0.10741, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(228, 60, 43.843562984839, 17.879743007943, 732.18, 0.10741, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(228, 61, 44.06619, 17.777088, 1340.2, 0.03325, -1.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(228, 62, 43.40565, 17.745286, 659.6, 0.08573, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(229, 58, 43.84414896369, 17.879412006587, 736.03, 0.07036, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(229, 60, 43.84414896369, 17.879412006587, 736.03, 0.07036, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(229, 61, 44.06661, 17.777779, 1338.4, 0.07231, -1.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(229, 62, 43.402885, 17.746535, 663.93, 0.32359, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(230, 58, 43.844746006653, 17.879147976637, 737.47, 0.06968, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(230, 60, 43.844746006653, 17.879147976637, 737.47, 0.06968, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(230, 61, 44.06773, 17.77882, 1322.9, 0.14976, -15.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(230, 62, 43.402225, 17.747294, 667.29, 0.09563, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(231, 58, 43.845068039373, 17.87894597277, 737.47, 0.0393, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(231, 60, 43.845068039373, 17.87894597277, 737.47, 0.0393, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(231, 61, 44.068428, 17.780859, 1316.3, 0.18045, -6.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(231, 62, 43.402023, 17.747569, 665.85, 0.03159, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(232, 58, 43.845498031005, 17.878616983071, 736.51, 0.05461, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(232, 60, 43.845498031005, 17.878616983071, 736.51, 0.05461, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(232, 61, 44.0689, 17.783312, 1293.3, 0.20289, -23);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(232, 62, 43.401269, 17.748313, 663.93, 0.10316, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(233, 58, 43.846012009308, 17.878182968125, 737.95, 0.06692, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(233, 60, 43.846012009308, 17.878182968125, 737.95, 0.06692, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(233, 61, 44.069218, 17.781086, 1284.4, 0.18132, -8.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(233, 62, 43.400317, 17.748918, 665.85, 0.1166, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(234, 58, 43.846190040931, 17.877982975915, 738.43, 0.02548, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(234, 60, 43.846190040931, 17.877982975915, 738.43, 0.02548, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(234, 61, 44.069572, 17.782673, 1269.7, 0.13276, -14.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(234, 62, 43.399656, 17.749646, 668.25, 0.09414, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(235, 58, 43.846883978695, 17.877961015329, 740.83, 0.07718, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(235, 60, 43.846883978695, 17.877961015329, 740.83, 0.07718, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(235, 61, 44.070557, 17.782057, 1245.7, 0.12008, -24);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(235, 62, 43.39888, 17.750757, 669.22, 0.12451, 0.97);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(236, 58, 43.847185978666, 17.878137035295, 740.83, 0.03643, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(236, 60, 43.847185978666, 17.878137035295, 740.83, 0.03643, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(236, 61, 44.0706, 17.781487, 1248.3, 0.04579, 2.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(236, 62, 43.397112, 17.75199, 681.23, 0.22039, 12.01);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(237, 58, 43.847703980282, 17.878455966711, 743.24, 0.06302, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(237, 60, 43.847703980282, 17.878455966711, 743.24, 0.06302, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(237, 61, 44.07032, 17.781075, 1249.8, 0.04531, 1.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(237, 62, 43.396386, 17.752104, 688.92, 0.08125, 7.69);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(238, 58, 43.848131960258, 17.878299979493, 744.2, 0.04921, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(238, 60, 43.848131960258, 17.878299979493, 744.2, 0.04921, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(238, 61, 44.069767, 17.778746, 1245.8, 0.19597, -4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(238, 62, 43.395895, 17.752568, 692.77, 0.06623, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(239, 58, 43.848624983802, 17.87810803391, 747.08, 0.05694, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(239, 60, 43.848624983802, 17.87810803391, 747.08, 0.05694, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(239, 61, 44.069336, 17.775875, 1227.3, 0.23433, -18.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(239, 62, 43.395546, 17.752901, 690.84, 0.04722, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(240, 58, 43.849027985707, 17.878222027794, 749.49, 0.04573, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(240, 60, 43.849027985707, 17.878222027794, 749.49, 0.04573, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(240, 61, 44.06971, 17.774395, 1209.7, 0.12534, -17.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(240, 62, 43.395006, 17.753083, 690.84, 0.06182, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(241, 58, 43.849400980398, 17.878615977243, 752.85, 0.05214, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(241, 60, 43.849400980398, 17.878615977243, 752.85, 0.05214, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(241, 61, 44.06949, 17.771975, 1199.2, 0.19488, -10.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(241, 62, 43.393995, 17.753203, 687, 0.11284, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(242, 58, 43.850059965625, 17.879031971097, 756.21, 0.08051, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(242, 60, 43.850059965625, 17.879031971097, 756.21, 0.08051, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(242, 61, 44.06951, 17.771832, 1197.9, 0.01164, -1.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(242, 62, 43.393027, 17.753622, 682.67, 0.11284, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(243, 58, 43.850988009945, 17.879127021879, 761.02, 0.10347, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(243, 60, 43.850988009945, 17.879127021879, 761.02, 0.10347, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(243, 61, 44.07051, 17.770124, 1179.9, 0.17602, -18);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(243, 62, 43.392966, 17.753659, 681.23, 0.00741, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(244, 58, 43.851204011589, 17.87902995944, 763.9, 0.02525, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(244, 60, 43.851204011589, 17.87902995944, 763.9, 0.02525, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(244, 61, 44.071198, 17.770098, 1167.5, 0.07653, -12.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(244, 62, 43.392447, 17.754093, 677.87, 0.06753, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(245, 58, 43.851630985737, 17.879026019946, 766.79, 0.04748, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(245, 60, 43.851630985737, 17.879026019946, 766.79, 0.04748, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(245, 61, 44.071564, 17.769348, 1164.2, 0.07243, -3.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(245, 62, 43.391992, 17.754663, 674.02, 0.06842, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(246, 58, 43.851916976273, 17.879009004682, 769.67, 0.03183, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(246, 60, 43.851916976273, 17.879009004682, 769.67, 0.03183, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(246, 61, 44.071415, 17.768116, 1161.7, 0.09981, -2.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(246, 62, 43.391837, 17.75484, 672.1, 0.0224, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(247, 58, 43.85229902342, 17.878751009703, 772.56, 0.04725, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(247, 60, 43.85229902342, 17.878751009703, 772.56, 0.04725, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(247, 61, 44.07055, 17.766104, 1162.7, 0.18732, 1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(247, 62, 43.390742, 17.7557, 664.41, 0.14019, -7.69);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(248, 58, 43.852435983717, 17.878454038873, 773.52, 0.02827, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(248, 60, 43.852435983717, 17.878454038873, 773.52, 0.02827, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(248, 61, 44.0701, 17.764929, 1148.9, 0.10638, -13.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(248, 62, 43.389737, 17.756078, 659.12, 0.11585, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(249, 58, 43.852599011734, 17.877775020897, 776.4, 0.05739, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(249, 60, 43.852599011734, 17.877775020897, 776.4, 0.05739, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(249, 61, 44.069405, 17.765049, 1163.1, 0.07787, 14.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(249, 62, 43.385853, 17.758598, 630.76, 0.47748, -28.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(250, 58, 43.852651985362, 17.876834990457, 780.25, 0.07561, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(250, 60, 43.852651985362, 17.876834990457, 780.25, 0.07561, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(250, 61, 44.06922, 17.764894, 1162.1, 0.02401, -1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(250, 62, 43.384958, 17.759394, 622.59, 0.1185, -8.17);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(251, 58, 43.852623989806, 17.876244988292, 784.09, 0.04741, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(251, 60, 43.852623989806, 17.876244988292, 784.09, 0.04741, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(251, 61, 44.06885, 17.76364, 1140.1, 0.10831, -22);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(251, 62, 43.383116, 17.760317, 612.5, 0.21798, -10.09);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(252, 58, 43.852604962885, 17.875633025542, 788.9, 0.04912, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(252, 60, 43.852604962885, 17.875633025542, 788.9, 0.04912, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(252, 61, 44.06833, 17.763632, 1142.8, 0.05782, 2.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(252, 62, 43.382185, 17.760863, 602.4, 0.11253, -10.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(253, 58, 43.852925989777, 17.875090967864, 793.71, 0.05624, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(253, 60, 43.852925989777, 17.875090967864, 793.71, 0.05624, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(253, 61, 44.066555, 17.764084, 1124.4, 0.20065, -18.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(253, 62, 43.381038, 17.761251, 593.75, 0.13134, -8.65);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(254, 58, 43.853051969782, 17.874672040343, 796.59, 0.0364, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(254, 60, 43.853051969782, 17.874672040343, 796.59, 0.0364, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(254, 61, 44.065884, 17.764505, 1121, 0.08184, -3.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(254, 62, 43.380668, 17.761553, 588.46, 0.04784, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(255, 58, 43.853138973936, 17.87437196821, 799.95, 0.02593, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(255, 60, 43.853138973936, 17.87437196821, 799.95, 0.02593, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(255, 61, 44.065453, 17.765255, 1119.4, 0.07673, -1.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(255, 62, 43.380648, 17.761311, 583.18, 0.01968, -5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(256, 58, 43.85333603248, 17.873882967979, 803.32, 0.04492, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(256, 60, 43.85333603248, 17.873882967979, 803.32, 0.04492, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(256, 61, 44.06534, 17.765385, 1117.1, 0.0163, -2.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(256, 62, 43.382373, 17.759931, 572.12, 0.22188, -11.06);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(257, 58, 43.853423958644, 17.873742990196, 804.76, 0.01489, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(257, 60, 43.853423958644, 17.873742990196, 804.76, 0.01489, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(257, 61, 44.065136, 17.766142, 1113.6, 0.0646, -3.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(257, 62, 43.382525, 17.759439, 567.32, 0.0432, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(258, 58, 43.853668039665, 17.873651962727, 808.61, 0.0281, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(258, 60, 43.853668039665, 17.873651962727, 808.61, 0.0281, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(258, 61, 44.065353, 17.76665, 1124.9, 0.04722, 11.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(258, 62, 43.382187, 17.759799, 566.35, 0.04753, -0.97);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(259, 58, 43.853896027431, 17.873673001304, 811.97, 0.02541, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(259, 60, 43.853896027431, 17.873673001304, 811.97, 0.02541, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(259, 61, 44.065334, 17.766869, 1125.4, 0.01762, 0.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(259, 62, 43.382046, 17.759847, 564.43, 0.01615, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(260, 58, 43.853974984959, 17.873548027128, 812.93, 0.01332, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(260, 60, 43.853974984959, 17.873548027128, 812.93, 0.01332, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(260, 61, 44.0649043, 17.7676349, 1115.3, 0.07764, -10.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(260, 62, 43.380744, 17.759837, 556.26, 0.14478, -8.17);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(261, 58, 43.853987976909, 17.873306041583, 826.39, 0.01946, 13.46);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(261, 60, 43.853987976909, 17.873306041583, 826.39, 0.01946, 13.46);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(261, 61, 44.0638398, 17.7686624, 1107.4, 0.14405, -7.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(261, 62, 43.379751, 17.759906, 547.13, 0.11056, -9.13);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(262, 58, 43.853664016351, 17.873207973316, 829.27, 0.03687, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(262, 60, 43.853664016351, 17.873207973316, 829.27, 0.03687, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(262, 61, 44.0627395, 17.7688074, 1083, 0.1229, -24.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(262, 62, 43.377168, 17.76148, 526.46, 0.31413, -20.67);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(263, 58, 43.853580029681, 17.873225994408, 829.27, 0.00945, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(263, 60, 43.853580029681, 17.873225994408, 829.27, 0.00945, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(263, 61, 44.0621546, 17.7707806, 1116, 0.17055, 33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(263, 62, 43.375417, 17.761722, 511.08, 0.19568, -15.38);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(264, 58, 43.853247016668, 17.873285003006, 834.56, 0.03733, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(264, 60, 43.853247016668, 17.873285003006, 834.56, 0.03733, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(264, 61, 44.061982, 17.770568, 1111.7, 0.02563, -4.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(264, 62, 43.373888, 17.762716, 498.1, 0.18804, -12.98);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(265, 58, 43.852934958413, 17.87323102355, 838.89, 0.03497, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(265, 60, 43.852934958413, 17.87323102355, 838.89, 0.03497, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(265, 61, 44.0616392, 17.7698207, 1084.3, 0.07084, -27.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(265, 62, 43.372307, 17.763325, 488.01, 0.18256, -10.09);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(266, 58, 43.852889025584, 17.873252984136, 838.89, 0.0054, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(266, 60, 43.852889025584, 17.873252984136, 838.89, 0.0054, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(266, 61, 44.0609107, 17.7694345, 1065.6, 0.08668, -18.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(266, 62, 43.372129, 17.763511, 486.56, 0.02486, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(267, 58, 43.852757010609, 17.873384999111, 840.81, 0.0181, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(267, 60, 43.852757010609, 17.873384999111, 840.81, 0.0181, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(267, 61, 44.060115, 17.7702281, 1078.1, 0.10886, 12.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(267, 62, 43.371777, 17.764105, 477.43, 0.06194, -9.13);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(268, 58, 43.852679980919, 17.873796969652, 844.18, 0.03413, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(268, 60, 43.852679980919, 17.873796969652, 844.18, 0.03413, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(268, 61, 44.0581068, 17.7705304, 1053.5, 0.2246, -24.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(268, 62, 43.371104, 17.764704, 472.63, 0.08913, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(269, 58, 43.852480994537, 17.873962009326, 846.58, 0.02578, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(269, 60, 43.852480994537, 17.873962009326, 846.58, 0.02578, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(269, 61, 44.0560648, 17.7717101, 1064.2, 0.24585, 10.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(269, 62, 43.370367, 17.765494, 460.61, 0.10389, -12.02);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(270, 58, 43.852503960952, 17.873909035698, 847.06, 0.00496, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(270, 60, 43.852503960952, 17.873909035698, 847.06, 0.00496, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(270, 61, 44.0560511, 17.7716692, 1063.5, 0.00361, -0.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(270, 62, 43.370184, 17.7659, 459.17, 0.03861, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(271, 58, 43.852576967329, 17.873440990224, 851.87, 0.0384, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(271, 60, 43.852576967329, 17.873440990224, 851.87, 0.0384, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(271, 61, 44.0561093, 17.7712276, 1062.2, 0.03588, -1.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(271, 62, 43.370049, 17.766348, 454.36, 0.0392, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(272, 58, 43.852603035048, 17.873395979404, 852.35, 0.00463, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(272, 60, 43.852603035048, 17.873395979404, 852.35, 0.00463, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(272, 61, 44.0571984, 17.7696265, 1044.9, 0.17617, -17.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(272, 62, 43.368974, 17.768026, 442.34, 0.18079, -12.02);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(273, 58, 43.852765979245, 17.873137984425, 855.71, 0.0275, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(273, 60, 43.852765979245, 17.873137984425, 855.71, 0.0275, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(273, 61, 44.058304, 17.76872, 1030.7, 0.14269, -14.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(273, 62, 43.368346, 17.769352, 429.37, 0.12793, -12.97);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(274, 58, 43.853035960346, 17.872854005545, 858.59, 0.03768, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(274, 60, 43.853035960346, 17.872854005545, 858.59, 0.03768, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(274, 61, 44.06031, 17.767721, 997, 0.23691, -33.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(274, 62, 43.367324, 17.769761, 421.68, 0.11835, -7.69);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(275, 58, 43.853195970878, 17.872523004189, 860.52, 0.03195, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(275, 60, 43.853195970878, 17.872523004189, 860.52, 0.03195, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(275, 61, 44.061146, 17.766417, 978.8, 0.13964, -18.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(275, 62, 43.366643, 17.770333, 416.87, 0.08872, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(276, 58, 43.853296972811, 17.872546976432, 861.48, 0.01139, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(276, 60, 43.853296972811, 17.872546976432, 861.48, 0.01139, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(276, 61, 44.061237, 17.765821, 976, 0.04869, -2.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(276, 62, 43.364995, 17.771137, 403.41, 0.19443, -13.46);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(277, 58, 43.853763006628, 17.872512023896, 864.84, 0.0519, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(277, 60, 43.853763006628, 17.872512023896, 864.84, 0.0519, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(277, 61, 44.061806, 17.765392, 972.8, 0.07196, -3.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(277, 62, 43.363786, 17.771967, 392.36, 0.15025, -11.05);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(278, 58, 43.854019995779, 17.872634986416, 868.21, 0.03023, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(278, 60, 43.854019995779, 17.872634986416, 868.21, 0.03023, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(278, 61, 44.06168, 17.764414, 956.2, 0.07939, -16.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(278, 62, 43.362843, 17.772302, 385.63, 0.1083, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(279, 58, 43.854260975495, 17.872755015269, 871.57, 0.02847, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(279, 60, 43.854260975495, 17.872755015269, 871.57, 0.02847, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(279, 61, 44.06189, 17.764324, 960.7, 0.02443, 4.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(279, 62, 43.361049, 17.773966, 368.32, 0.2406, -17.31);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(280, 58, 43.85460597463, 17.872724002227, 874.94, 0.03844, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(280, 60, 43.85460597463, 17.872724002227, 874.94, 0.03844, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(280, 61, 44.062183, 17.76362, 960.8, 0.06501, 0.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(280, 62, 43.360445, 17.7743, 364.96, 0.07239, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(281, 58, 43.854803033173, 17.872826009989, 876.38, 0.02339, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(281, 60, 43.854803033173, 17.872826009989, 876.38, 0.02339, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(281, 61, 44.062515, 17.763401, 960.7, 0.04085, -0.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(281, 62, 43.359426, 17.776098, 352.94, 0.1843, -12.02);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(282, 58, 43.855098998174, 17.873047040775, 879.26, 0.03738, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(282, 60, 43.855098998174, 17.873047040775, 879.26, 0.03738, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(282, 61, 44.06224, 17.762533, 953.8, 0.0758, -6.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(282, 62, 43.359081, 17.777578, 347.17, 0.12565, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(283, 58, 43.855377025902, 17.87323798053, 882.63, 0.0345, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(283, 60, 43.855377025902, 17.87323798053, 882.63, 0.0345, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(283, 61, 44.062813, 17.761812, 948.2, 0.0859, -5.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(283, 62, 43.358939, 17.779458, 333.23, 0.15281, -13.94);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(284, 58, 43.855782961473, 17.873602006584, 885.99, 0.05375, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(284, 60, 43.855782961473, 17.873602006584, 885.99, 0.05375, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(284, 61, 44.06289, 17.761314, 944.9, 0.0407, -3.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(284, 62, 43.358507, 17.780831, 325.06, 0.12095, -8.17);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(285, 58, 43.856266010553, 17.874052030966, 890.32, 0.06471, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(285, 60, 43.856266010553, 17.874052030966, 890.32, 0.06471, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(285, 61, 44.063183, 17.760302, 930.6, 0.08718, -14.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(285, 62, 43.358222, 17.781755, 314.01, 0.08115, -11.05);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(286, 58, 43.856306998059, 17.874072985724, 890.32, 0.00486, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(286, 60, 43.856306998059, 17.874072985724, 890.32, 0.00486, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(286, 61, 44.06378, 17.759636, 929.7, 0.08508, -0.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(286, 62, 43.358104, 17.781753, 314.01, 0.01312, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(287, 58, 43.856769008562, 17.874483028427, 892.72, 0.06099, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(287, 60, 43.856769008562, 17.874483028427, 892.72, 0.06099, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(287, 61, 44.06393, 17.75852, 917.6, 0.09072, -12.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(287, 62, 43.358455, 17.780325, 305.36, 0.12187, -8.65);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(288, 58, 43.856908986345, 17.874602973461, 892.72, 0.0183, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(288, 60, 43.856908986345, 17.874602973461, 892.72, 0.0183, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(288, 61, 44.06441, 17.7581, 911.8, 0.06305, -5.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(288, 62, 43.358594, 17.779, 299.11, 0.10823, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(289, 58, 43.85714401491, 17.874697018415, 894.16, 0.0272, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(289, 60, 43.85714401491, 17.874697018415, 894.16, 0.0272, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(289, 61, 44.06444, 17.757557, 909.9, 0.04351, -1.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(289, 62, 43.358383, 17.776877, 284.69, 0.17323, -14.42);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(290, 58, 43.857683977112, 17.874272977933, 897.05, 0.069, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(290, 60, 43.857683977112, 17.874272977933, 897.05, 0.069, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(290, 61, 44.065514, 17.756128, 898.8, 0.16522, -11.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(290, 62, 43.359002, 17.774311, 271.71, 0.21857, -12.98);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(291, 58, 43.857979020104, 17.874175999314, 897.05, 0.03372, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(291, 60, 43.857979020104, 17.874175999314, 897.05, 0.03372, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(291, 61, 44.0658, 17.755802, 890.6, 0.04111, -8.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(291, 62, 43.359764, 17.77309, 261.62, 0.13009, -10.09);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(292, 58, 43.85819401592, 17.874119002372, 898.97, 0.02434, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(292, 60, 43.85819401592, 17.874119002372, 898.97, 0.02434, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(292, 61, 44.06624, 17.755442, 891, 0.05675, 0.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(292, 62, 43.359899, 17.772531, 259.69, 0.04762, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(293, 58, 43.858423009515, 17.874002996832, 900.41, 0.02711, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(293, 60, 43.858423009515, 17.874002996832, 900.41, 0.02711, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(293, 61, 44.066654, 17.75495, 876.4, 0.06053, -14.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(293, 62, 43.359951, 17.771882, 254.41, 0.05279, -5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(294, 58, 43.858925001696, 17.874064017087, 902.82, 0.05603, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(294, 60, 43.858925001696, 17.874064017087, 902.82, 0.05603, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(294, 61, 44.06737, 17.754488, 878.9, 0.08776, 2.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(294, 62, 43.359895, 17.771679, 251.04, 0.01755, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(295, 58, 43.859558003023, 17.873873999342, 906.66, 0.07202, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(295, 60, 43.859558003023, 17.873873999342, 906.66, 0.07202, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(295, 61, 44.069214, 17.75386, 856.9, 0.21109, -22);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(295, 62, 43.359544, 17.771466, 247.2, 0.04266, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(296, 58, 43.860167032108, 17.873643999919, 908.1, 0.07019, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(296, 60, 43.860167032108, 17.873643999919, 908.1, 0.07019, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(296, 61, 44.070503, 17.754725, 854.5, 0.15912, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(296, 62, 43.358714, 17.771599, 239.51, 0.09292, -7.69);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(297, 58, 43.860586965457, 17.873608963564, 909.06, 0.04678, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(297, 60, 43.860586965457, 17.873608963564, 909.06, 0.04678, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(297, 61, 44.071404, 17.755579, 844.2, 0.12121, -10.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(297, 62, 43.358361, 17.771654, 235.18, 0.0395, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(298, 58, 43.861047970131, 17.873656991869, 910.03, 0.05141, 0.97);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(298, 60, 43.861047970131, 17.873656991869, 910.03, 0.05141, 0.97);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(298, 61, 44.071903, 17.756708, 833.3, 0.1059, -10.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(298, 62, 43.357818, 17.771925, 224.61, 0.06423, -10.57);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(299, 58, 43.861558008939, 17.873914986849, 912.43, 0.06037, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(299, 60, 43.861558008939, 17.873914986849, 912.43, 0.06037, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(299, 61, 44.073795, 17.758448, 827.4, 0.25216, -5.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(299, 62, 43.357553, 17.772662, 221.24, 0.06647, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(300, 58, 43.86203401722, 17.874226039276, 917.24, 0.05851, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(300, 60, 43.86203401722, 17.874226039276, 917.24, 0.05851, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(300, 61, 44.073956, 17.758652, 825.7, 0.02421, -1.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(300, 62, 43.357391, 17.77313, 215.47, 0.04191, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(301, 58, 43.862090008333, 17.874267026782, 917.72, 0.00704, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(301, 60, 43.862090008333, 17.874267026782, 917.72, 0.00704, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(301, 61, 44.074078, 17.759739, 818.7, 0.08789, -7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(301, 62, 43.357272, 17.773264, 211.63, 0.0171, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(302, 58, 43.862340962514, 17.874275995418, 919.64, 0.02791, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(302, 60, 43.862340962514, 17.874275995418, 919.64, 0.02791, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(302, 61, 44.074356, 17.75993, 813.8, 0.03447, -4.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(302, 62, 43.357121, 17.772583, 205.38, 0.05756, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(303, 58, 43.862728038803, 17.874187985435, 923.96, 0.04362, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(303, 60, 43.862728038803, 17.874187985435, 923.96, 0.04362, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(303, 61, 44.075386, 17.759676, 812.6, 0.11631, -1.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(303, 62, 43.356982, 17.772471, 203.46, 0.01791, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(304, 58, 43.862869022414, 17.87422302179, 925.41, 0.01593, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(304, 60, 43.862869022414, 17.87422302179, 925.41, 0.01593, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(304, 61, 44.076393, 17.758015, 810.3, 0.17362, -2.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(304, 62, 43.356494, 17.772233, 191.44, 0.05757, -12.02);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(305, 58, 43.863042024896, 17.874267026782, 927.33, 0.01956, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(305, 60, 43.863042024896, 17.874267026782, 927.33, 0.01956, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(305, 61, 44.076633, 17.757942, 810.6, 0.02732, 0.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(305, 62, 43.356476, 17.772281, 194.32, 0.00437, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(306, 58, 43.8631939888, 17.874239031225, 928.77, 0.01705, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(306, 60, 43.8631939888, 17.874239031225, 928.77, 0.01705, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(306, 61, 44.079453, 17.75774, 779.8, 0.31398, -30.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(306, 62, 43.356472, 17.772297, 190.48, 0.00137, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(307, 58, 43.862898023799, 17.8741200082, 931.65, 0.03427, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(307, 60, 43.862898023799, 17.8741200082, 931.65, 0.03427, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(307, 61, 44.08012, 17.75664, 761.8, 0.11498, -18);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(307, 62, 43.356501, 17.772997, 185.19, 0.05669, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(308, 58, 43.862699959427, 17.874090000987, 935.02, 0.02215, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(308, 60, 43.862699959427, 17.874090000987, 935.02, 0.02215, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(308, 61, 44.08111, 17.756447, 758.7, 0.11116, -3.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(308, 62, 43.356473, 17.77326, 182.79, 0.02149, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(309, 58, 43.862527962774, 17.874084971845, 938.38, 0.01913, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(309, 60, 43.862527962774, 17.874084971845, 938.38, 0.01913, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(309, 61, 44.081425, 17.756393, 754, 0.03529, -4.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(309, 62, 43.356166, 17.773886, 178.94, 0.06105, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(310, 58, 43.862338028848, 17.873996961862, 940.79, 0.02227, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(310, 60, 43.862338028848, 17.873996961862, 940.79, 0.02227, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(310, 61, 44.08231, 17.757002, 753.2, 0.10977, -0.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(310, 62, 43.355379, 17.774333, 174.14, 0.09468, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(311, 58, 43.862018007785, 17.873667972162, 945.59, 0.04429, 4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(311, 60, 43.862018007785, 17.873667972162, 945.59, 0.04429, 4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(311, 61, 44.083508, 17.75782, 740.1, 0.14837, -13.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(311, 62, 43.355127, 17.774704, 173.66, 0.04105, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(312, 58, 43.861971991137, 17.87314703688, 950.4, 0.04208, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(312, 60, 43.861971991137, 17.87314703688, 950.4, 0.04208, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(312, 61, 44.08583, 17.756187, 740.4, 0.28927, 0.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(312, 62, 43.355094, 17.77482, 173.17, 0.01007, -0.49);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(313, 58, 43.862011972815, 17.872842019424, 953.77, 0.02485, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(313, 60, 43.862011972815, 17.872842019424, 953.77, 0.02485, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(313, 61, 44.087746, 17.756443, 709.8, 0.21403, -30.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(313, 62, 43.354719, 17.775482, 166.93, 0.06785, -6.24);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(314, 58, 43.862087996677, 17.872366011143, 957.13, 0.03909, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(314, 60, 43.862087996677, 17.872366011143, 957.13, 0.03909, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(314, 61, 44.088406, 17.756037, 709.9, 0.08023, 0.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(314, 62, 43.353415, 17.776466, 156.83, 0.16539, -10.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(315, 58, 43.861770993099, 17.872511018068, 957.61, 0.03712, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(315, 60, 43.861770993099, 17.872511018068, 957.61, 0.03712, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(315, 61, 44.090153, 17.755968, 661.9, 0.19434, -48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(315, 62, 43.352839, 17.777023, 150.1, 0.0783, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(316, 58, 43.861167998984, 17.872740011662, 960.98, 0.06952, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(316, 60, 43.861167998984, 17.872740011662, 960.98, 0.06952, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(316, 61, 44.09136, 17.756487, 658.3, 0.14047, -3.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(316, 62, 43.352251, 17.779704, 135.2, 0.22642, -14.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(317, 58, 43.861076971516, 17.872704975307, 960.98, 0.0105, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(317, 60, 43.861076971516, 17.872704975307, 960.98, 0.0105, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(317, 61, 44.091908, 17.757393, 654.9, 0.0946, -3.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(317, 62, 43.351463, 17.781034, 137.61, 0.13872, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(318, 58, 43.86081696488, 17.872420996428, 967.22, 0.0368, 6.24);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(318, 60, 43.86081696488, 17.872420996428, 967.22, 0.0368, 6.24);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(318, 61, 44.092995, 17.75787, 659.1, 0.12673, 4.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(318, 62, 43.351079, 17.781712, 136.16, 0.06949, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(319, 58, 43.860886031762, 17.872483022511, 968.67, 0.00915, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(319, 60, 43.860886031762, 17.872483022511, 968.67, 0.00915, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(319, 61, 44.09383, 17.758066, 652.1, 0.09416, -7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(319, 62, 43.350447, 17.782813, 128.47, 0.11342, -7.69);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(320, 58, 43.860974963754, 17.872504983097, 968.67, 0.01004, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(320, 60, 43.860974963754, 17.872504983097, 968.67, 0.01004, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(320, 61, 44.094147, 17.758238, 641.5, 0.03783, -10.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(320, 62, 43.350105, 17.784307, 123.67, 0.12665, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(321, 58, 43.861318035051, 17.872453015298, 970.11, 0.03837, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(321, 60, 43.861318035051, 17.872453015298, 970.11, 0.03837, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(321, 61, 44.094593, 17.758757, 639.8, 0.06463, -1.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(321, 62, 43.349101, 17.785644, 120.78, 0.15541, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(322, 58, 43.861722964793, 17.872064011171, 972.99, 0.05477, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(322, 60, 43.861722964793, 17.872064011171, 972.99, 0.05477, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(322, 61, 44.09476, 17.759155, 630.5, 0.03681, -9.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(322, 62, 43.347905, 17.786813, 116.46, 0.16316, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(323, 58, 43.861812986434, 17.8718399629, 975.39, 0.02056, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(323, 60, 43.861812986434, 17.8718399629, 975.39, 0.02056, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(323, 61, 44.094963, 17.759287, 624.5, 0.02491, -6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(323, 62, 43.347122, 17.787961, 114.53, 0.12727, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(324, 58, 43.86191197671, 17.871351968497, 979.24, 0.04064, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(324, 60, 43.86191197671, 17.871351968497, 979.24, 0.04064, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(324, 61, 44.095688, 17.75884, 636.1, 0.08817, 11.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(324, 62, 43.346864, 17.788536, 114.05, 0.05463, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(325, 58, 43.862065030262, 17.871228000149, 981.16, 0.01971, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(325, 60, 43.862065030262, 17.871228000149, 981.16, 0.01971, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(325, 61, 44.096336, 17.758753, 633.2, 0.07239, -2.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(325, 62, 43.34672, 17.789605, 121.26, 0.08791, 7.21);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(326, 58, 43.862239038572, 17.871546009555, 984.05, 0.03201, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(326, 60, 43.862239038572, 17.871546009555, 984.05, 0.03201, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(326, 61, 44.097244, 17.759216, 597.9, 0.10752, -35.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(326, 62, 43.346663, 17.789842, 122.22, 0.02019, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(327, 58, 43.862384967506, 17.872100975364, 987.89, 0.04736, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(327, 60, 43.862384967506, 17.872100975364, 987.89, 0.04736, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(327, 61, 44.09795, 17.760126, 590.6, 0.10697, -7.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(327, 62, 43.346304, 17.79101, 124.63, 0.10254, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(328, 58, 43.862386979163, 17.872125031427, 987.89, 0.00194, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(328, 60, 43.862386979163, 17.872125031427, 987.89, 0.00194, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(328, 61, 44.09822, 17.759851, 589.8, 0.0372, -0.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(328, 62, 43.345912, 17.79133, 127.03, 0.05069, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(329, 58, 43.862508013844, 17.87277395837, 991.74, 0.05374, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(329, 60, 43.862508013844, 17.87277395837, 991.74, 0.05374, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(329, 61, 44.100304, 17.760159, 580.5, 0.23303, -9.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(329, 62, 43.345743, 17.791403, 127.03, 0.0197, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(330, 58, 43.862782018259, 17.872918965295, 993.66, 0.03261, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(330, 60, 43.862782018259, 17.872918965295, 993.66, 0.03261, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(330, 61, 44.10115, 17.761175, 577.6, 0.12422, -2.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(330, 62, 43.345498, 17.791772, 124.15, 0.0404, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(331, 58, 43.862800039351, 17.872925000265, 994.14, 0.00206, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(331, 60, 43.862800039351, 17.872925000265, 994.14, 0.00206, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(331, 61, 44.101727, 17.762688, 559.2, 0.13679, -18.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(331, 62, 43.345273, 17.79183, 123.19, 0.02545, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(332, 58, 43.863259032369, 17.872958024964, 997.99, 0.05111, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(332, 60, 43.863259032369, 17.872958024964, 997.99, 0.05111, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(332, 61, 44.10254, 17.762062, 565.9, 0.1033, 6.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(332, 62, 43.343844, 17.791272, 118.38, 0.16518, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(333, 58, 43.863743003458, 17.872728025541, 1001.83, 0.05689, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(333, 60, 43.863743003458, 17.872728025541, 1001.83, 0.05689, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(333, 61, 44.10296, 17.761944, 560, 0.04764, -5.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(333, 62, 43.343767, 17.791285, 117.9, 0.00863, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(334, 58, 43.863847022876, 17.872702041641, 1003.75, 0.01175, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(334, 60, 43.863847022876, 17.872702041641, 1003.75, 0.01175, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(334, 61, 44.10577, 17.76303, 543.8, 0.32427, -16.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(334, 62, 43.343139, 17.791769, 114.53, 0.08005, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(335, 58, 43.864037040621, 17.872785022482, 1005.2, 0.02215, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(335, 60, 43.864037040621, 17.872785022482, 1005.2, 0.02215, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(335, 61, 44.106426, 17.763897, 547.2, 0.10056, 3.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(335, 62, 43.343039, 17.79196, 113.57, 0.01903, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(336, 58, 43.864444987848, 17.873127004132, 1008.56, 0.053, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(336, 60, 43.864444987848, 17.873127004132, 1008.56, 0.053, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(336, 61, 44.108677, 17.764963, 534.4, 0.26437, -12.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(336, 62, 43.342911, 17.792652, 111.17, 0.05774, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(337, 58, 43.864861987531, 17.873252984136, 1010.96, 0.04746, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(337, 60, 43.864861987531, 17.873252984136, 1010.96, 0.04746, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(337, 61, 44.10945, 17.765762, 530.3, 0.10704, -4.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(337, 62, 43.342976, 17.793147, 109.25, 0.04068, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(338, 58, 43.865314023569, 17.873610975221, 1016.25, 0.05788, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(338, 60, 43.865314023569, 17.873610975221, 1016.25, 0.05788, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(338, 61, 44.109543, 17.766302, 534.9, 0.04434, 4.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(338, 62, 43.343903, 17.794963, 95.79, 0.17942, -13.46);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(339, 58, 43.86557101272, 17.873893026263, 1019.62, 0.03644, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(339, 60, 43.86557101272, 17.873893026263, 1019.62, 0.03644, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(339, 61, 44.110817, 17.76658, 515.8, 0.14339, -19.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(339, 62, 43.344042, 17.795512, 91.46, 0.04701, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(340, 58, 43.865815009922, 17.87392697297, 1022.02, 0.02727, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(340, 60, 43.865815009922, 17.87392697297, 1022.02, 0.02727, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(340, 61, 44.111076, 17.767565, 534, 0.08375, 18.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(340, 62, 43.342613, 17.79875, 85.21, 0.30629, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(341, 58, 43.86596496217, 17.87406200543, 1023.46, 0.01988, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(341, 60, 43.86596496217, 17.87406200543, 1023.46, 0.01988, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(341, 61, 44.11258, 17.766956, 518.1, 0.17416, -15.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(341, 62, 43.341649, 17.802844, 81.37, 0.348, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(342, 58, 43.866121033207, 17.874221010134, 1024.42, 0.02153, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(342, 60, 43.866121033207, 17.874221010134, 1024.42, 0.02153, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(342, 61, 44.112812, 17.767406, 519.3, 0.04423, 1.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(342, 62, 43.341731, 17.803151, 81.37, 0.02645, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(343, 58, 43.866487992927, 17.874659970403, 1027.79, 0.05388, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(343, 60, 43.866487992927, 17.874659970403, 1027.79, 0.05388, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(343, 61, 44.11346, 17.767668, 514.8, 0.07503, -4.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(343, 62, 43.341779, 17.803074, 80.89, 0.0082, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(344, 58, 43.866688990965, 17.874894998968, 1030.19, 0.02923, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(344, 60, 43.866688990965, 17.874894998968, 1030.19, 0.02923, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(344, 61, 44.113865, 17.768612, 521.5, 0.08779, 6.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(344, 62, 43.341665, 17.802971, 80.89, 0.01517, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(345, 58, 43.867061985657, 17.874822998419, 1034.04, 0.04187, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(345, 60, 43.867061985657, 17.874822998419, 1034.04, 0.04187, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(345, 61, 44.11519, 17.768948, 510.9, 0.14976, -10.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(345, 62, 43.341653, 17.803141, 80.89, 0.01381, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(346, 58, 43.867209004238, 17.874485040084, 1035.96, 0.03164, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(346, 60, 43.867209004238, 17.874485040084, 1035.96, 0.03164, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(346, 61, 44.116417, 17.769789, 503.9, 0.15206, -7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(346, 62, 43.341777, 17.803112, 80.89, 0.01399, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(347, 58, 43.867942001671, 17.874212963507, 1041.25, 0.08437, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(347, 60, 43.867942001671, 17.874212963507, 1041.25, 0.08437, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(347, 61, 44.11696, 17.771872, 504.1, 0.17691, 0.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(347, 62, 43.341632, 17.803033, 80.89, 0.01734, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(348, 58, 43.86841901578, 17.874138029292, 1043.17, 0.05338, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(348, 60, 43.86841901578, 17.874138029292, 1043.17, 0.05338, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(348, 61, 44.117393, 17.772745, 496.4, 0.08471, -7.7);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(348, 62, 43.341566, 17.803563, 80.89, 0.04348, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(349, 58, 43.86869603768, 17.87408798933, 1050.86, 0.03106, 7.69);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(349, 60, 43.86869603768, 17.87408798933, 1050.86, 0.03106, 7.69);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(349, 61, 44.118256, 17.773125, 489.8, 0.10064, -6.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(349, 62, 43.34093, 17.805689, 79.93, 0.18591, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(350, 58, 43.868938023224, 17.874021017924, 1052.78, 0.02744, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(350, 60, 43.868938023224, 17.874021017924, 1052.78, 0.02744, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(350, 61, 44.119503, 17.773401, 473.2, 0.1404, -16.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(350, 62, 43.3408, 17.806177, 78.48, 0.04203, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(351, 58, 43.869331972674, 17.873898977414, 1056.15, 0.04488, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(351, 60, 43.869331972674, 17.873898977414, 1056.15, 0.04488, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(351, 61, 44.121185, 17.773455, 474.5, 0.18708, 1.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(351, 62, 43.338891, 17.81106, 70.79, 0.44833, -7.69);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(352, 58, 43.869645958766, 17.873716000468, 1059.51, 0.03787, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(352, 60, 43.869645958766, 17.873716000468, 1059.51, 0.03787, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(352, 61, 44.12164, 17.777489, 463.9, 0.32596, -10.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(352, 62, 43.338274, 17.812098, 70.79, 0.10842, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(353, 58, 43.870176030323, 17.873537968844, 1064.8, 0.06064, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(353, 60, 43.870176030323, 17.873537968844, 1064.8, 0.06064, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(353, 61, 44.122375, 17.780212, 460.5, 0.23221, -3.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(353, 62, 43.337783, 17.812498, 70.31, 0.06346, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(354, 58, 43.870634017512, 17.87346303463, 1069.12, 0.05128, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(354, 60, 43.870634017512, 17.87346303463, 1069.12, 0.05128, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(354, 61, 44.123, 17.78189, 452.6, 0.1509, -7.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(354, 62, 43.337728, 17.812583, 69.83, 0.0092, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(355, 58, 43.870788998902, 17.873438978568, 1070.57, 0.01734, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(355, 60, 43.870788998902, 17.873438978568, 1070.57, 0.01734, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(355, 61, 44.124615, 17.784449, 448.4, 0.27198, -4.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(355, 62, 43.337374, 17.813483, 68.39, 0.08275, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(356, 58, 43.871005000547, 17.873235968873, 1072.49, 0.02901, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(356, 60, 43.871005000547, 17.873235968873, 1072.49, 0.02901, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(356, 61, 44.125263, 17.785393, 445.4, 0.10426, -3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(356, 62, 43.337473, 17.813871, 99.63, 0.03325, 31.24);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(357, 58, 43.871146989986, 17.87314795889, 1073.93, 0.01729, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(357, 60, 43.871146989986, 17.87314795889, 1073.93, 0.01729, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(357, 61, 44.128624, 17.787228, 446.6, 0.4014, 1.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(357, 62, 43.337473, 17.813871, 66.95, 0, -32.68);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(358, 58, 43.871214967221, 17.873104037717, 1073.93, 0.00834, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(358, 60, 43.871214967221, 17.873104037717, 1073.93, 0.00834, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(358, 61, 44.130512, 17.788546, 438.7, 0.23482, -7.9);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(359, 58, 43.871778985485, 17.872708998621, 1077.29, 0.07026, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(359, 60, 43.871778985485, 17.872708998621, 1077.29, 0.07026, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(359, 61, 44.131096, 17.78942, 436.7, 0.0953, -2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(360, 58, 43.872235966846, 17.872580001131, 1080.66, 0.05186, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(360, 60, 43.872235966846, 17.872580001131, 1080.66, 0.05186, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(360, 61, 44.131298, 17.79038, 433.6, 0.07984, -3.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(361, 58, 43.872538972646, 17.872566003352, 1083.06, 0.03371, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(361, 60, 43.872538972646, 17.872566003352, 1083.06, 0.03371, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(361, 61, 44.132385, 17.791815, 431.2, 0.16651, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(362, 58, 43.872967036441, 17.872564997524, 1086.43, 0.0476, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(362, 60, 43.872967036441, 17.872564997524, 1086.43, 0.0476, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(362, 61, 44.135098, 17.79376, 421, 0.33926, -10.2);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(363, 58, 43.873299965635, 17.87221304141, 1089.31, 0.04654, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(363, 60, 43.873299965635, 17.87221304141, 1089.31, 0.04654, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(363, 61, 44.1396, 17.797745, 414.7, 0.59307, -6.3);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(364, 58, 43.873499035835, 17.871685987338, 1091.71, 0.0477, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(364, 60, 43.873499035835, 17.871685987338, 1091.71, 0.0477, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(364, 61, 44.14387, 17.798801, 408.1, 0.48222, -6.6);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(365, 58, 43.873858032748, 17.870851987973, 1095.08, 0.07786, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(365, 60, 43.873858032748, 17.870851987973, 1095.08, 0.07786, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(365, 61, 44.145992, 17.799797, 401.6, 0.24898, -6.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(366, 58, 43.874290036038, 17.870343038812, 1098.44, 0.06302, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(366, 60, 43.874290036038, 17.870343038812, 1098.44, 0.06302, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(366, 61, 44.146595, 17.802073, 401.1, 0.19358, -0.5);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(367, 58, 43.874515006319, 17.870161989704, 1098.44, 0.02892, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(367, 60, 43.874515006319, 17.870161989704, 1098.44, 0.02892, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(367, 61, 44.148182, 17.80347, 399, 0.20872, -2.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(368, 58, 43.87455297634, 17.870130976662, 1098.44, 0.0049, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(368, 60, 43.87455297634, 17.870130976662, 1098.44, 0.0049, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(368, 61, 44.1497734, 17.8054699, 400.1, 0.23827, 1.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(369, 58, 43.874923959374, 17.869681958109, 1102.29, 0.05475, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(369, 60, 43.874923959374, 17.869681958109, 1102.29, 0.05475, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(370, 58, 43.875254038721, 17.869336958975, 1105.17, 0.04595, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(370, 60, 43.875254038721, 17.869336958975, 1105.17, 0.04595, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(371, 58, 43.875300977379, 17.869285997003, 1105.65, 0.00663, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(371, 60, 43.875300977379, 17.869285997003, 1105.65, 0.00663, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(372, 58, 43.875370966271, 17.869179965928, 1106.61, 0.01152, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(372, 60, 43.875370966271, 17.869179965928, 1106.61, 0.01152, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(373, 58, 43.875583028421, 17.868820969015, 1108.54, 0.0372, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(373, 60, 43.875583028421, 17.868820969015, 1108.54, 0.0372, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(374, 58, 43.875670032576, 17.868686020374, 1109.5, 0.01451, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(374, 60, 43.875670032576, 17.868686020374, 1109.5, 0.01451, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(375, 58, 43.875948982313, 17.868756009266, 1112.86, 0.03152, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(375, 60, 43.875948982313, 17.868756009266, 1112.86, 0.03152, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(376, 58, 43.876178981736, 17.868652995676, 1114.79, 0.02687, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(376, 60, 43.876178981736, 17.868652995676, 1114.79, 0.02687, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(377, 58, 43.876347038895, 17.868266003206, 1116.23, 0.03621, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(377, 60, 43.876347038895, 17.868266003206, 1116.23, 0.03621, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(378, 58, 43.876542001963, 17.86779301241, 1118.63, 0.04367, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(378, 60, 43.876542001963, 17.86779301241, 1118.63, 0.04367, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(379, 58, 43.876674016938, 17.867628978565, 1120.55, 0.01971, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(379, 60, 43.876674016938, 17.867628978565, 1120.55, 0.01971, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(380, 58, 43.877064026892, 17.86762596108, 1122.48, 0.04337, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(380, 60, 43.877064026892, 17.86762596108, 1122.48, 0.04337, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(381, 58, 43.877152958885, 17.867617998272, 1123.44, 0.00991, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(381, 60, 43.877152958885, 17.867617998272, 1123.44, 0.00991, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(382, 58, 43.877593008801, 17.867584973574, 1127.76, 0.049, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(382, 60, 43.877593008801, 17.867584973574, 1127.76, 0.049, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(383, 58, 43.877736004069, 17.867358997464, 1127.76, 0.0241, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(383, 60, 43.877736004069, 17.867358997464, 1127.76, 0.0241, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(384, 58, 43.877809010446, 17.867012992501, 1129.69, 0.0289, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(384, 60, 43.877809010446, 17.867012992501, 1129.69, 0.0289, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(385, 58, 43.878047978505, 17.866218974814, 1132.57, 0.06897, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(385, 60, 43.878047978505, 17.866218974814, 1132.57, 0.06897, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(386, 58, 43.878164989874, 17.865953017026, 1132.57, 0.02497, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(386, 60, 43.878164989874, 17.865953017026, 1132.57, 0.02497, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(387, 58, 43.878397000954, 17.86524198018, 1135.45, 0.06256, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(387, 60, 43.878397000954, 17.86524198018, 1135.45, 0.06256, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(388, 58, 43.878664970398, 17.864615013823, 1137.86, 0.05842, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(388, 60, 43.878664970398, 17.864615013823, 1137.86, 0.05842, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(389, 58, 43.878671005368, 17.86459104158, 1137.86, 0.00204, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(389, 60, 43.878671005368, 17.86459104158, 1137.86, 0.00204, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(390, 58, 43.878788016737, 17.863757964224, 1141.22, 0.06803, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(390, 60, 43.878788016737, 17.863757964224, 1141.22, 0.06803, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(391, 58, 43.878872003406, 17.863191012293, 1144.11, 0.04639, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(391, 60, 43.878872003406, 17.863191012293, 1144.11, 0.04639, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(392, 58, 43.879004018381, 17.863052040339, 1146.03, 0.01843, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(392, 60, 43.879004018381, 17.863052040339, 1146.03, 0.01843, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(393, 58, 43.879379024729, 17.862448040396, 1150.35, 0.06389, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(393, 60, 43.879379024729, 17.862448040396, 1150.35, 0.06389, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(394, 58, 43.879620004445, 17.861974965781, 1154.2, 0.04643, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(394, 60, 43.879620004445, 17.861974965781, 1154.2, 0.04643, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(395, 58, 43.87964900583, 17.861927021295, 1154.2, 0.00502, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(395, 60, 43.87964900583, 17.861927021295, 1154.2, 0.00502, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(396, 58, 43.879685970023, 17.861884022132, 1154.2, 0.00536, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(396, 60, 43.879685970023, 17.861884022132, 1154.2, 0.00536, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(397, 58, 43.879741961136, 17.861571041867, 1157.08, 0.02585, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(397, 60, 43.879741961136, 17.861571041867, 1157.08, 0.02585, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(398, 58, 43.879799041897, 17.861395021901, 1157.08, 0.01547, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(398, 60, 43.879799041897, 17.861395021901, 1157.08, 0.01547, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(399, 58, 43.879867019132, 17.860943991691, 1159.49, 0.03693, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(399, 60, 43.879867019132, 17.860943991691, 1159.49, 0.03693, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(400, 58, 43.880077991635, 17.860314007849, 1162.85, 0.05568, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(400, 60, 43.880077991635, 17.860314007849, 1162.85, 0.05568, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(401, 58, 43.88016499579, 17.860072022304, 1163.81, 0.02167, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(401, 60, 43.88016499579, 17.860072022304, 1163.81, 0.02167, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(402, 58, 43.880214029923, 17.859856020659, 1165.26, 0.01815, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(402, 60, 43.880214029923, 17.859856020659, 1165.26, 0.01815, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(403, 58, 43.880460038781, 17.859259983525, 1166.7, 0.05505, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(403, 60, 43.880460038781, 17.859259983525, 1166.7, 0.05505, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(404, 58, 43.880661958829, 17.858514999971, 1168.62, 0.06379, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(404, 60, 43.880661958829, 17.858514999971, 1168.62, 0.06379, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(405, 58, 43.880830015987, 17.858037985861, 1170.54, 0.04255, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(405, 60, 43.880830015987, 17.858037985861, 1170.54, 0.04255, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(406, 58, 43.880891036242, 17.857701033354, 1171.02, 0.02785, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(406, 60, 43.880891036242, 17.857701033354, 1171.02, 0.02785, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(407, 58, 43.88097602874, 17.857291996479, 1172.47, 0.03412, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(407, 60, 43.88097602874, 17.857291996479, 1172.47, 0.03412, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(408, 58, 43.881108965725, 17.856762008741, 1174.39, 0.04498, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(408, 60, 43.881108965725, 17.856762008741, 1174.39, 0.04498, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(409, 58, 43.881235029548, 17.856216011569, 1175.83, 0.04595, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(409, 60, 43.881235029548, 17.856216011569, 1175.83, 0.04595, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(410, 58, 43.881212985143, 17.855767998844, 1178.23, 0.03599, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(410, 60, 43.881212985143, 17.855767998844, 1178.23, 0.03599, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(411, 58, 43.881238969043, 17.85547496751, 1178.71, 0.02366, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(411, 60, 43.881238969043, 17.85547496751, 1178.71, 0.02366, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(412, 58, 43.881238969043, 17.855456024408, 1179.19, 0.00152, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(412, 60, 43.881238969043, 17.855456024408, 1179.19, 0.00152, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(413, 58, 43.881211979315, 17.855067020282, 1180.64, 0.03132, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(413, 60, 43.881211979315, 17.855067020282, 1180.64, 0.03132, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(414, 58, 43.881087005138, 17.854452040046, 1181.6, 0.05121, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(414, 60, 43.881087005138, 17.854452040046, 1181.6, 0.05121, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(415, 58, 43.881120029837, 17.854319019243, 1182.56, 0.01128, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(415, 60, 43.881120029837, 17.854319019243, 1182.56, 0.01128, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(416, 58, 43.88117602095, 17.854123972356, 1183.52, 0.01683, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(416, 60, 43.88117602095, 17.854123972356, 1183.52, 0.01683, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(417, 58, 43.881174009293, 17.854004027322, 1183.52, 0.00962, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(417, 60, 43.881174009293, 17.854004027322, 1183.52, 0.00962, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(418, 58, 43.881175015122, 17.853720970452, 1184.96, 0.02269, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(418, 60, 43.881175015122, 17.853720970452, 1184.96, 0.02269, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(419, 58, 43.881198987365, 17.85365098156, 1184.96, 0.00621, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(419, 60, 43.881198987365, 17.85365098156, 1184.96, 0.00621, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(420, 58, 43.881207033992, 17.85307103768, 1187.37, 0.04649, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(420, 60, 43.881207033992, 17.85307103768, 1187.37, 0.04649, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(421, 58, 43.88082196936, 17.852411968634, 1190.25, 0.068, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(421, 60, 43.88082196936, 17.852411968634, 1190.25, 0.068, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(422, 58, 43.880604961887, 17.851896984503, 1193.13, 0.04781, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(422, 60, 43.880604961887, 17.851896984503, 1193.13, 0.04781, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(423, 58, 43.880584007129, 17.851725993678, 1193.61, 0.0139, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(423, 60, 43.880584007129, 17.851725993678, 1193.61, 0.0139, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(424, 58, 43.880363982171, 17.851313017309, 1195.54, 0.04116, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(424, 60, 43.880363982171, 17.851313017309, 1195.54, 0.04116, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(425, 58, 43.880302039906, 17.850779006258, 1196.98, 0.04335, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(425, 60, 43.880302039906, 17.850779006258, 1196.98, 0.04335, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(426, 58, 43.880287958309, 17.850537020713, 1198.42, 0.01946, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(426, 60, 43.880287958309, 17.850537020713, 1198.42, 0.01946, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(427, 58, 43.880265997723, 17.850411962718, 1198.42, 0.01032, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(427, 60, 43.880265997723, 17.850411962718, 1198.42, 0.01032, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(428, 58, 43.880259040743, 17.850190009922, 1198.9, 0.01781, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(428, 60, 43.880259040743, 17.850190009922, 1198.9, 0.01781, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(429, 58, 43.880253005773, 17.849856996909, 1201.3, 0.0267, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(429, 60, 43.880253005773, 17.849856996909, 1201.3, 0.0267, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(430, 58, 43.880258034915, 17.84944402054, 1203.71, 0.0331, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(430, 60, 43.880258034915, 17.84944402054, 1203.71, 0.0331, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(431, 58, 43.880051001906, 17.849093992263, 1204.67, 0.03629, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(431, 60, 43.880051001906, 17.849093992263, 1204.67, 0.03629, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(432, 58, 43.879785966128, 17.848327970132, 1208.03, 0.0681, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(432, 60, 43.879785966128, 17.848327970132, 1208.03, 0.0681, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(433, 58, 43.879755036905, 17.848258987069, 1208.03, 0.00651, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(433, 60, 43.879755036905, 17.848258987069, 1208.03, 0.00651, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(434, 58, 43.879549009725, 17.84767803736, 1209.96, 0.05189, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(434, 60, 43.879549009725, 17.84767803736, 1209.96, 0.05189, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(435, 58, 43.879531994462, 17.8472919669, 1211.4, 0.031, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(435, 60, 43.879531994462, 17.8472919669, 1211.4, 0.031, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(436, 58, 43.879405008629, 17.847092980519, 1211.88, 0.0213, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(436, 60, 43.879405008629, 17.847092980519, 1211.88, 0.0213, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(437, 58, 43.879041988403, 17.846721997485, 1214.28, 0.05014, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(437, 60, 43.879041988403, 17.846721997485, 1214.28, 0.05014, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(438, 58, 43.878933023661, 17.846605991945, 1214.76, 0.01527, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(438, 60, 43.878933023661, 17.846605991945, 1214.76, 0.01527, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(439, 58, 43.878971999511, 17.846283959225, 1216.21, 0.02617, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(439, 60, 43.878971999511, 17.846283959225, 1216.21, 0.02617, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(440, 58, 43.878835961223, 17.845680965111, 1220.05, 0.05064, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(440, 60, 43.878835961223, 17.845680965111, 1220.05, 0.05064, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(441, 58, 43.878843002021, 17.845651963726, 1220.05, 0.00245, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(441, 60, 43.878843002021, 17.845651963726, 1220.05, 0.00245, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(442, 58, 43.878801008686, 17.845415007323, 1221.01, 0.01956, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(442, 60, 43.878801008686, 17.845415007323, 1221.01, 0.01956, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(443, 58, 43.878739988431, 17.84507595934, 1221.49, 0.02801, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(443, 60, 43.878739988431, 17.84507595934, 1221.49, 0.02801, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(444, 58, 43.878360036761, 17.844903962687, 1222.93, 0.04444, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(444, 60, 43.878360036761, 17.844903962687, 1222.93, 0.04444, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(445, 58, 43.878278983757, 17.844873033464, 1219.57, 0.00935, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(445, 60, 43.878278983757, 17.844873033464, 1219.57, 0.00935, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(446, 58, 43.878252999857, 17.844857024029, 1218.61, 0.00316, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(446, 60, 43.878252999857, 17.844857024029, 1218.61, 0.00316, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(447, 58, 43.8779739663, 17.844469025731, 1222.45, 0.04393, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(447, 60, 43.8779739663, 17.844469025731, 1222.45, 0.04393, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(448, 58, 43.877949994057, 17.844425020739, 1221.97, 0.00442, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(448, 60, 43.877949994057, 17.844425020739, 1221.97, 0.00442, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(449, 58, 43.877803981304, 17.844359977171, 1222.93, 0.01705, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(449, 60, 43.877803981304, 17.844359977171, 1222.93, 0.01705, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(450, 58, 43.877627961338, 17.84401296638, 1226.78, 0.03401, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(450, 60, 43.877627961338, 17.84401296638, 1226.78, 0.03401, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(451, 58, 43.877647994086, 17.843839041889, 1228.7, 0.01412, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(451, 60, 43.877647994086, 17.843839041889, 1228.7, 0.01412, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(452, 58, 43.877664003521, 17.843710966408, 1228.7, 0.01042, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(452, 60, 43.877664003521, 17.843710966408, 1228.7, 0.01042, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(453, 58, 43.877759976313, 17.842949973419, 1232.07, 0.06192, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(453, 60, 43.877759976313, 17.842949973419, 1232.07, 0.06192, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(454, 58, 43.877713959664, 17.8425240051, 1235.91, 0.03452, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(454, 60, 43.877713959664, 17.8425240051, 1235.91, 0.03452, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(455, 58, 43.877611029893, 17.842204989865, 1239.28, 0.02801, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(455, 60, 43.877611029893, 17.842204989865, 1239.28, 0.02801, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(456, 58, 43.877555960789, 17.841911958531, 1241.2, 0.02427, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(456, 60, 43.877555960789, 17.841911958531, 1241.2, 0.02427, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(457, 58, 43.877436015755, 17.841497976333, 1246.49, 0.03576, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(457, 60, 43.877436015755, 17.841497976333, 1246.49, 0.03576, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(458, 58, 43.877670960501, 17.841307036579, 1247.45, 0.03028, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(458, 60, 43.877670960501, 17.841307036579, 1247.45, 0.03028, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(459, 58, 43.878126014024, 17.84140996635, 1250.81, 0.05127, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(459, 60, 43.878126014024, 17.84140996635, 1250.81, 0.05127, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(460, 58, 43.878302033991, 17.841302007437, 1253.7, 0.0214, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(460, 60, 43.878302033991, 17.841302007437, 1253.7, 0.0214, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(461, 58, 43.878199020401, 17.841109978035, 1256.58, 0.01919, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(461, 60, 43.878199020401, 17.841109978035, 1256.58, 0.01919, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(462, 58, 43.877966003492, 17.840656014159, 1262.35, 0.04467, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(462, 60, 43.877966003492, 17.840656014159, 1262.35, 0.04467, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(463, 58, 43.877732986584, 17.840301962569, 1266.19, 0.03843, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(463, 60, 43.877732986584, 17.840301962569, 1266.19, 0.03843, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(464, 58, 43.877622010186, 17.84006902948, 1269.08, 0.02238, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(464, 60, 43.877622010186, 17.84006902948, 1269.08, 0.02238, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(465, 58, 43.877528971061, 17.839780021459, 1272.44, 0.02537, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(465, 60, 43.877528971061, 17.839780021459, 1272.44, 0.02537, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(466, 58, 43.877454958856, 17.839467041194, 1277.25, 0.0264, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(466, 60, 43.877454958856, 17.839467041194, 1277.25, 0.0264, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(467, 58, 43.877290003002, 17.839310970157, 1279.65, 0.0222, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(467, 60, 43.877290003002, 17.839310970157, 1279.65, 0.0222, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(468, 58, 43.877109959722, 17.839109972119, 1283.02, 0.0257, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(468, 60, 43.877109959722, 17.839109972119, 1283.02, 0.0257, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(469, 58, 43.876926982775, 17.838763967156, 1286.38, 0.0344, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(469, 60, 43.876926982775, 17.838763967156, 1286.38, 0.0344, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(470, 58, 43.876748029143, 17.838532039896, 1289.75, 0.02723, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(470, 60, 43.876748029143, 17.838532039896, 1289.75, 0.02723, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(471, 58, 43.876634035259, 17.838294999674, 1293.11, 0.02284, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(471, 60, 43.876634035259, 17.838294999674, 1293.11, 0.02284, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(472, 58, 43.876448962837, 17.837780015543, 1321.95, 0.04612, 28.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(472, 60, 43.876448962837, 17.837780015543, 1321.95, 0.04612, 28.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(473, 58, 43.876454997808, 17.837735004723, 1332.04, 0.00367, 10.09);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(473, 60, 43.876454997808, 17.837735004723, 1332.04, 0.00367, 10.09);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(474, 58, 43.876632023603, 17.837562002242, 1348.39, 0.02408, 16.35);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(474, 60, 43.876632023603, 17.837562002242, 1348.39, 0.02408, 16.35);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(475, 58, 43.876666976139, 17.837396962568, 1350.31, 0.01379, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(475, 60, 43.876666976139, 17.837396962568, 1350.31, 0.01379, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(476, 58, 43.876805026084, 17.837525960058, 1351.75, 0.01851, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(476, 60, 43.876805026084, 17.837525960058, 1351.75, 0.01851, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(477, 58, 43.876883983612, 17.837589997798, 1352.71, 0.01017, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(477, 60, 43.876883983612, 17.837589997798, 1352.71, 0.01017, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(478, 58, 43.877241974697, 17.837943965569, 1357.04, 0.04888, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(478, 60, 43.877241974697, 17.837943965569, 1357.04, 0.04888, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(479, 58, 43.87729100883, 17.838006997481, 1357.04, 0.00743, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(479, 60, 43.87729100883, 17.838006997481, 1357.04, 0.00743, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(480, 58, 43.877474991605, 17.838259041309, 1360.4, 0.02875, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(480, 60, 43.877474991605, 17.838259041309, 1360.4, 0.02875, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(481, 58, 43.877614969388, 17.8384329658, 1363.29, 0.02089, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(481, 60, 43.877614969388, 17.8384329658, 1363.29, 0.02089, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(482, 58, 43.877630978823, 17.838176982477, 1365.21, 0.02059, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(482, 60, 43.877630978823, 17.838176982477, 1365.21, 0.02059, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(483, 58, 43.877601977438, 17.838105987757, 1361.84, 0.00654, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(483, 60, 43.877601977438, 17.838105987757, 1361.84, 0.00654, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(484, 58, 43.877596026286, 17.838089978322, 1365.69, 0.00144, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(484, 60, 43.877596026286, 17.838089978322, 1365.69, 0.00144, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(485, 58, 43.877509022132, 17.837774986401, 1368.57, 0.02704, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(485, 60, 43.877509022132, 17.837774986401, 1368.57, 0.02704, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(486, 58, 43.877363009378, 17.837300989777, 1371.94, 0.04132, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(486, 60, 43.877363009378, 17.837300989777, 1371.94, 0.04132, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(487, 58, 43.877180032432, 17.836780976504, 1375.3, 0.04638, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(487, 60, 43.877180032432, 17.836780976504, 1375.3, 0.04638, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(488, 58, 43.87723904103, 17.836769996211, 1376.26, 0.00662, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(488, 60, 43.87723904103, 17.836769996211, 1376.26, 0.00662, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(489, 58, 43.87732998468, 17.837028997019, 1378.67, 0.02309, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(489, 60, 43.87732998468, 17.837028997019, 1378.67, 0.02309, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(490, 58, 43.877625027671, 17.837629979476, 1382.03, 0.05828, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(490, 60, 43.877625027671, 17.837629979476, 1382.03, 0.05828, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(491, 58, 43.877886962146, 17.837927034125, 1385.88, 0.03762, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(491, 60, 43.877886962146, 17.837927034125, 1385.88, 0.03762, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(492, 58, 43.877943037078, 17.83796902746, 1386.84, 0.00709, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(492, 60, 43.877943037078, 17.83796902746, 1386.84, 0.00709, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(493, 58, 43.878171024844, 17.838307991624, 1389.24, 0.03716, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(493, 60, 43.878171024844, 17.838307991624, 1389.24, 0.03716, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(494, 58, 43.878460032865, 17.838665982708, 1393.09, 0.04308, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(494, 60, 43.878460032865, 17.838665982708, 1393.09, 0.04308, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(495, 58, 43.878819029778, 17.838763967156, 1397.41, 0.04068, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(495, 60, 43.878819029778, 17.838763967156, 1397.41, 0.04068, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(496, 58, 43.878877032548, 17.83872297965, 1397.41, 0.00724, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(496, 60, 43.878877032548, 17.83872297965, 1397.41, 0.00724, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(497, 58, 43.879045005888, 17.838661037385, 1399.34, 0.01933, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(497, 60, 43.879045005888, 17.838661037385, 1399.34, 0.01933, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(498, 58, 43.879479020834, 17.838556012139, 1403.66, 0.04899, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(498, 60, 43.879479020834, 17.838556012139, 1403.66, 0.04899, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(499, 58, 43.879884034395, 17.838543020189, 1407.03, 0.04505, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(499, 60, 43.879884034395, 17.838543020189, 1407.03, 0.04505, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(500, 58, 43.880145968869, 17.838433971629, 1410.39, 0.03041, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(500, 60, 43.880145968869, 17.838433971629, 1410.39, 0.03041, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(501, 58, 43.880363982171, 17.838214030489, 1410.39, 0.02997, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(501, 60, 43.880363982171, 17.838214030489, 1410.39, 0.02997, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(502, 58, 43.880865974352, 17.837871965021, 1411.83, 0.06219, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(502, 60, 43.880865974352, 17.837871965021, 1411.83, 0.06219, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(503, 58, 43.881108965725, 17.837661998346, 1413.76, 0.03183, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(503, 60, 43.881108965725, 17.837661998346, 1413.76, 0.03183, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(504, 58, 43.881484977901, 17.837336026132, 1417.6, 0.0493, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(504, 60, 43.881484977901, 17.837336026132, 1417.6, 0.0493, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(505, 58, 43.881764011458, 17.837026985362, 1420.49, 0.0397, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(505, 60, 43.881764011458, 17.837026985362, 1420.49, 0.0397, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(506, 58, 43.881809022278, 17.836395995691, 1425.77, 0.05082, 5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(506, 60, 43.881809022278, 17.836395995691, 1425.77, 0.05082, 5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(507, 58, 43.881784966215, 17.836116962135, 1427.7, 0.02252, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(507, 60, 43.881784966215, 17.836116962135, 1427.7, 0.02252, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(508, 58, 43.881857972592, 17.836136994883, 1428.18, 0.00828, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(508, 60, 43.881857972592, 17.836136994883, 1428.18, 0.00828, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(509, 58, 43.882675040513, 17.836270015687, 1430.58, 0.09148, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(509, 60, 43.882675040513, 17.836270015687, 1430.58, 0.09148, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(510, 58, 43.883133027703, 17.836073962972, 1434.91, 0.05329, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(510, 60, 43.883133027703, 17.836073962972, 1434.91, 0.05329, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(511, 58, 43.883480038494, 17.835824014619, 1439.23, 0.04348, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(511, 60, 43.883480038494, 17.835824014619, 1439.23, 0.04348, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(512, 58, 43.883737027645, 17.835496030748, 1443.56, 0.03883, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(512, 60, 43.883737027645, 17.835496030748, 1443.56, 0.03883, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(513, 58, 43.883897960186, 17.835251027718, 1447.88, 0.02657, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(513, 60, 43.883897960186, 17.835251027718, 1447.88, 0.02657, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(514, 58, 43.884038021788, 17.83503703773, 1450.77, 0.02317, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(514, 60, 43.884038021788, 17.83503703773, 1450.77, 0.02317, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(515, 58, 43.883856972679, 17.835162011907, 1447.88, 0.02249, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(515, 60, 43.883856972679, 17.835162011907, 1447.88, 0.02249, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(516, 58, 43.883856972679, 17.835162011907, 1447.88, 0, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(516, 60, 43.883856972679, 17.835162011907, 1447.88, 0, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(517, 58, 43.883820008487, 17.835235018283, 1447.4, 0.00715, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(517, 60, 43.883820008487, 17.835235018283, 1447.4, 0.00715, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(518, 58, 43.883253978565, 17.836020989344, 1438.27, 0.08905, -9.13);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(518, 60, 43.883253978565, 17.836020989344, 1438.27, 0.08905, -9.13);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(519, 58, 43.88265802525, 17.83626800403, 1432.02, 0.06916, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(519, 60, 43.88265802525, 17.83626800403, 1432.02, 0.06916, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(520, 58, 43.882137006149, 17.836183011532, 1429.14, 0.05833, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(520, 60, 43.882137006149, 17.836183011532, 1429.14, 0.05833, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(521, 58, 43.881736015901, 17.836163984612, 1429.14, 0.04461, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(521, 60, 43.881736015901, 17.836163984612, 1429.14, 0.04461, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(522, 58, 43.881521020085, 17.836191980168, 1430.1, 0.02401, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(522, 60, 43.881521020085, 17.836191980168, 1430.1, 0.02401, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(523, 58, 43.881122041494, 17.83633296378, 1432.98, 0.04578, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(523, 60, 43.881122041494, 17.83633296378, 1432.98, 0.04578, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(524, 58, 43.880405975506, 17.836648961529, 1437.79, 0.08355, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(524, 60, 43.880405975506, 17.836648961529, 1437.79, 0.08355, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(525, 58, 43.879728969187, 17.83699597232, 1441.15, 0.08025, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(525, 60, 43.879728969187, 17.83699597232, 1441.15, 0.08025, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(526, 58, 43.878999995068, 17.837461000308, 1445.96, 0.08922, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(526, 60, 43.878999995068, 17.837461000308, 1445.96, 0.08922, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(527, 58, 43.878441005945, 17.836970994249, 1450.77, 0.07352, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(527, 60, 43.878441005945, 17.836970994249, 1450.77, 0.07352, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(528, 58, 43.878223998472, 17.836599005386, 1453.17, 0.03836, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(528, 60, 43.878223998472, 17.836599005386, 1453.17, 0.03836, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(529, 58, 43.877770034596, 17.835637014359, 1456.53, 0.09216, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(529, 60, 43.877770034596, 17.835637014359, 1456.53, 0.09216, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(530, 58, 43.877514973283, 17.834538985044, 1459.9, 0.09247, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(530, 60, 43.877514973283, 17.834538985044, 1459.9, 0.09247, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(531, 58, 43.877450013533, 17.83417403698, 1460.86, 0.03013, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(531, 60, 43.877450013533, 17.83417403698, 1460.86, 0.03013, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(532, 58, 43.877301989123, 17.833535000682, 1464.23, 0.0538, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(532, 60, 43.877301989123, 17.833535000682, 1464.23, 0.0538, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(533, 58, 43.877134015784, 17.832767972723, 1467.59, 0.06425, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(533, 60, 43.877134015784, 17.832767972723, 1467.59, 0.06425, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(534, 58, 43.876969981939, 17.832065988332, 1472.4, 0.05915, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(534, 60, 43.876969981939, 17.832065988332, 1472.4, 0.05915, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(535, 58, 43.876952966675, 17.831919975579, 1472.4, 0.01186, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(535, 60, 43.876952966675, 17.831919975579, 1472.4, 0.01186, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(536, 58, 43.877146001905, 17.830634023994, 1476.24, 0.10528, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(536, 60, 43.877146001905, 17.830634023994, 1476.24, 0.10528, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(537, 58, 43.877268964425, 17.830249965191, 1479.61, 0.03368, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(537, 60, 43.877268964425, 17.830249965191, 1479.61, 0.03368, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(538, 58, 43.877760982141, 17.829080019146, 1483.45, 0.10857, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(538, 60, 43.877760982141, 17.829080019146, 1483.45, 0.10857, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(539, 58, 43.877532994375, 17.829069960862, 1483.93, 0.02536, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(539, 60, 43.877532994375, 17.829069960862, 1483.93, 0.02536, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(540, 58, 43.876943998039, 17.829366009682, 1486.82, 0.06966, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(540, 60, 43.876943998039, 17.829366009682, 1486.82, 0.06966, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(541, 58, 43.876557257026, 17.828968539834, 1486.82, 0.05352, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(541, 60, 43.876557257026, 17.828968539834, 1486.82, 0.05352, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(542, 58, 43.876485005021, 17.828851025552, 1489.22, 0.01238, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(542, 60, 43.876485005021, 17.828851025552, 1489.22, 0.01238, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(543, 58, 43.87646002695, 17.828788999468, 1490.66, 0.00569, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(543, 60, 43.87646002695, 17.828788999468, 1490.66, 0.00569, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(544, 58, 43.876480981708, 17.828321037814, 1500.76, 0.03758, 10.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(544, 60, 43.876480981708, 17.828321037814, 1500.76, 0.03758, 10.1);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(545, 58, 43.876520041376, 17.828088020906, 1508.45, 0.01918, 7.69);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(545, 60, 43.876520041376, 17.828088020906, 1508.45, 0.01918, 7.69);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(546, 58, 43.876850958914, 17.828215006739, 1513.25, 0.03818, 4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(546, 60, 43.876850958914, 17.828215006739, 1513.25, 0.03818, 4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(547, 58, 43.877060003579, 17.827949970961, 1517.1, 0.03149, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(547, 60, 43.877060003579, 17.827949970961, 1517.1, 0.03149, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(548, 58, 43.877178020775, 17.827761964872, 1519.5, 0.01998, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(548, 60, 43.877178020775, 17.827761964872, 1519.5, 0.01998, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(549, 58, 43.877296959981, 17.827461976558, 1522.87, 0.02744, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(549, 60, 43.877296959981, 17.827461976558, 1522.87, 0.02744, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(550, 58, 43.877427969128, 17.827233988792, 1526.23, 0.02337, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(550, 60, 43.877427969128, 17.827233988792, 1526.23, 0.02337, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(551, 58, 43.877488989383, 17.827004995197, 1529.59, 0.01957, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(551, 60, 43.877488989383, 17.827004995197, 1529.59, 0.01957, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(552, 58, 43.87759401463, 17.826727973297, 1534.4, 0.02509, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(552, 60, 43.87759401463, 17.826727973297, 1534.4, 0.02509, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(553, 58, 43.877655034885, 17.826439971104, 1538.25, 0.02406, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(553, 60, 43.877655034885, 17.826439971104, 1538.25, 0.02406, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(554, 58, 43.877296959981, 17.826362019405, 1544.01, 0.0403, 5.76);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(554, 60, 43.877296959981, 17.826362019405, 1544.01, 0.0403, 5.76);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(555, 58, 43.877082969993, 17.826325977221, 1547.86, 0.02397, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(555, 60, 43.877082969993, 17.826325977221, 1547.86, 0.02397, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(556, 58, 43.87698196806, 17.826175019145, 1548.82, 0.01651, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(556, 60, 43.87698196806, 17.826175019145, 1548.82, 0.01651, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(557, 58, 43.876994038001, 17.826136965305, 1549.3, 0.00333, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(557, 60, 43.876994038001, 17.826136965305, 1549.3, 0.00333, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(558, 58, 43.877257984132, 17.826006039977, 1553.63, 0.03117, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(558, 60, 43.877257984132, 17.826006039977, 1553.63, 0.03117, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(559, 58, 43.877542968839, 17.825794983655, 1557.95, 0.03592, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(559, 60, 43.877542968839, 17.825794983655, 1557.95, 0.03592, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(560, 58, 43.877776991576, 17.82573999837, 1562.28, 0.02639, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(560, 60, 43.877776991576, 17.82573999837, 1562.28, 0.02639, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(561, 58, 43.877890985459, 17.825746033341, 1563.72, 0.01268, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(561, 60, 43.877890985459, 17.825746033341, 1563.72, 0.01268, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(562, 58, 43.878163984045, 17.825781991705, 1569.49, 0.03049, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(562, 60, 43.878163984045, 17.825781991705, 1569.49, 0.03049, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(563, 58, 43.878332963213, 17.825807975605, 1572.85, 0.0189, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(563, 60, 43.878332963213, 17.825807975605, 1572.85, 0.0189, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(564, 58, 43.878441005945, 17.825819961727, 1575.26, 0.01205, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(564, 60, 43.878441005945, 17.825819961727, 1575.26, 0.01205, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(565, 58, 43.8786059618, 17.82582398504, 1579.58, 0.01835, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(565, 60, 43.8786059618, 17.82582398504, 1579.58, 0.01835, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(566, 58, 43.878880972043, 17.825767993927, 1585.83, 0.03091, 6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(566, 60, 43.878880972043, 17.825767993927, 1585.83, 0.03091, 6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(567, 58, 43.879109965637, 17.825762964785, 1590.64, 0.02547, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(567, 60, 43.879109965637, 17.825762964785, 1590.64, 0.02547, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(568, 58, 43.879307024181, 17.825719965622, 1595.45, 0.02218, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(568, 60, 43.879307024181, 17.825719965622, 1595.45, 0.02218, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(569, 58, 43.879440966994, 17.825661040843, 1599.29, 0.01562, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(569, 60, 43.879440966994, 17.825661040843, 1599.29, 0.01562, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(570, 58, 43.879510033876, 17.825607983395, 1600.73, 0.00878, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(570, 60, 43.879510033876, 17.825607983395, 1600.73, 0.00878, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(571, 58, 43.879666021094, 17.825446967036, 1605.06, 0.02162, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(571, 60, 43.879666021094, 17.825446967036, 1605.06, 0.02162, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(572, 58, 43.879673983902, 17.825439004228, 1605.06, 0.00109, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(572, 60, 43.879673983902, 17.825439004228, 1605.06, 0.00109, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(573, 58, 43.879852015525, 17.825126023963, 1610.83, 0.03196, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(573, 60, 43.879852015525, 17.825126023963, 1610.83, 0.03196, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(574, 58, 43.879933990538, 17.824850007892, 1614.19, 0.02393, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(574, 60, 43.879933990538, 17.824850007892, 1614.19, 0.02393, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(575, 58, 43.880017977208, 17.824505008757, 1615.15, 0.02919, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(575, 60, 43.880017977208, 17.824505008757, 1615.15, 0.02919, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(576, 58, 43.880020994693, 17.824395038188, 1616.11, 0.00882, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(576, 60, 43.880020994693, 17.824395038188, 1616.11, 0.00882, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(577, 58, 43.880037004128, 17.824089014903, 1616.59, 0.02459, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(577, 60, 43.880037004128, 17.824089014903, 1616.59, 0.02459, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(578, 58, 43.880212018266, 17.824162021279, 1619.96, 0.02032, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(578, 60, 43.880212018266, 17.824162021279, 1619.96, 0.02032, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(579, 58, 43.8802870363, 17.824191022664, 1619, 0.00866, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(579, 60, 43.8802870363, 17.824191022664, 1619, 0.00866, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(580, 58, 43.880400024354, 17.824093960226, 1617.56, 0.01478, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(580, 60, 43.880400024354, 17.824093960226, 1617.56, 0.01478, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(581, 58, 43.880378985777, 17.82385901548, 1623.32, 0.01898, 5.76);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(581, 60, 43.880378985777, 17.82385901548, 1623.32, 0.01898, 5.76);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(582, 58, 43.880460960791, 17.82364603132, 1626.69, 0.01935, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(582, 60, 43.880460960791, 17.82364603132, 1626.69, 0.01935, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(583, 58, 43.880728008226, 17.823280999437, 1631.98, 0.04169, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(583, 60, 43.880728008226, 17.823280999437, 1631.98, 0.04169, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(584, 58, 43.880719961599, 17.823043037206, 1637.26, 0.01909, 5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(584, 60, 43.880719961599, 17.823043037206, 1637.26, 0.01909, 5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(585, 58, 43.880766984075, 17.822860982269, 1642.55, 0.0155, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(585, 60, 43.880766984075, 17.822860982269, 1642.55, 0.0155, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(586, 58, 43.880776036531, 17.822595024481, 1647.84, 0.02134, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(586, 60, 43.880776036531, 17.822595024481, 1647.84, 0.02134, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(587, 58, 43.880794979632, 17.822470972314, 1651.68, 0.01016, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(587, 60, 43.880794979632, 17.822470972314, 1651.68, 0.01016, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(588, 58, 43.880817024037, 17.822396960109, 1655.53, 0.00642, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(588, 60, 43.880817024037, 17.822396960109, 1655.53, 0.00642, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(589, 58, 43.880854994059, 17.822272991762, 1659.37, 0.0108, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(589, 60, 43.880854994059, 17.822272991762, 1659.37, 0.0108, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(590, 58, 43.880837978795, 17.822095965967, 1662.74, 0.01431, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(590, 60, 43.880837978795, 17.822095965967, 1662.74, 0.01431, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(591, 58, 43.880802020431, 17.821985995397, 1667.06, 0.00968, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(591, 60, 43.880802020431, 17.821985995397, 1667.06, 0.00968, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(592, 58, 43.880733037367, 17.821887005121, 1670.91, 0.01104, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(592, 60, 43.880733037367, 17.821887005121, 1670.91, 0.01104, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(593, 58, 43.880675034598, 17.82180997543, 1674.27, 0.00893, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(593, 60, 43.880675034598, 17.82180997543, 1674.27, 0.00893, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(594, 58, 43.880541007966, 17.821714002639, 1679.08, 0.01677, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(594, 60, 43.880541007966, 17.821714002639, 1679.08, 0.01677, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(595, 58, 43.880432965234, 17.821609983221, 1682.44, 0.01462, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(595, 60, 43.880432965234, 17.821609983221, 1682.44, 0.01462, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(596, 58, 43.880477976054, 17.821576036513, 1682.44, 0.0057, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(596, 60, 43.880477976054, 17.821576036513, 1682.44, 0.0057, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(597, 58, 43.88077000156, 17.821366991848, 1686.29, 0.03654, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(597, 60, 43.88077000156, 17.821366991848, 1686.29, 0.03654, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(598, 58, 43.880839990452, 17.821192983538, 1688.21, 0.01597, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(598, 60, 43.880839990452, 17.821192983538, 1688.21, 0.01597, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(599, 58, 43.881005030125, 17.820861982182, 1693.02, 0.03226, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(599, 60, 43.881005030125, 17.820861982182, 1693.02, 0.03226, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(600, 58, 43.881115000695, 17.820564005524, 1697.83, 0.02683, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(600, 60, 43.881115000695, 17.820564005524, 1697.83, 0.02683, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(601, 58, 43.881115000695, 17.820545984432, 1697.83, 0.00144, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(601, 60, 43.881115000695, 17.820545984432, 1697.83, 0.00144, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(602, 58, 43.881222959608, 17.820313973352, 1701.67, 0.02213, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(602, 60, 43.881222959608, 17.820313973352, 1701.67, 0.02213, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(603, 58, 43.881346005946, 17.820015996695, 1705.52, 0.02752, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(603, 60, 43.881346005946, 17.820015996695, 1705.52, 0.02752, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(604, 58, 43.88136302121, 17.81979303807, 1711.28, 0.01797, 5.76);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(604, 60, 43.88136302121, 17.81979303807, 1711.28, 0.01797, 5.76);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(605, 58, 43.881405014545, 17.819409985095, 1714.65, 0.03105, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(605, 60, 43.881405014545, 17.819409985095, 1714.65, 0.03105, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(606, 58, 43.881407026201, 17.819341002032, 1714.65, 0.00553, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(606, 60, 43.881407026201, 17.819341002032, 1714.65, 0.00553, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(607, 58, 43.881405014545, 17.819233965129, 1715.13, 0.00858, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(607, 60, 43.881405014545, 17.819233965129, 1715.13, 0.00858, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(608, 58, 43.881430998445, 17.81881403178, 1718.49, 0.03378, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(608, 60, 43.881430998445, 17.81881403178, 1718.49, 0.03378, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(609, 58, 43.881524959579, 17.818526029587, 1723.3, 0.02534, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(609, 60, 43.881524959579, 17.818526029587, 1723.3, 0.02534, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(610, 58, 43.881633002311, 17.818372976035, 1727.15, 0.01717, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(610, 60, 43.881633002311, 17.818372976035, 1727.15, 0.01717, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(611, 58, 43.881734004244, 17.818162003532, 1730.99, 0.0203, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(611, 60, 43.881734004244, 17.818162003532, 1730.99, 0.0203, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(612, 58, 43.881844980642, 17.818039963022, 1735.32, 0.01575, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(612, 60, 43.881844980642, 17.818039963022, 1735.32, 0.01575, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(613, 58, 43.881923016161, 17.817819016054, 1740.6, 0.01972, 5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(613, 60, 43.881923016161, 17.817819016054, 1740.6, 0.01972, 5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(614, 58, 43.881945982575, 17.817760007456, 1742.05, 0.00537, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(614, 60, 43.881945982575, 17.817760007456, 1742.05, 0.00537, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(615, 58, 43.881933996454, 17.817710973322, 1743.49, 0.00415, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(615, 60, 43.881933996454, 17.817710973322, 1743.49, 0.00415, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(616, 58, 43.881933996454, 17.817710973322, 1746.85, 0, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(616, 60, 43.881933996454, 17.817710973322, 1746.85, 0, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(617, 58, 43.881933996454, 17.817710973322, 1743.01, 0, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(617, 60, 43.881933996454, 17.817710973322, 1743.01, 0, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(618, 58, 43.881949000061, 17.817553980276, 1746.37, 0.01269, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(618, 60, 43.881949000061, 17.817553980276, 1746.37, 0.01269, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(619, 58, 43.881946988404, 17.817549034953, 1745.89, 0.00046, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(619, 60, 43.881946988404, 17.817549034953, 1745.89, 0.00046, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(620, 58, 43.881965009496, 17.817401010543, 1747.81, 0.01203, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(620, 60, 43.881965009496, 17.817401010543, 1747.81, 0.01203, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(621, 58, 43.88207196258, 17.81721602194, 1750.7, 0.01901, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(621, 60, 43.88207196258, 17.81721602194, 1750.7, 0.01901, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(622, 58, 43.882233984768, 17.817041007802, 1754.06, 0.02283, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(622, 60, 43.882233984768, 17.817041007802, 1754.06, 0.02283, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(623, 58, 43.882379997522, 17.816662983969, 1757.91, 0.03437, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(623, 60, 43.882379997522, 17.816662983969, 1757.91, 0.03437, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(624, 58, 43.88249700889, 17.816453017294, 1761.27, 0.02127, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(624, 60, 43.88249700889, 17.816453017294, 1761.27, 0.02127, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(625, 58, 43.882539002225, 17.816396020353, 1762.23, 0.00653, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(625, 60, 43.882539002225, 17.816396020353, 1762.23, 0.00653, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(626, 58, 43.882649978623, 17.81615302898, 1767.04, 0.02306, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(626, 60, 43.882649978623, 17.81615302898, 1767.04, 0.02306, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(627, 58, 43.882757015526, 17.81595999375, 1770.41, 0.01952, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(627, 60, 43.882757015526, 17.81595999375, 1770.41, 0.01952, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(628, 58, 43.882824992761, 17.815683977678, 1773.77, 0.02338, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(628, 60, 43.882824992761, 17.815683977678, 1773.77, 0.02338, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(629, 58, 43.88284502551, 17.815434029326, 1776.65, 0.02016, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(629, 60, 43.88284502551, 17.815434029326, 1776.65, 0.02016, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(630, 58, 43.882859023288, 17.815391030163, 1776.65, 0.00378, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(630, 60, 43.882859023288, 17.815391030163, 1776.65, 0.00378, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(631, 58, 43.882889030501, 17.815033039078, 1780.02, 0.02888, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(631, 60, 43.882889030501, 17.815033039078, 1780.02, 0.02888, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(632, 58, 43.882902022451, 17.814860958606, 1783.38, 0.01387, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(632, 60, 43.882902022451, 17.814860958606, 1783.38, 0.01387, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(633, 58, 43.882904034108, 17.814849978313, 1783.38, 0.00091, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(633, 60, 43.882904034108, 17.814849978313, 1783.38, 0.00091, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(634, 58, 43.882934963331, 17.814654009417, 1787.71, 0.01608, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(634, 60, 43.882934963331, 17.814654009417, 1787.71, 0.01608, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(635, 58, 43.882923983037, 17.814398026094, 1793.48, 0.02055, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(635, 60, 43.882923983037, 17.814398026094, 1793.48, 0.02055, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(636, 58, 43.882846031338, 17.814242038876, 1797.32, 0.01521, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(636, 60, 43.882846031338, 17.814242038876, 1797.32, 0.01521, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(637, 58, 43.882802026346, 17.814082028344, 1802.61, 0.01373, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(637, 60, 43.882802026346, 17.814082028344, 1802.61, 0.01373, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(638, 58, 43.882876038551, 17.813888993114, 1808.38, 0.01752, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(638, 60, 43.882876038551, 17.813888993114, 1808.38, 0.01752, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(639, 58, 43.882934041321, 17.813729988411, 1814.63, 0.01428, 6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(639, 60, 43.882934041321, 17.813729988411, 1814.63, 0.01428, 6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(640, 58, 43.882974022999, 17.813642984256, 1817.51, 0.00827, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(640, 60, 43.882974022999, 17.813642984256, 1817.51, 0.00827, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(641, 58, 43.883009981364, 17.813566038385, 1821.84, 0.00735, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(641, 60, 43.883009981364, 17.813566038385, 1821.84, 0.00735, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(642, 58, 43.883017022163, 17.813407033682, 1825.68, 0.01277, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(642, 60, 43.883017022163, 17.813407033682, 1825.68, 0.01277, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(643, 58, 43.882993971929, 17.813335033134, 1829.05, 0.00631, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(643, 60, 43.882993971929, 17.813335033134, 1829.05, 0.00631, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(644, 58, 43.883018027991, 17.813239982352, 1833.37, 0.00807, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(644, 60, 43.883018027991, 17.813239982352, 1833.37, 0.00807, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(645, 58, 43.882919959724, 17.813168987632, 1836.74, 0.0123, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(645, 60, 43.882919959724, 17.813168987632, 1836.74, 0.0123, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(646, 58, 43.882851982489, 17.813072009012, 1840.1, 0.01084, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(646, 60, 43.882851982489, 17.813072009012, 1840.1, 0.01084, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(647, 58, 43.882706975564, 17.812908980995, 1843.47, 0.02075, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(647, 60, 43.882706975564, 17.812908980995, 1843.47, 0.02075, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(648, 58, 43.882690966129, 17.812867993489, 1843.47, 0.00374, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(648, 60, 43.882690966129, 17.812867993489, 1843.47, 0.00374, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(649, 58, 43.88260697946, 17.812718963251, 1843.95, 0.01516, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(649, 60, 43.88260697946, 17.812718963251, 1843.95, 0.01516, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(650, 58, 43.882575966418, 17.812698008493, 1844.43, 0.00384, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(650, 60, 43.882575966418, 17.812698008493, 1844.43, 0.00384, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(651, 58, 43.88252299279, 17.812528023496, 1845.39, 0.01484, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(651, 60, 43.88252299279, 17.812528023496, 1845.39, 0.01484, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(652, 58, 43.882546965033, 17.81204204075, 1849.23, 0.03904, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(652, 60, 43.882546965033, 17.81204204075, 1849.23, 0.03904, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(653, 58, 43.88257403858, 17.81202301383, 1849.23, 0.00337, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(653, 60, 43.88257403858, 17.81202301383, 1849.23, 0.00337, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(654, 58, 43.882908979431, 17.811749009416, 1855, 0.04324, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(654, 60, 43.882908979431, 17.811749009416, 1855, 0.04324, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(655, 58, 43.882916020229, 17.811727970839, 1855, 0.00186, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(655, 60, 43.882916020229, 17.811727970839, 1855, 0.00186, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(656, 58, 43.882979974151, 17.811593022197, 1858.85, 0.01294, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(656, 60, 43.882979974151, 17.811593022197, 1858.85, 0.01294, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(657, 58, 43.883196981624, 17.811404010281, 1864.13, 0.02849, 5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(657, 60, 43.883196981624, 17.811404010281, 1864.13, 0.02849, 5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(658, 58, 43.883349029347, 17.811279958114, 1867.5, 0.01961, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(658, 60, 43.883349029347, 17.811279958114, 1867.5, 0.01961, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(659, 58, 43.883538041264, 17.811177028343, 1871.82, 0.02258, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(659, 60, 43.883538041264, 17.811177028343, 1871.82, 0.02258, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(660, 58, 43.883649017662, 17.811078960076, 1875.19, 0.01463, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(660, 60, 43.883649017662, 17.811078960076, 1875.19, 0.01463, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(661, 58, 43.883829982951, 17.810906963423, 1879.51, 0.02439, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(661, 60, 43.883829982951, 17.810906963423, 1879.51, 0.02439, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(662, 58, 43.884105999023, 17.8105990123, 1885.76, 0.03938, 6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(662, 60, 43.884105999023, 17.8105990123, 1885.76, 0.03938, 6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(663, 58, 43.884289981797, 17.810410000384, 1889.61, 0.02546, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(663, 60, 43.884289981797, 17.810410000384, 1889.61, 0.02546, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(664, 58, 43.884707987309, 17.81008402817, 1894.42, 0.05332, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(664, 60, 43.884707987309, 17.81008402817, 1894.42, 0.05332, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(665, 58, 43.88524199836, 17.810176983476, 1898.74, 0.05984, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(665, 60, 43.88524199836, 17.810176983476, 1898.74, 0.05984, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(666, 58, 43.885417012498, 17.810415029526, 1900.66, 0.02725, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(666, 60, 43.885417012498, 17.810415029526, 1900.66, 0.02725, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(667, 58, 43.885781960562, 17.81099203974, 1905.47, 0.06152, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(667, 60, 43.885781960562, 17.81099203974, 1905.47, 0.06152, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(668, 58, 43.885849015787, 17.811107961461, 1907.39, 0.01191, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(668, 60, 43.885849015787, 17.811107961461, 1907.39, 0.01191, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(669, 58, 43.886336004362, 17.811681032181, 1909.32, 0.071, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(669, 60, 43.886336004362, 17.811681032181, 1909.32, 0.071, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(670, 58, 43.887080987915, 17.812375975773, 1902.59, 0.09982, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(670, 60, 43.887080987915, 17.812375975773, 1902.59, 0.09982, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(671, 58, 43.887636037543, 17.812802027911, 1903.07, 0.07053, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(671, 60, 43.887636037543, 17.812802027911, 1903.07, 0.07053, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(672, 58, 43.888168958947, 17.813173010945, 1909.32, 0.0663, 6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(672, 60, 43.888168958947, 17.813173010945, 1909.32, 0.0663, 6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(673, 58, 43.888750998303, 17.81349898316, 1913.64, 0.06979, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(673, 60, 43.888750998303, 17.81349898316, 1913.64, 0.06979, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(674, 58, 43.889003964141, 17.813597973436, 1917.01, 0.02923, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(674, 60, 43.889003964141, 17.813597973436, 1917.01, 0.02923, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(675, 58, 43.889152994379, 17.813585987315, 1924.7, 0.0166, 7.69);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(675, 60, 43.889152994379, 17.813585987315, 1924.7, 0.0166, 7.69);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(676, 58, 43.889157017693, 17.813590010628, 1924.22, 0.00055, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(676, 60, 43.889157017693, 17.813590010628, 1924.22, 0.00055, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(677, 58, 43.888859963045, 17.81354399398, 1922.77, 0.03324, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(677, 60, 43.888859963045, 17.81354399398, 1922.77, 0.03324, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(678, 58, 43.888584030792, 17.813399992883, 1919.41, 0.03278, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(678, 60, 43.888584030792, 17.813399992883, 1919.41, 0.03278, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(679, 58, 43.888522004709, 17.813370991498, 1919.41, 0.00728, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(679, 60, 43.888522004709, 17.813370991498, 1919.41, 0.00728, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(680, 58, 43.887949017808, 17.8130089771, 1913.64, 0.07001, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(680, 60, 43.887949017808, 17.8130089771, 1913.64, 0.07001, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(681, 58, 43.887634025887, 17.812788030133, 1910.28, 0.03925, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(681, 60, 43.887634025887, 17.812788030133, 1910.28, 0.03925, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(682, 58, 43.8873870112, 17.812633970752, 1908.83, 0.03011, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(682, 60, 43.8873870112, 17.812633970752, 1908.83, 0.03011, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(683, 58, 43.886932041496, 17.812224011868, 1912.2, 0.06032, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(683, 60, 43.886932041496, 17.812224011868, 1912.2, 0.06032, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(684, 58, 43.886785022914, 17.812090991065, 1915.56, 0.01952, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(684, 60, 43.886785022914, 17.812090991065, 1915.56, 0.01952, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(685, 58, 43.886692989618, 17.811999041587, 1916.04, 0.01261, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(685, 60, 43.886692989618, 17.811999041587, 1916.04, 0.01261, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(686, 58, 43.886160990223, 17.8115269728, 1914.12, 0.07022, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(686, 60, 43.886160990223, 17.8115269728, 1914.12, 0.07022, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(687, 58, 43.885704008862, 17.810801016167, 1909.32, 0.07725, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(687, 60, 43.885704008862, 17.810801016167, 1909.32, 0.07725, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(688, 58, 43.885652963072, 17.810723986477, 1908.83, 0.00839, -0.49);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(688, 60, 43.885652963072, 17.810723986477, 1908.83, 0.00839, -0.49);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(689, 58, 43.885436039418, 17.810414023697, 1906.91, 0.03462, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(689, 60, 43.885436039418, 17.810414023697, 1906.91, 0.03462, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(690, 58, 43.884731037542, 17.810115041211, 1900.66, 0.08197, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(690, 60, 43.884731037542, 17.810115041211, 1900.66, 0.08197, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(691, 58, 43.884727014229, 17.810118980706, 1900.66, 0.00055, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(691, 60, 43.884727014229, 17.810118980706, 1900.66, 0.00055, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(692, 58, 43.884688038379, 17.810155022889, 1900.18, 0.00521, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(692, 60, 43.884688038379, 17.810155022889, 1900.18, 0.00521, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(693, 58, 43.88461695984, 17.810230040923, 1899.22, 0.00993, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(693, 60, 43.88461695984, 17.810230040923, 1899.22, 0.00993, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(694, 58, 43.884298028424, 17.81052198261, 1893.93, 0.04249, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(694, 60, 43.884298028424, 17.81052198261, 1893.93, 0.04249, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(695, 58, 43.884217981249, 17.810610998422, 1892.49, 0.01141, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(695, 60, 43.884217981249, 17.810610998422, 1892.49, 0.01141, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(696, 58, 43.88399200514, 17.810860024765, 1887.69, 0.03209, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(696, 60, 43.88399200514, 17.810860024765, 1887.69, 0.03209, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(697, 58, 43.883825959638, 17.811041995883, 1883.84, 0.02353, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(697, 60, 43.883825959638, 17.811041995883, 1883.84, 0.02353, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(698, 58, 43.883638959378, 17.811199994758, 1880, 0.02435, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(698, 60, 43.883638959378, 17.811199994758, 1880, 0.02435, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(699, 58, 43.883504010737, 17.811285993084, 1876.15, 0.01651, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(699, 60, 43.883504010737, 17.811285993084, 1876.15, 0.01651, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(700, 58, 43.883408037946, 17.811347013339, 1873.75, 0.01174, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(700, 60, 43.883408037946, 17.811347013339, 1873.75, 0.01174, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(701, 58, 43.883319022134, 17.811428988352, 1872.3, 0.01188, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(701, 60, 43.883319022134, 17.811428988352, 1872.3, 0.01188, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(702, 58, 43.883062032983, 17.811658987775, 1867.02, 0.03401, -5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(702, 60, 43.883062032983, 17.811658987775, 1867.02, 0.03401, -5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(703, 58, 43.882794985548, 17.811912959442, 1862.69, 0.036, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(703, 60, 43.882794985548, 17.811912959442, 1862.69, 0.036, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(704, 58, 43.882384020835, 17.812212025747, 1856.92, 0.0516, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(704, 60, 43.882384020835, 17.812212025747, 1856.92, 0.0516, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(705, 58, 43.881750013679, 17.81267403625, 1852.12, 0.07963, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(705, 60, 43.881750013679, 17.81267403625, 1852.12, 0.07963, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(706, 58, 43.881369978189, 17.812807979062, 1849.23, 0.0436, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(706, 60, 43.881369978189, 17.812807979062, 1849.23, 0.0436, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(707, 58, 43.88069297187, 17.81229400076, 1846.83, 0.08581, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(707, 60, 43.88069297187, 17.81229400076, 1846.83, 0.08581, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(708, 58, 43.880638992414, 17.812257958576, 1846.83, 0.00666, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(708, 60, 43.880638992414, 17.812257958576, 1846.83, 0.00666, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(709, 58, 43.880045972764, 17.811828972772, 1846.35, 0.07437, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(709, 60, 43.880045972764, 17.811828972772, 1846.35, 0.07437, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(710, 58, 43.879372989759, 17.811153978109, 1846.35, 0.09234, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(710, 60, 43.879372989759, 17.811153978109, 1846.35, 0.09234, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(711, 58, 43.879257990047, 17.810926996171, 1844.43, 0.02224, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(711, 60, 43.879257990047, 17.810926996171, 1844.43, 0.02224, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(712, 58, 43.879192024469, 17.81077302061, 1842.98, 0.01436, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(712, 60, 43.879192024469, 17.81077302061, 1842.98, 0.01436, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(713, 58, 43.879088005051, 17.810639999807, 1842.02, 0.01573, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(713, 60, 43.879088005051, 17.810639999807, 1842.02, 0.01573, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(714, 58, 43.878432959318, 17.810341017321, 1837.7, 0.07668, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(714, 60, 43.878432959318, 17.810341017321, 1837.7, 0.07668, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(715, 58, 43.878056025133, 17.810356020927, 1834.81, 0.04193, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(715, 60, 43.878056025133, 17.810356020927, 1834.81, 0.04193, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(716, 58, 43.877981007099, 17.810374964029, 1834.33, 0.00848, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(716, 60, 43.877981007099, 17.810374964029, 1834.33, 0.00848, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(717, 58, 43.877748996019, 17.8103739582, 1830.97, 0.0258, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(717, 60, 43.877748996019, 17.8103739582, 1830.97, 0.0258, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(718, 58, 43.877469040453, 17.810489041731, 1827.12, 0.03247, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(718, 60, 43.877469040453, 17.810489041731, 1827.12, 0.03247, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(719, 58, 43.877411037683, 17.810549978167, 1826.64, 0.00809, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(719, 60, 43.877411037683, 17.810549978167, 1826.64, 0.00809, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(720, 58, 43.877092022449, 17.810871005058, 1821.84, 0.04382, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(720, 60, 43.877092022449, 17.810871005058, 1821.84, 0.04382, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(721, 58, 43.877028990537, 17.8109020181, 1822.32, 0.00744, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(721, 60, 43.877028990537, 17.8109020181, 1822.32, 0.00744, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(722, 58, 43.876763032749, 17.810828005895, 1819.91, 0.03016, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(722, 60, 43.876763032749, 17.810828005895, 1819.91, 0.03016, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(723, 58, 43.876695977524, 17.810788024217, 1819.91, 0.00812, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(723, 60, 43.876695977524, 17.810788024217, 1819.91, 0.00812, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(724, 58, 43.876491039991, 17.810672018677, 1817.99, 0.02461, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(724, 60, 43.876491039991, 17.810672018677, 1817.99, 0.02461, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(725, 58, 43.876062976196, 17.810378987342, 1815.11, 0.05308, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(725, 60, 43.876062976196, 17.810378987342, 1815.11, 0.05308, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(726, 58, 43.87575100176, 17.810238003731, 1813.66, 0.03648, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(726, 60, 43.87575100176, 17.810238003731, 1813.66, 0.03648, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(727, 58, 43.875322015956, 17.810147982091, 1810.3, 0.04824, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(727, 60, 43.875322015956, 17.810147982091, 1810.3, 0.04824, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(728, 58, 43.875043988228, 17.810137001798, 1806.94, 0.03093, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(728, 60, 43.875043988228, 17.810137001798, 1806.94, 0.03093, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(729, 58, 43.874860005453, 17.810150999576, 1805.49, 0.02049, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(729, 60, 43.874860005453, 17.810150999576, 1805.49, 0.02049, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(730, 58, 43.87478498742, 17.810158040375, 1803.57, 0.00836, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(730, 60, 43.87478498742, 17.810158040375, 1803.57, 0.00836, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(731, 58, 43.874486004934, 17.810105988756, 1798.28, 0.03351, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(731, 60, 43.874486004934, 17.810105988756, 1798.28, 0.03351, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(732, 58, 43.874219963327, 17.810119986534, 1793.48, 0.0296, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(732, 60, 43.874219963327, 17.810119986534, 1793.48, 0.0296, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(733, 58, 43.874080991372, 17.81012903899, 1790.11, 0.01547, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(733, 60, 43.874080991372, 17.81012903899, 1790.11, 0.01547, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(734, 58, 43.873951993883, 17.81012903899, 1788.19, 0.01434, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(734, 60, 43.873951993883, 17.81012903899, 1788.19, 0.01434, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(735, 58, 43.873758958653, 17.810158040375, 1784.82, 0.02159, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(735, 60, 43.873758958653, 17.810158040375, 1784.82, 0.02159, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(736, 58, 43.873544968665, 17.810163991526, 1780.98, 0.0238, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(736, 60, 43.873544968665, 17.810163991526, 1780.98, 0.0238, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(737, 58, 43.873240035027, 17.810159968212, 1776.65, 0.03391, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(737, 60, 43.873240035027, 17.810159968212, 1776.65, 0.03391, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(738, 58, 43.87289696373, 17.810133984312, 1773.77, 0.0382, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(738, 60, 43.87289696373, 17.810133984312, 1773.77, 0.0382, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(739, 58, 43.872671993449, 17.809975985438, 1771.85, 0.02804, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(739, 60, 43.872671993449, 17.809975985438, 1771.85, 0.02804, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(740, 58, 43.872434031218, 17.809744980186, 1768.48, 0.0323, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(740, 60, 43.872434031218, 17.809744980186, 1768.48, 0.0323, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(741, 58, 43.872353984043, 17.809664011002, 1768, 0.01102, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(741, 60, 43.872353984043, 17.809664011002, 1768, 0.01102, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(742, 58, 43.872229009867, 17.809466030449, 1767.04, 0.02109, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(742, 60, 43.872229009867, 17.809466030449, 1767.04, 0.02109, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(743, 58, 43.872176036239, 17.809369973838, 1766.56, 0.00969, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(743, 60, 43.872176036239, 17.809369973838, 1766.56, 0.00969, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(744, 58, 43.872018037364, 17.80918196775, 1766.08, 0.02315, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(744, 60, 43.872018037364, 17.80918196775, 1766.08, 0.02315, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(745, 58, 43.871912006289, 17.809085994959, 1765.12, 0.01408, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(745, 60, 43.871912006289, 17.809085994959, 1765.12, 0.01408, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(746, 58, 43.871899014339, 17.809090018272, 1763.68, 0.00148, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(746, 60, 43.871899014339, 17.809090018272, 1763.68, 0.00148, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(747, 58, 43.871859032661, 17.809107033536, 1763.68, 0.00465, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(747, 60, 43.871859032661, 17.809107033536, 1763.68, 0.00465, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(748, 58, 43.871648982167, 17.808576961979, 1763.2, 0.04849, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(748, 60, 43.871648982167, 17.808576961979, 1763.2, 0.04849, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(749, 58, 43.871585028246, 17.808061977848, 1765.6, 0.04189, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(749, 60, 43.871585028246, 17.808061977848, 1765.6, 0.04189, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(750, 58, 43.871884010732, 17.807331997901, 1768, 0.0673, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(750, 60, 43.871884010732, 17.807331997901, 1768, 0.0673, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(751, 58, 43.871879987419, 17.807335015386, 1768, 0.00051, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(751, 60, 43.871879987419, 17.807335015386, 1768, 0.00051, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(752, 58, 43.872047960758, 17.807037038729, 1767.52, 0.03032, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(752, 60, 43.872047960758, 17.807037038729, 1767.52, 0.03032, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(753, 58, 43.872610973194, 17.805705992505, 1765.12, 0.12371, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(753, 60, 43.872610973194, 17.805705992505, 1765.12, 0.12371, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(754, 58, 43.872666964307, 17.805526033044, 1763.68, 0.01571, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(754, 60, 43.872666964307, 17.805526033044, 1763.68, 0.01571, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(755, 58, 43.873142972589, 17.804636964574, 1763.2, 0.08877, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(755, 60, 43.873142972589, 17.804636964574, 1763.2, 0.08877, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(756, 58, 43.873613029718, 17.803742028773, 1763.68, 0.08876, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(756, 60, 43.873613029718, 17.803742028773, 1763.68, 0.08876, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(757, 58, 43.873939001933, 17.803210029379, 1764.16, 0.05597, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(757, 60, 43.873939001933, 17.803210029379, 1764.16, 0.05597, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(758, 58, 43.874286012724, 17.802219036967, 1761.27, 0.08831, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(758, 60, 43.874286012724, 17.802219036967, 1761.27, 0.08831, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(759, 58, 43.874358013272, 17.801936985925, 1759.83, 0.02398, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(759, 60, 43.874358013272, 17.801936985925, 1759.83, 0.02398, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(760, 58, 43.874705024064, 17.80064499937, 1757.43, 0.11052, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(760, 60, 43.874705024064, 17.80064499937, 1757.43, 0.11052, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(761, 58, 43.874616008252, 17.799845030531, 1755.02, 0.06488, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(761, 60, 43.874616008252, 17.799845030531, 1755.02, 0.06488, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(762, 58, 43.873910000548, 17.79968502, 1750.22, 0.07955, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(762, 60, 43.873910000548, 17.79968502, 1750.22, 0.07955, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(763, 58, 43.873760970309, 17.799655012786, 1749.74, 0.01675, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(763, 60, 43.873760970309, 17.799655012786, 1749.74, 0.01675, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(764, 58, 43.873324021697, 17.799631040543, 1744.45, 0.04862, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(764, 60, 43.873324021697, 17.799631040543, 1744.45, 0.04862, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(765, 58, 43.872772995383, 17.799634980038, 1741.08, 0.06127, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(765, 60, 43.872772995383, 17.799634980038, 1741.08, 0.06127, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(766, 58, 43.872651960701, 17.799514029175, 1739.16, 0.01659, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(766, 60, 43.872651960701, 17.799514029175, 1739.16, 0.01659, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(767, 58, 43.872674005106, 17.79950497672, 1738.2, 0.00256, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(767, 60, 43.872674005106, 17.79950497672, 1738.2, 0.00256, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(768, 58, 43.873016992584, 17.79944001697, 1735.8, 0.03849, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(768, 60, 43.873016992584, 17.79944001697, 1735.8, 0.03849, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(769, 58, 43.873010035604, 17.799436999485, 1735.8, 0.00081, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(769, 60, 43.873010035604, 17.799436999485, 1735.8, 0.00081, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(770, 58, 43.872937029228, 17.799412021413, 1732.43, 0.00836, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(770, 60, 43.872937029228, 17.799412021413, 1732.43, 0.00836, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(771, 58, 43.872937029228, 17.799412021413, 1734.36, 0, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(771, 60, 43.872937029228, 17.799412021413, 1734.36, 0, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(772, 58, 43.872738964856, 17.799320993945, 1731.95, 0.0232, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(772, 60, 43.872738964856, 17.799320993945, 1731.95, 0.0232, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(773, 58, 43.872363958508, 17.799241030589, 1728.11, 0.04219, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(773, 60, 43.872363958508, 17.799241030589, 1728.11, 0.04219, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(774, 58, 43.872076040134, 17.799190990627, 1724.74, 0.03227, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(774, 60, 43.872076040134, 17.799190990627, 1724.74, 0.03227, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(775, 58, 43.87186598964, 17.799159977585, 1722.34, 0.02349, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(775, 60, 43.87186598964, 17.799159977585, 1722.34, 0.02349, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(776, 58, 43.871333990246, 17.799089988694, 1715.61, 0.05942, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(776, 60, 43.871333990246, 17.799089988694, 1715.61, 0.05942, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(777, 58, 43.871146989986, 17.79901497066, 1712.73, 0.02165, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(777, 60, 43.871146989986, 17.79901497066, 1712.73, 0.02165, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(778, 58, 43.870866028592, 17.798891002312, 1707.92, 0.03278, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(778, 60, 43.870866028592, 17.798891002312, 1707.92, 0.03278, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(779, 58, 43.870463026688, 17.798705007881, 1702.63, 0.04723, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(779, 60, 43.870463026688, 17.798705007881, 1702.63, 0.04723, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(780, 58, 43.87006203644, 17.798587996513, 1695.9, 0.04556, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(780, 60, 43.87006203644, 17.798587996513, 1695.9, 0.04556, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(781, 58, 43.86964998208, 17.798490012065, 1688.21, 0.04649, -7.69);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(781, 60, 43.86964998208, 17.798490012065, 1688.21, 0.04649, -7.69);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(782, 58, 43.869498018175, 17.798398984596, 1683.41, 0.01841, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(782, 60, 43.869498018175, 17.798398984596, 1683.41, 0.01841, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(783, 58, 43.869256032631, 17.798350034282, 1679.56, 0.02719, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(783, 60, 43.869256032631, 17.798350034282, 1679.56, 0.02719, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(784, 58, 43.868989991024, 17.798398984596, 1675.72, 0.02984, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(784, 60, 43.868989991024, 17.798398984596, 1675.72, 0.02984, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(785, 58, 43.868711041287, 17.798527982086, 1671.39, 0.0327, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(785, 60, 43.868711041287, 17.798527982086, 1671.39, 0.0327, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(786, 58, 43.86865798384, 17.798569975421, 1671.39, 0.00679, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(786, 60, 43.86865798384, 17.798569975421, 1671.39, 0.00679, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(787, 58, 43.868333017454, 17.798822019249, 1664.66, 0.0414, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(787, 60, 43.868333017454, 17.798822019249, 1664.66, 0.0414, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(788, 58, 43.868208965287, 17.798864012584, 1661.3, 0.0142, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(788, 60, 43.868208965287, 17.798864012584, 1661.3, 0.0142, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(789, 58, 43.868040991947, 17.798879016191, 1656.97, 0.01872, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(789, 60, 43.868040991947, 17.798879016191, 1656.97, 0.01872, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(790, 58, 43.867904031649, 17.798926960677, 1653.6, 0.01571, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(790, 60, 43.867904031649, 17.798926960677, 1653.6, 0.01571, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(791, 58, 43.867683000863, 17.79900197871, 1649.76, 0.0253, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(791, 60, 43.867683000863, 17.79900197871, 1649.76, 0.0253, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(792, 58, 43.86748502031, 17.799138016999, 1645.91, 0.02457, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(792, 60, 43.86748502031, 17.799138016999, 1645.91, 0.02457, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(793, 58, 43.86732400395, 17.799094012007, 1642.55, 0.01825, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(793, 60, 43.86732400395, 17.799094012007, 1642.55, 0.01825, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(794, 58, 43.86719500646, 17.799006002024, 1640.15, 0.01599, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(794, 60, 43.86719500646, 17.799006002024, 1640.15, 0.01599, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(795, 58, 43.867010017857, 17.798966020346, 1636.3, 0.02082, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(795, 60, 43.867010017857, 17.798966020346, 1636.3, 0.02082, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(796, 58, 43.866900969297, 17.798906005919, 1632.94, 0.01305, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(796, 60, 43.866900969297, 17.798906005919, 1632.94, 0.01305, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(797, 58, 43.866927959025, 17.798935007304, 1634.38, 0.0038, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(797, 60, 43.866927959025, 17.798935007304, 1634.38, 0.0038, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(798, 58, 43.866998031735, 17.799168024212, 1633.9, 0.02024, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(798, 60, 43.866998031735, 17.799168024212, 1633.9, 0.02024, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(799, 58, 43.866998031735, 17.799168024212, 1633.9, 0, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(799, 60, 43.866998031735, 17.799168024212, 1633.9, 0, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(800, 58, 43.866980010644, 17.799405986443, 1631.49, 0.01918, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(800, 60, 43.866980010644, 17.799405986443, 1631.49, 0.01918, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(801, 58, 43.866958972067, 17.799737993628, 1629.09, 0.02672, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(801, 60, 43.866958972067, 17.799737993628, 1629.09, 0.02672, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(802, 58, 43.867032984272, 17.801008019596, 1624.77, 0.10215, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(802, 60, 43.867032984272, 17.801008019596, 1624.77, 0.10215, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(803, 58, 43.867039019242, 17.801187979057, 1623.8, 0.01444, -0.97);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(803, 60, 43.867039019242, 17.801187979057, 1623.8, 0.01444, -0.97);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(804, 58, 43.867129040882, 17.802259018645, 1619, 0.08644, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(804, 60, 43.867129040882, 17.802259018645, 1619, 0.08644, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(805, 58, 43.867133986205, 17.802317021415, 1619, 0.00468, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(805, 60, 43.867133986205, 17.802317021415, 1619, 0.00468, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(806, 58, 43.867114037275, 17.802823036909, 1613.71, 0.04063, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(806, 60, 43.867114037275, 17.802823036909, 1613.71, 0.04063, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(807, 58, 43.867041030899, 17.803159989417, 1611.31, 0.02821, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(807, 60, 43.867041030899, 17.803159989417, 1611.31, 0.02821, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(808, 58, 43.867000965402, 17.803595010191, 1606.98, 0.03516, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(808, 60, 43.867000965402, 17.803595010191, 1606.98, 0.03516, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(809, 58, 43.867147983983, 17.804224994034, 1602.66, 0.05308, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(809, 60, 43.867147983983, 17.804224994034, 1602.66, 0.05308, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(810, 58, 43.86714396067, 17.804641993716, 1598.81, 0.03343, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(810, 60, 43.86714396067, 17.804641993716, 1598.81, 0.03343, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(811, 58, 43.867041030899, 17.805082965642, 1593.52, 0.03716, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(811, 60, 43.867041030899, 17.805082965642, 1593.52, 0.03716, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(812, 58, 43.866897029802, 17.805539024994, 1588.24, 0.03991, -5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(812, 60, 43.866897029802, 17.805539024994, 1588.24, 0.03991, -5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(813, 58, 43.86684698984, 17.805901039392, 1583.91, 0.02955, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(813, 60, 43.86684698984, 17.805901039392, 1583.91, 0.02955, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(814, 58, 43.866864005104, 17.806287026033, 1580.54, 0.031, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(814, 60, 43.866864005104, 17.806287026033, 1580.54, 0.031, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(815, 58, 43.866901975125, 17.806603023782, 1576.7, 0.02568, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(815, 60, 43.866901975125, 17.806603023782, 1576.7, 0.02568, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(816, 58, 43.866984033957, 17.807153966278, 1572.37, 0.0451, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(816, 60, 43.866984033957, 17.807153966278, 1572.37, 0.0451, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(817, 58, 43.866913961247, 17.807732988149, 1568.05, 0.04707, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(817, 60, 43.866913961247, 17.807732988149, 1568.05, 0.04707, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(818, 58, 43.866884959862, 17.807794008404, 1566.61, 0.00586, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(818, 60, 43.866884959862, 17.807794008404, 1566.61, 0.00586, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(819, 58, 43.86686601676, 17.807808006182, 1565.64, 0.00239, -0.97);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(819, 60, 43.86686601676, 17.807808006182, 1565.64, 0.00239, -0.97);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(820, 58, 43.866773983464, 17.807902973145, 1564.2, 0.01275, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(820, 60, 43.866773983464, 17.807902973145, 1564.2, 0.01275, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(821, 58, 43.866329994053, 17.808378981426, 1557.95, 0.0624, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(821, 60, 43.866329994053, 17.808378981426, 1557.95, 0.0624, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(822, 58, 43.866045009345, 17.808563970029, 1554.11, 0.03499, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(822, 60, 43.866045009345, 17.808563970029, 1554.11, 0.03499, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(823, 58, 43.865574030206, 17.808858007193, 1548.82, 0.05743, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(823, 60, 43.865574030206, 17.808858007193, 1548.82, 0.05743, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(824, 58, 43.865456013009, 17.808973006904, 1547.86, 0.01604, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(824, 60, 43.865456013009, 17.808973006904, 1547.86, 0.01604, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(825, 58, 43.865165999159, 17.809219015762, 1541.13, 0.0378, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(825, 60, 43.865165999159, 17.809219015762, 1541.13, 0.0378, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(826, 58, 43.865168010816, 17.809021035209, 1538.25, 0.01587, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(826, 60, 43.865168010816, 17.809021035209, 1538.25, 0.01587, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(827, 58, 43.865362973884, 17.80873102136, 1536.8, 0.03179, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(827, 60, 43.865362973884, 17.80873102136, 1536.8, 0.03179, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(828, 58, 43.865649970248, 17.808306980878, 1531.52, 0.04663, -5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(828, 60, 43.865649970248, 17.808306980878, 1531.52, 0.04663, -5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(829, 58, 43.865855997428, 17.808104977012, 1527.19, 0.02805, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(829, 60, 43.865855997428, 17.808104977012, 1527.19, 0.02805, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(830, 58, 43.865749966353, 17.807968016714, 1522.87, 0.01611, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(830, 60, 43.865749966353, 17.807968016714, 1522.87, 0.01611, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(831, 58, 43.865649970248, 17.808029036969, 1521.42, 0.01215, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(831, 60, 43.865649970248, 17.808029036969, 1521.42, 0.01215, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(832, 58, 43.865447966382, 17.808062983677, 1519.5, 0.02263, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(832, 60, 43.865447966382, 17.808062983677, 1519.5, 0.02263, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(833, 58, 43.865064997226, 17.808174965903, 1515.18, 0.04352, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(833, 60, 43.865064997226, 17.808174965903, 1515.18, 0.04352, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(834, 58, 43.864652020857, 17.80849901028, 1508.45, 0.05276, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(834, 60, 43.864652020857, 17.80849901028, 1508.45, 0.05276, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(835, 58, 43.864419003949, 17.808687016368, 1502.2, 0.02998, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(835, 60, 43.864419003949, 17.808687016368, 1502.2, 0.02998, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(836, 58, 43.864195961505, 17.808836968616, 1497.39, 0.02756, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(836, 60, 43.864195961505, 17.808836968616, 1497.39, 0.02756, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(837, 58, 43.86408297345, 17.808961020783, 1493.55, 0.01602, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(837, 60, 43.86408297345, 17.808961020783, 1493.55, 0.01602, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(838, 58, 43.863891027868, 17.809287998825, 1488.74, 0.0338, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(838, 60, 43.863891027868, 17.809287998825, 1488.74, 0.0338, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(839, 58, 43.863726994023, 17.809668034315, 1482.49, 0.03551, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(839, 60, 43.863726994023, 17.809668034315, 1482.49, 0.03551, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(840, 58, 43.863577041775, 17.810045974329, 1475.28, 0.03458, -7.21);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(840, 60, 43.863577041775, 17.810045974329, 1475.28, 0.03458, -7.21);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(841, 58, 43.863366991282, 17.810645028949, 1467.11, 0.0534, -8.17);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(841, 60, 43.863366991282, 17.810645028949, 1467.11, 0.0534, -8.17);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(842, 58, 43.863301025704, 17.810848038644, 1464.71, 0.01785, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(842, 60, 43.863301025704, 17.810848038644, 1464.71, 0.01785, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(843, 58, 43.863218966872, 17.811196977273, 1459.9, 0.02943, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(843, 60, 43.863218966872, 17.811196977273, 1459.9, 0.02943, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(844, 58, 43.863137997687, 17.811537031084, 1456.05, 0.02871, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(844, 60, 43.863137997687, 17.811537031084, 1456.05, 0.02871, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(845, 58, 43.863114025444, 17.811643984169, 1454.61, 0.00898, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(845, 60, 43.863114025444, 17.811643984169, 1454.61, 0.00898, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(846, 58, 43.862998019904, 17.812377987429, 1453.17, 0.06024, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(846, 60, 43.862998019904, 17.812377987429, 1453.17, 0.06024, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(847, 58, 43.862883020192, 17.812611004338, 1454.13, 0.02264, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(847, 60, 43.862883020192, 17.812611004338, 1454.13, 0.02264, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(848, 58, 43.862846978009, 17.812691973522, 1452.21, 0.00763, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(848, 60, 43.862846978009, 17.812691973522, 1452.21, 0.00763, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(849, 58, 43.862676993012, 17.813348025084, 1454.61, 0.05589, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(849, 60, 43.862676993012, 17.813348025084, 1454.61, 0.05589, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(850, 58, 43.862673975527, 17.813371997327, 1454.61, 0.00195, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(850, 60, 43.862673975527, 17.813371997327, 1454.61, 0.00195, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(851, 58, 43.862582026049, 17.8135630209, 1455.09, 0.01841, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(851, 60, 43.862582026049, 17.8135630209, 1455.09, 0.01841, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(852, 58, 43.86206603609, 17.814538003877, 1459.42, 0.09696, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(852, 60, 43.86206603609, 17.814538003877, 1459.42, 0.09696, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(853, 58, 43.861838970333, 17.815232025459, 1463.26, 0.0611, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(853, 60, 43.861838970333, 17.815232025459, 1463.26, 0.0611, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(854, 58, 43.861675020307, 17.816382022575, 1467.11, 0.09398, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(854, 60, 43.861675020307, 17.816382022575, 1467.11, 0.09398, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(855, 58, 43.861695975065, 17.816767003387, 1467.11, 0.03095, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(855, 60, 43.861695975065, 17.816767003387, 1467.11, 0.03095, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(856, 58, 43.861855985597, 17.81757703051, 1469.99, 0.06734, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(856, 60, 43.861855985597, 17.81757703051, 1469.99, 0.06734, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(857, 58, 43.861746015027, 17.817993024364, 1473.36, 0.03552, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(857, 60, 43.861746015027, 17.817993024364, 1473.36, 0.03552, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(858, 58, 43.861843999475, 17.818746976554, 1476.72, 0.06142, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(858, 60, 43.861843999475, 17.818746976554, 1476.72, 0.06142, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(859, 58, 43.861823966727, 17.819049982354, 1476.24, 0.02439, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(859, 60, 43.861823966727, 17.819049982354, 1476.24, 0.02439, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(860, 58, 43.861500006169, 17.818950992078, 1474.32, 0.03689, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(860, 60, 43.861500006169, 17.818950992078, 1474.32, 0.03689, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(861, 58, 43.861421970651, 17.818924002349, 1475.28, 0.00894, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(861, 60, 43.861421970651, 17.818924002349, 1475.28, 0.00894, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(862, 58, 43.86062300764, 17.818887960166, 1476.72, 0.08889, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(862, 60, 43.86062300764, 17.818887960166, 1476.72, 0.08889, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(863, 58, 43.859768975526, 17.819353993982, 1480.57, 0.10205, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(863, 60, 43.859768975526, 17.819353993982, 1480.57, 0.10205, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(864, 58, 43.859654981643, 17.81999998726, 1483.93, 0.05332, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(864, 60, 43.859654981643, 17.81999998726, 1483.93, 0.05332, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(865, 58, 43.859665961936, 17.820014990866, 1483.93, 0.00171, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(865, 60, 43.859665961936, 17.820014990866, 1483.93, 0.00171, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(866, 58, 43.860039040446, 17.820669030771, 1486.34, 0.06686, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(866, 60, 43.860039040446, 17.820669030771, 1486.34, 0.06686, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(867, 58, 43.86102902703, 17.821864038706, 1488.26, 0.14594, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(867, 60, 43.86102902703, 17.821864038706, 1488.26, 0.14594, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(868, 58, 43.861390035599, 17.822258993983, 1489.7, 0.05113, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(868, 60, 43.861390035599, 17.822258993983, 1489.7, 0.05113, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(869, 58, 43.861393975094, 17.822362007573, 1490.66, 0.00827, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(869, 60, 43.861393975094, 17.822362007573, 1490.66, 0.00827, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(870, 58, 43.861381988972, 17.822539033368, 1490.18, 0.01426, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(870, 60, 43.861381988972, 17.822539033368, 1490.18, 0.01426, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(871, 58, 43.861401015893, 17.82305996865, 1491.62, 0.04182, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(871, 60, 43.861401015893, 17.82305996865, 1491.62, 0.04182, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(872, 58, 43.861054005101, 17.823703028262, 1493.55, 0.0644, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(872, 60, 43.861054005101, 17.823703028262, 1493.55, 0.0644, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(873, 58, 43.860517982394, 17.824421022087, 1495.95, 0.08286, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(873, 60, 43.860517982394, 17.824421022087, 1495.95, 0.08286, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(874, 58, 43.859869977459, 17.825143961236, 1499.31, 0.09247, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(874, 60, 43.859869977459, 17.825143961236, 1499.31, 0.09247, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(875, 58, 43.8596829772, 17.825400028378, 1499.79, 0.02922, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(875, 60, 43.8596829772, 17.825400028378, 1499.79, 0.02922, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(876, 58, 43.859400004148, 17.825644025579, 1496.43, 0.03705, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(876, 60, 43.859400004148, 17.825644025579, 1496.43, 0.03705, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(877, 58, 43.859161958098, 17.826176024973, 1492.58, 0.0502, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(877, 60, 43.859161958098, 17.826176024973, 1492.58, 0.0502, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(878, 58, 43.859015023336, 17.826654966921, 1487.78, 0.04173, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(878, 60, 43.859015023336, 17.826654966921, 1487.78, 0.04173, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(879, 58, 43.858940005302, 17.82728604041, 1482.49, 0.05128, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(879, 60, 43.858940005302, 17.82728604041, 1482.49, 0.05128, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(880, 58, 43.859007982537, 17.827840000391, 1476.72, 0.04505, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(880, 60, 43.859007982537, 17.827840000391, 1476.72, 0.04505, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(881, 58, 43.859101021662, 17.828469984233, 1471.44, 0.05156, -5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(881, 60, 43.859101021662, 17.828469984233, 1471.44, 0.05156, -5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(882, 58, 43.859168998897, 17.828917996958, 1469.03, 0.03671, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(882, 60, 43.859168998897, 17.828917996958, 1469.03, 0.03671, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(883, 58, 43.859172016382, 17.829539012164, 1464.23, 0.04979, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(883, 60, 43.859172016382, 17.829539012164, 1464.23, 0.04979, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(884, 58, 43.85923798196, 17.830117028207, 1458.94, 0.04692, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(884, 60, 43.85923798196, 17.830117028207, 1458.94, 0.04692, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(885, 58, 43.859329009429, 17.830479964614, 1455.09, 0.03081, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(885, 60, 43.859329009429, 17.830479964614, 1455.09, 0.03081, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(886, 58, 43.85930897668, 17.830624971539, 1454.13, 0.01184, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(886, 60, 43.85930897668, 17.830624971539, 1454.13, 0.01184, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(887, 58, 43.859258014709, 17.830955972895, 1451.73, 0.02714, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(887, 60, 43.859258014709, 17.830955972895, 1451.73, 0.02714, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(888, 58, 43.859198000282, 17.83112604171, 1450.77, 0.01518, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(888, 60, 43.859198000282, 17.83112604171, 1450.77, 0.01518, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(889, 58, 43.859148966148, 17.831333996728, 1448.36, 0.01754, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(889, 60, 43.859148966148, 17.831333996728, 1448.36, 0.01754, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(890, 58, 43.858957020566, 17.831647982821, 1444.04, 0.033, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(890, 60, 43.858957020566, 17.831647982821, 1444.04, 0.033, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(891, 58, 43.858886025846, 17.831715038046, 1443.56, 0.00955, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(891, 60, 43.858886025846, 17.831715038046, 1443.56, 0.00955, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(892, 58, 43.858561981469, 17.83197697252, 1439.71, 0.04171, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(892, 60, 43.858561981469, 17.83197697252, 1439.71, 0.04171, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(893, 58, 43.858469026163, 17.832036986947, 1439.23, 0.0114, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(893, 60, 43.858469026163, 17.832036986947, 1439.23, 0.0114, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(894, 58, 43.857849016786, 17.83226002939, 1433.46, 0.07122, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(894, 60, 43.857849016786, 17.83226002939, 1433.46, 0.07122, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(895, 58, 43.857536958531, 17.832362959161, 1430.1, 0.03567, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(895, 60, 43.857536958531, 17.832362959161, 1430.1, 0.03567, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(896, 58, 43.857444003224, 17.832397995517, 1429.14, 0.01071, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(896, 60, 43.857444003224, 17.832397995517, 1429.14, 0.01071, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(897, 58, 43.857178967446, 17.832522969693, 1426.73, 0.03113, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(897, 60, 43.857178967446, 17.832522969693, 1426.73, 0.03113, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(898, 58, 43.857096992433, 17.832532022148, 1425.29, 0.00914, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(898, 60, 43.857096992433, 17.832532022148, 1425.29, 0.00914, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(899, 58, 43.856971012428, 17.8325379733, 1422.89, 0.01402, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(899, 60, 43.856971012428, 17.8325379733, 1422.89, 0.01402, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(900, 58, 43.856651997194, 17.832520036027, 1420.49, 0.0355, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(900, 60, 43.856651997194, 17.832520036027, 1420.49, 0.0355, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(901, 58, 43.856396013871, 17.832578038797, 1416.16, 0.02884, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(901, 60, 43.856396013871, 17.832578038797, 1416.16, 0.02884, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(902, 58, 43.856201972812, 17.83266001381, 1412.31, 0.02256, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(902, 60, 43.856201972812, 17.83266001381, 1412.31, 0.02256, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(903, 58, 43.855995023623, 17.832764033228, 1409.43, 0.02448, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(903, 60, 43.855995023623, 17.832764033228, 1409.43, 0.02448, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(904, 58, 43.855493031442, 17.833058992401, 1403.66, 0.06062, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(904, 60, 43.855493031442, 17.833058992401, 1403.66, 0.06062, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(905, 58, 43.85540401563, 17.833118000999, 1403.66, 0.01097, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(905, 60, 43.85540401563, 17.833118000999, 1403.66, 0.01097, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(906, 58, 43.854853995144, 17.83357498236, 1397.41, 0.0713, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(906, 60, 43.854853995144, 17.83357498236, 1397.41, 0.0713, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(907, 58, 43.854758022353, 17.833646982908, 1395.97, 0.01213, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(907, 60, 43.854758022353, 17.833646982908, 1395.97, 0.01213, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(908, 58, 43.85434797965, 17.833780003712, 1393.09, 0.04683, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(908, 60, 43.85434797965, 17.833780003712, 1393.09, 0.04683, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(909, 58, 43.854061989114, 17.833895003423, 1391.65, 0.03311, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(909, 60, 43.854061989114, 17.833895003423, 1391.65, 0.03311, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(910, 58, 43.853976996616, 17.833950994536, 1391.65, 0.01046, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(910, 60, 43.853976996616, 17.833950994536, 1391.65, 0.01046, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(911, 58, 43.85363903828, 17.834211001173, 1387.32, 0.04298, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(911, 60, 43.85363903828, 17.834211001173, 1387.32, 0.04298, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(912, 58, 43.853553039953, 17.834291970357, 1385.88, 0.01156, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(912, 60, 43.853553039953, 17.834291970357, 1385.88, 0.01156, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(913, 58, 43.853479027748, 17.834363970906, 1384.92, 0.01005, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(913, 60, 43.853479027748, 17.834363970906, 1384.92, 0.01005, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(914, 58, 43.853251961991, 17.834468996152, 1381.07, 0.02662, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(914, 60, 43.853251961991, 17.834468996152, 1381.07, 0.02662, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(915, 58, 43.852835968137, 17.834514006972, 1377.23, 0.0464, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(915, 60, 43.852835968137, 17.834514006972, 1377.23, 0.0464, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(916, 58, 43.852519970387, 17.834382997826, 1373.86, 0.03667, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(916, 60, 43.852519970387, 17.834382997826, 1373.86, 0.03667, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(917, 58, 43.852350991219, 17.834361037239, 1371.94, 0.01887, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(917, 60, 43.852350991219, 17.834361037239, 1371.94, 0.01887, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(918, 58, 43.851517997682, 17.833792995661, 1368.57, 0.10322, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(918, 60, 43.851517997682, 17.833792995661, 1368.57, 0.10322, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(919, 58, 43.851249022409, 17.833739016205, 1365.21, 0.03022, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(919, 60, 43.851249022409, 17.833739016205, 1365.21, 0.03022, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(920, 58, 43.851140979677, 17.833747984841, 1363.77, 0.01204, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(920, 60, 43.851140979677, 17.833747984841, 1363.77, 0.01204, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(921, 58, 43.851023968309, 17.833738010377, 1360.4, 0.01304, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(921, 60, 43.851023968309, 17.833738010377, 1360.4, 0.01304, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(922, 58, 43.850654996932, 17.833676990122, 1354.15, 0.04132, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(922, 60, 43.850654996932, 17.833676990122, 1354.15, 0.04132, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(923, 58, 43.850394990295, 17.833670033142, 1350.79, 0.02892, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(923, 60, 43.850394990295, 17.833670033142, 1350.79, 0.02892, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(924, 58, 43.850149987265, 17.833679001778, 1348.39, 0.02725, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(924, 60, 43.850149987265, 17.833679001778, 1348.39, 0.02725, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(925, 58, 43.849937003106, 17.833771035075, 1347.43, 0.02481, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(925, 60, 43.849937003106, 17.833771035075, 1347.43, 0.02481, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(926, 58, 43.849779004231, 17.833933979273, 1347.91, 0.02189, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(926, 60, 43.849779004231, 17.833933979273, 1347.91, 0.02189, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(927, 58, 43.849249016494, 17.834565974772, 1349.83, 0.07773, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(927, 60, 43.849249016494, 17.834565974772, 1349.83, 0.07773, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(928, 58, 43.84904500097, 17.83485095948, 1346.46, 0.0322, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(928, 60, 43.84904500097, 17.83485095948, 1346.46, 0.0322, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(929, 58, 43.848719028756, 17.834823969752, 1342.62, 0.03631, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(929, 60, 43.848719028756, 17.834823969752, 1342.62, 0.03631, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(930, 58, 43.848646022379, 17.834804020822, 1340.7, 0.00827, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(930, 60, 43.848646022379, 17.834804020822, 1340.7, 0.00827, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(931, 58, 43.848366988823, 17.834746018052, 1335.89, 0.03137, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(931, 60, 43.848366988823, 17.834746018052, 1335.89, 0.03137, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(932, 58, 43.848141012713, 17.834759010002, 1332.04, 0.02515, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(932, 60, 43.848141012713, 17.834759010002, 1332.04, 0.02515, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(933, 58, 43.847796013579, 17.834893036634, 1326.28, 0.03984, -5.76);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(933, 60, 43.847796013579, 17.834893036634, 1326.28, 0.03984, -5.76);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(934, 58, 43.84754396975, 17.835036031902, 1322.43, 0.03028, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(934, 60, 43.84754396975, 17.835036031902, 1322.43, 0.03028, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(935, 58, 43.847459983081, 17.83505002968, 1321.47, 0.00941, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(935, 60, 43.847459983081, 17.83505002968, 1321.47, 0.00941, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(936, 58, 43.847263008356, 17.835068972781, 1318.59, 0.02196, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(936, 60, 43.847263008356, 17.835068972781, 1318.59, 0.02196, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(937, 58, 43.846927983686, 17.83519201912, 1311.86, 0.03854, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(937, 60, 43.846927983686, 17.83519201912, 1311.86, 0.03854, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(938, 58, 43.846620032564, 17.83539201133, 1304.65, 0.03781, -7.21);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(938, 60, 43.846620032564, 17.83539201133, 1304.65, 0.03781, -7.21);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(939, 58, 43.846416017041, 17.835746984929, 1298.88, 0.0364, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(939, 60, 43.846416017041, 17.835746984929, 1298.88, 0.0364, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(940, 58, 43.846335969865, 17.835914958268, 1295.99, 0.01615, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(940, 60, 43.846335969865, 17.835914958268, 1295.99, 0.01615, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(941, 58, 43.846259023994, 17.836009003222, 1292.63, 0.01141, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(941, 60, 43.846259023994, 17.836009003222, 1292.63, 0.01141, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(942, 58, 43.846083004028, 17.836011014879, 1289.27, 0.01957, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(942, 60, 43.846083004028, 17.836011014879, 1289.27, 0.01957, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(943, 58, 43.846020977944, 17.835973966867, 1288.78, 0.00751, -0.49);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(943, 60, 43.846020977944, 17.835973966867, 1288.78, 0.00751, -0.49);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(944, 58, 43.845620993525, 17.835787972435, 1280.61, 0.04691, -8.17);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(944, 60, 43.845620993525, 17.835787972435, 1280.61, 0.04691, -8.17);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(945, 58, 43.845431981608, 17.835593009368, 1276.29, 0.02619, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(945, 60, 43.845431981608, 17.835593009368, 1276.29, 0.02619, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(946, 58, 43.845083964989, 17.835026979446, 1267.64, 0.05965, -8.65);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(946, 60, 43.845083964989, 17.835026979446, 1267.64, 0.05965, -8.65);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(947, 58, 43.844737960026, 17.83501197584, 1264.75, 0.03849, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(947, 60, 43.844737960026, 17.83501197584, 1264.75, 0.03849, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(948, 58, 43.844450041652, 17.834563041106, 1265.23, 0.04818, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(948, 60, 43.844450041652, 17.834563041106, 1265.23, 0.04818, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(949, 58, 43.844147035852, 17.834409987554, 1260.91, 0.03586, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(949, 60, 43.844147035852, 17.834409987554, 1260.91, 0.03586, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(950, 58, 43.84381997399, 17.834079992026, 1257.06, 0.04498, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(950, 60, 43.84381997399, 17.834079992026, 1257.06, 0.04498, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(951, 58, 43.843762977049, 17.834007991478, 1257.54, 0.00857, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(951, 60, 43.843762977049, 17.834007991478, 1257.54, 0.00857, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(952, 58, 43.843504982069, 17.833829959854, 1258.5, 0.03204, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(952, 60, 43.843504982069, 17.833829959854, 1258.5, 0.03204, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(953, 58, 43.843218991533, 17.833638014272, 1257.54, 0.03533, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(953, 60, 43.843218991533, 17.833638014272, 1257.54, 0.03533, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(954, 58, 43.842648016289, 17.834033975378, 1251.29, 0.07099, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(954, 60, 43.842648016289, 17.834033975378, 1251.29, 0.07099, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(955, 58, 43.842541985214, 17.834458015859, 1246.97, 0.03599, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(955, 60, 43.842541985214, 17.834458015859, 1246.97, 0.03599, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(956, 58, 43.842474007979, 17.8348180186, 1240.72, 0.02984, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(956, 60, 43.842474007979, 17.8348180186, 1240.72, 0.02984, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(957, 58, 43.842247026041, 17.83480502665, 1235.91, 0.02526, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(957, 60, 43.842247026041, 17.83480502665, 1235.91, 0.02526, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(958, 58, 43.842044016346, 17.834720034152, 1232.55, 0.02358, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(958, 60, 43.842044016346, 17.834720034152, 1232.55, 0.02358, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(959, 58, 43.841785015538, 17.834577038884, 1228.7, 0.031, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(959, 60, 43.841785015538, 17.834577038884, 1228.7, 0.031, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(960, 58, 43.841573037207, 17.834496991709, 1225.34, 0.02443, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(960, 60, 43.841573037207, 17.834496991709, 1225.34, 0.02443, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(961, 58, 43.841385031119, 17.834444018081, 1220.53, 0.02133, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(961, 60, 43.841385031119, 17.834444018081, 1220.53, 0.02133, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(962, 58, 43.841128963977, 17.834830004722, 1217.17, 0.04206, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(962, 60, 43.841128963977, 17.834830004722, 1217.17, 0.04206, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(963, 58, 43.841030979529, 17.835010970011, 1215.72, 0.01815, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(963, 60, 43.841030979529, 17.835010970011, 1215.72, 0.01815, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(964, 58, 43.840997032821, 17.835080036893, 1214.76, 0.0067, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(964, 60, 43.840997032821, 17.835080036893, 1214.76, 0.0067, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(965, 58, 43.840813972056, 17.83530802466, 1210.44, 0.02736, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(965, 60, 43.840813972056, 17.83530802466, 1210.44, 0.02736, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(966, 58, 43.840616997331, 17.835309030488, 1207.07, 0.0219, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(966, 60, 43.840616997331, 17.835309030488, 1207.07, 0.0219, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(967, 58, 43.840268980712, 17.834903011099, 1200.34, 0.05058, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(967, 60, 43.840268980712, 17.834903011099, 1200.34, 0.05058, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(968, 58, 43.840201003477, 17.834731014445, 1197.94, 0.01573, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(968, 60, 43.840201003477, 17.834731014445, 1197.94, 0.01573, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(969, 58, 43.840193040669, 17.834795974195, 1198.9, 0.00528, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(969, 60, 43.840193040669, 17.834795974195, 1198.9, 0.00528, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(970, 58, 43.840206032619, 17.835287991911, 1194.58, 0.03949, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(970, 60, 43.840206032619, 17.835287991911, 1194.58, 0.03949, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(971, 58, 43.840235034004, 17.835473986343, 1193.13, 0.01526, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(971, 60, 43.840235034004, 17.835473986343, 1193.13, 0.01526, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(972, 58, 43.840236961842, 17.836143029854, 1189.77, 0.05366, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(972, 60, 43.840236961842, 17.836143029854, 1189.77, 0.05366, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(973, 58, 43.840216007084, 17.836391972378, 1189.77, 0.0201, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(973, 60, 43.840216007084, 17.836391972378, 1189.77, 0.0201, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(974, 58, 43.840062031522, 17.836778964847, 1184.96, 0.03545, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(974, 60, 43.840062031522, 17.836778964847, 1184.96, 0.03545, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(975, 58, 43.839937979355, 17.836916008964, 1181.6, 0.01764, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(975, 60, 43.839937979355, 17.836916008964, 1181.6, 0.01764, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(976, 58, 43.839769000188, 17.837129998952, 1177.27, 0.02545, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(976, 60, 43.839769000188, 17.837129998952, 1177.27, 0.02545, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(977, 58, 43.839599015191, 17.837370978668, 1173.91, 0.02703, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(977, 60, 43.839599015191, 17.837370978668, 1173.91, 0.02703, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(978, 58, 43.83945803158, 17.83755001612, 1170.54, 0.02126, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(978, 60, 43.83945803158, 17.83755001612, 1170.54, 0.02126, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(979, 58, 43.839321993291, 17.837725030258, 1167.18, 0.02064, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(979, 60, 43.839321993291, 17.837725030258, 1167.18, 0.02064, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(980, 58, 43.839165000245, 17.837889986113, 1162.37, 0.0219, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(980, 60, 43.839165000245, 17.837889986113, 1162.37, 0.0219, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(981, 58, 43.839082019404, 17.837823014706, 1160.93, 0.01068, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(981, 60, 43.839082019404, 17.837823014706, 1160.93, 0.01068, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(982, 58, 43.83900700137, 17.837210968137, 1154.2, 0.04979, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(982, 60, 43.83900700137, 17.837210968137, 1154.2, 0.04979, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(983, 58, 43.83896199055, 17.837048023939, 1150.84, 0.01399, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(983, 60, 43.83896199055, 17.837048023939, 1150.84, 0.01399, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(984, 58, 43.838450023904, 17.837105020881, 1144.59, 0.05711, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(984, 60, 43.838450023904, 17.837105020881, 1144.59, 0.05711, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(985, 58, 43.838360002264, 17.837166041136, 1143.14, 0.01114, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(985, 60, 43.838360002264, 17.837166041136, 1143.14, 0.01114, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(986, 58, 43.838072000071, 17.837385982275, 1138.82, 0.03656, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(986, 60, 43.838072000071, 17.837385982275, 1138.82, 0.03656, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(987, 58, 43.837758013979, 17.837618999183, 1134.49, 0.0396, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(987, 60, 43.837758013979, 17.837618999183, 1134.49, 0.0396, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(988, 58, 43.837610995397, 17.837725030258, 1131.13, 0.01843, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(988, 60, 43.837610995397, 17.837725030258, 1131.13, 0.01843, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(989, 58, 43.837408991531, 17.837701980025, 1127.28, 0.02254, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(989, 60, 43.837408991531, 17.837701980025, 1127.28, 0.02254, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(990, 58, 43.837216962129, 17.83747298643, 1123.44, 0.02817, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(990, 60, 43.837216962129, 17.83747298643, 1123.44, 0.02817, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(991, 58, 43.837130041793, 17.837057998404, 1117.67, 0.03466, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(991, 60, 43.837130041793, 17.837057998404, 1117.67, 0.03466, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(992, 58, 43.836969025433, 17.836877033114, 1112.86, 0.02305, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(992, 60, 43.836969025433, 17.836877033114, 1112.86, 0.02305, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(993, 58, 43.83673902601, 17.837005024776, 1109.02, 0.02756, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(993, 60, 43.83673902601, 17.837005024776, 1109.02, 0.02756, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(994, 58, 43.836506009102, 17.837128993124, 1103.25, 0.02775, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(994, 60, 43.836506009102, 17.837128993124, 1103.25, 0.02775, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(995, 58, 43.83618498221, 17.837424036115, 1096.04, 0.04283, -7.21);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(995, 60, 43.83618498221, 17.837424036115, 1096.04, 0.04283, -7.21);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(996, 58, 43.836010973901, 17.83760198392, 1092.68, 0.02404, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(996, 60, 43.836010973901, 17.83760198392, 1092.68, 0.02404, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(997, 58, 43.83585004136, 17.837720001116, 1089.31, 0.02024, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(997, 60, 43.83585004136, 17.837720001116, 1089.31, 0.02024, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(998, 58, 43.835664968938, 17.837780015543, 1085.47, 0.02113, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(998, 60, 43.835664968938, 17.837780015543, 1085.47, 0.02113, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(999, 58, 43.835469000041, 17.837757971138, 1082.1, 0.02186, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(999, 60, 43.835469000041, 17.837757971138, 1082.1, 0.02186, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1000, 58, 43.835281999782, 17.837675996125, 1077.78, 0.02181, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1000, 60, 43.835281999782, 17.837675996125, 1077.78, 0.02181, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1001, 58, 43.835194995627, 17.837667027488, 1075.85, 0.0097, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1001, 60, 43.835194995627, 17.837667027488, 1075.85, 0.0097, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1002, 58, 43.834939012304, 17.837574994192, 1070.08, 0.02941, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1002, 60, 43.834939012304, 17.837574994192, 1070.08, 0.02941, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1003, 58, 43.834875980392, 17.837506011128, 1068.64, 0.00893, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1003, 60, 43.834875980392, 17.837506011128, 1068.64, 0.00893, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1004, 58, 43.834774978459, 17.837188001722, 1064.8, 0.02787, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1004, 60, 43.834774978459, 17.837188001722, 1064.8, 0.02787, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1005, 58, 43.834717981517, 17.837035031989, 1061.91, 0.01381, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1005, 60, 43.834717981517, 17.837035031989, 1061.91, 0.01381, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1006, 58, 43.834713036194, 17.837031008676, 1062.39, 0.00064, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1006, 60, 43.834713036194, 17.837031008676, 1062.39, 0.00064, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1007, 58, 43.834756035358, 17.83761497587, 1062.39, 0.04708, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1007, 60, 43.834756035358, 17.83761497587, 1062.39, 0.04708, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1008, 58, 43.834775984287, 17.837788984179, 1061.91, 0.01413, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1008, 60, 43.834775984287, 17.837788984179, 1061.91, 0.01413, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1009, 58, 43.835185021162, 17.838401030749, 1058.07, 0.06692, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1009, 60, 43.835185021162, 17.838401030749, 1058.07, 0.06692, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1010, 58, 43.83517303504, 17.839067978784, 1060.47, 0.05351, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1010, 60, 43.83517303504, 17.839067978784, 1060.47, 0.05351, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1011, 58, 43.835254004225, 17.839260008186, 1060.47, 0.01784, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1011, 60, 43.835254004225, 17.839260008186, 1060.47, 0.01784, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1012, 58, 43.835533037782, 17.839969033375, 1056.63, 0.06478, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1012, 60, 43.835533037782, 17.839969033375, 1056.63, 0.06478, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1013, 58, 43.835700005293, 17.840191992, 1052.3, 0.02578, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1013, 60, 43.835700005293, 17.840191992, 1052.3, 0.02578, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1014, 58, 43.835650971159, 17.840218981728, 1051.34, 0.00587, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1014, 60, 43.835650971159, 17.840218981728, 1051.34, 0.00587, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1015, 58, 43.835616018623, 17.840176988393, 1050.86, 0.00514, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1015, 60, 43.835616018623, 17.840176988393, 1050.86, 0.00514, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1016, 58, 43.835409991443, 17.840171037242, 1047.01, 0.02291, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1016, 60, 43.835409991443, 17.840171037242, 1047.01, 0.02291, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1017, 58, 43.83510296233, 17.840349990875, 1040.28, 0.03703, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1017, 60, 43.83510296233, 17.840349990875, 1040.28, 0.03703, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1018, 58, 43.834917973727, 17.840439006686, 1035.48, 0.02177, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1018, 60, 43.834917973727, 17.840439006686, 1035.48, 0.02177, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1019, 58, 43.8348319754, 17.840478988364, 1033.55, 0.01009, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1019, 60, 43.8348319754, 17.840478988364, 1033.55, 0.01009, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1020, 58, 43.834512038156, 17.840434983373, 1029.23, 0.03575, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1020, 60, 43.834512038156, 17.840434983373, 1029.23, 0.03575, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1021, 58, 43.834306010976, 17.84048804082, 1022.5, 0.0233, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1021, 60, 43.834306010976, 17.84048804082, 1022.5, 0.0233, -6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1022, 58, 43.834542967379, 17.840737989172, 1017.21, 0.03311, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1022, 60, 43.834542967379, 17.840737989172, 1017.21, 0.03311, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1023, 58, 43.834524024278, 17.840948039666, 1012.89, 0.01698, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1023, 60, 43.834524024278, 17.840948039666, 1012.89, 0.01698, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1024, 58, 43.834248008206, 17.841139985248, 1007.12, 0.03434, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1024, 60, 43.834248008206, 17.841139985248, 1007.12, 0.03434, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1025, 58, 43.834151029587, 17.841234030202, 1003.75, 0.01316, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1025, 60, 43.834151029587, 17.841234030202, 1003.75, 0.01316, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1026, 58, 43.83402002044, 17.841373002157, 999.91, 0.01834, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1026, 60, 43.83402002044, 17.841373002157, 999.91, 0.01834, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1027, 58, 43.833997976035, 17.841393034905, 999.91, 0.00293, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1027, 60, 43.833997976035, 17.841393034905, 999.91, 0.00293, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1028, 58, 43.834009962156, 17.841391023248, 999.91, 0.00134, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1028, 60, 43.834009962156, 17.841391023248, 999.91, 0.00134, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1029, 58, 43.834017002955, 17.84136403352, 999.43, 0.0023, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1029, 60, 43.834017002955, 17.84136403352, 999.43, 0.0023, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1030, 58, 43.833922035992, 17.841576011851, 996.54, 0.02002, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1030, 60, 43.833922035992, 17.841576011851, 996.54, 0.02002, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1031, 58, 43.833811981604, 17.841759994626, 992.7, 0.01917, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1031, 60, 43.833811981604, 17.841759994626, 992.7, 0.01917, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1032, 58, 43.833672003821, 17.842021007091, 987.41, 0.02609, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1032, 60, 43.833672003821, 17.842021007091, 987.41, 0.02609, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1033, 58, 43.833522973582, 17.8422469832, 981.64, 0.02456, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1033, 60, 43.833522973582, 17.8422469832, 981.64, 0.02456, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1034, 58, 43.833434041589, 17.842400958762, 977.32, 0.01582, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1034, 60, 43.833434041589, 17.842400958762, 977.32, 0.01582, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1035, 58, 43.833403028548, 17.842458961532, 975.39, 0.00579, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1035, 60, 43.833403028548, 17.842458961532, 975.39, 0.00579, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1036, 58, 43.833275036886, 17.842553006485, 972.03, 0.01611, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1036, 60, 43.833275036886, 17.842553006485, 972.03, 0.01611, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1037, 58, 43.833060963079, 17.84268502146, 965.78, 0.02605, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1037, 60, 43.833060963079, 17.84268502146, 965.78, 0.02605, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1038, 58, 43.832812020555, 17.842719973996, 960.98, 0.02782, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1038, 60, 43.832812020555, 17.842719973996, 960.98, 0.02782, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1039, 58, 43.832676988095, 17.842826005071, 956.65, 0.01726, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1039, 60, 43.832676988095, 17.842826005071, 956.65, 0.01726, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1040, 58, 43.832598030567, 17.842899011448, 952.8, 0.01055, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1040, 60, 43.832598030567, 17.842899011448, 952.8, 0.01055, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1041, 58, 43.832530975342, 17.842889958993, 950.88, 0.00749, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1041, 60, 43.832530975342, 17.842889958993, 950.88, 0.00749, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1042, 58, 43.83286097087, 17.843024991453, 952.32, 0.03826, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1042, 60, 43.83286097087, 17.843024991453, 952.32, 0.03826, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1043, 58, 43.833061968908, 17.843391029164, 948.48, 0.0369, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1043, 60, 43.833061968908, 17.843391029164, 948.48, 0.0369, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1044, 58, 43.832927020267, 17.844040039927, 943.67, 0.05418, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1044, 60, 43.832927020267, 17.844040039927, 943.67, 0.05418, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1045, 58, 43.832933977246, 17.844430971891, 941.27, 0.03137, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1045, 60, 43.832933977246, 17.844430971891, 941.27, 0.03137, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1046, 58, 43.832947975025, 17.844663988799, 938.86, 0.01876, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1046, 60, 43.832947975025, 17.844663988799, 938.86, 0.01876, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1047, 58, 43.833012012765, 17.845061961561, 934.54, 0.03271, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1047, 60, 43.833012012765, 17.845061961561, 934.54, 0.03271, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1048, 58, 43.833007989451, 17.845380976796, 931.17, 0.02559, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1048, 60, 43.833007989451, 17.845380976796, 931.17, 0.02559, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1049, 58, 43.832798022777, 17.846358977258, 924.45, 0.08185, -6.72);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1049, 60, 43.832798022777, 17.846358977258, 924.45, 0.08185, -6.72);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1050, 58, 43.832644969225, 17.847270006314, 920.12, 0.07503, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1050, 60, 43.832644969225, 17.847270006314, 920.12, 0.07503, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1051, 58, 43.832597024739, 17.847550967708, 918.68, 0.02316, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1051, 60, 43.832597024739, 17.847550967708, 918.68, 0.02316, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1052, 58, 43.832677993923, 17.848068969324, 913.87, 0.04251, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1052, 60, 43.832677993923, 17.848068969324, 913.87, 0.04251, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1053, 58, 43.832464003935, 17.848927024752, 910.03, 0.07282, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1053, 60, 43.832464003935, 17.848927024752, 910.03, 0.07282, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1054, 58, 43.832236016169, 17.849581986666, 905.7, 0.05833, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1054, 60, 43.832236016169, 17.849581986666, 905.7, 0.05833, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1055, 58, 43.832552013919, 17.850213982165, 899.45, 0.06168, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1055, 60, 43.832552013919, 17.850213982165, 899.45, 0.06168, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1056, 58, 43.833085019141, 17.850439958274, 894.64, 0.06198, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1056, 60, 43.833085019141, 17.850439958274, 894.64, 0.06198, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1057, 58, 43.833534959704, 17.850618995726, 890.8, 0.05205, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1057, 60, 43.833534959704, 17.850618995726, 890.8, 0.05205, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1058, 58, 43.833543006331, 17.850737012923, 885.99, 0.00951, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1058, 60, 43.833543006331, 17.850737012923, 885.99, 0.00951, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1059, 58, 43.833001032472, 17.850643973798, 880.22, 0.06073, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1059, 60, 43.833001032472, 17.850643973798, 880.22, 0.06073, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1060, 58, 43.832665001974, 17.850642967969, 876.38, 0.03736, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1060, 60, 43.832665001974, 17.850642967969, 876.38, 0.03736, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1061, 58, 43.831749027595, 17.850400982425, 870.13, 0.10368, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1061, 60, 43.831749027595, 17.850400982425, 870.13, 0.10368, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1062, 58, 43.831690018997, 17.850546995178, 864.84, 0.01342, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1062, 60, 43.831690018997, 17.850546995178, 864.84, 0.01342, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1063, 58, 43.831747015938, 17.850631987676, 864.36, 0.00931, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1063, 60, 43.831747015938, 17.850631987676, 864.36, 0.00931, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1064, 58, 43.832018002868, 17.851011017337, 860.52, 0.04281, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1064, 60, 43.832018002868, 17.851011017337, 860.52, 0.04281, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1065, 58, 43.832278009504, 17.851159041747, 856.67, 0.03125, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1065, 60, 43.832278009504, 17.851159041747, 856.67, 0.03125, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1066, 58, 43.83258998394, 17.851146971807, 852.35, 0.0347, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1066, 60, 43.83258998394, 17.851146971807, 852.35, 0.0347, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1067, 58, 43.833074960858, 17.851274041459, 847.06, 0.05488, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1067, 60, 43.833074960858, 17.851274041459, 847.06, 0.05488, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1068, 58, 43.833519034088, 17.851675031707, 841.29, 0.05893, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1068, 60, 43.833519034088, 17.851675031707, 841.29, 0.05893, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1069, 58, 43.833233965561, 17.851876029745, 839.85, 0.03556, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1069, 60, 43.833233965561, 17.851876029745, 839.85, 0.03556, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1070, 58, 43.832761980593, 17.852362012491, 835.04, 0.06538, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1070, 60, 43.832761980593, 17.852362012491, 835.04, 0.06538, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1071, 58, 43.832617979497, 17.85271698609, 832.16, 0.03267, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1071, 60, 43.832617979497, 17.85271698609, 832.16, 0.03267, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1072, 58, 43.832404995337, 17.853252002969, 827.83, 0.04902, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1072, 60, 43.832404995337, 17.853252002969, 827.83, 0.04902, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1073, 58, 43.832064019516, 17.853583004326, 823.99, 0.04629, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1073, 60, 43.832064019516, 17.853583004326, 823.99, 0.04629, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1074, 58, 43.8316239696, 17.853720970452, 820.14, 0.05017, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1074, 60, 43.8316239696, 17.853720970452, 820.14, 0.05017, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1075, 58, 43.830893989652, 17.854197984561, 812.93, 0.08974, -7.21);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1075, 60, 43.830893989652, 17.854197984561, 812.93, 0.08974, -7.21);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1076, 58, 43.830301975831, 17.854559998959, 805.72, 0.07195, -7.21);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1076, 60, 43.830301975831, 17.854559998959, 805.72, 0.07195, -7.21);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1077, 58, 43.830016991124, 17.855028966442, 799.95, 0.04919, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1077, 60, 43.830016991124, 17.855028966442, 799.95, 0.04919, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1078, 58, 43.829585993662, 17.855413025245, 793.71, 0.05697, -6.24);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1078, 60, 43.829585993662, 17.855413025245, 793.71, 0.05697, -6.24);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1079, 58, 43.828971013427, 17.855759030208, 785.53, 0.0738, -8.18);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1079, 60, 43.828971013427, 17.855759030208, 785.53, 0.0738, -8.18);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1080, 58, 43.828558959067, 17.856333022937, 779.29, 0.06496, -6.24);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1080, 60, 43.828558959067, 17.856333022937, 779.29, 0.06496, -6.24);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1081, 58, 43.828303981572, 17.856935011223, 773.04, 0.056, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1081, 60, 43.828303981572, 17.856935011223, 773.04, 0.056, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1082, 58, 43.828205997124, 17.856987984851, 771.6, 0.01169, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1082, 60, 43.828205997124, 17.856987984851, 771.6, 0.01169, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1083, 58, 43.827669974416, 17.857308005914, 765.35, 0.0649, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1083, 60, 43.827669974416, 17.857308005914, 765.35, 0.0649, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1084, 58, 43.827592022717, 17.857547979802, 763.9, 0.02111, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1084, 60, 43.827592022717, 17.857547979802, 763.9, 0.02111, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1085, 58, 43.827689001337, 17.857840005308, 757.66, 0.02579, -6.24);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1085, 60, 43.827689001337, 17.857840005308, 757.66, 0.02579, -6.24);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1086, 58, 43.827715991065, 17.857904965058, 761.5, 0.00601, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1086, 60, 43.827715991065, 17.857904965058, 761.5, 0.00601, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1087, 58, 43.827745998278, 17.85796799697, 760.06, 0.00606, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1087, 60, 43.827745998278, 17.85796799697, 760.06, 0.00606, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1088, 58, 43.828182024881, 17.858577026054, 760.06, 0.06883, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1088, 60, 43.828182024881, 17.858577026054, 760.06, 0.06883, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1089, 58, 43.828593995422, 17.858968041837, 755.25, 0.05552, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1089, 60, 43.828593995422, 17.858968041837, 755.25, 0.05552, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1090, 58, 43.828676976264, 17.858970975503, 754.29, 0.00923, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1090, 60, 43.828676976264, 17.858970975503, 754.29, 0.00923, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1091, 58, 43.829043013975, 17.858963012695, 750.45, 0.04071, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1091, 60, 43.829043013975, 17.858963012695, 750.45, 0.04071, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1092, 58, 43.829245017841, 17.858951026574, 749, 0.02248, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1092, 60, 43.829245017841, 17.858951026574, 749, 0.02248, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1093, 58, 43.82994197309, 17.858804007992, 742.28, 0.07839, -6.72);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1093, 60, 43.82994197309, 17.858804007992, 742.28, 0.07839, -6.72);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1094, 58, 43.83034799248, 17.85905001685, 738.43, 0.04927, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1094, 60, 43.83034799248, 17.85905001685, 738.43, 0.04927, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1095, 58, 43.830637000501, 17.859187982976, 734.58, 0.03399, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1095, 60, 43.830637000501, 17.859187982976, 734.58, 0.03399, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1096, 58, 43.831259021536, 17.859658040106, 728.34, 0.07878, -6.24);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1096, 60, 43.831259021536, 17.859658040106, 728.34, 0.07878, -6.24);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1097, 58, 43.831420959905, 17.859921986237, 723.53, 0.02779, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1097, 60, 43.831420959905, 17.859921986237, 723.53, 0.02779, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1098, 58, 43.831085013226, 17.859739009291, 718.72, 0.04014, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1098, 60, 43.831085013226, 17.859739009291, 718.72, 0.04014, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1099, 58, 43.830891977996, 17.859629960731, 716.32, 0.02318, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1099, 60, 43.830891977996, 17.859629960731, 716.32, 0.02318, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1100, 58, 43.830577991903, 17.859556032345, 712.47, 0.03541, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1100, 60, 43.830577991903, 17.859556032345, 712.47, 0.03541, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1101, 58, 43.830503979698, 17.85954002291, 711.99, 0.00833, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1101, 60, 43.830503979698, 17.85954002291, 711.99, 0.00833, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1102, 58, 43.830149006099, 17.859648987651, 708.63, 0.04043, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1102, 60, 43.830149006099, 17.859648987651, 708.63, 0.04043, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1103, 58, 43.829688001424, 17.859865995124, 702.86, 0.05414, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1103, 60, 43.829688001424, 17.859865995124, 702.86, 0.05414, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1104, 58, 43.829220961779, 17.860146034509, 694.69, 0.05658, -8.17);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1104, 60, 43.829220961779, 17.860146034509, 694.69, 0.05658, -8.17);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1105, 58, 43.82892399095, 17.860244018957, 690.36, 0.03394, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1105, 60, 43.82892399095, 17.860244018957, 690.36, 0.03394, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1106, 58, 43.828822989017, 17.860289029777, 688.92, 0.0118, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1106, 60, 43.828822989017, 17.860289029777, 688.92, 0.0118, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1107, 58, 43.828418981284, 17.860492961481, 684.12, 0.04781, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1107, 60, 43.828418981284, 17.860492961481, 684.12, 0.04781, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1108, 58, 43.828274980187, 17.86058398895, 682.19, 0.0176, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1108, 60, 43.828274980187, 17.86058398895, 682.19, 0.0176, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1109, 58, 43.828021008521, 17.860425990075, 678.35, 0.03095, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1109, 60, 43.828021008521, 17.860425990075, 678.35, 0.03095, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1110, 58, 43.827894022688, 17.860005972907, 675.46, 0.03653, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1110, 60, 43.827894022688, 17.860005972907, 675.46, 0.03653, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1111, 58, 43.827682966366, 17.859784020111, 672.58, 0.02946, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1111, 60, 43.827682966366, 17.859784020111, 672.58, 0.02946, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1112, 58, 43.82768698968, 17.859806986526, 672.58, 0.0019, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1112, 60, 43.82768698968, 17.859806986526, 672.58, 0.0019, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1113, 58, 43.827813975513, 17.860180987045, 668.25, 0.03316, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1113, 60, 43.827813975513, 17.860180987045, 668.25, 0.03316, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1114, 58, 43.827833002433, 17.860547024757, 663.93, 0.02944, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1114, 60, 43.827833002433, 17.860547024757, 663.93, 0.02944, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1115, 58, 43.827676009387, 17.860199008137, 660.56, 0.03293, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1115, 60, 43.827676009387, 17.860199008137, 660.56, 0.03293, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1116, 58, 43.827639967203, 17.860127007589, 660.56, 0.00703, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1116, 60, 43.827639967203, 17.860127007589, 660.56, 0.00703, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1117, 58, 43.827205030248, 17.859724005684, 655.28, 0.05817, -5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1117, 60, 43.827205030248, 17.859724005684, 655.28, 0.05817, -5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1118, 58, 43.826994979754, 17.859238022938, 649.99, 0.04545, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1118, 60, 43.826994979754, 17.859238022938, 649.99, 0.04545, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1119, 58, 43.82693303749, 17.85907600075, 649.03, 0.01471, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1119, 60, 43.82693303749, 17.85907600075, 649.03, 0.01471, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1120, 58, 43.826818959787, 17.858847007155, 645.66, 0.02232, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1120, 60, 43.826818959787, 17.858847007155, 645.66, 0.02232, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1121, 58, 43.826780989766, 17.858752962202, 645.18, 0.00865, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1121, 60, 43.826780989766, 17.858752962202, 645.18, 0.00865, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1122, 58, 43.826357033104, 17.857611011714, 644.22, 0.10303, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1122, 60, 43.826357033104, 17.857611011714, 644.22, 0.10303, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1123, 58, 43.826382011175, 17.857283027843, 645.18, 0.02646, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1123, 60, 43.826382011175, 17.857283027843, 645.18, 0.02646, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1124, 58, 43.826300958171, 17.856362024322, 642.78, 0.07443, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1124, 60, 43.826300958171, 17.856362024322, 642.78, 0.07443, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1125, 58, 43.8262759801, 17.856308966875, 642.78, 0.00508, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1125, 60, 43.8262759801, 17.856308966875, 642.78, 0.00508, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1126, 58, 43.826007004827, 17.855941001326, 640.38, 0.04202, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1126, 60, 43.826007004827, 17.855941001326, 640.38, 0.04202, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1127, 58, 43.825553040951, 17.855587033555, 637.01, 0.05792, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1127, 60, 43.825553040951, 17.855587033555, 637.01, 0.05792, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1128, 58, 43.82547701709, 17.855544034392, 637.01, 0.00913, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1128, 60, 43.82547701709, 17.855544034392, 637.01, 0.00913, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1129, 58, 43.8253999874, 17.855497011915, 636.53, 0.00936, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1129, 60, 43.8253999874, 17.855497011915, 636.53, 0.00936, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1130, 58, 43.824140019715, 17.85405700095, 631.24, 0.18159, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1130, 60, 43.824140019715, 17.85405700095, 631.24, 0.18159, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1131, 58, 43.823751015589, 17.853808980435, 630.28, 0.04761, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1131, 60, 43.823751015589, 17.853808980435, 630.28, 0.04761, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1132, 58, 43.821866009384, 17.854395965114, 626.92, 0.21483, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1132, 60, 43.821866009384, 17.854395965114, 626.92, 0.21483, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1133, 58, 43.821687977761, 17.854469977319, 625.96, 0.02067, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1133, 60, 43.821687977761, 17.854469977319, 625.96, 0.02067, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1134, 58, 43.821625029668, 17.854483975098, 625.96, 0.00709, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1134, 60, 43.821625029668, 17.854483975098, 625.96, 0.00709, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1135, 58, 43.821131000295, 17.854246012866, 623.55, 0.05816, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1135, 60, 43.821131000295, 17.854246012866, 623.55, 0.05816, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1136, 58, 43.821051958948, 17.85408901982, 623.07, 0.01536, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1136, 60, 43.821051958948, 17.85408901982, 623.07, 0.01536, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1137, 58, 43.820897983387, 17.853763969615, 622.11, 0.0312, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1137, 60, 43.820897983387, 17.853763969615, 622.11, 0.0312, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1138, 58, 43.820552984253, 17.853386029601, 620.67, 0.0489, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1138, 60, 43.820552984253, 17.853386029601, 620.67, 0.0489, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1139, 58, 43.820141013712, 17.853360967711, 619.23, 0.04585, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1139, 60, 43.820141013712, 17.853360967711, 619.23, 0.04585, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1140, 58, 43.819712027907, 17.853544028476, 618.26, 0.04991, -0.97);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1140, 60, 43.819712027907, 17.853544028476, 618.26, 0.04991, -0.97);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1141, 58, 43.819636004046, 17.853552997112, 618.26, 0.00848, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1141, 60, 43.819636004046, 17.853552997112, 618.26, 0.00848, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1142, 58, 43.818936031312, 17.853597002104, 616.34, 0.07791, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1142, 60, 43.818936031312, 17.853597002104, 616.34, 0.07791, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1143, 58, 43.818432027474, 17.853228030726, 613.46, 0.06338, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1143, 60, 43.818432027474, 17.853228030726, 613.46, 0.06338, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1144, 58, 43.818390034139, 17.853139014915, 612.98, 0.00853, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1144, 60, 43.818390034139, 17.853139014915, 612.98, 0.00853, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1145, 58, 43.817790979519, 17.852478018031, 609.13, 0.08514, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1145, 60, 43.817790979519, 17.852478018031, 609.13, 0.08514, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1146, 58, 43.817522004247, 17.852190015838, 606.73, 0.0378, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1146, 60, 43.817522004247, 17.852190015838, 606.73, 0.0378, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1147, 58, 43.817014982924, 17.852023970336, 603.36, 0.05793, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1147, 60, 43.817014982924, 17.852023970336, 603.36, 0.05793, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1148, 58, 43.816267987713, 17.852093959227, 598.56, 0.08325, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1148, 60, 43.816267987713, 17.852093959227, 598.56, 0.08325, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1149, 58, 43.815829027444, 17.851754995063, 595.67, 0.05588, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1149, 60, 43.815829027444, 17.851754995063, 595.67, 0.05588, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1150, 58, 43.815429965034, 17.851484008133, 593.27, 0.04941, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1150, 60, 43.815429965034, 17.851484008133, 593.27, 0.04941, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1151, 58, 43.814927972853, 17.851547962055, 589.91, 0.05605, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1151, 60, 43.814927972853, 17.851547962055, 589.91, 0.05605, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1152, 58, 43.814700990915, 17.85171803087, 587.98, 0.02869, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1152, 60, 43.814700990915, 17.85171803087, 587.98, 0.02869, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1153, 58, 43.814393961802, 17.852007038891, 585.58, 0.04127, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1153, 60, 43.814393961802, 17.852007038891, 585.58, 0.04127, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1154, 58, 43.814308969304, 17.852041991428, 586.06, 0.00986, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1154, 60, 43.814308969304, 17.852041991428, 586.06, 0.00986, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1155, 58, 43.813916025683, 17.851846022531, 583.66, 0.04644, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1155, 60, 43.813916025683, 17.851846022531, 583.66, 0.04644, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1156, 58, 43.813504977152, 17.851508986205, 579.81, 0.05311, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1156, 60, 43.813504977152, 17.851508986205, 579.81, 0.05311, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1157, 58, 43.813159978017, 17.851316034794, 578.85, 0.04137, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1157, 60, 43.813159978017, 17.851316034794, 578.85, 0.04137, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1158, 58, 43.812917992473, 17.851400021464, 577.89, 0.02774, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1158, 60, 43.812917992473, 17.851400021464, 577.89, 0.02774, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1159, 58, 43.812838029116, 17.851449977607, 576.93, 0.00975, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1159, 60, 43.812838029116, 17.851449977607, 576.93, 0.00975, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1160, 58, 43.812753958628, 17.85147998482, 576.93, 0.00965, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1160, 60, 43.812753958628, 17.85147998482, 576.93, 0.00965, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1161, 58, 43.812195975333, 17.851652987301, 572.12, 0.06358, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1161, 60, 43.812195975333, 17.851652987301, 572.12, 0.06358, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1162, 58, 43.812096985057, 17.851696992293, 571.16, 0.01156, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1162, 60, 43.812096985057, 17.851696992293, 571.16, 0.01156, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1163, 58, 43.811803031713, 17.852051965892, 570.2, 0.04336, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1163, 60, 43.811803031713, 17.852051965892, 570.2, 0.04336, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1164, 58, 43.811737988144, 17.852155985311, 569.72, 0.01104, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1164, 60, 43.811737988144, 17.852155985311, 569.72, 0.01104, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1165, 58, 43.811301039532, 17.852731989697, 566.35, 0.06706, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1165, 60, 43.811301039532, 17.852731989697, 566.35, 0.06706, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1166, 58, 43.810840034857, 17.852931981906, 562.99, 0.05371, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1166, 60, 43.810840034857, 17.852931981906, 562.99, 0.05371, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1167, 58, 43.810746995732, 17.852975986898, 562.51, 0.01093, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1167, 60, 43.810746995732, 17.852975986898, 562.51, 0.01093, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1168, 58, 43.810468968004, 17.853073971346, 562.03, 0.0319, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1168, 60, 43.810468968004, 17.853073971346, 562.03, 0.0319, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1169, 58, 43.810204016045, 17.853275975212, 560.11, 0.03363, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1169, 60, 43.810204016045, 17.853275975212, 560.11, 0.03363, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1170, 58, 43.80962700583, 17.853505974635, 556.74, 0.06676, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1170, 60, 43.80962700583, 17.853505974635, 556.74, 0.06676, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1171, 58, 43.808972965926, 17.8531680163, 553.86, 0.07762, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1171, 60, 43.808972965926, 17.8531680163, 553.86, 0.07762, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1172, 58, 43.808353962377, 17.852986967191, 550.49, 0.07035, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1172, 60, 43.808353962377, 17.852986967191, 550.49, 0.07035, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1173, 58, 43.807796984911, 17.8528650105, 547.13, 0.0627, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1173, 60, 43.807796984911, 17.8528650105, 547.13, 0.0627, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1174, 58, 43.807700006291, 17.852836009115, 546.17, 0.01103, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1174, 60, 43.807700006291, 17.852836009115, 546.17, 0.01103, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1175, 58, 43.80724302493, 17.852353965864, 541.36, 0.06386, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1175, 60, 43.80724302493, 17.852353965864, 541.36, 0.06386, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1176, 58, 43.806926021352, 17.851658016443, 539.44, 0.06604, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1176, 60, 43.806926021352, 17.851658016443, 539.44, 0.06604, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1177, 58, 43.806851003319, 17.851585010067, 539.44, 0.01019, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1177, 60, 43.806851003319, 17.851585010067, 539.44, 0.01019, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1178, 58, 43.806091016158, 17.850707005709, 535.59, 0.11003, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1178, 60, 43.806091016158, 17.850707005709, 535.59, 0.11003, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1179, 58, 43.806065032259, 17.850278019905, 534.63, 0.03455, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1179, 60, 43.806065032259, 17.850278019905, 534.63, 0.03455, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1180, 58, 43.805733025074, 17.849499005824, 531.27, 0.0726, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1180, 60, 43.805733025074, 17.849499005824, 531.27, 0.0726, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1181, 58, 43.805453991517, 17.848617983982, 526.94, 0.07721, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1181, 60, 43.805453991517, 17.848617983982, 526.94, 0.07721, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1182, 58, 43.805000027642, 17.84823903814, 523.58, 0.05893, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1182, 60, 43.805000027642, 17.84823903814, 523.58, 0.05893, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1183, 58, 43.804153958336, 17.848195033148, 524.06, 0.09414, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1183, 60, 43.804153958336, 17.848195033148, 524.06, 0.09414, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1184, 58, 43.803891018033, 17.84800099209, 526.46, 0.03313, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1184, 60, 43.803891018033, 17.84800099209, 526.46, 0.03313, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1185, 58, 43.803810970858, 17.847851039842, 527.9, 0.01497, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1185, 60, 43.803810970858, 17.847851039842, 527.9, 0.01497, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1186, 58, 43.803694965318, 17.847519032657, 527.42, 0.0296, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1186, 60, 43.803694965318, 17.847519032657, 527.42, 0.0296, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1187, 58, 43.803639980033, 17.846494009718, 526.94, 0.08249, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1187, 60, 43.803639980033, 17.846494009718, 526.94, 0.08249, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1188, 58, 43.802543962374, 17.845387011766, 524.06, 0.15081, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1188, 60, 43.802543962374, 17.845387011766, 524.06, 0.15081, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1189, 58, 43.802246991545, 17.84479198046, 520.69, 0.05806, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1189, 60, 43.802246991545, 17.84479198046, 520.69, 0.05806, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1190, 58, 43.802126040682, 17.843699986115, 519.25, 0.08866, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1190, 60, 43.802126040682, 17.843699986115, 519.25, 0.08866, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1191, 58, 43.802072983235, 17.842893982306, 521.17, 0.06495, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1191, 60, 43.802072983235, 17.842893982306, 521.17, 0.06495, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1192, 58, 43.802027972415, 17.842772025615, 520.21, 0.01099, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1192, 60, 43.802027972415, 17.842772025615, 520.21, 0.01099, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1193, 58, 43.801898974925, 17.842441024259, 520.21, 0.03019, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1193, 60, 43.801898974925, 17.842441024259, 520.21, 0.03019, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1194, 58, 43.801657995209, 17.84161599353, 518.29, 0.07143, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1194, 60, 43.801657995209, 17.84161599353, 518.29, 0.07143, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1195, 58, 43.801631005481, 17.841526977718, 518.29, 0.00775, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1195, 60, 43.801631005481, 17.841526977718, 518.29, 0.00775, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1196, 58, 43.801461020485, 17.841135039926, 515.88, 0.0367, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1196, 60, 43.801461020485, 17.841135039926, 515.88, 0.0367, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1197, 58, 43.80112297833, 17.839964004233, 513.96, 0.10122, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1197, 60, 43.80112297833, 17.839964004233, 513.96, 0.10122, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1198, 58, 43.801095988601, 17.839864008129, 513.48, 0.00857, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1198, 60, 43.801095988601, 17.839864008129, 513.48, 0.00857, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1199, 58, 43.800983000547, 17.839595032856, 513, 0.02498, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1199, 60, 43.800983000547, 17.839595032856, 513, 0.02498, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1200, 58, 43.800763981417, 17.83894199878, 510.6, 0.05779, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1200, 60, 43.800763981417, 17.83894199878, 510.6, 0.05779, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1201, 58, 43.800729028881, 17.838846025988, 510.6, 0.00863, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1201, 60, 43.800729028881, 17.838846025988, 510.6, 0.00863, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1202, 58, 43.800691980869, 17.838749969378, 510.6, 0.00874, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1202, 60, 43.800691980869, 17.838749969378, 510.6, 0.00874, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1203, 58, 43.800597013906, 17.838566992432, 509.64, 0.01809, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1203, 60, 43.800597013906, 17.838566992432, 509.64, 0.01809, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1204, 58, 43.800559965894, 17.837773980573, 506.75, 0.06378, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1204, 60, 43.800559965894, 17.837773980573, 506.75, 0.06378, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1205, 58, 43.80058796145, 17.837661998346, 506.75, 0.00951, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1205, 60, 43.80058796145, 17.837661998346, 506.75, 0.00951, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1206, 58, 43.800559965894, 17.836958002299, 503.87, 0.05659, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1206, 60, 43.800559965894, 17.836958002299, 503.87, 0.05659, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1207, 58, 43.800355028361, 17.836534967646, 501.46, 0.04089, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1207, 60, 43.800355028361, 17.836534967646, 501.46, 0.04089, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1208, 58, 43.800098961219, 17.83615803346, 499.54, 0.04154, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1208, 60, 43.800098961219, 17.83615803346, 499.54, 0.04154, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1209, 58, 43.800026038662, 17.836073040962, 499.54, 0.0106, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1209, 60, 43.800026038662, 17.836073040962, 499.54, 0.0106, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1210, 58, 43.799767037854, 17.835703985766, 497.14, 0.04131, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1210, 60, 43.799767037854, 17.835703985766, 497.14, 0.04131, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1211, 58, 43.79964097403, 17.835269970819, 496.18, 0.03755, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1211, 60, 43.79964097403, 17.835269970819, 496.18, 0.03755, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1212, 58, 43.799648014829, 17.834457010031, 493.77, 0.06525, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1212, 60, 43.799648014829, 17.834457010031, 493.77, 0.06525, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1213, 58, 43.799509964883, 17.834022995085, 491.85, 0.03807, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1213, 60, 43.799509964883, 17.834022995085, 491.85, 0.03807, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1214, 58, 43.799016019329, 17.833081036806, 488.49, 0.09344, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1214, 60, 43.799016019329, 17.833081036806, 488.49, 0.09344, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1215, 58, 43.798914011568, 17.83269203268, 485.6, 0.03322, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1215, 60, 43.798914011568, 17.83269203268, 485.6, 0.03322, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1216, 58, 43.798892972991, 17.832559011877, 485.12, 0.01093, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1216, 60, 43.798892972991, 17.832559011877, 485.12, 0.01093, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1217, 58, 43.798631038517, 17.831994993612, 481.76, 0.05383, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1217, 60, 43.798631038517, 17.831994993612, 481.76, 0.05383, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1218, 58, 43.798076994717, 17.831313963979, 477.43, 0.08236, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1218, 60, 43.798076994717, 17.831313963979, 477.43, 0.08236, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1219, 58, 43.797701988369, 17.830836027861, 474.07, 0.05666, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1219, 60, 43.797701988369, 17.830836027861, 474.07, 0.05666, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1220, 58, 43.797320025042, 17.830033041537, 470.22, 0.07718, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1220, 60, 43.797320025042, 17.830033041537, 470.22, 0.07718, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1221, 58, 43.797022970393, 17.829506993294, 465.9, 0.05361, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1221, 60, 43.797022970393, 17.829506993294, 465.9, 0.05361, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1222, 58, 43.796474039555, 17.829372966662, 461.57, 0.06198, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1222, 60, 43.796474039555, 17.829372966662, 461.57, 0.06198, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1223, 58, 43.796088974923, 17.829009024426, 457.24, 0.05183, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1223, 60, 43.796088974923, 17.829009024426, 457.24, 0.05183, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1224, 58, 43.795697037131, 17.828615996987, 453.4, 0.0538, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1224, 60, 43.795697037131, 17.828615996987, 453.4, 0.0538, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1225, 58, 43.795279031619, 17.828417010605, 448.59, 0.04915, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1225, 60, 43.795279031619, 17.828417010605, 448.59, 0.04915, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1226, 58, 43.795099994168, 17.828441988677, 447.63, 0.02001, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1226, 60, 43.795099994168, 17.828441988677, 447.63, 0.02001, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1227, 58, 43.795012990013, 17.82844601199, 447.15, 0.00968, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1227, 60, 43.795012990013, 17.82844601199, 447.15, 0.00968, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1228, 58, 43.794458024204, 17.827781997621, 444.75, 0.08154, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1228, 60, 43.794458024204, 17.827781997621, 444.75, 0.08154, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1229, 58, 43.793543977663, 17.827051011845, 442.34, 0.11736, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1229, 60, 43.793543977663, 17.827051011845, 442.34, 0.11736, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1230, 58, 43.79225098528, 17.825842006132, 437.54, 0.17346, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1230, 60, 43.79225098528, 17.825842006132, 437.54, 0.17346, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1231, 58, 43.791546989232, 17.825356023386, 434.65, 0.08746, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1231, 60, 43.791546989232, 17.825356023386, 434.65, 0.08746, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1232, 58, 43.791509019211, 17.825263990089, 434.17, 0.00851, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1232, 60, 43.791509019211, 17.825263990089, 434.17, 0.00851, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1233, 58, 43.791022030637, 17.824713969603, 432.73, 0.06987, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1233, 60, 43.791022030637, 17.824713969603, 432.73, 0.06987, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1234, 58, 43.79068499431, 17.824755962938, 432.73, 0.03763, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1234, 60, 43.79068499431, 17.824755962938, 432.73, 0.03763, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1235, 58, 43.790322979912, 17.824847996235, 432.25, 0.04093, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1235, 60, 43.790322979912, 17.824847996235, 432.25, 0.04093, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1236, 58, 43.789442041889, 17.82462595962, 429.85, 0.09956, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1236, 60, 43.789442041889, 17.82462595962, 429.85, 0.09956, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1237, 58, 43.789052031934, 17.824031012133, 427.44, 0.06451, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1237, 60, 43.789052031934, 17.824031012133, 427.44, 0.06451, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1238, 58, 43.788289027289, 17.823358029127, 424.08, 0.10058, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1238, 60, 43.788289027289, 17.823358029127, 424.08, 0.10058, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1239, 58, 43.787360982969, 17.822784958407, 420.23, 0.11298, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1239, 60, 43.787360982969, 17.822784958407, 420.23, 0.11298, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1240, 58, 43.786618011072, 17.82242897898, 416.87, 0.08742, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1240, 60, 43.786618011072, 17.82242897898, 416.87, 0.08742, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1241, 58, 43.786439979449, 17.822361001745, 415.91, 0.02053, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1241, 60, 43.786439979449, 17.822361001745, 415.91, 0.02053, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1242, 58, 43.785971011966, 17.822211971506, 413.98, 0.0535, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1242, 60, 43.785971011966, 17.822211971506, 413.98, 0.0535, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1243, 58, 43.785647973418, 17.821950959042, 413.02, 0.04158, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1243, 60, 43.785647973418, 17.821950959042, 413.02, 0.04158, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1244, 58, 43.784882035106, 17.821060968563, 411.58, 0.11117, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1244, 60, 43.784882035106, 17.821060968563, 411.58, 0.11117, -1.44);

-- --------------------------------------------------------

--
-- Table structure for table `trail_version_points`
--

CREATE TABLE IF NOT EXISTS `trail_version_points` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_version` int(10) unsigned NOT NULL,
  `name` varchar(50) NOT NULL,
  `desc` varchar(1000) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lon` double DEFAULT NULL,
  `elevation` double DEFAULT NULL,
  `elevgain` double DEFAULT NULL,
  `elevloss` double DEFAULT NULL,
  `nextelevgain` double DEFAULT NULL,
  `nextelevloss` double DEFAULT NULL,
  `odometer` double DEFAULT NULL,
  `nextstepdist` double DEFAULT NULL,
  `symbol` varchar(15) DEFAULT NULL,
  `pictogram` varchar(100) DEFAULT NULL,
  `pictureurl` varchar(500) DEFAULT NULL,
  `time` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`,`id_version`),
  KEY `version_points` (`id_version`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=29 ;

--
-- Dumping data for table `trail_version_points`
--

INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(1, 58, 'Start', 'Start%20vo%C5%BEnje%20je%205km%20glavnom%20cestom%20od%20Buturovi%C4%87%20polja%20prema%20Fojnici.%20Auta%20ostaviti%20na%20vidnom%20mjestu%2C%20pro%C5%A1irenju%20uz%20put%20i%20nastaviti%20biciklima%20glavnom%20cestom%20prema%20Fojnici.', 43.784976331517, 17.821237910539, 414.47, 0, 0, 32.69, -0.49, 0, 1.04, 'START', '45-135', '', '2009-10-10T07:44:25Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(1, 60, 'Start', 'Start%20vo%C5%BEnje%20je%205km%20glavnom%20cestom%20od%20Buturovi%C4%87%20polja%20prema%20Fojnici.%20Auta%20ostaviti%20na%20vidnom%20mjestu%2C%20pro%C5%A1irenju%20uz%20put%20i%20nastaviti%20biciklima%20glavnom%20cestom%20prema%20Fojnici.', 43.784976331517, 17.821237910539, 414.47, 0, 0, 32.69, -0.49, 0, 1.04, 'START', '45-135', '', '2009-10-10T07:44:25Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(1, 61, 'START: M5', 'Iz pravca Lasvanske petlje, skrenuti lijevo na raskrsnici za Vitez.', 44.1506563, 17.8063442, 409.3, 0, 0, 2.2, -9.9, 0, 0.8, 'CROSS', '180-90', '', '');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(1, 62, 'Dreznica', 'Krenuti iz sela Drzenica, preci preko mosta preko Drezanke u pravcu Cabulje.', 43.5268437, 17.7130308, 136.16, 0, 0, 10.58, 0, 0, 0.55, 'CROSS', '90', '', '2009-04-27T22:07:07Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(2, 58, 'GlavniPut1', 'Nastaviti%20putem%20za%20Fojnicu.', 43.793037040159, 17.826413987204, 446.67, 32.69, -0.49, 87.48, -10.09, 1.04, 1.69, 'CROSS', '90-225', '', '2009-10-10T07:49:53Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(2, 60, 'GlavniPut1', 'Nastaviti%20putem%20za%20Fojnicu.', 43.793037040159, 17.826413987204, 446.67, 32.69, -0.49, 87.48, -10.09, 1.04, 1.69, 'CROSS', '90-225', '', '2009-10-10T07:49:53Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(2, 61, 'Raskrsnica Vitez', 'Skrenuti lijevo prema naselju Kruscica. Slijediti pravo glavni put.', 44.1459977, 17.7998978, 401.6, 2.2, -9.9, 104.8, -2.5, 0.8, 4.42, 'CROSS', '180-90', '', '');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(2, 62, 'Sporedni put1', 'Nastaviti pravo uzbrdo glavnim putem narednih 5,3km', 43.523476, 17.716296, 146.74, 10.58, 0, 356.16, -2.88, 0.55, 5.34, 'CROSS', '90-135', '', '2009-04-12T08:42:13Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(3, 58, 'GlavniPut2', 'Odvajanje%20za%20Lipovce%20sa%20desne%20strane.%20Nastaviti%20pravo%20dr%C5%BEe%C4%87i%20se%20puta%20za%20Fojnicu.', 43.801784981042, 17.842014972121, 524.06, 120.17, -10.58, 9.61, -3.37, 2.73, 0.43, 'CROSS', '90-315', '', '2009-10-10T08:01:30Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(3, 60, 'GlavniPut2', 'Odvajanje%20za%20Lipovce%20sa%20desne%20strane.%20Nastaviti%20pravo%20dr%C5%BEe%C4%87i%20se%20puta%20za%20Fojnicu.', 43.801784981042, 17.842014972121, 524.06, 120.17, -10.58, 9.61, -3.37, 2.73, 0.43, 'CROSS', '90-315', '', '2009-10-10T08:01:30Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(3, 61, 'Raskrsnica 2', 'Nastaviti pravo glavnim putem uzbrdo.', 44.1164577, 17.7698387, 503.9, 107, -12.4, 76.4, -36.5, 5.22, 1.43, 'CROSS', '90-0', '', '');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(3, 62, 'Sporedni put2', 'Nastaviti pravo uzbrdo glavnim putem narednih 880m', 43.506813, 17.735554, 500.02, 366.74, -2.88, 2.89, -14.42, 5.89, 0.76, 'CROSS', '90-0', '', '2009-04-12T09:45:15Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(4, 58, 'GlavniPut3', 'Nastaviti%20se%20kretati%20istim%20putem%20pravo%20(desno).', 43.803602010012, 17.846221011132, 530.3, 129.78, -13.95, 40.38, -5.29, 3.16, 1.07, 'CROSS', '45-180', '', '2009-10-10T08:05:14Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(4, 60, 'GlavniPut3', 'Nastaviti%20se%20kretati%20istim%20putem%20pravo%20(desno).', 43.803602010012, 17.846221011132, 530.3, 129.78, -13.95, 40.38, -5.29, 3.16, 1.07, 'CROSS', '45-180', '', '2009-10-10T08:05:14Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(4, 61, 'Potok Kruscica', 'Put uzbrdo vodi uz potok Kruscicu. Nastaviti pravo uzbrdo glavnim putem.', 44.1055145, 17.7628968, 543.8, 183.4, -48.9, 292.4, -23.6, 6.65, 3.81, 'CROSS', '90-0', '', '');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(4, 62, 'Selo', 'Nastaviti pravo uzbrdo glavnim putem narednih 100m.', 43.500347, 17.741113, 488.49, 369.63, -17.3, 10.58, -1.45, 6.65, 0.11, 'CROSS', '90-180', '', '2009-04-12T09:55:06Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(5, 58, 'GlavniPut4', 'Nastaviti%20pravo%20istim%20putem.%20Odvajanje%20lijevo%20je%20za%20selo%20Donji%20%C4%8Ca%C5%BEanj.', 43.810311974958, 17.853172039613, 565.39, 170.16, -19.24, 98.06, -0.96, 4.23, 2.21, 'CROSS', '90-225', '', '2009-10-10T08:13:25Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(5, 60, 'GlavniPut4', 'Nastaviti%20pravo%20istim%20putem.%20Odvajanje%20lijevo%20je%20za%20selo%20Donji%20%C4%8Ca%C5%BEanj.', 43.810311974958, 17.853172039613, 565.39, 170.16, -19.24, 98.06, -0.96, 4.23, 2.21, 'CROSS', '90-225', '', '2009-10-10T08:13:25Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(5, 61, 'Raskrsnica 4', 'Nastaviti pravo uzbrdo glavnim putem.', 44.0756575, 17.7586263, 812.6, 475.8, -72.5, 121.5, -4.4, 10.46, 1.72, 'CROSS', '90-225', '', '');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(5, 62, 'Raskrsnica', 'Nastaviti desno  putem narednih 440m.', 43.499622, 17.741172, 497.62, 380.21, -18.75, 31.73, -4.33, 6.76, 0.6, 'CROSS', '45-135', '', '2009-04-12T09:57:00Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(6, 58, 'Most', 'Most%20preko%20Neretvice.%20Nastaviti%20pravo%20(udesno)%20preko%20mosta%20prema%20Fojnici.', 43.826691806316, 17.858305200934, 662.49, 268.22, -20.2, 76.42, -7.21, 6.44, 2.54, 'CROSS', '45-135', '', '2009-10-10T08:35:15Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(6, 60, 'Most', 'Most%20preko%20Neretvice.%20Nastaviti%20pravo%20(udesno)%20preko%20mosta%20prema%20Fojnici.', 43.826691806316, 17.858305200934, 662.49, 268.22, -20.2, 76.42, -7.21, 6.44, 2.54, 'CROSS', '45-135', '', '2009-10-10T08:35:15Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(6, 61, 'Raskrsnica 5', 'Nastaviti uzbrdo glavnim putem.', 44.0638059, 17.7596028, 929.7, 597.3, -76.9, 792.5, -115.6, 12.18, 9.66, 'CROSS', '90-0', '', '');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(6, 62, 'Sporedni put3', 'Nastaviti pravo uzbrdo glavnim putem narednih 3,9km', 43.496797, 17.737781, 525.02, 411.94, -23.08, 352.32, 0, 7.36, 3.71, 'CROSS', '90-45', '', '2009-04-12T10:01:09Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(7, 58, 'Raskrsnica(Ku%C4%87a%20lijevo)', 'Nastaviti%20pravo%20i%20dr%C5%BEati%20se%20glavnog%20puta.', 43.832269962877, 17.88299895823, 731.7, 344.64, -27.41, 141.31, -26.43, 8.98, 3.07, 'CROSS', '90-0', '', '2009-10-10T09:09:39Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(7, 60, 'Raskrsnica(Ku%C4%87a%20lijevo)', 'Nastaviti%20pravo%20i%20dr%C5%BEati%20se%20glavnog%20puta.', 43.832269962877, 17.88299895823, 731.7, 344.64, -27.41, 141.31, -26.43, 8.98, 3.07, 'CROSS', '90-0', '', '2009-10-10T09:09:39Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(7, 61, 'Prevoj Buskovacke staje', 'Prevoj iznad ski centra Busovacke staje. Nastaviti nizbrdo do ski centra po zelji.', 44.0586293, 17.7977014, 1606.6, 1389.8, -192.5, 0, -85.2, 21.84, 1.27, 'PASS', '90', '', '');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(7, 62, 'Krivi dolac', 'Ranc Krivi dolac. Nastaviti pravo glavnim putem narednih 6,1km.', 43.482725, 17.718619, 877.34, 764.26, -23.08, 117.8, -293.72, 11.07, 6.1, 'CROSS', '90-0', '', '2009-04-12T10:56:56Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(8, 58, 'Raskrsnica(%C5%A0uma)', 'I%C4%87i%20desno%20glavnim%20putem.', 43.85251024738, 17.87396594882, 846.58, 485.95, -53.84, 122.09, 0, 12.05, 1.74, 'CROSS', '0-90', '', '2009-10-10T09:45:55Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(8, 60, 'Raskrsnica(%C5%A0uma)', 'I%C4%87i%20desno%20glavnim%20putem.', 43.85251024738, 17.87396594882, 846.58, 485.95, -53.84, 122.09, 0, 12.05, 1.74, 'CROSS', '0-90', '', '2009-10-10T09:45:55Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(8, 61, 'Busovacke staje', 'Ski centar Busovacke staje. Povratak je moguc nazad u Vitez istim putem, ili nizbrdo do Busovace. Opciono povratak do Busovace preko Pridolaca.', 44.0611705, 17.8039867, 1521.4, 1389.8, -277.7, 0, 0, 23.11, 0, 'CROSS', '270', '', '');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(8, 62, 'Groblje', 'Nastaviti pravo pored groblja prema Gorancima (1,3km).', 43.43623, 17.729922, 701.42, 882.06, -316.8, 0.48, -25.96, 17.17, 1.4, 'CROSS', '90-0-180', '', '2009-04-12T12:15:17Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(9, 58, 'Raskrsnica(Uspon)', 'Zaraslo.%20Skretanje%20desno%20prema%20sjeveru%2C%20dr%C5%BEati%20se%20puta.', 43.860827442259, 17.872519819066, 968.67, 608.04, -53.84, 74.5, 0, 13.79, 1.06, 'CROSS', '0-90', '', '2009-10-10T10:16:43Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(9, 60, 'Raskrsnica(Uspon)', 'Zaraslo.%20Skretanje%20desno%20prema%20sjeveru%2C%20dr%C5%BEati%20se%20puta.', 43.860827442259, 17.872519819066, 968.67, 608.04, -53.84, 74.5, 0, 13.79, 1.06, 'CROSS', '0-90', '', '2009-10-10T10:16:43Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(9, 62, 'za Bogodol', 'Raskrsnica za Bogodol. Nastaviti pravo prema Gorancima.', 43.424842, 17.733462, 675.94, 882.54, -342.76, 45.18, -34.12, 18.57, 3.8, 'CROSS', '90-0-180', '', '2009-04-12T12:19:16Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(10, 58, 'Raskrsnica(%C5%A0umskiPut)', 'Nastaviti%20pravo.', 43.86838003993, 17.874197037891, 1043.17, 682.54, -53.84, 89.4, 0, 14.85, 1.35, 'CROSS', '90-225', '', '2009-10-10T10:27:51Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(10, 60, 'Raskrsnica(%C5%A0umskiPut)', 'Nastaviti%20pravo.', 43.86838003993, 17.874197037891, 1043.17, 682.54, -53.84, 89.4, 0, 14.85, 1.35, 'CROSS', '90-225', '', '2009-10-10T10:27:51Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(10, 62, 'za Planinicu', 'Raskrsnica za Planinicu (lijevo) i Sovice (desno). Nastaviti rpavo cestom prema Mostaru.', 43.393995, 17.753204, 687, 927.72, -376.88, 2.88, -495.56, 22.37, 6.81, 'CROSS', '90-0-180', '', '2009-04-12T12:42:11Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(11, 58, '%C5%A0uma1', 'Pravo%20uzbrdo.', 43.877869024873, 17.866532038897, 1132.57, 771.94, -53.84, 48.07, 0, 16.2, 0.98, 'CROSS', '90-45', '', '2009-10-10T10:42:56Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(11, 60, '%C5%A0uma1', 'Pravo%20uzbrdo.', 43.877869024873, 17.866532038897, 1132.57, 771.94, -53.84, 48.07, 0, 16.2, 0.98, 'CROSS', '90-45', '', '2009-10-10T10:42:56Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(11, 62, 'Okuka', 'Nastaviti lijevo glavnim putem nizbrdo prema Mostaru. Do Starog mosta je 4,5km.', 43.356499, 17.772271, 194.32, 930.6, -872.44, 0, 0, 29.18, 0, 'CROSS', '225-45', '', '2009-04-12T13:01:45Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(12, 58, '%C5%A0uma2', 'I%C4%87i%20%20pravo%20(zapad).', 43.880656007677, 17.855283021927, 1180.64, 820.01, -53.84, 60.07, -4.8, 17.18, 1.17, 'CROSS', '90-270', '', '2009-10-10T11:08:03Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(12, 60, '%C5%A0uma2', 'I%C4%87i%20%20pravo%20(zapad).', 43.880656007677, 17.855283021927, 1180.64, 820.01, -53.84, 60.07, -4.8, 17.18, 1.17, 'CROSS', '90-270', '', '2009-10-10T11:08:03Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(13, 58, '%C5%A0uma3', 'Nastaviti%20pravo%20prema%20zapadu.', 43.877857960761, 17.842617966235, 1235.91, 880.08, -58.64, 96.13, 0, 18.35, 0.55, 'CROSS', '90-270', '', '2009-10-10T11:19:46Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(13, 60, '%C5%A0uma3', 'Nastaviti%20pravo%20prema%20zapadu.', 43.877857960761, 17.842617966235, 1235.91, 880.08, -58.64, 96.13, 0, 18.35, 0.55, 'CROSS', '90-270', '', '2009-10-10T11:19:46Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(14, 58, 'Skretanje', 'I%C4%87i%20desno.', 43.8764730189, 17.837723856792, 1332.04, 976.21, -58.64, 99.03, -3.37, 18.9, 1.01, 'CROSS', '45-135', '', '2009-10-10T11:33:15Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(14, 60, 'Skretanje', 'I%C4%87i%20desno.', 43.8764730189, 17.837723856792, 1332.04, 976.21, -58.64, 99.03, -3.37, 18.9, 1.01, 'CROSS', '45-135', '', '2009-10-10T11:33:15Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(15, 58, 'Raskrsnica%20Neretvica', 'Skrenuti%20lijevo%20na%20jug.%20Put%20desno%20vodi%20do%20izvora%20Neretvice%3A%20nastaviti%20kroz%20%C5%A1umu%2C%20udaljenost%20250%20metara.', 43.88179066591, 17.836176389828, 1427.7, 1075.24, -62.01, 84.59, -21.63, 19.91, 1.82, 'WATER', '180-v0', '', '2009-10-10T11:50:27Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(15, 60, 'Raskrsnica%20Neretvica', 'Skrenuti%20lijevo%20na%20jug.%20Put%20desno%20vodi%20do%20izvora%20Neretvice%3A%20nastaviti%20kroz%20%C5%A1umu%2C%20udaljenost%20250%20metara.', 43.88179066591, 17.836176389828, 1427.7, 1075.24, -62.01, 84.59, -21.63, 19.91, 1.82, 'WATER', '180-v0', '', '2009-10-10T11:50:27Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(16, 58, 'Potok', 'Skrenuti%20desno%20uz%20strmu%20uzbrdicu.', 43.876411411911, 17.828620942309, 1490.66, 1159.83, -83.64, 58.16, 0, 21.73, 0.35, 'CROSS', '0-90-180', '', '2009-10-10T12:01:05Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(16, 60, 'Potok', 'Skrenuti%20desno%20uz%20strmu%20uzbrdicu.', 43.876411411911, 17.828620942309, 1490.66, 1159.83, -83.64, 58.16, 0, 21.73, 0.35, 'CROSS', '0-90-180', '', '2009-10-10T12:01:05Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(17, 58, 'Prekid%20vo%C5%BEnje', 'KRAJ%20PUTA.%20Nastaviti%20planinarskom%20stazom%20kroz%20%C5%A1umu%20prema%20proplanku.', 43.87700099498, 17.826181976125, 1548.82, 1217.99, -83.64, 303.29, -6.72, 22.08, 1.57, 'CROSS', '0-135', '', '2009-10-10T12:08:52Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(17, 60, 'Prekid%20vo%C5%BEnje', 'KRAJ%20PUTA.%20Nastaviti%20planinarskom%20stazom%20kroz%20%C5%A1umu%20prema%20proplanku.', 43.87700099498, 17.826181976125, 1548.82, 1217.99, -83.64, 303.29, -6.72, 22.08, 1.57, 'CROSS', '0-135', '', '2009-10-10T12:08:52Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(18, 58, 'Nastavak%20Vo%C5%BEnje', 'Uklju%C4%8Denje%20na%20put.%20Put%20preko%20livade%20desno%20uzbrdo%20vodi%20ka%20vrhu%20Vitreu%C5%A1e.%20Lijevo%20nizbrdo%20vodi%20do%20malog%20vje%C5%A1ta%C4%8Dkog%20jezera.', 43.88247186318, 17.812426099554, 1845.39, 1521.28, -90.36, 86.04, -8.66, 23.65, 0.95, 'WATER', '0-v180', '', '2009-10-10T12:31:33Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(18, 60, 'Nastavak%20Vo%C5%BEnje', 'Uklju%C4%8Denje%20na%20put.%20Put%20preko%20livade%20desno%20uzbrdo%20vodi%20ka%20vrhu%20Vitreu%C5%A1e.%20Lijevo%20nizbrdo%20vodi%20do%20malog%20vje%C5%A1ta%C4%8Dkog%20jezera.', 43.88247186318, 17.812426099554, 1845.39, 1521.28, -90.36, 86.04, -8.66, 23.65, 0.95, 'WATER', '0-v180', '', '2009-10-10T12:31:33Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(19, 58, 'Vrh%20Vitreu%C5%A1e', 'Vrh%20Vitreu%C5%A1e.', 43.888921318576, 17.813465036452, 1922.77, 1607.32, -99.02, 7.69, -166.78, 24.6, 2.15, 'SUMMIT', '225-270', '', '2010-11-02T21:54:22Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(19, 60, 'Vrh%20Vitreu%C5%A1e', 'Vrh%20Vitreu%C5%A1e.', 43.888921318576, 17.813465036452, 1922.77, 1607.32, -99.02, 7.69, -166.78, 24.6, 2.15, 'SUMMIT', '225-270', '', '2010-11-02T21:54:22Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(20, 58, 'Jezero', 'Jezero.%20Na%20raskrsnici%20skrenuti%20desno%20(SZ).', 43.871700363234, 17.809000918642, 1763.68, 1615.01, -265.8, 5.76, -12.01, 26.75, 0.79, 'WATER', '0-180-v315', '', '2010-11-02T21:54:45Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(20, 60, 'Jezero', 'Jezero.%20Na%20raskrsnici%20skrenuti%20desno%20(SZ).', 43.871700363234, 17.809000918642, 1763.68, 1615.01, -265.8, 5.76, -12.01, 26.75, 0.79, 'WATER', '0-180-v315', '', '2010-11-02T21:54:45Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(21, 58, 'Strug1', 'Dr%C5%BEati%20se%20lijevo%20glavnog%20puta.', 43.874661019072, 17.800249792635, 1757.43, 1620.77, -277.81, 0, -21.63, 27.54, 0.33, 'CROSS', '180-90-315', '', '2015-06-11T21:14:57Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(21, 60, 'Strug1', 'Dr%C5%BEati%20se%20lijevo%20glavnog%20puta.', 43.874661019072, 17.800249792635, 1757.43, 1620.77, -277.81, 0, -21.63, 27.54, 0.33, 'CROSS', '180-90-315', '', '2015-06-11T21:14:57Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(22, 58, 'Strug2', 'Nastaviti%20lijevo%20nizbrdo%20kroz%20put%20u%20%C5%A1umi.', 43.872975418344, 17.799525177106, 1735.8, 1620.77, -299.44, 1.93, -101.43, 27.87, 0.69, 'CROSS', '225-90', '', '2015-06-11T21:15:03Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(22, 60, 'Strug2', 'Nastaviti%20lijevo%20nizbrdo%20kroz%20put%20u%20%C5%A1umi.', 43.872975418344, 17.799525177106, 1735.8, 1620.77, -299.44, 1.93, -101.43, 27.87, 0.69, 'CROSS', '225-90', '', '2015-06-11T21:15:03Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(23, 58, 'Strug3', 'Skrenuti%20lijevo%20%C5%A1umskim%20putem.', 43.866969114169, 17.798974569887, 1636.3, 1622.7, -400.87, 1.44, -184.57, 28.56, 1.61, 'CROSS', '180-90', '', '2015-06-11T21:15:09Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(23, 60, 'Strug3', 'Skrenuti%20lijevo%20%C5%A1umskim%20putem.', 43.866969114169, 17.798974569887, 1636.3, 1622.7, -400.87, 1.44, -184.57, 28.56, 1.61, 'CROSS', '180-90', '', '2015-06-11T21:15:09Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(24, 58, '%C5%A0uma4', 'Dr%C5%BEati%20se%20pravo%20glavnog%20puta.', 43.863250818104, 17.812311518937, 1453.17, 1624.14, -585.44, 51.42, -49.5, 30.17, 1.91, 'CROSS', '90-0', '', '2015-06-11T21:15:23Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(24, 60, '%C5%A0uma4', 'Dr%C5%BEati%20se%20pravo%20glavnog%20puta.', 43.863250818104, 17.812311518937, 1453.17, 1624.14, -585.44, 51.42, -49.5, 30.17, 1.91, 'CROSS', '90-0', '', '2015-06-11T21:15:23Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(25, 58, '%C5%A0uma5', 'Skrenuti%20desno%20nizbrdo.', 43.859538473189, 17.830518772826, 1455.09, 1675.56, -634.94, 5.28, -398.46, 32.08, 3.44, 'CROSS', '45-135', '', '2015-06-11T21:15:41Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(25, 60, '%C5%A0uma5', 'Skrenuti%20desno%20nizbrdo.', 43.859538473189, 17.830518772826, 1455.09, 1675.56, -634.94, 5.28, -398.46, 32.08, 3.44, 'CROSS', '45-135', '', '2015-06-11T21:15:41Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(26, 58, 'Jasenik', 'Skrenuti%20lijevo%20u%20selo%20Jasenik.', 43.834761232138, 17.837096806616, 1061.91, 1680.84, -1033.4, 9.12, -444.11, 35.52, 4.85, 'CROSS', '225-90', '', '2010-11-02T21:55:40Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(26, 60, 'Jasenik', 'Skrenuti%20lijevo%20u%20selo%20Jasenik.', 43.834761232138, 17.837096806616, 1061.91, 1680.84, -1033.4, 9.12, -444.11, 35.52, 4.85, 'CROSS', '225-90', '', '2010-11-02T21:55:40Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(27, 58, 'GlavniPut5', 'Nastaviti%20pravo%20istim%20putem.%20Lijevo%20je%20uspon%20prema%20selu%20Bare.', 43.822069019079, 17.854292029515, 626.92, 1689.96, -1477.51, 4.8, -103.82, 40.37, 2.38, 'CROSS', '90-225', '', '2009-10-10T08:28:13Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(27, 60, 'GlavniPut5', 'Nastaviti%20pravo%20istim%20putem.%20Lijevo%20je%20uspon%20prema%20selu%20Bare.', 43.822069019079, 17.854292029515, 626.92, 1689.96, -1477.51, 4.8, -103.82, 40.37, 2.38, 'CROSS', '90-225', '', '2009-10-10T08:28:13Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(28, 58, 'Voda', 'Izvor%20vode%20u%20blizini.%20Dr%C5%BEati%20se%20istog%20puta.%20Odvajanje%20desno%20vodi%20do%20sela%20D%C5%BEani%C4%87i.', 43.803793033585, 17.847888004035, 527.9, 1694.76, -1581.33, 0, 0, 42.75, 0, 'WATER', '135-v0-45', '', '2009-10-10T08:06:40Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(28, 60, 'Voda', 'Izvor%20vode%20u%20blizini.%20Dr%C5%BEati%20se%20istog%20puta.%20Odvajanje%20desno%20vodi%20do%20sela%20D%C5%BEani%C4%87i.', 43.803793033585, 17.847888004035, 527.9, 1694.76, -1581.33, 0, 0, 42.75, 0, 'WATER', '135-v0-45', '', '2009-10-10T08:06:40Z');

-- --------------------------------------------------------

--
-- Structure for view `active_path`
--
DROP TABLE IF EXISTS `active_path`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `active_path` AS select `t`.`id` AS `trail_id`,`pa`.`id` AS `point_id`,`pa`.`lon` AS `lon`,`pa`.`lat` AS `lat`,`pa`.`elevation` AS `elevation`,`pa`.`prev_dist` AS `prev_dist`,`pa`.`prev_elev` AS `prev_elev` from ((`trails` `t` join `trail_versions` `v`) join `trail_version_path` `pa`) where ((`v`.`id_trail` = `t`.`id`) and (`v`.`active` = 1) and (`pa`.`id_version` = `v`.`id`)) order by `pa`.`id`;

-- --------------------------------------------------------

--
-- Structure for view `active_trails`
--
DROP TABLE IF EXISTS `active_trails`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `active_trails` AS select `t`.`id` AS `trail_id`,`t`.`name` AS `trail_name`,`t`.`slug` AS `trail_slug`,`t`.`desc` AS `trail_desc`,`ty`.`name` AS `type_name`,`ty`.`desc` AS `type_desc`,`v`.`distance` AS `distance`,`v`.`elev_min` AS `elev_min`,`v`.`elev_max` AS `elev_max`,`v`.`elev_gain` AS `elev_gain`,`v`.`elev_loss` AS `elev_loss`,`v`.`surface` AS `surface`,`v`.`review_landscape` AS `review_landscape`,`v`.`review_fun` AS `review_fun`,`v`.`required_fitness` AS `required_fitness`,`v`.`required_technique` AS `required_technique`,`v`.`lat_center` AS `lat_center`,`v`.`lon_center` AS `lon_center`,`v`.`bounds` AS `bounds` from ((`trails` `t` join `trail_versions` `v`) join `repo_types` `ty`) where ((`v`.`id_trail` = `t`.`id`) and (`v`.`active` = 1) and (`ty`.`id` = `v`.`trail_type`));

-- --------------------------------------------------------

--
-- Structure for view `active_waypoints`
--
DROP TABLE IF EXISTS `active_waypoints`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `active_waypoints` AS select `t`.`id` AS `trail_id`,`p`.`id` AS `point_id`,`p`.`name` AS `point_name`,`p`.`desc` AS `point_desc`,`p`.`lon` AS `lon`,`p`.`lat` AS `lat`,`p`.`elevation` AS `elevation`,`p`.`elevgain` AS `elevgain`,`p`.`elevloss` AS `elevloss`,`p`.`nextelevgain` AS `nextelevgain`,`p`.`nextelevloss` AS `nextelevloss`,`p`.`odometer` AS `odometer`,`p`.`nextstepdist` AS `nextstepdist`,`p`.`symbol` AS `symbol`,`p`.`pictogram` AS `pictogram`,`p`.`pictureurl` AS `pictureurl`,`p`.`time` AS `time` from ((`trails` `t` join `trail_versions` `v`) join `trail_version_points` `p`) where ((`v`.`id_trail` = `t`.`id`) and (`v`.`active` = 1) and (`p`.`id_version` = `v`.`id`)) order by `p`.`id`;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `repo_regions`
--
ALTER TABLE `repo_regions`
  ADD CONSTRAINT `child_parent` FOREIGN KEY (`id_parent`) REFERENCES `repo_regions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `trail_regions`
--
ALTER TABLE `trail_regions`
  ADD CONSTRAINT `regions_fk` FOREIGN KEY (`id_mnt`) REFERENCES `repo_regions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `trails_fk` FOREIGN KEY (`id_trail`) REFERENCES `trails` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `trail_versions`
--
ALTER TABLE `trail_versions`
  ADD CONSTRAINT `trail_fk` FOREIGN KEY (`id_trail`) REFERENCES `trails` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `trail_version_path`
--
ALTER TABLE `trail_version_path`
  ADD CONSTRAINT `path_version_fk` FOREIGN KEY (`id_version`) REFERENCES `trail_versions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `trail_version_points`
--
ALTER TABLE `trail_version_points`
  ADD CONSTRAINT `points_version_fk` FOREIGN KEY (`id_version`) REFERENCES `trail_versions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
