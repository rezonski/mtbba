-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 18, 2016 at 01:51 PM
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

DELIMITER $$
--
-- Procedures
--
DROP PROCEDURE IF EXISTS `calc_bounds`$$
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
    
    SELECT max(p.lon) into maxLon from active_path as p where p.trail_id = p_trail_id; -- 44.154744325206
	SELECT min(p.lon) into minLon from active_path as p where p.trail_id = p_trail_id; -- 44.113507037982
	SELECT max(p.lat) into maxLat from active_path as p where p.trail_id = p_trail_id; -- 18.242386970669
	SELECT min(p.lat) into minLat from active_path as p where p.trail_id = p_trail_id; -- 18.199037024751
    SELECT max(p.elevation) into elevMax from active_path as p where p.trail_id = p_trail_id; -- 18.242386970669
	SELECT min(p.elevation) into elevMin from active_path as p where p.trail_id = p_trail_id; -- 18.199037024751

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

DROP PROCEDURE IF EXISTS `logevent`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `logevent`(IN `puser` TEXT, IN `ptext` TEXT, IN `perror` TEXT)
    NO SQL
BEGIN
	INSERT INTO `eventlog` (`date`, `time`, `user`, `text`, `error`)
    VALUES(CURDATE(), NOW(), puser, ptext, perror);
END$$

--
-- Functions
--
DROP FUNCTION IF EXISTS `slug`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `slug`(`pname` TEXT) RETURNS text CHARSET utf8
    NO SQL
RETURN LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(TRIM(LOWER(pname)), 'ć', 'c'), 'č', 'c'), 'đ', 'dj'), 'ž', 'z'), 'š', 's'), ':', ''), ')', ''), '(', ''), ',', ''), '\\', ''), '\/', ''), '\"', ''), '?', ''), '\'', ''), '&', ''), '!', ''), '.', ''), ' ', '-'), '--', '-'), '--', '-'))$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `active_path`
--
DROP VIEW IF EXISTS `active_path`;
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
DROP VIEW IF EXISTS `active_trails`;
CREATE TABLE IF NOT EXISTS `active_trails` (
`trail_id` int(10) unsigned
,`mnt_id` int(10) unsigned
,`mnt_name` varchar(50)
,`mnt_slug` varchar(500)
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
DROP VIEW IF EXISTS `active_waypoints`;
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
,`symbol` varchar(5)
,`pictogram` varchar(100)
,`pictureurl` varchar(500)
,`time` varchar(500)
);
-- --------------------------------------------------------

--
-- Table structure for table `eventlog`
--

DROP TABLE IF EXISTS `eventlog`;
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

--
-- Dumping data for table `eventlog`
--

INSERT INTO `eventlog` (`id`, `date`, `time`, `user`, `text`, `error`) VALUES(1, '2016-05-18', '12:24:59', 'sdfasdf', 'asdfasdf', 'asdfasdf');
INSERT INTO `eventlog` (`id`, `date`, `time`, `user`, `text`, `error`) VALUES(2, '2016-05-18', '12:25:36', 'asdfasdf', 'asdf', 'asdaswrwer32345');

-- --------------------------------------------------------

--
-- Table structure for table `hist_trail_version_path`
--

DROP TABLE IF EXISTS `hist_trail_version_path`;
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

--
-- Dumping data for table `hist_trail_version_path`
--

INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1, 33, 18.20129997097, 44.120494024828, 484.64, 0, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1, 34, 18.20129997097, 44.120494024828, 484.64, 0, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1, 35, 18.20129997097, 44.120494024828, 484.64, 0, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1, 36, 18.20129997097, 44.120494024828, 484.64, 0, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1, 37, 18.20129997097, 44.120494024828, 484.64, 0, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(2, 33, 18.201519995928, 44.120507016778, 483.68, 0.01762, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(2, 34, 18.201519995928, 44.120507016778, 483.68, 0.01762, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(2, 35, 18.201519995928, 44.120507016778, 483.68, 0.01762, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(2, 36, 18.201519995928, 44.120507016778, 483.68, 0.01762, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(2, 37, 18.201519995928, 44.120507016778, 483.68, 0.01762, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(3, 33, 18.201568024233, 44.121152004227, 485.12, 0.07182, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(3, 34, 18.201568024233, 44.121152004227, 485.12, 0.07182, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(3, 35, 18.201568024233, 44.121152004227, 485.12, 0.07182, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(3, 36, 18.201568024233, 44.121152004227, 485.12, 0.07182, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(3, 37, 18.201568024233, 44.121152004227, 485.12, 0.07182, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(4, 33, 18.202779963613, 44.121700013056, 488.97, 0.11433, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(4, 34, 18.202779963613, 44.121700013056, 488.97, 0.11433, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(4, 35, 18.202779963613, 44.121700013056, 488.97, 0.11433, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(4, 36, 18.202779963613, 44.121700013056, 488.97, 0.11433, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(4, 37, 18.202779963613, 44.121700013056, 488.97, 0.11433, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(5, 33, 18.203856032342, 44.122527977452, 492.81, 0.12591, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(5, 34, 18.203856032342, 44.122527977452, 492.81, 0.12591, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(5, 35, 18.203856032342, 44.122527977452, 492.81, 0.12591, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(5, 36, 18.203856032342, 44.122527977452, 492.81, 0.12591, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(5, 37, 18.203856032342, 44.122527977452, 492.81, 0.12591, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(6, 33, 18.20453396067, 44.12272897549, 497.14, 0.05855, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(6, 34, 18.20453396067, 44.12272897549, 497.14, 0.05855, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(6, 35, 18.20453396067, 44.12272897549, 497.14, 0.05855, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(6, 36, 18.20453396067, 44.12272897549, 497.14, 0.05855, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(6, 37, 18.20453396067, 44.12272897549, 497.14, 0.05855, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(7, 33, 18.205986963585, 44.122720006853, 501.95, 0.11598, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(7, 34, 18.205986963585, 44.122720006853, 501.95, 0.11598, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(7, 35, 18.205986963585, 44.122720006853, 501.95, 0.11598, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(7, 36, 18.205986963585, 44.122720006853, 501.95, 0.11598, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(7, 37, 18.205986963585, 44.122720006853, 501.95, 0.11598, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(8, 33, 18.207391016185, 44.122724030167, 506.27, 0.11207, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(8, 34, 18.207391016185, 44.122724030167, 506.27, 0.11207, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(8, 35, 18.207391016185, 44.122724030167, 506.27, 0.11207, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(8, 36, 18.207391016185, 44.122724030167, 506.27, 0.11207, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(8, 37, 18.207391016185, 44.122724030167, 506.27, 0.11207, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(9, 33, 18.208557022735, 44.122727969661, 511.08, 0.09307, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(9, 34, 18.208557022735, 44.122727969661, 511.08, 0.09307, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(9, 35, 18.208557022735, 44.122727969661, 511.08, 0.09307, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(9, 36, 18.208557022735, 44.122727969661, 511.08, 0.09307, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(9, 37, 18.208557022735, 44.122727969661, 511.08, 0.09307, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(10, 33, 18.209449024871, 44.122751019895, 515.88, 0.07125, 4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(10, 34, 18.209449024871, 44.122751019895, 515.88, 0.07125, 4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(10, 35, 18.209449024871, 44.122751019895, 515.88, 0.07125, 4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(10, 36, 18.209449024871, 44.122751019895, 515.88, 0.07125, 4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(10, 37, 18.209449024871, 44.122751019895, 515.88, 0.07125, 4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(11, 33, 18.210054030642, 44.122958974913, 520.69, 0.05354, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(11, 34, 18.210054030642, 44.122958974913, 520.69, 0.05354, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(11, 35, 18.210054030642, 44.122958974913, 520.69, 0.05354, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(11, 36, 18.210054030642, 44.122958974913, 520.69, 0.05354, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(11, 37, 18.210054030642, 44.122958974913, 520.69, 0.05354, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(12, 33, 18.210314959288, 44.123089984059, 522.13, 0.02542, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(12, 34, 18.210314959288, 44.123089984059, 522.13, 0.02542, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(12, 35, 18.210314959288, 44.123089984059, 522.13, 0.02542, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(12, 36, 18.210314959288, 44.123089984059, 522.13, 0.02542, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(12, 37, 18.210314959288, 44.123089984059, 522.13, 0.02542, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(13, 33, 18.210761966184, 44.123392989859, 525.98, 0.04907, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(13, 34, 18.210761966184, 44.123392989859, 525.98, 0.04907, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(13, 35, 18.210761966184, 44.123392989859, 525.98, 0.04907, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(13, 36, 18.210761966184, 44.123392989859, 525.98, 0.04907, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(13, 37, 18.210761966184, 44.123392989859, 525.98, 0.04907, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(14, 33, 18.211574004963, 44.123558029532, 531.27, 0.06737, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(14, 34, 18.211574004963, 44.123558029532, 531.27, 0.06737, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(14, 35, 18.211574004963, 44.123558029532, 531.27, 0.06737, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(14, 36, 18.211574004963, 44.123558029532, 531.27, 0.06737, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(14, 37, 18.211574004963, 44.123558029532, 531.27, 0.06737, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(15, 33, 18.212541025132, 44.123966982588, 537.03, 0.08959, 5.76);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(15, 34, 18.212541025132, 44.123966982588, 537.03, 0.08959, 5.76);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(15, 35, 18.212541025132, 44.123966982588, 537.03, 0.08959, 5.76);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(15, 36, 18.212541025132, 44.123966982588, 537.03, 0.08959, 5.76);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(15, 37, 18.212541025132, 44.123966982588, 537.03, 0.08959, 5.76);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(16, 33, 18.213063972071, 44.124464029446, 542.8, 0.06926, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(16, 34, 18.213063972071, 44.124464029446, 542.8, 0.06926, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(16, 35, 18.213063972071, 44.124464029446, 542.8, 0.06926, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(16, 36, 18.213063972071, 44.124464029446, 542.8, 0.06926, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(16, 37, 18.213063972071, 44.124464029446, 542.8, 0.06926, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(17, 33, 18.213552972302, 44.124992005527, 548.57, 0.0705, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(17, 34, 18.213552972302, 44.124992005527, 548.57, 0.0705, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(17, 35, 18.213552972302, 44.124992005527, 548.57, 0.0705, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(17, 36, 18.213552972302, 44.124992005527, 548.57, 0.0705, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(17, 37, 18.213552972302, 44.124992005527, 548.57, 0.0705, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(18, 33, 18.214229978621, 44.125636992976, 554.82, 0.0898, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(18, 34, 18.214229978621, 44.125636992976, 554.82, 0.0898, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(18, 35, 18.214229978621, 44.125636992976, 554.82, 0.0898, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(18, 36, 18.214229978621, 44.125636992976, 554.82, 0.0898, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(18, 37, 18.214229978621, 44.125636992976, 554.82, 0.0898, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(19, 33, 18.214663993567, 44.125848971307, 558.18, 0.0419, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(19, 34, 18.214663993567, 44.125848971307, 558.18, 0.0419, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(19, 35, 18.214663993567, 44.125848971307, 558.18, 0.0419, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(19, 36, 18.214663993567, 44.125848971307, 558.18, 0.0419, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(19, 37, 18.214663993567, 44.125848971307, 558.18, 0.0419, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(20, 33, 18.214986026287, 44.126166980714, 561.55, 0.04372, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(20, 34, 18.214986026287, 44.126166980714, 561.55, 0.04372, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(20, 35, 18.214986026287, 44.126166980714, 561.55, 0.04372, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(20, 36, 18.214986026287, 44.126166980714, 561.55, 0.04372, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(20, 37, 18.214986026287, 44.126166980714, 561.55, 0.04372, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(21, 33, 18.21503598243, 44.126218026504, 561.55, 0.00694, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(21, 34, 18.21503598243, 44.126218026504, 561.55, 0.00694, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(21, 35, 18.21503598243, 44.126218026504, 561.55, 0.00694, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(21, 36, 18.21503598243, 44.126218026504, 561.55, 0.00694, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(21, 37, 18.21503598243, 44.126218026504, 561.55, 0.00694, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(22, 33, 18.21528702043, 44.126532012597, 565.39, 0.04025, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(22, 34, 18.21528702043, 44.126532012597, 565.39, 0.04025, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(22, 35, 18.21528702043, 44.126532012597, 565.39, 0.04025, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(22, 36, 18.21528702043, 44.126532012597, 565.39, 0.04025, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(22, 37, 18.21528702043, 44.126532012597, 565.39, 0.04025, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(23, 33, 18.215508973226, 44.126819008961, 568.76, 0.0365, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(23, 34, 18.215508973226, 44.126819008961, 568.76, 0.0365, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(23, 35, 18.215508973226, 44.126819008961, 568.76, 0.0365, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(23, 36, 18.215508973226, 44.126819008961, 568.76, 0.0365, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(23, 37, 18.215508973226, 44.126819008961, 568.76, 0.0365, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(24, 33, 18.215879034251, 44.127315972, 573.08, 0.06266, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(24, 34, 18.215879034251, 44.127315972, 573.08, 0.06266, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(24, 35, 18.215879034251, 44.127315972, 573.08, 0.06266, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(24, 36, 18.215879034251, 44.127315972, 573.08, 0.06266, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(24, 37, 18.215879034251, 44.127315972, 573.08, 0.06266, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(25, 33, 18.216109033674, 44.127923995256, 579.81, 0.07006, 6.73);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(25, 34, 18.216109033674, 44.127923995256, 579.81, 0.07006, 6.73);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(25, 35, 18.216109033674, 44.127923995256, 579.81, 0.07006, 6.73);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(25, 36, 18.216109033674, 44.127923995256, 579.81, 0.07006, 6.73);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(25, 37, 18.216109033674, 44.127923995256, 579.81, 0.07006, 6.73);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(26, 33, 18.216184973717, 44.128139996901, 581.73, 0.02477, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(26, 34, 18.216184973717, 44.128139996901, 581.73, 0.02477, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(26, 35, 18.216184973717, 44.128139996901, 581.73, 0.02477, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(26, 36, 18.216184973717, 44.128139996901, 581.73, 0.02477, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(26, 37, 18.216184973717, 44.128139996901, 581.73, 0.02477, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(27, 33, 18.216155972332, 44.128234963864, 581.73, 0.01081, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(27, 34, 18.216155972332, 44.128234963864, 581.73, 0.01081, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(27, 35, 18.216155972332, 44.128234963864, 581.73, 0.01081, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(27, 36, 18.216155972332, 44.128234963864, 581.73, 0.01081, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(27, 37, 18.216155972332, 44.128234963864, 581.73, 0.01081, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(28, 33, 18.216391000897, 44.128716001287, 586.54, 0.05668, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(28, 34, 18.216391000897, 44.128716001287, 586.54, 0.05668, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(28, 35, 18.216391000897, 44.128716001287, 586.54, 0.05668, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(28, 36, 18.216391000897, 44.128716001287, 586.54, 0.05668, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(28, 37, 18.216391000897, 44.128716001287, 586.54, 0.05668, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(29, 33, 18.216682020575, 44.129096958786, 589.91, 0.04831, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(29, 34, 18.216682020575, 44.129096958786, 589.91, 0.04831, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(29, 35, 18.216682020575, 44.129096958786, 589.91, 0.04831, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(29, 36, 18.216682020575, 44.129096958786, 589.91, 0.04831, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(29, 37, 18.216682020575, 44.129096958786, 589.91, 0.04831, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(30, 33, 18.216675985605, 44.129476994276, 593.27, 0.04226, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(30, 34, 18.216675985605, 44.129476994276, 593.27, 0.04226, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(30, 35, 18.216675985605, 44.129476994276, 593.27, 0.04226, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(30, 36, 18.216675985605, 44.129476994276, 593.27, 0.04226, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(30, 37, 18.216675985605, 44.129476994276, 593.27, 0.04226, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(31, 33, 18.216944960877, 44.129941016436, 598.08, 0.05588, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(31, 34, 18.216944960877, 44.129941016436, 598.08, 0.05588, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(31, 35, 18.216944960877, 44.129941016436, 598.08, 0.05588, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(31, 36, 18.216944960877, 44.129941016436, 598.08, 0.05588, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(31, 37, 18.216944960877, 44.129941016436, 598.08, 0.05588, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(32, 33, 18.217160962522, 44.13035097532, 604.33, 0.04874, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(32, 34, 18.217160962522, 44.13035097532, 604.33, 0.04874, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(32, 35, 18.217160962522, 44.13035097532, 604.33, 0.04874, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(32, 36, 18.217160962522, 44.13035097532, 604.33, 0.04874, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(32, 37, 18.217160962522, 44.13035097532, 604.33, 0.04874, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(33, 33, 18.217150988057, 44.130775015801, 607.21, 0.04716, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(33, 34, 18.217150988057, 44.130775015801, 607.21, 0.04716, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(33, 35, 18.217150988057, 44.130775015801, 607.21, 0.04716, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(33, 36, 18.217150988057, 44.130775015801, 607.21, 0.04716, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(33, 37, 18.217150988057, 44.130775015801, 607.21, 0.04716, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(34, 33, 18.217274034396, 44.131487980485, 612.98, 0.07988, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(34, 34, 18.217274034396, 44.131487980485, 612.98, 0.07988, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(34, 35, 18.217274034396, 44.131487980485, 612.98, 0.07988, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(34, 36, 18.217274034396, 44.131487980485, 612.98, 0.07988, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(34, 37, 18.217274034396, 44.131487980485, 612.98, 0.07988, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(35, 33, 18.217443013564, 44.131791992113, 616.34, 0.0364, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(35, 34, 18.217443013564, 44.131791992113, 616.34, 0.0364, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(35, 35, 18.217443013564, 44.131791992113, 616.34, 0.0364, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(35, 36, 18.217443013564, 44.131791992113, 616.34, 0.0364, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(35, 37, 18.217443013564, 44.131791992113, 616.34, 0.0364, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(36, 33, 18.217394985259, 44.132192982361, 619.23, 0.04475, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(36, 34, 18.217394985259, 44.132192982361, 619.23, 0.04475, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(36, 35, 18.217394985259, 44.132192982361, 619.23, 0.04475, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(36, 36, 18.217394985259, 44.132192982361, 619.23, 0.04475, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(36, 37, 18.217394985259, 44.132192982361, 619.23, 0.04475, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(37, 33, 18.217242015526, 44.132842998952, 624.51, 0.0733, 5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(37, 34, 18.217242015526, 44.132842998952, 624.51, 0.0733, 5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(37, 35, 18.217242015526, 44.132842998952, 624.51, 0.0733, 5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(37, 36, 18.217242015526, 44.132842998952, 624.51, 0.0733, 5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(37, 37, 18.217242015526, 44.132842998952, 624.51, 0.0733, 5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(38, 33, 18.216936998069, 44.133479017764, 629.32, 0.07479, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(38, 34, 18.216936998069, 44.133479017764, 629.32, 0.07479, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(38, 35, 18.216936998069, 44.133479017764, 629.32, 0.07479, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(38, 36, 18.216936998069, 44.133479017764, 629.32, 0.07479, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(38, 37, 18.216936998069, 44.133479017764, 629.32, 0.07479, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(39, 33, 18.216899028048, 44.133784035221, 632.68, 0.03405, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(39, 34, 18.216899028048, 44.133784035221, 632.68, 0.03405, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(39, 35, 18.216899028048, 44.133784035221, 632.68, 0.03405, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(39, 36, 18.216899028048, 44.133784035221, 632.68, 0.03405, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(39, 37, 18.216899028048, 44.133784035221, 632.68, 0.03405, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(40, 33, 18.216732982546, 44.134438997135, 637.97, 0.07402, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(40, 34, 18.216732982546, 44.134438997135, 637.97, 0.07402, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(40, 35, 18.216732982546, 44.134438997135, 637.97, 0.07402, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(40, 36, 18.216732982546, 44.134438997135, 637.97, 0.07402, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(40, 37, 18.216732982546, 44.134438997135, 637.97, 0.07402, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(41, 33, 18.216760978103, 44.134916011244, 641.82, 0.05309, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(41, 34, 18.216760978103, 44.134916011244, 641.82, 0.05309, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(41, 35, 18.216760978103, 44.134916011244, 641.82, 0.05309, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(41, 36, 18.216760978103, 44.134916011244, 641.82, 0.05309, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(41, 37, 18.216760978103, 44.134916011244, 641.82, 0.05309, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(42, 33, 18.216918976977, 44.135334016755, 646.62, 0.04816, 4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(42, 34, 18.216918976977, 44.135334016755, 646.62, 0.04816, 4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(42, 35, 18.216918976977, 44.135334016755, 646.62, 0.04816, 4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(42, 36, 18.216918976977, 44.135334016755, 646.62, 0.04816, 4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(42, 37, 18.216918976977, 44.135334016755, 646.62, 0.04816, 4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(43, 33, 18.21645998396, 44.135957965627, 652.39, 0.07846, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(43, 34, 18.21645998396, 44.135957965627, 652.39, 0.07846, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(43, 35, 18.21645998396, 44.135957965627, 652.39, 0.07846, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(43, 36, 18.21645998396, 44.135957965627, 652.39, 0.07846, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(43, 37, 18.21645998396, 44.135957965627, 652.39, 0.07846, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(44, 33, 18.216857034713, 44.136571018025, 658.16, 0.07517, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(44, 34, 18.216857034713, 44.136571018025, 658.16, 0.07517, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(44, 35, 18.216857034713, 44.136571018025, 658.16, 0.07517, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(44, 36, 18.216857034713, 44.136571018025, 658.16, 0.07517, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(44, 37, 18.216857034713, 44.136571018025, 658.16, 0.07517, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(45, 33, 18.217379981652, 44.136976031587, 662.49, 0.0614, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(45, 34, 18.217379981652, 44.136976031587, 662.49, 0.0614, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(45, 35, 18.217379981652, 44.136976031587, 662.49, 0.0614, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(45, 36, 18.217379981652, 44.136976031587, 662.49, 0.0614, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(45, 37, 18.217379981652, 44.136976031587, 662.49, 0.0614, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(46, 33, 18.217303035781, 44.137505013496, 665.37, 0.05914, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(46, 34, 18.217303035781, 44.137505013496, 665.37, 0.05914, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(46, 35, 18.217303035781, 44.137505013496, 665.37, 0.05914, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(46, 36, 18.217303035781, 44.137505013496, 665.37, 0.05914, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(46, 37, 18.217303035781, 44.137505013496, 665.37, 0.05914, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(47, 33, 18.217404959723, 44.13834001869, 670.66, 0.0932, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(47, 34, 18.217404959723, 44.13834001869, 670.66, 0.0932, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(47, 35, 18.217404959723, 44.13834001869, 670.66, 0.0932, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(47, 36, 18.217404959723, 44.13834001869, 670.66, 0.0932, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(47, 37, 18.217404959723, 44.13834001869, 670.66, 0.0932, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(48, 33, 18.21786403656, 44.138945024461, 674.98, 0.0766, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(48, 34, 18.21786403656, 44.138945024461, 674.98, 0.0766, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(48, 35, 18.21786403656, 44.138945024461, 674.98, 0.0766, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(48, 36, 18.21786403656, 44.138945024461, 674.98, 0.0766, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(48, 37, 18.21786403656, 44.138945024461, 674.98, 0.0766, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(49, 33, 18.217822965235, 44.139191033319, 675.94, 0.02755, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(49, 34, 18.217822965235, 44.139191033319, 675.94, 0.02755, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(49, 35, 18.217822965235, 44.139191033319, 675.94, 0.02755, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(49, 36, 18.217822965235, 44.139191033319, 675.94, 0.02755, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(49, 37, 18.217822965235, 44.139191033319, 675.94, 0.02755, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(50, 33, 18.2180320099, 44.139539971948, 678.83, 0.04223, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(50, 34, 18.2180320099, 44.139539971948, 678.83, 0.04223, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(50, 35, 18.2180320099, 44.139539971948, 678.83, 0.04223, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(50, 36, 18.2180320099, 44.139539971948, 678.83, 0.04223, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(50, 37, 18.2180320099, 44.139539971948, 678.83, 0.04223, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(51, 33, 18.217837968841, 44.139690008014, 680.75, 0.02276, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(51, 34, 18.217837968841, 44.139690008014, 680.75, 0.02276, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(51, 35, 18.217837968841, 44.139690008014, 680.75, 0.02276, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(51, 36, 18.217837968841, 44.139690008014, 680.75, 0.02276, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(51, 37, 18.217837968841, 44.139690008014, 680.75, 0.02276, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(52, 33, 18.217091979459, 44.139835014939, 685.08, 0.06167, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(52, 34, 18.217091979459, 44.139835014939, 685.08, 0.06167, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(52, 35, 18.217091979459, 44.139835014939, 685.08, 0.06167, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(52, 36, 18.217091979459, 44.139835014939, 685.08, 0.06167, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(52, 37, 18.217091979459, 44.139835014939, 685.08, 0.06167, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(53, 33, 18.216854017228, 44.139870973304, 687, 0.01941, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(53, 34, 18.216854017228, 44.139870973304, 687, 0.01941, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(53, 35, 18.216854017228, 44.139870973304, 687, 0.01941, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(53, 36, 18.216854017228, 44.139870973304, 687, 0.01941, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(53, 37, 18.216854017228, 44.139870973304, 687, 0.01941, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(54, 33, 18.21671102196, 44.140342036262, 691.81, 0.05361, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(54, 34, 18.21671102196, 44.140342036262, 691.81, 0.05361, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(54, 35, 18.21671102196, 44.140342036262, 691.81, 0.05361, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(54, 36, 18.21671102196, 44.140342036262, 691.81, 0.05361, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(54, 37, 18.21671102196, 44.140342036262, 691.81, 0.05361, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(55, 33, 18.216745974496, 44.140495005995, 693.25, 0.01724, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(55, 34, 18.216745974496, 44.140495005995, 693.25, 0.01724, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(55, 35, 18.216745974496, 44.140495005995, 693.25, 0.01724, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(55, 36, 18.216745974496, 44.140495005995, 693.25, 0.01724, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(55, 37, 18.216745974496, 44.140495005995, 693.25, 0.01724, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(56, 33, 18.216775981709, 44.140628026798, 698.05, 0.01498, 4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(56, 34, 18.216775981709, 44.140628026798, 698.05, 0.01498, 4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(56, 35, 18.216775981709, 44.140628026798, 698.05, 0.01498, 4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(56, 36, 18.216775981709, 44.140628026798, 698.05, 0.01498, 4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(56, 37, 18.216775981709, 44.140628026798, 698.05, 0.01498, 4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(57, 33, 18.216906990856, 44.140944024548, 700.46, 0.03666, 2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(57, 34, 18.216906990856, 44.140944024548, 700.46, 0.03666, 2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(57, 35, 18.216906990856, 44.140944024548, 700.46, 0.03666, 2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(57, 36, 18.216906990856, 44.140944024548, 700.46, 0.03666, 2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(57, 37, 18.216906990856, 44.140944024548, 700.46, 0.03666, 2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(58, 33, 18.217083010823, 44.141201013699, 703.34, 0.03184, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(58, 34, 18.217083010823, 44.141201013699, 703.34, 0.03184, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(58, 35, 18.217083010823, 44.141201013699, 703.34, 0.03184, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(58, 36, 18.217083010823, 44.141201013699, 703.34, 0.03184, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(58, 37, 18.217083010823, 44.141201013699, 703.34, 0.03184, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(59, 33, 18.216847982258, 44.141985978931, 708.15, 0.08928, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(59, 34, 18.216847982258, 44.141985978931, 708.15, 0.08928, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(59, 35, 18.216847982258, 44.141985978931, 708.15, 0.08928, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(59, 36, 18.216847982258, 44.141985978931, 708.15, 0.08928, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(59, 37, 18.216847982258, 44.141985978931, 708.15, 0.08928, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(60, 33, 18.21602798067, 44.142414964736, 712.47, 0.08097, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(60, 34, 18.21602798067, 44.142414964736, 712.47, 0.08097, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(60, 35, 18.21602798067, 44.142414964736, 712.47, 0.08097, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(60, 36, 18.21602798067, 44.142414964736, 712.47, 0.08097, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(60, 37, 18.21602798067, 44.142414964736, 712.47, 0.08097, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(61, 33, 18.215523976833, 44.142459975556, 715.84, 0.04053, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(61, 34, 18.215523976833, 44.142459975556, 715.84, 0.04053, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(61, 35, 18.215523976833, 44.142459975556, 715.84, 0.04053, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(61, 36, 18.215523976833, 44.142459975556, 715.84, 0.04053, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(61, 37, 18.215523976833, 44.142459975556, 715.84, 0.04053, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(62, 33, 18.215148970485, 44.142509009689, 717.28, 0.03042, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(62, 34, 18.215148970485, 44.142509009689, 717.28, 0.03042, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(62, 35, 18.215148970485, 44.142509009689, 717.28, 0.03042, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(62, 36, 18.215148970485, 44.142509009689, 717.28, 0.03042, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(62, 37, 18.215148970485, 44.142509009689, 717.28, 0.03042, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(63, 33, 18.215115023777, 44.142517978325, 717.76, 0.00289, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(63, 34, 18.215115023777, 44.142517978325, 717.76, 0.00289, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(63, 35, 18.215115023777, 44.142517978325, 717.76, 0.00289, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(63, 36, 18.215115023777, 44.142517978325, 717.76, 0.00289, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(63, 37, 18.215115023777, 44.142517978325, 717.76, 0.00289, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(64, 33, 18.214768012986, 44.142728028819, 719.68, 0.03622, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(64, 34, 18.214768012986, 44.142728028819, 719.68, 0.03622, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(64, 35, 18.214768012986, 44.142728028819, 719.68, 0.03622, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(64, 36, 18.214768012986, 44.142728028819, 719.68, 0.03622, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(64, 37, 18.214768012986, 44.142728028819, 719.68, 0.03622, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(65, 33, 18.21432704106, 44.14303698577, 723.53, 0.04918, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(65, 34, 18.21432704106, 44.14303698577, 723.53, 0.04918, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(65, 35, 18.21432704106, 44.14303698577, 723.53, 0.04918, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(65, 36, 18.21432704106, 44.14303698577, 723.53, 0.04918, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(65, 37, 18.21432704106, 44.14303698577, 723.53, 0.04918, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(66, 33, 18.21399897337, 44.143155002967, 726.41, 0.02928, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(66, 34, 18.21399897337, 44.143155002967, 726.41, 0.02928, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(66, 35, 18.21399897337, 44.143155002967, 726.41, 0.02928, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(66, 36, 18.21399897337, 44.143155002967, 726.41, 0.02928, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(66, 37, 18.21399897337, 44.143155002967, 726.41, 0.02928, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(67, 33, 18.213822031394, 44.143634028733, 731.7, 0.0551, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(67, 34, 18.213822031394, 44.143634028733, 731.7, 0.0551, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(67, 35, 18.213822031394, 44.143634028733, 731.7, 0.0551, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(67, 36, 18.213822031394, 44.143634028733, 731.7, 0.0551, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(67, 37, 18.213822031394, 44.143634028733, 731.7, 0.0551, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(68, 33, 18.213555989787, 44.144264012575, 736.51, 0.0732, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(68, 34, 18.213555989787, 44.144264012575, 736.51, 0.0732, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(68, 35, 18.213555989787, 44.144264012575, 736.51, 0.0732, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(68, 36, 18.213555989787, 44.144264012575, 736.51, 0.0732, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(68, 37, 18.213555989787, 44.144264012575, 736.51, 0.0732, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(69, 33, 18.213390028104, 44.144674977288, 740.35, 0.04758, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(69, 34, 18.213390028104, 44.144674977288, 740.35, 0.04758, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(69, 35, 18.213390028104, 44.144674977288, 740.35, 0.04758, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(69, 36, 18.213390028104, 44.144674977288, 740.35, 0.04758, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(69, 37, 18.213390028104, 44.144674977288, 740.35, 0.04758, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(70, 33, 18.213167991489, 44.145332034677, 745.64, 0.07518, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(70, 34, 18.213167991489, 44.145332034677, 745.64, 0.07518, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(70, 35, 18.213167991489, 44.145332034677, 745.64, 0.07518, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(70, 36, 18.213167991489, 44.145332034677, 745.64, 0.07518, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(70, 37, 18.213167991489, 44.145332034677, 745.64, 0.07518, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(71, 33, 18.213915992528, 44.145926982164, 751.89, 0.0891, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(71, 34, 18.213915992528, 44.145926982164, 751.89, 0.0891, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(71, 35, 18.213915992528, 44.145926982164, 751.89, 0.0891, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(71, 36, 18.213915992528, 44.145926982164, 751.89, 0.0891, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(71, 37, 18.213915992528, 44.145926982164, 751.89, 0.0891, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(72, 33, 18.213290031999, 44.146324032918, 756.21, 0.06666, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(72, 34, 18.213290031999, 44.146324032918, 756.21, 0.06666, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(72, 35, 18.213290031999, 44.146324032918, 756.21, 0.06666, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(72, 36, 18.213290031999, 44.146324032918, 756.21, 0.06666, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(72, 37, 18.213290031999, 44.146324032918, 756.21, 0.06666, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(73, 33, 18.212102986872, 44.147129030898, 760.54, 0.13032, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(73, 34, 18.212102986872, 44.147129030898, 760.54, 0.13032, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(73, 35, 18.212102986872, 44.147129030898, 760.54, 0.13032, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(73, 36, 18.212102986872, 44.147129030898, 760.54, 0.13032, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(73, 37, 18.212102986872, 44.147129030898, 760.54, 0.13032, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(74, 33, 18.211509967223, 44.148167967796, 764.87, 0.12484, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(74, 34, 18.211509967223, 44.148167967796, 764.87, 0.12484, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(74, 35, 18.211509967223, 44.148167967796, 764.87, 0.12484, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(74, 36, 18.211509967223, 44.148167967796, 764.87, 0.12484, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(74, 37, 18.211509967223, 44.148167967796, 764.87, 0.12484, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(75, 33, 18.211332019418, 44.148733997717, 766.31, 0.06452, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(75, 34, 18.211332019418, 44.148733997717, 766.31, 0.06452, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(75, 35, 18.211332019418, 44.148733997717, 766.31, 0.06452, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(75, 36, 18.211332019418, 44.148733997717, 766.31, 0.06452, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(75, 37, 18.211332019418, 44.148733997717, 766.31, 0.06452, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(76, 33, 18.211295977235, 44.148772973567, 766.31, 0.0052, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(76, 34, 18.211295977235, 44.148772973567, 766.31, 0.0052, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(76, 35, 18.211295977235, 44.148772973567, 766.31, 0.0052, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(76, 36, 18.211295977235, 44.148772973567, 766.31, 0.0052, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(76, 37, 18.211295977235, 44.148772973567, 766.31, 0.0052, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(77, 33, 18.211090033874, 44.148887973279, 766.31, 0.02082, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(77, 34, 18.211090033874, 44.148887973279, 766.31, 0.02082, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(77, 35, 18.211090033874, 44.148887973279, 766.31, 0.02082, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(77, 36, 18.211090033874, 44.148887973279, 766.31, 0.02082, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(77, 37, 18.211090033874, 44.148887973279, 766.31, 0.02082, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(78, 33, 18.210386037827, 44.149075979367, 768.23, 0.05993, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(78, 34, 18.210386037827, 44.149075979367, 768.23, 0.05993, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(78, 35, 18.210386037827, 44.149075979367, 768.23, 0.05993, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(78, 36, 18.210386037827, 44.149075979367, 768.23, 0.05993, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(78, 37, 18.210386037827, 44.149075979367, 768.23, 0.05993, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(79, 33, 18.209612974897, 44.149190979078, 771.6, 0.06299, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(79, 34, 18.209612974897, 44.149190979078, 771.6, 0.06299, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(79, 35, 18.209612974897, 44.149190979078, 771.6, 0.06299, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(79, 36, 18.209612974897, 44.149190979078, 771.6, 0.06299, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(79, 37, 18.209612974897, 44.149190979078, 771.6, 0.06299, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(80, 33, 18.209621021524, 44.149401029572, 772.08, 0.02337, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(80, 34, 18.209621021524, 44.149401029572, 772.08, 0.02337, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(80, 35, 18.209621021524, 44.149401029572, 772.08, 0.02337, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(80, 36, 18.209621021524, 44.149401029572, 772.08, 0.02337, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(80, 37, 18.209621021524, 44.149401029572, 772.08, 0.02337, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(81, 33, 18.210021005943, 44.150017015636, 773.52, 0.07556, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(81, 34, 18.210021005943, 44.150017015636, 773.52, 0.07556, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(81, 35, 18.210021005943, 44.150017015636, 773.52, 0.07556, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(81, 36, 18.210021005943, 44.150017015636, 773.52, 0.07556, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(81, 37, 18.210021005943, 44.150017015636, 773.52, 0.07556, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(82, 33, 18.210224015638, 44.150598971173, 773.52, 0.06671, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(82, 34, 18.210224015638, 44.150598971173, 773.52, 0.06671, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(82, 35, 18.210224015638, 44.150598971173, 773.52, 0.06671, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(82, 36, 18.210224015638, 44.150598971173, 773.52, 0.06671, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(82, 37, 18.210224015638, 44.150598971173, 773.52, 0.06671, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(83, 33, 18.210329040885, 44.150531999767, 779.29, 0.01121, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(83, 34, 18.210329040885, 44.150531999767, 779.29, 0.01121, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(83, 35, 18.210329040885, 44.150531999767, 779.29, 0.01121, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(83, 36, 18.210329040885, 44.150531999767, 779.29, 0.01121, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(83, 37, 18.210329040885, 44.150531999767, 779.29, 0.01121, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(84, 33, 18.210300961509, 44.150314992294, 782.65, 0.02423, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(84, 34, 18.210300961509, 44.150314992294, 782.65, 0.02423, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(84, 35, 18.210300961509, 44.150314992294, 782.65, 0.02423, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(84, 36, 18.210300961509, 44.150314992294, 782.65, 0.02423, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(84, 37, 18.210300961509, 44.150314992294, 782.65, 0.02423, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(85, 33, 18.210344966501, 44.150066971779, 786.02, 0.0278, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(85, 34, 18.210344966501, 44.150066971779, 786.02, 0.0278, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(85, 35, 18.210344966501, 44.150066971779, 786.02, 0.0278, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(85, 36, 18.210344966501, 44.150066971779, 786.02, 0.0278, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(85, 37, 18.210344966501, 44.150066971779, 786.02, 0.0278, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(86, 33, 18.210267014802, 44.149757009, 791.78, 0.03502, 5.76);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(86, 34, 18.210267014802, 44.149757009, 791.78, 0.03502, 5.76);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(86, 35, 18.210267014802, 44.149757009, 791.78, 0.03502, 5.76);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(86, 36, 18.210267014802, 44.149757009, 791.78, 0.03502, 5.76);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(86, 37, 18.210267014802, 44.149757009, 791.78, 0.03502, 5.76);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(87, 33, 18.210401963443, 44.149603033438, 795.63, 0.02023, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(87, 34, 18.210401963443, 44.149603033438, 795.63, 0.02023, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(87, 35, 18.210401963443, 44.149603033438, 795.63, 0.02023, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(87, 36, 18.210401963443, 44.149603033438, 795.63, 0.02023, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(87, 37, 18.210401963443, 44.149603033438, 795.63, 0.02023, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(88, 33, 18.210472958162, 44.149571014568, 795.15, 0.00669, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(88, 34, 18.210472958162, 44.149571014568, 795.15, 0.00669, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(88, 35, 18.210472958162, 44.149571014568, 795.15, 0.00669, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(88, 36, 18.210472958162, 44.149571014568, 795.15, 0.00669, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(88, 37, 18.210472958162, 44.149571014568, 795.15, 0.00669, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(89, 33, 18.210830027238, 44.149520974606, 799.47, 0.02903, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(89, 34, 18.210830027238, 44.149520974606, 799.47, 0.02903, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(89, 35, 18.210830027238, 44.149520974606, 799.47, 0.02903, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(89, 36, 18.210830027238, 44.149520974606, 799.47, 0.02903, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(89, 37, 18.210830027238, 44.149520974606, 799.47, 0.02903, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(90, 33, 18.211296983063, 44.149475963786, 804.76, 0.03759, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(90, 34, 18.211296983063, 44.149475963786, 804.76, 0.03759, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(90, 35, 18.211296983063, 44.149475963786, 804.76, 0.03759, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(90, 36, 18.211296983063, 44.149475963786, 804.76, 0.03759, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(90, 37, 18.211296983063, 44.149475963786, 804.76, 0.03759, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(91, 33, 18.211629996076, 44.149456014857, 808.13, 0.02666, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(91, 34, 18.211629996076, 44.149456014857, 808.13, 0.02666, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(91, 35, 18.211629996076, 44.149456014857, 808.13, 0.02666, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(91, 36, 18.211629996076, 44.149456014857, 808.13, 0.02666, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(91, 37, 18.211629996076, 44.149456014857, 808.13, 0.02666, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(92, 33, 18.211997039616, 44.149403041229, 811.49, 0.02987, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(92, 34, 18.211997039616, 44.149403041229, 811.49, 0.02987, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(92, 35, 18.211997039616, 44.149403041229, 811.49, 0.02987, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(92, 36, 18.211997039616, 44.149403041229, 811.49, 0.02987, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(92, 37, 18.211997039616, 44.149403041229, 811.49, 0.02987, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(93, 33, 18.212318988517, 44.14933196269, 813.89, 0.02688, 2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(93, 34, 18.212318988517, 44.14933196269, 813.89, 0.02688, 2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(93, 35, 18.212318988517, 44.14933196269, 813.89, 0.02688, 2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(93, 36, 18.212318988517, 44.14933196269, 813.89, 0.02688, 2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(93, 37, 18.212318988517, 44.14933196269, 813.89, 0.02688, 2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(94, 33, 18.21246500127, 44.149465989321, 817.26, 0.01892, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(94, 34, 18.21246500127, 44.149465989321, 817.26, 0.01892, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(94, 35, 18.21246500127, 44.149465989321, 817.26, 0.01892, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(94, 36, 18.21246500127, 44.149465989321, 817.26, 0.01892, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(94, 37, 18.21246500127, 44.149465989321, 817.26, 0.01892, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(95, 33, 18.212069962174, 44.149668999016, 821.58, 0.03877, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(95, 34, 18.212069962174, 44.149668999016, 821.58, 0.03877, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(95, 35, 18.212069962174, 44.149668999016, 821.58, 0.03877, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(95, 36, 18.212069962174, 44.149668999016, 821.58, 0.03877, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(95, 37, 18.212069962174, 44.149668999016, 821.58, 0.03877, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(96, 33, 18.21275501512, 44.149624994025, 826.39, 0.05488, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(96, 34, 18.21275501512, 44.149624994025, 826.39, 0.05488, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(96, 35, 18.21275501512, 44.149624994025, 826.39, 0.05488, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(96, 36, 18.21275501512, 44.149624994025, 826.39, 0.05488, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(96, 37, 18.21275501512, 44.149624994025, 826.39, 0.05488, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(97, 33, 18.213027007878, 44.14948602207, 830.24, 0.02664, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(97, 34, 18.213027007878, 44.14948602207, 830.24, 0.02664, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(97, 35, 18.213027007878, 44.14948602207, 830.24, 0.02664, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(97, 36, 18.213027007878, 44.14948602207, 830.24, 0.02664, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(97, 37, 18.213027007878, 44.14948602207, 830.24, 0.02664, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(98, 33, 18.213397990912, 44.149207994342, 835.52, 0.0428, 5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(98, 34, 18.213397990912, 44.149207994342, 835.52, 0.0428, 5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(98, 35, 18.213397990912, 44.149207994342, 835.52, 0.0428, 5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(98, 36, 18.213397990912, 44.149207994342, 835.52, 0.0428, 5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(98, 37, 18.213397990912, 44.149207994342, 835.52, 0.0428, 5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(99, 33, 18.21356697008, 44.149089977145, 838.41, 0.01881, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(99, 34, 18.21356697008, 44.149089977145, 838.41, 0.01881, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(99, 35, 18.21356697008, 44.149089977145, 838.41, 0.01881, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(99, 36, 18.21356697008, 44.149089977145, 838.41, 0.01881, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(99, 37, 18.21356697008, 44.149089977145, 838.41, 0.01881, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(100, 33, 18.213764028624, 44.148959973827, 841.77, 0.02136, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(100, 34, 18.213764028624, 44.148959973827, 841.77, 0.02136, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(100, 35, 18.213764028624, 44.148959973827, 841.77, 0.02136, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(100, 36, 18.213764028624, 44.148959973827, 841.77, 0.02136, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(100, 37, 18.213764028624, 44.148959973827, 841.77, 0.02136, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(101, 33, 18.213958991691, 44.148770039901, 845.62, 0.02623, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(101, 34, 18.213958991691, 44.148770039901, 845.62, 0.02623, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(101, 35, 18.213958991691, 44.148770039901, 845.62, 0.02623, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(101, 36, 18.213958991691, 44.148770039901, 845.62, 0.02623, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(101, 37, 18.213958991691, 44.148770039901, 845.62, 0.02623, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(102, 33, 18.2141400408, 44.148557977751, 850.42, 0.02765, 4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(102, 34, 18.2141400408, 44.148557977751, 850.42, 0.02765, 4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(102, 35, 18.2141400408, 44.148557977751, 850.42, 0.02765, 4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(102, 36, 18.2141400408, 44.148557977751, 850.42, 0.02765, 4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(102, 37, 18.2141400408, 44.148557977751, 850.42, 0.02765, 4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(103, 33, 18.214341960847, 44.148267963901, 854.75, 0.03605, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(103, 34, 18.214341960847, 44.148267963901, 854.75, 0.03605, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(103, 35, 18.214341960847, 44.148267963901, 854.75, 0.03605, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(103, 36, 18.214341960847, 44.148267963901, 854.75, 0.03605, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(103, 37, 18.214341960847, 44.148267963901, 854.75, 0.03605, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(104, 33, 18.214402981102, 44.14812002331, 858.11, 0.01716, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(104, 34, 18.214402981102, 44.14812002331, 858.11, 0.01716, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(104, 35, 18.214402981102, 44.14812002331, 858.11, 0.01716, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(104, 36, 18.214402981102, 44.14812002331, 858.11, 0.01716, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(104, 37, 18.214402981102, 44.14812002331, 858.11, 0.01716, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(105, 33, 18.214415973052, 44.148092027754, 858.11, 0.00328, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(105, 34, 18.214415973052, 44.148092027754, 858.11, 0.00328, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(105, 35, 18.214415973052, 44.148092027754, 858.11, 0.00328, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(105, 36, 18.214415973052, 44.148092027754, 858.11, 0.00328, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(105, 37, 18.214415973052, 44.148092027754, 858.11, 0.00328, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(106, 33, 18.21486800909, 44.148020027205, 861.48, 0.03694, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(106, 34, 18.21486800909, 44.148020027205, 861.48, 0.03694, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(106, 35, 18.21486800909, 44.148020027205, 861.48, 0.03694, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(106, 36, 18.21486800909, 44.148020027205, 861.48, 0.03694, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(106, 37, 18.21486800909, 44.148020027205, 861.48, 0.03694, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(107, 33, 18.215130027384, 44.148002006114, 865.8, 0.021, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(107, 34, 18.215130027384, 44.148002006114, 865.8, 0.021, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(107, 35, 18.215130027384, 44.148002006114, 865.8, 0.021, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(107, 36, 18.215130027384, 44.148002006114, 865.8, 0.021, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(107, 37, 18.215130027384, 44.148002006114, 865.8, 0.021, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(108, 33, 18.215563036501, 44.147948026657, 869.65, 0.03507, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(108, 34, 18.215563036501, 44.147948026657, 869.65, 0.03507, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(108, 35, 18.215563036501, 44.147948026657, 869.65, 0.03507, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(108, 36, 18.215563036501, 44.147948026657, 869.65, 0.03507, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(108, 37, 18.215563036501, 44.147948026657, 869.65, 0.03507, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(109, 33, 18.216228978708, 44.147889018059, 874.94, 0.05354, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(109, 34, 18.216228978708, 44.147889018059, 874.94, 0.05354, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(109, 35, 18.216228978708, 44.147889018059, 874.94, 0.05354, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(109, 36, 18.216228978708, 44.147889018059, 874.94, 0.05354, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(109, 37, 18.216228978708, 44.147889018059, 874.94, 0.05354, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(110, 33, 18.21660800837, 44.147686008364, 880.71, 0.03774, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(110, 34, 18.21660800837, 44.147686008364, 880.71, 0.03774, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(110, 35, 18.21660800837, 44.147686008364, 880.71, 0.03774, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(110, 36, 18.21660800837, 44.147686008364, 880.71, 0.03774, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(110, 37, 18.21660800837, 44.147686008364, 880.71, 0.03774, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(111, 33, 18.216913025826, 44.147619036958, 884.07, 0.02545, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(111, 34, 18.216913025826, 44.147619036958, 884.07, 0.02545, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(111, 35, 18.216913025826, 44.147619036958, 884.07, 0.02545, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(111, 36, 18.216913025826, 44.147619036958, 884.07, 0.02545, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(111, 37, 18.216913025826, 44.147619036958, 884.07, 0.02545, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(112, 33, 18.217145958915, 44.147559022531, 887.43, 0.01975, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(112, 34, 18.217145958915, 44.147559022531, 887.43, 0.01975, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(112, 35, 18.217145958915, 44.147559022531, 887.43, 0.01975, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(112, 36, 18.217145958915, 44.147559022531, 887.43, 0.01975, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(112, 37, 18.217145958915, 44.147559022531, 887.43, 0.01975, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(113, 33, 18.217429015785, 44.147519040853, 890.8, 0.02302, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(113, 34, 18.217429015785, 44.147519040853, 890.8, 0.02302, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(113, 35, 18.217429015785, 44.147519040853, 890.8, 0.02302, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(113, 36, 18.217429015785, 44.147519040853, 890.8, 0.02302, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(113, 37, 18.217429015785, 44.147519040853, 890.8, 0.02302, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(114, 33, 18.217520965263, 44.147519040853, 892.24, 0.00734, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(114, 34, 18.217520965263, 44.147519040853, 892.24, 0.00734, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(114, 35, 18.217520965263, 44.147519040853, 892.24, 0.00734, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(114, 36, 18.217520965263, 44.147519040853, 892.24, 0.00734, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(114, 37, 18.217520965263, 44.147519040853, 892.24, 0.00734, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(115, 33, 18.217811984941, 44.147609984502, 897.05, 0.02533, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(115, 34, 18.217811984941, 44.147609984502, 897.05, 0.02533, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(115, 35, 18.217811984941, 44.147609984502, 897.05, 0.02533, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(115, 36, 18.217811984941, 44.147609984502, 897.05, 0.02533, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(115, 37, 18.217811984941, 44.147609984502, 897.05, 0.02533, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(116, 33, 18.217829000205, 44.147626999766, 898.97, 0.00233, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(116, 34, 18.217829000205, 44.147626999766, 898.97, 0.00233, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(116, 35, 18.217829000205, 44.147626999766, 898.97, 0.00233, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(116, 36, 18.217829000205, 44.147626999766, 898.97, 0.00233, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(116, 37, 18.217829000205, 44.147626999766, 898.97, 0.00233, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(117, 33, 18.217880968004, 44.147647032514, 899.45, 0.00471, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(117, 34, 18.217880968004, 44.147647032514, 899.45, 0.00471, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(117, 35, 18.217880968004, 44.147647032514, 899.45, 0.00471, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(117, 36, 18.217880968004, 44.147647032514, 899.45, 0.00471, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(117, 37, 18.217880968004, 44.147647032514, 899.45, 0.00471, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(118, 33, 18.218185985461, 44.147757003084, 902.82, 0.02724, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(118, 34, 18.218185985461, 44.147757003084, 902.82, 0.02724, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(118, 35, 18.218185985461, 44.147757003084, 902.82, 0.02724, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(118, 36, 18.218185985461, 44.147757003084, 902.82, 0.02724, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(118, 37, 18.218185985461, 44.147757003084, 902.82, 0.02724, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(119, 33, 18.218683032319, 44.147697994485, 908.1, 0.0402, 5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(119, 34, 18.218683032319, 44.147697994485, 908.1, 0.0402, 5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(119, 35, 18.218683032319, 44.147697994485, 908.1, 0.0402, 5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(119, 36, 18.218683032319, 44.147697994485, 908.1, 0.0402, 5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(119, 37, 18.218683032319, 44.147697994485, 908.1, 0.0402, 5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(120, 33, 18.219087040052, 44.147719033062, 911.47, 0.03232, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(120, 34, 18.219087040052, 44.147719033062, 911.47, 0.03232, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(120, 35, 18.219087040052, 44.147719033062, 911.47, 0.03232, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(120, 36, 18.219087040052, 44.147719033062, 911.47, 0.03232, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(120, 37, 18.219087040052, 44.147719033062, 911.47, 0.03232, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(121, 33, 18.219762034714, 44.147728001699, 914.83, 0.05387, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(121, 34, 18.219762034714, 44.147728001699, 914.83, 0.05387, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(121, 35, 18.219762034714, 44.147728001699, 914.83, 0.05387, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(121, 36, 18.219762034714, 44.147728001699, 914.83, 0.05387, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(121, 37, 18.219762034714, 44.147728001699, 914.83, 0.05387, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(122, 33, 18.21975197643, 44.147734036669, 914.83, 0.00105, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(122, 34, 18.21975197643, 44.147734036669, 914.83, 0.00105, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(122, 35, 18.21975197643, 44.147734036669, 914.83, 0.00105, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(122, 36, 18.21975197643, 44.147734036669, 914.83, 0.00105, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(122, 37, 18.21975197643, 44.147734036669, 914.83, 0.00105, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(123, 33, 18.219778966159, 44.147731019184, 916.75, 0.00218, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(123, 34, 18.219778966159, 44.147731019184, 916.75, 0.00218, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(123, 35, 18.219778966159, 44.147731019184, 916.75, 0.00218, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(123, 36, 18.219778966159, 44.147731019184, 916.75, 0.00218, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(123, 37, 18.219778966159, 44.147731019184, 916.75, 0.00218, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(124, 33, 18.220447003841, 44.147499008104, 918.2, 0.05922, 1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(124, 34, 18.220447003841, 44.147499008104, 918.2, 0.05922, 1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(124, 35, 18.220447003841, 44.147499008104, 918.2, 0.05922, 1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(124, 36, 18.220447003841, 44.147499008104, 918.2, 0.05922, 1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(124, 37, 18.220447003841, 44.147499008104, 918.2, 0.05922, 1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(125, 33, 18.221243033186, 44.147072033957, 924.45, 0.0793, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(125, 34, 18.221243033186, 44.147072033957, 924.45, 0.0793, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(125, 35, 18.221243033186, 44.147072033957, 924.45, 0.0793, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(125, 36, 18.221243033186, 44.147072033957, 924.45, 0.0793, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(125, 37, 18.221243033186, 44.147072033957, 924.45, 0.0793, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(126, 33, 18.222052976489, 44.146616980433, 929.73, 0.08208, 5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(126, 34, 18.222052976489, 44.146616980433, 929.73, 0.08208, 5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(126, 35, 18.222052976489, 44.146616980433, 929.73, 0.08208, 5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(126, 36, 18.222052976489, 44.146616980433, 929.73, 0.08208, 5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(126, 37, 18.222052976489, 44.146616980433, 929.73, 0.08208, 5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(127, 33, 18.222295967862, 44.146439032629, 933.1, 0.0277, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(127, 34, 18.222295967862, 44.146439032629, 933.1, 0.0277, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(127, 35, 18.222295967862, 44.146439032629, 933.1, 0.0277, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(127, 36, 18.222295967862, 44.146439032629, 933.1, 0.0277, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(127, 37, 18.222295967862, 44.146439032629, 933.1, 0.0277, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(128, 33, 18.222499983385, 44.146268041804, 936.46, 0.02503, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(128, 34, 18.222499983385, 44.146268041804, 936.46, 0.02503, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(128, 35, 18.222499983385, 44.146268041804, 936.46, 0.02503, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(128, 36, 18.222499983385, 44.146268041804, 936.46, 0.02503, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(128, 37, 18.222499983385, 44.146268041804, 936.46, 0.02503, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(129, 33, 18.222737023607, 44.146119011566, 939.83, 0.02515, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(129, 34, 18.222737023607, 44.146119011566, 939.83, 0.02515, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(129, 35, 18.222737023607, 44.146119011566, 939.83, 0.02515, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(129, 36, 18.222737023607, 44.146119011566, 939.83, 0.02515, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(129, 37, 18.222737023607, 44.146119011566, 939.83, 0.02515, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(130, 33, 18.223213031888, 44.145869985223, 946.07, 0.047, 6.24);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(130, 34, 18.223213031888, 44.145869985223, 946.07, 0.047, 6.24);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(130, 35, 18.223213031888, 44.145869985223, 946.07, 0.047, 6.24);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(130, 36, 18.223213031888, 44.145869985223, 946.07, 0.047, 6.24);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(130, 37, 18.223213031888, 44.145869985223, 946.07, 0.047, 6.24);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(131, 33, 18.223541015759, 44.145551975816, 949.92, 0.04399, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(131, 34, 18.223541015759, 44.145551975816, 949.92, 0.04399, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(131, 35, 18.223541015759, 44.145551975816, 949.92, 0.04399, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(131, 36, 18.223541015759, 44.145551975816, 949.92, 0.04399, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(131, 37, 18.223541015759, 44.145551975816, 949.92, 0.04399, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(132, 33, 18.223867993802, 44.145169006661, 956.17, 0.04994, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(132, 34, 18.223867993802, 44.145169006661, 956.17, 0.04994, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(132, 35, 18.223867993802, 44.145169006661, 956.17, 0.04994, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(132, 36, 18.223867993802, 44.145169006661, 956.17, 0.04994, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(132, 37, 18.223867993802, 44.145169006661, 956.17, 0.04994, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(133, 33, 18.224042002112, 44.145053001121, 956.17, 0.01895, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(133, 34, 18.224042002112, 44.145053001121, 956.17, 0.01895, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(133, 35, 18.224042002112, 44.145053001121, 956.17, 0.01895, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(133, 36, 18.224042002112, 44.145053001121, 956.17, 0.01895, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(133, 37, 18.224042002112, 44.145053001121, 956.17, 0.01895, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(134, 33, 18.224203018472, 44.144902965054, 959.05, 0.02106, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(134, 34, 18.224203018472, 44.144902965054, 959.05, 0.02106, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(134, 35, 18.224203018472, 44.144902965054, 959.05, 0.02106, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(134, 36, 18.224203018472, 44.144902965054, 959.05, 0.02106, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(134, 37, 18.224203018472, 44.144902965054, 959.05, 0.02106, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(135, 33, 18.224238976836, 44.144586967304, 964.34, 0.03525, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(135, 34, 18.224238976836, 44.144586967304, 964.34, 0.03525, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(135, 35, 18.224238976836, 44.144586967304, 964.34, 0.03525, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(135, 36, 18.224238976836, 44.144586967304, 964.34, 0.03525, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(135, 37, 18.224238976836, 44.144586967304, 964.34, 0.03525, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(136, 33, 18.224238976836, 44.144573975354, 964.34, 0.00144, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(136, 34, 18.224238976836, 44.144573975354, 964.34, 0.00144, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(136, 35, 18.224238976836, 44.144573975354, 964.34, 0.00144, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(136, 36, 18.224238976836, 44.144573975354, 964.34, 0.00144, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(136, 37, 18.224238976836, 44.144573975354, 964.34, 0.00144, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(137, 33, 18.2242300082, 44.144429974258, 966.26, 0.01603, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(137, 34, 18.2242300082, 44.144429974258, 966.26, 0.01603, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(137, 35, 18.2242300082, 44.144429974258, 966.26, 0.01603, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(137, 36, 18.2242300082, 44.144429974258, 966.26, 0.01603, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(137, 37, 18.2242300082, 44.144429974258, 966.26, 0.01603, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(138, 33, 18.224298991263, 44.14422897622, 970.59, 0.02302, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(138, 34, 18.224298991263, 44.14422897622, 970.59, 0.02302, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(138, 35, 18.224298991263, 44.14422897622, 970.59, 0.02302, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(138, 36, 18.224298991263, 44.14422897622, 970.59, 0.02302, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(138, 37, 18.224298991263, 44.14422897622, 970.59, 0.02302, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(139, 33, 18.224310977384, 44.144213972613, 970.59, 0.00192, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(139, 34, 18.224310977384, 44.144213972613, 970.59, 0.00192, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(139, 35, 18.224310977384, 44.144213972613, 970.59, 0.00192, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(139, 36, 18.224310977384, 44.144213972613, 970.59, 0.00192, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(139, 37, 18.224310977384, 44.144213972613, 970.59, 0.00192, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(140, 33, 18.224570984021, 44.144240962341, 973.95, 0.02096, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(140, 34, 18.224570984021, 44.144240962341, 973.95, 0.02096, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(140, 35, 18.224570984021, 44.144240962341, 973.95, 0.02096, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(140, 36, 18.224570984021, 44.144240962341, 973.95, 0.02096, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(140, 37, 18.224570984021, 44.144240962341, 973.95, 0.02096, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(141, 33, 18.224720014259, 44.14440298453, 977.8, 0.02159, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(141, 34, 18.224720014259, 44.14440298453, 977.8, 0.02159, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(141, 35, 18.224720014259, 44.14440298453, 977.8, 0.02159, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(141, 36, 18.224720014259, 44.14440298453, 977.8, 0.02159, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(141, 37, 18.224720014259, 44.14440298453, 977.8, 0.02159, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(142, 33, 18.224880024791, 44.144488982856, 980.2, 0.01595, 2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(142, 34, 18.224880024791, 44.144488982856, 980.2, 0.01595, 2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(142, 35, 18.224880024791, 44.144488982856, 980.2, 0.01595, 2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(142, 36, 18.224880024791, 44.144488982856, 980.2, 0.01595, 2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(142, 37, 18.224880024791, 44.144488982856, 980.2, 0.01595, 2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(143, 33, 18.224997203797, 44.14452938363, 981.64, 0.01037, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(143, 34, 18.224997203797, 44.14452938363, 981.64, 0.01037, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(143, 35, 18.224997203797, 44.14452938363, 981.64, 0.01037, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(143, 36, 18.224997203797, 44.14452938363, 981.64, 0.01037, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(143, 37, 18.224997203797, 44.14452938363, 981.64, 0.01037, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(144, 33, 18.225120501593, 44.144505579025, 981.64, 0.01019, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(144, 34, 18.225120501593, 44.144505579025, 981.64, 0.01019, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(144, 35, 18.225120501593, 44.144505579025, 981.64, 0.01019, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(144, 36, 18.225120501593, 44.144505579025, 981.64, 0.01019, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(144, 37, 18.225120501593, 44.144505579025, 981.64, 0.01019, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(145, 33, 18.225214798003, 44.144519912079, 981.64, 0.00769, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(145, 34, 18.225214798003, 44.144519912079, 981.64, 0.00769, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(145, 35, 18.225214798003, 44.144519912079, 981.64, 0.00769, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(145, 36, 18.225214798003, 44.144519912079, 981.64, 0.00769, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(145, 37, 18.225214798003, 44.144519912079, 981.64, 0.00769, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(146, 33, 18.225328875706, 44.14456307888, 984.05, 0.01029, 2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(146, 34, 18.225328875706, 44.14456307888, 984.05, 0.01029, 2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(146, 35, 18.225328875706, 44.14456307888, 984.05, 0.01029, 2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(146, 36, 18.225328875706, 44.14456307888, 984.05, 0.01029, 2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(146, 37, 18.225328875706, 44.14456307888, 984.05, 0.01029, 2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(147, 33, 18.225606987253, 44.144800035283, 985.97, 0.03445, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(147, 34, 18.225606987253, 44.144800035283, 985.97, 0.03445, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(147, 35, 18.225606987253, 44.144800035283, 985.97, 0.03445, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(147, 36, 18.225606987253, 44.144800035283, 985.97, 0.03445, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(147, 37, 18.225606987253, 44.144800035283, 985.97, 0.03445, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(148, 33, 18.226099004969, 44.145160038024, 983.09, 0.05607, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(148, 34, 18.226099004969, 44.145160038024, 983.09, 0.05607, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(148, 35, 18.226099004969, 44.145160038024, 983.09, 0.05607, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(148, 36, 18.226099004969, 44.145160038024, 983.09, 0.05607, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(148, 37, 18.226099004969, 44.145160038024, 983.09, 0.05607, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(149, 33, 18.226851029322, 44.145616013557, 978.28, 0.07856, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(149, 34, 18.226851029322, 44.145616013557, 978.28, 0.07856, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(149, 35, 18.226851029322, 44.145616013557, 978.28, 0.07856, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(149, 36, 18.226851029322, 44.145616013557, 978.28, 0.07856, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(149, 37, 18.226851029322, 44.145616013557, 978.28, 0.07856, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(150, 33, 18.226951025426, 44.14567200467, 978.28, 0.01012, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(150, 34, 18.226951025426, 44.14567200467, 978.28, 0.01012, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(150, 35, 18.226951025426, 44.14567200467, 978.28, 0.01012, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(150, 36, 18.226951025426, 44.14567200467, 978.28, 0.01012, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(150, 37, 18.226951025426, 44.14567200467, 978.28, 0.01012, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(151, 33, 18.227367019281, 44.145889012143, 974.43, 0.04104, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(151, 34, 18.227367019281, 44.145889012143, 974.43, 0.04104, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(151, 35, 18.227367019281, 44.145889012143, 974.43, 0.04104, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(151, 36, 18.227367019281, 44.145889012143, 974.43, 0.04104, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(151, 37, 18.227367019281, 44.145889012143, 974.43, 0.04104, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(152, 33, 18.22769600898, 44.146018009633, 970.59, 0.02991, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(152, 34, 18.22769600898, 44.146018009633, 970.59, 0.02991, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(152, 35, 18.22769600898, 44.146018009633, 970.59, 0.02991, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(152, 36, 18.22769600898, 44.146018009633, 970.59, 0.02991, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(152, 37, 18.22769600898, 44.146018009633, 970.59, 0.02991, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(153, 33, 18.227787036449, 44.146051034331, 969.63, 0.00814, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(153, 34, 18.227787036449, 44.146051034331, 969.63, 0.00814, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(153, 35, 18.227787036449, 44.146051034331, 969.63, 0.00814, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(153, 36, 18.227787036449, 44.146051034331, 969.63, 0.00814, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(153, 37, 18.227787036449, 44.146051034331, 969.63, 0.00814, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(154, 33, 18.228047965094, 44.146295031533, 965.3, 0.0342, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(154, 34, 18.228047965094, 44.146295031533, 965.3, 0.0342, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(154, 35, 18.228047965094, 44.146295031533, 965.3, 0.0342, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(154, 36, 18.228047965094, 44.146295031533, 965.3, 0.0342, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(154, 37, 18.228047965094, 44.146295031533, 965.3, 0.0342, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(155, 33, 18.227914022282, 44.14685100317, 957.13, 0.06274, -8.17);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(155, 34, 18.227914022282, 44.14685100317, 957.13, 0.06274, -8.17);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(155, 35, 18.227914022282, 44.14685100317, 957.13, 0.06274, -8.17);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(155, 36, 18.227914022282, 44.14685100317, 957.13, 0.06274, -8.17);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(155, 37, 18.227914022282, 44.14685100317, 957.13, 0.06274, -8.17);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(156, 33, 18.227875968441, 44.147040015087, 953.77, 0.02124, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(156, 34, 18.227875968441, 44.147040015087, 953.77, 0.02124, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(156, 35, 18.227875968441, 44.147040015087, 953.77, 0.02124, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(156, 36, 18.227875968441, 44.147040015087, 953.77, 0.02124, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(156, 37, 18.227875968441, 44.147040015087, 953.77, 0.02124, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(157, 33, 18.227816959843, 44.147217040882, 949.92, 0.02024, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(157, 34, 18.227816959843, 44.147217040882, 949.92, 0.02024, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(157, 35, 18.227816959843, 44.147217040882, 949.92, 0.02024, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(157, 36, 18.227816959843, 44.147217040882, 949.92, 0.02024, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(157, 37, 18.227816959843, 44.147217040882, 949.92, 0.02024, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(158, 33, 18.227585032582, 44.147506970912, 946.07, 0.03717, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(158, 34, 18.227585032582, 44.147506970912, 946.07, 0.03717, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(158, 35, 18.227585032582, 44.147506970912, 946.07, 0.03717, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(158, 36, 18.227585032582, 44.147506970912, 946.07, 0.03717, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(158, 37, 18.227585032582, 44.147506970912, 946.07, 0.03717, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(159, 33, 18.227456035092, 44.147817017511, 941.75, 0.03598, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(159, 34, 18.227456035092, 44.147817017511, 941.75, 0.03598, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(159, 35, 18.227456035092, 44.147817017511, 941.75, 0.03598, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(159, 36, 18.227456035092, 44.147817017511, 941.75, 0.03598, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(159, 37, 18.227456035092, 44.147817017511, 941.75, 0.03598, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(160, 33, 18.227752000093, 44.148453958333, 935.98, 0.07466, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(160, 34, 18.227752000093, 44.148453958333, 935.98, 0.07466, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(160, 35, 18.227752000093, 44.148453958333, 935.98, 0.07466, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(160, 36, 18.227752000093, 44.148453958333, 935.98, 0.07466, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(160, 37, 18.227752000093, 44.148453958333, 935.98, 0.07466, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(161, 33, 18.227946963161, 44.148838017136, 929.73, 0.04545, -6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(161, 34, 18.227946963161, 44.148838017136, 929.73, 0.04545, -6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(161, 35, 18.227946963161, 44.148838017136, 929.73, 0.04545, -6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(161, 36, 18.227946963161, 44.148838017136, 929.73, 0.04545, -6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(161, 37, 18.227946963161, 44.148838017136, 929.73, 0.04545, -6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(162, 33, 18.228198001161, 44.149171030149, 924.93, 0.0421, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(162, 34, 18.228198001161, 44.149171030149, 924.93, 0.0421, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(162, 35, 18.228198001161, 44.149171030149, 924.93, 0.0421, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(162, 36, 18.228198001161, 44.149171030149, 924.93, 0.0421, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(162, 37, 18.228198001161, 44.149171030149, 924.93, 0.0421, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(163, 33, 18.228377038613, 44.14932500571, 919.64, 0.0223, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(163, 34, 18.228377038613, 44.14932500571, 919.64, 0.0223, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(163, 35, 18.228377038613, 44.14932500571, 919.64, 0.0223, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(163, 36, 18.228377038613, 44.14932500571, 919.64, 0.0223, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(163, 37, 18.228377038613, 44.14932500571, 919.64, 0.0223, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(164, 33, 18.228558003902, 44.149430030957, 916.75, 0.01857, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(164, 34, 18.228558003902, 44.149430030957, 916.75, 0.01857, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(164, 35, 18.228558003902, 44.149430030957, 916.75, 0.01857, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(164, 36, 18.228558003902, 44.149430030957, 916.75, 0.01857, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(164, 37, 18.228558003902, 44.149430030957, 916.75, 0.01857, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(165, 33, 18.228769982234, 44.149542013183, 912.43, 0.021, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(165, 34, 18.228769982234, 44.149542013183, 912.43, 0.021, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(165, 35, 18.228769982234, 44.149542013183, 912.43, 0.021, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(165, 36, 18.228769982234, 44.149542013183, 912.43, 0.021, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(165, 37, 18.228769982234, 44.149542013183, 912.43, 0.021, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(166, 33, 18.22881096974, 44.149562967941, 911.47, 0.00402, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(166, 34, 18.22881096974, 44.149562967941, 911.47, 0.00402, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(166, 35, 18.22881096974, 44.149562967941, 911.47, 0.00402, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(166, 36, 18.22881096974, 44.149562967941, 911.47, 0.00402, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(166, 37, 18.22881096974, 44.149562967941, 911.47, 0.00402, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(167, 33, 18.228910965845, 44.149388037622, 909.06, 0.02102, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(167, 34, 18.228910965845, 44.149388037622, 909.06, 0.02102, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(167, 35, 18.228910965845, 44.149388037622, 909.06, 0.02102, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(167, 36, 18.228910965845, 44.149388037622, 909.06, 0.02102, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(167, 37, 18.228910965845, 44.149388037622, 909.06, 0.02102, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(168, 33, 18.228866960853, 44.149043038487, 905.22, 0.03852, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(168, 34, 18.228866960853, 44.149043038487, 905.22, 0.03852, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(168, 35, 18.228866960853, 44.149043038487, 905.22, 0.03852, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(168, 36, 18.228866960853, 44.149043038487, 905.22, 0.03852, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(168, 37, 18.228866960853, 44.149043038487, 905.22, 0.03852, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(169, 33, 18.229180024937, 44.148408025503, 902.33, 0.0749, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(169, 34, 18.229180024937, 44.148408025503, 902.33, 0.0749, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(169, 35, 18.229180024937, 44.148408025503, 902.33, 0.0749, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(169, 36, 18.229180024937, 44.148408025503, 902.33, 0.0749, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(169, 37, 18.229180024937, 44.148408025503, 902.33, 0.0749, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(170, 33, 18.229725016281, 44.147859010845, 899.45, 0.07495, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(170, 34, 18.229725016281, 44.147859010845, 899.45, 0.07495, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(170, 35, 18.229725016281, 44.147859010845, 899.45, 0.07495, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(170, 36, 18.229725016281, 44.147859010845, 899.45, 0.07495, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(170, 37, 18.229725016281, 44.147859010845, 899.45, 0.07495, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(171, 33, 18.229819983244, 44.147495990619, 897.53, 0.04107, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(171, 34, 18.229819983244, 44.147495990619, 897.53, 0.04107, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(171, 35, 18.229819983244, 44.147495990619, 897.53, 0.04107, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(171, 36, 18.229819983244, 44.147495990619, 897.53, 0.04107, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(171, 37, 18.229819983244, 44.147495990619, 897.53, 0.04107, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(172, 33, 18.230274030939, 44.146956028417, 893.2, 0.07012, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(172, 34, 18.230274030939, 44.146956028417, 893.2, 0.07012, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(172, 35, 18.230274030939, 44.146956028417, 893.2, 0.07012, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(172, 36, 18.230274030939, 44.146956028417, 893.2, 0.07012, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(172, 37, 18.230274030939, 44.146956028417, 893.2, 0.07012, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(173, 33, 18.230560021475, 44.146138038486, 888.4, 0.09378, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(173, 34, 18.230560021475, 44.146138038486, 888.4, 0.09378, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(173, 35, 18.230560021475, 44.146138038486, 888.4, 0.09378, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(173, 36, 18.230560021475, 44.146138038486, 888.4, 0.09378, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(173, 37, 18.230560021475, 44.146138038486, 888.4, 0.09378, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(174, 33, 18.230784991756, 44.145705029368, 884.07, 0.05139, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(174, 34, 18.230784991756, 44.145705029368, 884.07, 0.05139, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(174, 35, 18.230784991756, 44.145705029368, 884.07, 0.05139, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(174, 36, 18.230784991756, 44.145705029368, 884.07, 0.05139, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(174, 37, 18.230784991756, 44.145705029368, 884.07, 0.05139, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(175, 33, 18.230867972597, 44.145289035514, 879.74, 0.04673, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(175, 34, 18.230867972597, 44.145289035514, 879.74, 0.04673, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(175, 35, 18.230867972597, 44.145289035514, 879.74, 0.04673, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(175, 36, 18.230867972597, 44.145289035514, 879.74, 0.04673, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(175, 37, 18.230867972597, 44.145289035514, 879.74, 0.04673, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(176, 33, 18.231049021706, 44.145012013614, 874.94, 0.03402, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(176, 34, 18.231049021706, 44.145012013614, 874.94, 0.03402, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(176, 35, 18.231049021706, 44.145012013614, 874.94, 0.03402, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(176, 36, 18.231049021706, 44.145012013614, 874.94, 0.03402, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(176, 37, 18.231049021706, 44.145012013614, 874.94, 0.03402, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(177, 33, 18.231136025861, 44.144932972267, 873.98, 0.0112, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(177, 34, 18.231136025861, 44.144932972267, 873.98, 0.0112, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(177, 35, 18.231136025861, 44.144932972267, 873.98, 0.0112, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(177, 36, 18.231136025861, 44.144932972267, 873.98, 0.0112, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(177, 37, 18.231136025861, 44.144932972267, 873.98, 0.0112, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(178, 33, 18.231299975887, 44.144788971171, 872.53, 0.02068, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(178, 34, 18.231299975887, 44.144788971171, 872.53, 0.02068, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(178, 35, 18.231299975887, 44.144788971171, 872.53, 0.02068, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(178, 36, 18.231299975887, 44.144788971171, 872.53, 0.02068, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(178, 37, 18.231299975887, 44.144788971171, 872.53, 0.02068, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(179, 33, 18.231552019715, 44.144470039755, 868.69, 0.04077, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(179, 34, 18.231552019715, 44.144470039755, 868.69, 0.04077, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(179, 35, 18.231552019715, 44.144470039755, 868.69, 0.04077, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(179, 36, 18.231552019715, 44.144470039755, 868.69, 0.04077, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(179, 37, 18.231552019715, 44.144470039755, 868.69, 0.04077, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(180, 33, 18.231656039134, 44.144758963957, 864.84, 0.03318, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(180, 34, 18.231656039134, 44.144758963957, 864.84, 0.03318, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(180, 35, 18.231656039134, 44.144758963957, 864.84, 0.03318, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(180, 36, 18.231656039134, 44.144758963957, 864.84, 0.03318, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(180, 37, 18.231656039134, 44.144758963957, 864.84, 0.03318, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(181, 33, 18.231438025832, 44.145129024982, 859.08, 0.04467, -5.76);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(181, 34, 18.231438025832, 44.145129024982, 859.08, 0.04467, -5.76);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(181, 35, 18.231438025832, 44.145129024982, 859.08, 0.04467, -5.76);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(181, 36, 18.231438025832, 44.145129024982, 859.08, 0.04467, -5.76);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(181, 37, 18.231438025832, 44.145129024982, 859.08, 0.04467, -5.76);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(182, 33, 18.231371976435, 44.145528003573, 855.71, 0.04468, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(182, 34, 18.231371976435, 44.145528003573, 855.71, 0.04468, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(182, 35, 18.231371976435, 44.145528003573, 855.71, 0.04468, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(182, 36, 18.231371976435, 44.145528003573, 855.71, 0.04468, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(182, 37, 18.231371976435, 44.145528003573, 855.71, 0.04468, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(183, 33, 18.231411036104, 44.145887000486, 852.83, 0.04004, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(183, 34, 18.231411036104, 44.145887000486, 852.83, 0.04004, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(183, 35, 18.231411036104, 44.145887000486, 852.83, 0.04004, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(183, 36, 18.231411036104, 44.145887000486, 852.83, 0.04004, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(183, 37, 18.231411036104, 44.145887000486, 852.83, 0.04004, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(184, 33, 18.231444982812, 44.146143989637, 850.42, 0.0287, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(184, 34, 18.231444982812, 44.146143989637, 850.42, 0.0287, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(184, 35, 18.231444982812, 44.146143989637, 850.42, 0.0287, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(184, 36, 18.231444982812, 44.146143989637, 850.42, 0.0287, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(184, 37, 18.231444982812, 44.146143989637, 850.42, 0.0287, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(185, 33, 18.231610022485, 44.146481025964, 846.1, 0.03972, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(185, 34, 18.231610022485, 44.146481025964, 846.1, 0.03972, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(185, 35, 18.231610022485, 44.146481025964, 846.1, 0.03972, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(185, 36, 18.231610022485, 44.146481025964, 846.1, 0.03972, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(185, 37, 18.231610022485, 44.146481025964, 846.1, 0.03972, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(186, 33, 18.231975976378, 44.146731980145, 841.77, 0.04039, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(186, 34, 18.231975976378, 44.146731980145, 841.77, 0.04039, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(186, 35, 18.231975976378, 44.146731980145, 841.77, 0.04039, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(186, 36, 18.231975976378, 44.146731980145, 841.77, 0.04039, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(186, 37, 18.231975976378, 44.146731980145, 841.77, 0.04039, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(187, 33, 18.232067003846, 44.147065998986, 838.41, 0.03784, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(187, 34, 18.232067003846, 44.147065998986, 838.41, 0.03784, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(187, 35, 18.232067003846, 44.147065998986, 838.41, 0.03784, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(187, 36, 18.232067003846, 44.147065998986, 838.41, 0.03784, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(187, 37, 18.232067003846, 44.147065998986, 838.41, 0.03784, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(188, 33, 18.232006989419, 44.14753396064, 834.08, 0.05225, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(188, 34, 18.232006989419, 44.14753396064, 834.08, 0.05225, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(188, 35, 18.232006989419, 44.14753396064, 834.08, 0.05225, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(188, 36, 18.232006989419, 44.14753396064, 834.08, 0.05225, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(188, 37, 18.232006989419, 44.14753396064, 834.08, 0.05225, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(189, 33, 18.232322987169, 44.147940985858, 829.27, 0.05181, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(189, 34, 18.232322987169, 44.147940985858, 829.27, 0.05181, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(189, 35, 18.232322987169, 44.147940985858, 829.27, 0.05181, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(189, 36, 18.232322987169, 44.147940985858, 829.27, 0.05181, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(189, 37, 18.232322987169, 44.147940985858, 829.27, 0.05181, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(190, 33, 18.232809975743, 44.148263018578, 824.95, 0.05284, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(190, 34, 18.232809975743, 44.148263018578, 824.95, 0.05284, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(190, 35, 18.232809975743, 44.148263018578, 824.95, 0.05284, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(190, 36, 18.232809975743, 44.148263018578, 824.95, 0.05284, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(190, 37, 18.232809975743, 44.148263018578, 824.95, 0.05284, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(191, 33, 18.232958000153, 44.14836502634, 823.99, 0.01638, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(191, 34, 18.232958000153, 44.14836502634, 823.99, 0.01638, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(191, 35, 18.232958000153, 44.14836502634, 823.99, 0.01638, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(191, 36, 18.232958000153, 44.14836502634, 823.99, 0.01638, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(191, 37, 18.232958000153, 44.14836502634, 823.99, 0.01638, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(192, 33, 18.233168972656, 44.148564012721, 820.62, 0.0278, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(192, 34, 18.233168972656, 44.148564012721, 820.62, 0.0278, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(192, 35, 18.233168972656, 44.148564012721, 820.62, 0.0278, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(192, 36, 18.233168972656, 44.148564012721, 820.62, 0.0278, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(192, 37, 18.233168972656, 44.148564012721, 820.62, 0.0278, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(193, 33, 18.233266035095, 44.148885961622, 817.26, 0.03663, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(193, 34, 18.233266035095, 44.148885961622, 817.26, 0.03663, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(193, 35, 18.233266035095, 44.148885961622, 817.26, 0.03663, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(193, 36, 18.233266035095, 44.148885961622, 817.26, 0.03663, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(193, 37, 18.233266035095, 44.148885961622, 817.26, 0.03663, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(194, 33, 18.233253965154, 44.149193996564, 812.93, 0.03427, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(194, 34, 18.233253965154, 44.149193996564, 812.93, 0.03427, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(194, 35, 18.233253965154, 44.149193996564, 812.93, 0.03427, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(194, 36, 18.233253965154, 44.149193996564, 812.93, 0.03427, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(194, 37, 18.233253965154, 44.149193996564, 812.93, 0.03427, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(195, 33, 18.233307022601, 44.149513011798, 809.57, 0.03572, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(195, 34, 18.233307022601, 44.149513011798, 809.57, 0.03572, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(195, 35, 18.233307022601, 44.149513011798, 809.57, 0.03572, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(195, 36, 18.233307022601, 44.149513011798, 809.57, 0.03572, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(195, 37, 18.233307022601, 44.149513011798, 809.57, 0.03572, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(196, 33, 18.233254970983, 44.149846024811, 804.28, 0.03726, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(196, 34, 18.233254970983, 44.149846024811, 804.28, 0.03726, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(196, 35, 18.233254970983, 44.149846024811, 804.28, 0.03726, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(196, 36, 18.233254970983, 44.149846024811, 804.28, 0.03726, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(196, 37, 18.233254970983, 44.149846024811, 804.28, 0.03726, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(197, 33, 18.233054978773, 44.15022698231, 800.44, 0.04527, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(197, 34, 18.233054978773, 44.15022698231, 800.44, 0.04527, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(197, 35, 18.233054978773, 44.15022698231, 800.44, 0.04527, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(197, 36, 18.233054978773, 44.15022698231, 800.44, 0.04527, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(197, 37, 18.233054978773, 44.15022698231, 800.44, 0.04527, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(198, 33, 18.232714002952, 44.150489000604, 795.15, 0.03986, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(198, 34, 18.232714002952, 44.150489000604, 795.15, 0.03986, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(198, 35, 18.232714002952, 44.150489000604, 795.15, 0.03986, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(198, 36, 18.232714002952, 44.150489000604, 795.15, 0.03986, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(198, 37, 18.232714002952, 44.150489000604, 795.15, 0.03986, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(199, 33, 18.232070021331, 44.150543985888, 789.38, 0.05174, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(199, 34, 18.232070021331, 44.150543985888, 789.38, 0.05174, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(199, 35, 18.232070021331, 44.150543985888, 789.38, 0.05174, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(199, 36, 18.232070021331, 44.150543985888, 789.38, 0.05174, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(199, 37, 18.232070021331, 44.150543985888, 789.38, 0.05174, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(200, 33, 18.231576997787, 44.150889990851, 785.53, 0.05502, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(200, 34, 18.231576997787, 44.150889990851, 785.53, 0.05502, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(200, 35, 18.231576997787, 44.150889990851, 785.53, 0.05502, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(200, 36, 18.231576997787, 44.150889990851, 785.53, 0.05502, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(200, 37, 18.231576997787, 44.150889990851, 785.53, 0.05502, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(201, 33, 18.231313973665, 44.151042960584, 781.21, 0.02701, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(201, 34, 18.231313973665, 44.151042960584, 781.21, 0.02701, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(201, 35, 18.231313973665, 44.151042960584, 781.21, 0.02701, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(201, 36, 18.231313973665, 44.151042960584, 781.21, 0.02701, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(201, 37, 18.231313973665, 44.151042960584, 781.21, 0.02701, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(202, 33, 18.231193022802, 44.151400029659, 776.4, 0.04086, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(202, 34, 18.231193022802, 44.151400029659, 776.4, 0.04086, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(202, 35, 18.231193022802, 44.151400029659, 776.4, 0.04086, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(202, 36, 18.231193022802, 44.151400029659, 776.4, 0.04086, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(202, 37, 18.231193022802, 44.151400029659, 776.4, 0.04086, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(203, 33, 18.231998020783, 44.15172801353, 771.6, 0.07386, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(203, 34, 18.231998020783, 44.15172801353, 771.6, 0.07386, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(203, 35, 18.231998020783, 44.15172801353, 771.6, 0.07386, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(203, 36, 18.231998020783, 44.15172801353, 771.6, 0.07386, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(203, 37, 18.231998020783, 44.15172801353, 771.6, 0.07386, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(204, 33, 18.232327010483, 44.152020039037, 766.31, 0.04175, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(204, 34, 18.232327010483, 44.152020039037, 766.31, 0.04175, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(204, 35, 18.232327010483, 44.152020039037, 766.31, 0.04175, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(204, 36, 18.232327010483, 44.152020039037, 766.31, 0.04175, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(204, 37, 18.232327010483, 44.152020039037, 766.31, 0.04175, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(205, 33, 18.232393981889, 44.152399990708, 762.46, 0.04259, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(205, 34, 18.232393981889, 44.152399990708, 762.46, 0.04259, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(205, 35, 18.232393981889, 44.152399990708, 762.46, 0.04259, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(205, 36, 18.232393981889, 44.152399990708, 762.46, 0.04259, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(205, 37, 18.232393981889, 44.152399990708, 762.46, 0.04259, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(206, 33, 18.232355006039, 44.152836017311, 757.18, 0.04858, -5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(206, 34, 18.232355006039, 44.152836017311, 757.18, 0.04858, -5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(206, 35, 18.232355006039, 44.152836017311, 757.18, 0.04858, -5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(206, 36, 18.232355006039, 44.152836017311, 757.18, 0.04858, -5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(206, 37, 18.232355006039, 44.152836017311, 757.18, 0.04858, -5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(207, 33, 18.232269007713, 44.153247987852, 751.89, 0.04632, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(207, 34, 18.232269007713, 44.153247987852, 751.89, 0.04632, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(207, 35, 18.232269007713, 44.153247987852, 751.89, 0.04632, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(207, 36, 18.232269007713, 44.153247987852, 751.89, 0.04632, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(207, 37, 18.232269007713, 44.153247987852, 751.89, 0.04632, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(208, 33, 18.232108997181, 44.153615031391, 746.12, 0.04276, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(208, 34, 18.232108997181, 44.153615031391, 746.12, 0.04276, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(208, 35, 18.232108997181, 44.153615031391, 746.12, 0.04276, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(208, 36, 18.232108997181, 44.153615031391, 746.12, 0.04276, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(208, 37, 18.232108997181, 44.153615031391, 746.12, 0.04276, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(209, 33, 18.232063986361, 44.153670016676, 746.12, 0.00709, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(209, 34, 18.232063986361, 44.153670016676, 746.12, 0.00709, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(209, 35, 18.232063986361, 44.153670016676, 746.12, 0.00709, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(209, 36, 18.232063986361, 44.153670016676, 746.12, 0.00709, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(209, 37, 18.232063986361, 44.153670016676, 746.12, 0.00709, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(210, 33, 18.231629971415, 44.1541699972, 741.79, 0.0655, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(210, 34, 18.231629971415, 44.1541699972, 741.79, 0.0655, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(210, 35, 18.231629971415, 44.1541699972, 741.79, 0.0655, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(210, 36, 18.231629971415, 44.1541699972, 741.79, 0.0655, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(210, 37, 18.231629971415, 44.1541699972, 741.79, 0.0655, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(211, 33, 18.23185720481, 44.154715659097, 741.79, 0.06333, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(211, 34, 18.23185720481, 44.154715659097, 741.79, 0.06333, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(211, 35, 18.23185720481, 44.154715659097, 741.79, 0.06333, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(211, 36, 18.23185720481, 44.154715659097, 741.79, 0.06333, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(211, 37, 18.23185720481, 44.154715659097, 741.79, 0.06333, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(212, 33, 18.23195585981, 44.154744325206, 738.43, 0.00849, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(212, 34, 18.23195585981, 44.154744325206, 738.43, 0.00849, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(212, 35, 18.23195585981, 44.154744325206, 738.43, 0.00849, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(212, 36, 18.23195585981, 44.154744325206, 738.43, 0.00849, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(212, 37, 18.23195585981, 44.154744325206, 738.43, 0.00849, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(213, 33, 18.232021741569, 44.154731668532, 738.43, 0.00544, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(213, 34, 18.232021741569, 44.154731668532, 738.43, 0.00544, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(213, 35, 18.232021741569, 44.154731668532, 738.43, 0.00544, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(213, 36, 18.232021741569, 44.154731668532, 738.43, 0.00544, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(213, 37, 18.232021741569, 44.154731668532, 738.43, 0.00544, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(214, 33, 18.232141016051, 44.15470501408, 736.03, 0.00997, -2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(214, 34, 18.232141016051, 44.15470501408, 736.03, 0.00997, -2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(214, 35, 18.232141016051, 44.15470501408, 736.03, 0.00997, -2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(214, 36, 18.232141016051, 44.15470501408, 736.03, 0.00997, -2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(214, 37, 18.232141016051, 44.15470501408, 736.03, 0.00997, -2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(215, 33, 18.232396999374, 44.1544470191, 734.58, 0.03521, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(215, 34, 18.232396999374, 44.1544470191, 734.58, 0.03521, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(215, 35, 18.232396999374, 44.1544470191, 734.58, 0.03521, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(215, 36, 18.232396999374, 44.1544470191, 734.58, 0.03521, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(215, 37, 18.232396999374, 44.1544470191, 734.58, 0.03521, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(216, 33, 18.232749039307, 44.154174020514, 734.58, 0.04136, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(216, 34, 18.232749039307, 44.154174020514, 734.58, 0.04136, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(216, 35, 18.232749039307, 44.154174020514, 734.58, 0.04136, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(216, 36, 18.232749039307, 44.154174020514, 734.58, 0.04136, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(216, 37, 18.232749039307, 44.154174020514, 734.58, 0.04136, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(217, 33, 18.233150029555, 44.153637997806, 734.1, 0.06765, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(217, 34, 18.233150029555, 44.153637997806, 734.1, 0.06765, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(217, 35, 18.233150029555, 44.153637997806, 734.1, 0.06765, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(217, 36, 18.233150029555, 44.153637997806, 734.1, 0.06765, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(217, 37, 18.233150029555, 44.153637997806, 734.1, 0.06765, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(218, 33, 18.233135025948, 44.152891002595, 737.47, 0.08307, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(218, 34, 18.233135025948, 44.152891002595, 737.47, 0.08307, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(218, 35, 18.233135025948, 44.152891002595, 737.47, 0.08307, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(218, 36, 18.233135025948, 44.152891002595, 737.47, 0.08307, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(218, 37, 18.233135025948, 44.152891002595, 737.47, 0.08307, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(219, 33, 18.233286989853, 44.152632001787, 737.47, 0.03125, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(219, 34, 18.233286989853, 44.152632001787, 737.47, 0.03125, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(219, 35, 18.233286989853, 44.152632001787, 737.47, 0.03125, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(219, 36, 18.233286989853, 44.152632001787, 737.47, 0.03125, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(219, 37, 18.233286989853, 44.152632001787, 737.47, 0.03125, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(220, 33, 18.233535010368, 44.152277028188, 740.83, 0.04415, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(220, 34, 18.233535010368, 44.152277028188, 740.83, 0.04415, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(220, 35, 18.233535010368, 44.152277028188, 740.83, 0.04415, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(220, 36, 18.233535010368, 44.152277028188, 740.83, 0.04415, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(220, 37, 18.233535010368, 44.152277028188, 740.83, 0.04415, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(221, 33, 18.234080001712, 44.15194099769, 742.76, 0.05733, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(221, 34, 18.234080001712, 44.15194099769, 742.76, 0.05733, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(221, 35, 18.234080001712, 44.15194099769, 742.76, 0.05733, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(221, 36, 18.234080001712, 44.15194099769, 742.76, 0.05733, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(221, 37, 18.234080001712, 44.15194099769, 742.76, 0.05733, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(222, 33, 18.234745021909, 44.151551993564, 742.76, 0.06845, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(222, 34, 18.234745021909, 44.151551993564, 742.76, 0.06845, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(222, 35, 18.234745021909, 44.151551993564, 742.76, 0.06845, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(222, 36, 18.234745021909, 44.151551993564, 742.76, 0.06845, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(222, 37, 18.234745021909, 44.151551993564, 742.76, 0.06845, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(223, 33, 18.235314991325, 44.150979006663, 746.6, 0.07828, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(223, 34, 18.235314991325, 44.150979006663, 746.6, 0.07828, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(223, 35, 18.235314991325, 44.150979006663, 746.6, 0.07828, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(223, 36, 18.235314991325, 44.150979006663, 746.6, 0.07828, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(223, 37, 18.235314991325, 44.150979006663, 746.6, 0.07828, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(224, 33, 18.23557600379, 44.150363020599, 752.85, 0.07159, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(224, 34, 18.23557600379, 44.150363020599, 752.85, 0.07159, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(224, 35, 18.23557600379, 44.150363020599, 752.85, 0.07159, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(224, 36, 18.23557600379, 44.150363020599, 752.85, 0.07159, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(224, 37, 18.23557600379, 44.150363020599, 752.85, 0.07159, 6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(225, 33, 18.235818995163, 44.150078035891, 756.69, 0.03715, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(225, 34, 18.235818995163, 44.150078035891, 756.69, 0.03715, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(225, 35, 18.235818995163, 44.150078035891, 756.69, 0.03715, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(225, 36, 18.235818995163, 44.150078035891, 756.69, 0.03715, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(225, 37, 18.235818995163, 44.150078035891, 756.69, 0.03715, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(226, 33, 18.235895019025, 44.149991031736, 758.62, 0.01142, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(226, 34, 18.235895019025, 44.149991031736, 758.62, 0.01142, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(226, 35, 18.235895019025, 44.149991031736, 758.62, 0.01142, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(226, 36, 18.235895019025, 44.149991031736, 758.62, 0.01142, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(226, 37, 18.235895019025, 44.149991031736, 758.62, 0.01142, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(227, 33, 18.236114960164, 44.149733958766, 762.94, 0.03354, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(227, 34, 18.236114960164, 44.149733958766, 762.94, 0.03354, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(227, 35, 18.236114960164, 44.149733958766, 762.94, 0.03354, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(227, 36, 18.236114960164, 44.149733958766, 762.94, 0.03354, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(227, 37, 18.236114960164, 44.149733958766, 762.94, 0.03354, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(228, 33, 18.236629022285, 44.14917002432, 768.71, 0.07493, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(228, 34, 18.236629022285, 44.14917002432, 768.71, 0.07493, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(228, 35, 18.236629022285, 44.14917002432, 768.71, 0.07493, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(228, 36, 18.236629022285, 44.14917002432, 768.71, 0.07493, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(228, 37, 18.236629022285, 44.14917002432, 768.71, 0.07493, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(229, 33, 18.236914006993, 44.148914040998, 772.08, 0.03643, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(229, 34, 18.236914006993, 44.148914040998, 772.08, 0.03643, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(229, 35, 18.236914006993, 44.148914040998, 772.08, 0.03643, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(229, 36, 18.236914006993, 44.148914040998, 772.08, 0.03643, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(229, 37, 18.236914006993, 44.148914040998, 772.08, 0.03643, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(230, 33, 18.2369290106, 44.1488999594, 772.08, 0.00197, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(230, 34, 18.2369290106, 44.1488999594, 772.08, 0.00197, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(230, 35, 18.2369290106, 44.1488999594, 772.08, 0.00197, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(230, 36, 18.2369290106, 44.1488999594, 772.08, 0.00197, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(230, 37, 18.2369290106, 44.1488999594, 772.08, 0.00197, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(231, 33, 18.237325977534, 44.148708013818, 775.92, 0.03819, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(231, 34, 18.237325977534, 44.148708013818, 775.92, 0.03819, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(231, 35, 18.237325977534, 44.148708013818, 775.92, 0.03819, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(231, 36, 18.237325977534, 44.148708013818, 775.92, 0.03819, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(231, 37, 18.237325977534, 44.148708013818, 775.92, 0.03819, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(232, 33, 18.238093005493, 44.148543979973, 779.29, 0.06386, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(232, 34, 18.238093005493, 44.148543979973, 779.29, 0.06386, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(232, 35, 18.238093005493, 44.148543979973, 779.29, 0.06386, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(232, 36, 18.238093005493, 44.148543979973, 779.29, 0.06386, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(232, 37, 18.238093005493, 44.148543979973, 779.29, 0.06386, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(233, 33, 18.238351000473, 44.148441972211, 783.13, 0.0235, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(233, 34, 18.238351000473, 44.148441972211, 783.13, 0.0235, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(233, 35, 18.238351000473, 44.148441972211, 783.13, 0.0235, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(233, 36, 18.238351000473, 44.148441972211, 783.13, 0.0235, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(233, 37, 18.238351000473, 44.148441972211, 783.13, 0.0235, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(234, 33, 18.238734975457, 44.14821096696, 785.05, 0.03998, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(234, 34, 18.238734975457, 44.14821096696, 785.05, 0.03998, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(234, 35, 18.238734975457, 44.14821096696, 785.05, 0.03998, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(234, 36, 18.238734975457, 44.14821096696, 785.05, 0.03998, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(234, 37, 18.238734975457, 44.14821096696, 785.05, 0.03998, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(235, 33, 18.239496974275, 44.148051040247, 789.38, 0.06334, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(235, 34, 18.239496974275, 44.148051040247, 789.38, 0.06334, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(235, 35, 18.239496974275, 44.148051040247, 789.38, 0.06334, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(235, 36, 18.239496974275, 44.148051040247, 789.38, 0.06334, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(235, 37, 18.239496974275, 44.148051040247, 789.38, 0.06334, 4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(236, 33, 18.239854965359, 44.147983985022, 792.74, 0.02952, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(236, 34, 18.239854965359, 44.147983985022, 792.74, 0.02952, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(236, 35, 18.239854965359, 44.147983985022, 792.74, 0.02952, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(236, 36, 18.239854965359, 44.147983985022, 792.74, 0.02952, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(236, 37, 18.239854965359, 44.147983985022, 792.74, 0.02952, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(237, 33, 18.240268025547, 44.147927993909, 792.74, 0.03354, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(237, 34, 18.240268025547, 44.147927993909, 792.74, 0.03354, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(237, 35, 18.240268025547, 44.147927993909, 792.74, 0.03354, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(237, 36, 18.240268025547, 44.147927993909, 792.74, 0.03354, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(237, 37, 18.240268025547, 44.147927993909, 792.74, 0.03354, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(238, 33, 18.240848975256, 44.147741999477, 794.67, 0.05076, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(238, 34, 18.240848975256, 44.147741999477, 794.67, 0.05076, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(238, 35, 18.240848975256, 44.147741999477, 794.67, 0.05076, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(238, 36, 18.240848975256, 44.147741999477, 794.67, 0.05076, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(238, 37, 18.240848975256, 44.147741999477, 794.67, 0.05076, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(239, 33, 18.241489017382, 44.147968981415, 794.67, 0.05696, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(239, 34, 18.241489017382, 44.147968981415, 794.67, 0.05696, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(239, 35, 18.241489017382, 44.147968981415, 794.67, 0.05696, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(239, 36, 18.241489017382, 44.147968981415, 794.67, 0.05696, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(239, 37, 18.241489017382, 44.147968981415, 794.67, 0.05696, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(240, 33, 18.242386970669, 44.147821040824, 798.99, 0.07351, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(240, 34, 18.242386970669, 44.147821040824, 798.99, 0.07351, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(240, 35, 18.242386970669, 44.147821040824, 798.99, 0.07351, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(240, 36, 18.242386970669, 44.147821040824, 798.99, 0.07351, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(240, 37, 18.242386970669, 44.147821040824, 798.99, 0.07351, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(241, 33, 18.242169963196, 44.147356012836, 803.8, 0.05453, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(241, 34, 18.242169963196, 44.147356012836, 803.8, 0.05453, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(241, 35, 18.242169963196, 44.147356012836, 803.8, 0.05453, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(241, 36, 18.242169963196, 44.147356012836, 803.8, 0.05453, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(241, 37, 18.242169963196, 44.147356012836, 803.8, 0.05453, 4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(242, 33, 18.242084970698, 44.147043032572, 805.72, 0.03546, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(242, 34, 18.242084970698, 44.147043032572, 805.72, 0.03546, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(242, 35, 18.242084970698, 44.147043032572, 805.72, 0.03546, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(242, 36, 18.242084970698, 44.147043032572, 805.72, 0.03546, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(242, 37, 18.242084970698, 44.147043032572, 805.72, 0.03546, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(243, 33, 18.242119001225, 44.146911017597, 806.68, 0.01493, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(243, 34, 18.242119001225, 44.146911017597, 806.68, 0.01493, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(243, 35, 18.242119001225, 44.146911017597, 806.68, 0.01493, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(243, 36, 18.242119001225, 44.146911017597, 806.68, 0.01493, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(243, 37, 18.242119001225, 44.146911017597, 806.68, 0.01493, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(244, 33, 18.241885984316, 44.146418999881, 810.05, 0.05778, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(244, 34, 18.241885984316, 44.146418999881, 810.05, 0.05778, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(244, 35, 18.241885984316, 44.146418999881, 810.05, 0.05778, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(244, 36, 18.241885984316, 44.146418999881, 810.05, 0.05778, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(244, 37, 18.241885984316, 44.146418999881, 810.05, 0.05778, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(245, 33, 18.241247031838, 44.145940979943, 811.01, 0.07365, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(245, 34, 18.241247031838, 44.145940979943, 811.01, 0.07365, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(245, 35, 18.241247031838, 44.145940979943, 811.01, 0.07365, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(245, 36, 18.241247031838, 44.145940979943, 811.01, 0.07365, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(245, 37, 18.241247031838, 44.145940979943, 811.01, 0.07365, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(246, 33, 18.241193974391, 44.145913990214, 811.01, 0.00519, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(246, 34, 18.241193974391, 44.145913990214, 811.01, 0.00519, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(246, 35, 18.241193974391, 44.145913990214, 811.01, 0.00519, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(246, 36, 18.241193974391, 44.145913990214, 811.01, 0.00519, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(246, 37, 18.241193974391, 44.145913990214, 811.01, 0.00519, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(247, 33, 18.241051984951, 44.145836038515, 811.49, 0.01426, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(247, 34, 18.241051984951, 44.145836038515, 811.49, 0.01426, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(247, 35, 18.241051984951, 44.145836038515, 811.49, 0.01426, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(247, 36, 18.241051984951, 44.145836038515, 811.49, 0.01426, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(247, 37, 18.241051984951, 44.145836038515, 811.49, 0.01426, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(248, 33, 18.240036014467, 44.144800035283, 811.97, 0.14086, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(248, 34, 18.240036014467, 44.144800035283, 811.97, 0.14086, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(248, 35, 18.240036014467, 44.144800035283, 811.97, 0.14086, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(248, 36, 18.240036014467, 44.144800035283, 811.97, 0.14086, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(248, 37, 18.240036014467, 44.144800035283, 811.97, 0.14086, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(249, 33, 18.239623960108, 44.144337018952, 815.34, 0.06109, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(249, 34, 18.239623960108, 44.144337018952, 815.34, 0.06109, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(249, 35, 18.239623960108, 44.144337018952, 815.34, 0.06109, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(249, 36, 18.239623960108, 44.144337018952, 815.34, 0.06109, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(249, 37, 18.239623960108, 44.144337018952, 815.34, 0.06109, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(250, 33, 18.239896958694, 44.143940974027, 819.66, 0.04913, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(250, 34, 18.239896958694, 44.143940974027, 819.66, 0.04913, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(250, 35, 18.239896958694, 44.143940974027, 819.66, 0.04913, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(250, 36, 18.239896958694, 44.143940974027, 819.66, 0.04913, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(250, 37, 18.239896958694, 44.143940974027, 819.66, 0.04913, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(251, 33, 18.240189990029, 44.143578959629, 823.03, 0.04655, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(251, 34, 18.240189990029, 44.143578959629, 823.03, 0.04655, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(251, 35, 18.240189990029, 44.143578959629, 823.03, 0.04655, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(251, 36, 18.240189990029, 44.143578959629, 823.03, 0.04655, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(251, 37, 18.240189990029, 44.143578959629, 823.03, 0.04655, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(252, 33, 18.240171968937, 44.143295986578, 821.58, 0.0315, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(252, 34, 18.240171968937, 44.143295986578, 821.58, 0.0315, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(252, 35, 18.240171968937, 44.143295986578, 821.58, 0.0315, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(252, 36, 18.240171968937, 44.143295986578, 821.58, 0.0315, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(252, 37, 18.240171968937, 44.143295986578, 821.58, 0.0315, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(253, 33, 18.240171968937, 44.143295986578, 825.43, 0, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(253, 34, 18.240171968937, 44.143295986578, 825.43, 0, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(253, 35, 18.240171968937, 44.143295986578, 825.43, 0, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(253, 36, 18.240171968937, 44.143295986578, 825.43, 0, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(253, 37, 18.240171968937, 44.143295986578, 825.43, 0, 3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(254, 33, 18.240142967552, 44.14308199659, 823.99, 0.02391, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(254, 34, 18.240142967552, 44.14308199659, 823.99, 0.02391, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(254, 35, 18.240142967552, 44.14308199659, 823.99, 0.02391, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(254, 36, 18.240142967552, 44.14308199659, 823.99, 0.02391, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(254, 37, 18.240142967552, 44.14308199659, 823.99, 0.02391, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(255, 33, 18.240106003359, 44.143051989377, 823.03, 0.00445, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(255, 34, 18.240106003359, 44.143051989377, 823.03, 0.00445, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(255, 35, 18.240106003359, 44.143051989377, 823.03, 0.00445, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(255, 36, 18.240106003359, 44.143051989377, 823.03, 0.00445, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(255, 37, 18.240106003359, 44.143051989377, 823.03, 0.00445, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(256, 33, 18.240069039166, 44.142964985222, 821.58, 0.01011, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(256, 34, 18.240069039166, 44.142964985222, 821.58, 0.01011, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(256, 35, 18.240069039166, 44.142964985222, 821.58, 0.01011, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(256, 36, 18.240069039166, 44.142964985222, 821.58, 0.01011, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(256, 37, 18.240069039166, 44.142964985222, 821.58, 0.01011, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(257, 33, 18.239588001743, 44.142459975556, 818.7, 0.06802, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(257, 34, 18.239588001743, 44.142459975556, 818.7, 0.06802, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(257, 35, 18.239588001743, 44.142459975556, 818.7, 0.06802, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(257, 36, 18.239588001743, 44.142459975556, 818.7, 0.06802, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(257, 37, 18.239588001743, 44.142459975556, 818.7, 0.06802, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(258, 33, 18.239224981517, 44.141965024173, 812.45, 0.06219, -6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(258, 34, 18.239224981517, 44.141965024173, 812.45, 0.06219, -6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(258, 35, 18.239224981517, 44.141965024173, 812.45, 0.06219, -6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(258, 36, 18.239224981517, 44.141965024173, 812.45, 0.06219, -6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(258, 37, 18.239224981517, 44.141965024173, 812.45, 0.06219, -6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(259, 33, 18.239116016775, 44.14172898978, 806.68, 0.02765, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(259, 34, 18.239116016775, 44.14172898978, 806.68, 0.02765, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(259, 35, 18.239116016775, 44.14172898978, 806.68, 0.02765, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(259, 36, 18.239116016775, 44.14172898978, 806.68, 0.02765, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(259, 37, 18.239116016775, 44.14172898978, 806.68, 0.02765, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(260, 33, 18.239014009014, 44.141505025327, 800.92, 0.0262, -5.76);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(260, 34, 18.239014009014, 44.141505025327, 800.92, 0.0262, -5.76);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(260, 35, 18.239014009014, 44.141505025327, 800.92, 0.0262, -5.76);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(260, 36, 18.239014009014, 44.141505025327, 800.92, 0.0262, -5.76);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(260, 37, 18.239014009014, 44.141505025327, 800.92, 0.0262, -5.76);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(261, 33, 18.238933039829, 44.141368987039, 796.59, 0.01645, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(261, 34, 18.238933039829, 44.141368987039, 796.59, 0.01645, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(261, 35, 18.238933039829, 44.141368987039, 796.59, 0.01645, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(261, 36, 18.238933039829, 44.141368987039, 796.59, 0.01645, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(261, 37, 18.238933039829, 44.141368987039, 796.59, 0.01645, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(262, 33, 18.238838994876, 44.141082996503, 790.82, 0.03267, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(262, 34, 18.238838994876, 44.141082996503, 790.82, 0.03267, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(262, 35, 18.238838994876, 44.141082996503, 790.82, 0.03267, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(262, 36, 18.238838994876, 44.141082996503, 790.82, 0.03267, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(262, 37, 18.238838994876, 44.141082996503, 790.82, 0.03267, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(263, 33, 18.238705974072, 44.140533981845, 789.38, 0.06196, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(263, 34, 18.238705974072, 44.140533981845, 789.38, 0.06196, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(263, 35, 18.238705974072, 44.140533981845, 789.38, 0.06196, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(263, 36, 18.238705974072, 44.140533981845, 789.38, 0.06196, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(263, 37, 18.238705974072, 44.140533981845, 789.38, 0.06196, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(264, 33, 18.238677978516, 44.14041403681, 787.94, 0.01352, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(264, 34, 18.238677978516, 44.14041403681, 787.94, 0.01352, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(264, 35, 18.238677978516, 44.14041403681, 787.94, 0.01352, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(264, 36, 18.238677978516, 44.14041403681, 787.94, 0.01352, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(264, 37, 18.238677978516, 44.14041403681, 787.94, 0.01352, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(265, 33, 18.238653000444, 44.140281016007, 787.46, 0.01492, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(265, 34, 18.238653000444, 44.140281016007, 787.46, 0.01492, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(265, 35, 18.238653000444, 44.140281016007, 787.46, 0.01492, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(265, 36, 18.238653000444, 44.140281016007, 787.46, 0.01492, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(265, 37, 18.238653000444, 44.140281016007, 787.46, 0.01492, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(266, 33, 18.238554010168, 44.139929981902, 788.9, 0.03982, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(266, 34, 18.238554010168, 44.139929981902, 788.9, 0.03982, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(266, 35, 18.238554010168, 44.139929981902, 788.9, 0.03982, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(266, 36, 18.238554010168, 44.139929981902, 788.9, 0.03982, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(266, 37, 18.238554010168, 44.139929981902, 788.9, 0.03982, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(267, 33, 18.238460971043, 44.139513988048, 785.53, 0.04685, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(267, 34, 18.238460971043, 44.139513988048, 785.53, 0.04685, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(267, 35, 18.238460971043, 44.139513988048, 785.53, 0.04685, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(267, 36, 18.238460971043, 44.139513988048, 785.53, 0.04685, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(267, 37, 18.238460971043, 44.139513988048, 785.53, 0.04685, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(268, 33, 18.238614024594, 44.13933201693, 784.09, 0.02363, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(268, 34, 18.238614024594, 44.13933201693, 784.09, 0.02363, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(268, 35, 18.238614024594, 44.13933201693, 784.09, 0.02363, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(268, 36, 18.238614024594, 44.13933201693, 784.09, 0.02363, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(268, 37, 18.238614024594, 44.13933201693, 784.09, 0.02363, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(269, 33, 18.238882999867, 44.138962961733, 782.65, 0.04631, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(269, 34, 18.238882999867, 44.138962961733, 782.65, 0.04631, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(269, 35, 18.238882999867, 44.138962961733, 782.65, 0.04631, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(269, 36, 18.238882999867, 44.138962961733, 782.65, 0.04631, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(269, 37, 18.238882999867, 44.138962961733, 782.65, 0.04631, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(270, 33, 18.239024989307, 44.138621985912, 781.69, 0.03957, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(270, 34, 18.239024989307, 44.138621985912, 781.69, 0.03957, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(270, 35, 18.239024989307, 44.138621985912, 781.69, 0.03957, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(270, 36, 18.239024989307, 44.138621985912, 781.69, 0.03957, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(270, 37, 18.239024989307, 44.138621985912, 781.69, 0.03957, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(271, 33, 18.238965980709, 44.138107001781, 777.84, 0.05746, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(271, 34, 18.238965980709, 44.138107001781, 777.84, 0.05746, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(271, 35, 18.238965980709, 44.138107001781, 777.84, 0.05746, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(271, 36, 18.238965980709, 44.138107001781, 777.84, 0.05746, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(271, 37, 18.238965980709, 44.138107001781, 777.84, 0.05746, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(272, 33, 18.238976038992, 44.137828974053, 773.04, 0.03093, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(272, 34, 18.238976038992, 44.137828974053, 773.04, 0.03093, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(272, 35, 18.238976038992, 44.137828974053, 773.04, 0.03093, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(272, 36, 18.238976038992, 44.137828974053, 773.04, 0.03093, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(272, 37, 18.238976038992, 44.137828974053, 773.04, 0.03093, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(273, 33, 18.238844024017, 44.137697964907, 770.63, 0.01798, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(273, 34, 18.238844024017, 44.137697964907, 770.63, 0.01798, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(273, 35, 18.238844024017, 44.137697964907, 770.63, 0.01798, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(273, 36, 18.238844024017, 44.137697964907, 770.63, 0.01798, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(273, 37, 18.238844024017, 44.137697964907, 770.63, 0.01798, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(274, 33, 18.238663980737, 44.13752797991, 766.79, 0.02374, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(274, 34, 18.238663980737, 44.13752797991, 766.79, 0.02374, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(274, 35, 18.238663980737, 44.13752797991, 766.79, 0.02374, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(274, 36, 18.238663980737, 44.13752797991, 766.79, 0.02374, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(274, 37, 18.238663980737, 44.13752797991, 766.79, 0.02374, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(275, 33, 18.238656017929, 44.137528985739, 767.27, 0.00065, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(275, 34, 18.238656017929, 44.137528985739, 767.27, 0.00065, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(275, 35, 18.238656017929, 44.137528985739, 767.27, 0.00065, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(275, 36, 18.238656017929, 44.137528985739, 767.27, 0.00065, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(275, 37, 18.238656017929, 44.137528985739, 767.27, 0.00065, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(276, 33, 18.238521991298, 44.137587994337, 763.9, 0.01255, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(276, 34, 18.238521991298, 44.137587994337, 763.9, 0.01255, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(276, 35, 18.238521991298, 44.137587994337, 763.9, 0.01255, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(276, 36, 18.238521991298, 44.137587994337, 763.9, 0.01255, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(276, 37, 18.238521991298, 44.137587994337, 763.9, 0.01255, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(277, 33, 18.238450996578, 44.137561004609, 759.1, 0.00641, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(277, 34, 18.238450996578, 44.137561004609, 759.1, 0.00641, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(277, 35, 18.238450996578, 44.137561004609, 759.1, 0.00641, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(277, 36, 18.238450996578, 44.137561004609, 759.1, 0.00641, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(277, 37, 18.238450996578, 44.137561004609, 759.1, 0.00641, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(278, 33, 18.238461976871, 44.137398982421, 755.25, 0.01804, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(278, 34, 18.238461976871, 44.137398982421, 755.25, 0.01804, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(278, 35, 18.238461976871, 44.137398982421, 755.25, 0.01804, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(278, 36, 18.238461976871, 44.137398982421, 755.25, 0.01804, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(278, 37, 18.238461976871, 44.137398982421, 755.25, 0.01804, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(279, 33, 18.238425012678, 44.137170994654, 750.93, 0.02552, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(279, 34, 18.238425012678, 44.137170994654, 750.93, 0.02552, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(279, 35, 18.238425012678, 44.137170994654, 750.93, 0.02552, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(279, 36, 18.238425012678, 44.137170994654, 750.93, 0.02552, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(279, 37, 18.238425012678, 44.137170994654, 750.93, 0.02552, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(280, 33, 18.238412020728, 44.1370320227, 747.56, 0.01549, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(280, 34, 18.238412020728, 44.1370320227, 747.56, 0.01549, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(280, 35, 18.238412020728, 44.1370320227, 747.56, 0.01549, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(280, 36, 18.238412020728, 44.1370320227, 747.56, 0.01549, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(280, 37, 18.238412020728, 44.1370320227, 747.56, 0.01549, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(281, 33, 18.238292997703, 44.136768998578, 744.2, 0.03075, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(281, 34, 18.238292997703, 44.136768998578, 744.2, 0.03075, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(281, 35, 18.238292997703, 44.136768998578, 744.2, 0.03075, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(281, 36, 18.238292997703, 44.136768998578, 744.2, 0.03075, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(281, 37, 18.238292997703, 44.136768998578, 744.2, 0.03075, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(282, 33, 18.238102979958, 44.136579986662, 740.83, 0.02592, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(282, 34, 18.238102979958, 44.136579986662, 740.83, 0.02592, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(282, 35, 18.238102979958, 44.136579986662, 740.83, 0.02592, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(282, 36, 18.238102979958, 44.136579986662, 740.83, 0.02592, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(282, 37, 18.238102979958, 44.136579986662, 740.83, 0.02592, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(283, 33, 18.237742977217, 44.136271029711, 737.47, 0.04478, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(283, 34, 18.237742977217, 44.136271029711, 737.47, 0.04478, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(283, 35, 18.237742977217, 44.136271029711, 737.47, 0.04478, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(283, 36, 18.237742977217, 44.136271029711, 737.47, 0.04478, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(283, 37, 18.237742977217, 44.136271029711, 737.47, 0.04478, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(284, 33, 18.237657984719, 44.136102972552, 734.1, 0.01988, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(284, 34, 18.237657984719, 44.136102972552, 734.1, 0.01988, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(284, 35, 18.237657984719, 44.136102972552, 734.1, 0.01988, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(284, 36, 18.237657984719, 44.136102972552, 734.1, 0.01988, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(284, 37, 18.237657984719, 44.136102972552, 734.1, 0.01988, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(285, 33, 18.23764398694, 44.135982021689, 730.26, 0.0135, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(285, 34, 18.23764398694, 44.135982021689, 730.26, 0.0135, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(285, 35, 18.23764398694, 44.135982021689, 730.26, 0.0135, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(285, 36, 18.23764398694, 44.135982021689, 730.26, 0.0135, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(285, 37, 18.23764398694, 44.135982021689, 730.26, 0.0135, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(286, 33, 18.237641975284, 44.135927958414, 727.86, 0.00601, -2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(286, 34, 18.237641975284, 44.135927958414, 727.86, 0.00601, -2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(286, 35, 18.237641975284, 44.135927958414, 727.86, 0.00601, -2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(286, 36, 18.237641975284, 44.135927958414, 727.86, 0.00601, -2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(286, 37, 18.237641975284, 44.135927958414, 727.86, 0.00601, -2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(287, 33, 18.237581960857, 44.13537601009, 722.09, 0.06156, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(287, 34, 18.237581960857, 44.13537601009, 722.09, 0.06156, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(287, 35, 18.237581960857, 44.13537601009, 722.09, 0.06156, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(287, 36, 18.237581960857, 44.13537601009, 722.09, 0.06156, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(287, 37, 18.237581960857, 44.13537601009, 722.09, 0.06156, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(288, 33, 18.237538961694, 44.135346002877, 722.09, 0.00479, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(288, 34, 18.237538961694, 44.135346002877, 722.09, 0.00479, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(288, 35, 18.237538961694, 44.135346002877, 722.09, 0.00479, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(288, 36, 18.237538961694, 44.135346002877, 722.09, 0.00479, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(288, 37, 18.237538961694, 44.135346002877, 722.09, 0.00479, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(289, 33, 18.237382974476, 44.135122038424, 716.32, 0.02784, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(289, 34, 18.237382974476, 44.135122038424, 716.32, 0.02784, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(289, 35, 18.237382974476, 44.135122038424, 716.32, 0.02784, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(289, 36, 18.237382974476, 44.135122038424, 716.32, 0.02784, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(289, 37, 18.237382974476, 44.135122038424, 716.32, 0.02784, -5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(290, 33, 18.237311979756, 44.135038973764, 711.03, 0.01084, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(290, 34, 18.237311979756, 44.135038973764, 711.03, 0.01084, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(290, 35, 18.237311979756, 44.135038973764, 711.03, 0.01084, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(290, 36, 18.237311979756, 44.135038973764, 711.03, 0.01084, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(290, 37, 18.237311979756, 44.135038973764, 711.03, 0.01084, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(291, 33, 18.237291024998, 44.135089013726, 708.15, 0.00581, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(291, 34, 18.237291024998, 44.135089013726, 708.15, 0.00581, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(291, 35, 18.237291024998, 44.135089013726, 708.15, 0.00581, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(291, 36, 18.237291024998, 44.135089013726, 708.15, 0.00581, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(291, 37, 18.237291024998, 44.135089013726, 708.15, 0.00581, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(292, 33, 18.237150041386, 44.134906036779, 702.86, 0.02325, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(292, 34, 18.237150041386, 44.134906036779, 702.86, 0.02325, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(292, 35, 18.237150041386, 44.134906036779, 702.86, 0.02325, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(292, 36, 18.237150041386, 44.134906036779, 702.86, 0.02325, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(292, 37, 18.237150041386, 44.134906036779, 702.86, 0.02325, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(293, 33, 18.237075023353, 44.134824983776, 702.86, 0.01082, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(293, 34, 18.237075023353, 44.134824983776, 702.86, 0.01082, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(293, 35, 18.237075023353, 44.134824983776, 702.86, 0.01082, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(293, 36, 18.237075023353, 44.134824983776, 702.86, 0.01082, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(293, 37, 18.237075023353, 44.134824983776, 702.86, 0.01082, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(294, 33, 18.236874025315, 44.134691962972, 698.05, 0.02182, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(294, 34, 18.236874025315, 44.134691962972, 698.05, 0.02182, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(294, 35, 18.236874025315, 44.134691962972, 698.05, 0.02182, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(294, 36, 18.236874025315, 44.134691962972, 698.05, 0.02182, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(294, 37, 18.236874025315, 44.134691962972, 698.05, 0.02182, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(295, 33, 18.236860027537, 44.134686011821, 697.57, 0.0013, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(295, 34, 18.236860027537, 44.134686011821, 697.57, 0.0013, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(295, 35, 18.236860027537, 44.134686011821, 697.57, 0.0013, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(295, 36, 18.236860027537, 44.134686011821, 697.57, 0.0013, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(295, 37, 18.236860027537, 44.134686011821, 697.57, 0.0013, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(296, 33, 18.236790960655, 44.134649969637, 692.77, 0.00681, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(296, 34, 18.236790960655, 44.134649969637, 692.77, 0.00681, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(296, 35, 18.236790960655, 44.134649969637, 692.77, 0.00681, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(296, 36, 18.236790960655, 44.134649969637, 692.77, 0.00681, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(296, 37, 18.236790960655, 44.134649969637, 692.77, 0.00681, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(297, 33, 18.236744021997, 44.134594984353, 687.96, 0.00717, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(297, 34, 18.236744021997, 44.134594984353, 687.96, 0.00717, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(297, 35, 18.236744021997, 44.134594984353, 687.96, 0.00717, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(297, 36, 18.236744021997, 44.134594984353, 687.96, 0.00717, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(297, 37, 18.236744021997, 44.134594984353, 687.96, 0.00717, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(298, 33, 18.236843012273, 44.13455802016, 684.6, 0.00891, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(298, 34, 18.236843012273, 44.13455802016, 684.6, 0.00891, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(298, 35, 18.236843012273, 44.13455802016, 684.6, 0.00891, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(298, 36, 18.236843012273, 44.13455802016, 684.6, 0.00891, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(298, 37, 18.236843012273, 44.13455802016, 684.6, 0.00891, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(299, 33, 18.236910989508, 44.134535975754, 681.23, 0.00595, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(299, 34, 18.236910989508, 44.134535975754, 681.23, 0.00595, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(299, 35, 18.236910989508, 44.134535975754, 681.23, 0.00595, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(299, 36, 18.236910989508, 44.134535975754, 681.23, 0.00595, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(299, 37, 18.236910989508, 44.134535975754, 681.23, 0.00595, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(300, 33, 18.236921969801, 44.134483002126, 677.87, 0.00596, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(300, 34, 18.236921969801, 44.134483002126, 677.87, 0.00596, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(300, 35, 18.236921969801, 44.134483002126, 677.87, 0.00596, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(300, 36, 18.236921969801, 44.134483002126, 677.87, 0.00596, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(300, 37, 18.236921969801, 44.134483002126, 677.87, 0.00596, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(301, 33, 18.237026995048, 44.134411001578, 670.66, 0.01159, -7.21);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(301, 34, 18.237026995048, 44.134411001578, 670.66, 0.01159, -7.21);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(301, 35, 18.237026995048, 44.134411001578, 670.66, 0.01159, -7.21);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(301, 36, 18.237026995048, 44.134411001578, 670.66, 0.01159, -7.21);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(301, 37, 18.237026995048, 44.134411001578, 670.66, 0.01159, -7.21);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(302, 33, 18.23698701337, 44.134357022122, 669.22, 0.0068, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(302, 34, 18.23698701337, 44.134357022122, 669.22, 0.0068, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(302, 35, 18.23698701337, 44.134357022122, 669.22, 0.0068, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(302, 36, 18.23698701337, 44.134357022122, 669.22, 0.0068, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(302, 37, 18.23698701337, 44.134357022122, 669.22, 0.0068, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(303, 33, 18.236827002838, 44.134294996038, 664.41, 0.01451, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(303, 34, 18.236827002838, 44.134294996038, 664.41, 0.01451, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(303, 35, 18.236827002838, 44.134294996038, 664.41, 0.01451, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(303, 36, 18.236827002838, 44.134294996038, 664.41, 0.01451, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(303, 37, 18.236827002838, 44.134294996038, 664.41, 0.01451, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(304, 33, 18.236649977043, 44.134303964674, 661.52, 0.01416, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(304, 34, 18.236649977043, 44.134303964674, 661.52, 0.01416, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(304, 35, 18.236649977043, 44.134303964674, 661.52, 0.01416, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(304, 36, 18.236649977043, 44.134303964674, 661.52, 0.01416, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(304, 37, 18.236649977043, 44.134303964674, 661.52, 0.01416, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(305, 33, 18.236371027306, 44.1344229877, 657.68, 0.0259, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(305, 34, 18.236371027306, 44.1344229877, 657.68, 0.0259, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(305, 35, 18.236371027306, 44.1344229877, 657.68, 0.0259, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(305, 36, 18.236371027306, 44.1344229877, 657.68, 0.0259, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(305, 37, 18.236371027306, 44.1344229877, 657.68, 0.0259, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(306, 33, 18.236189978197, 44.134471016005, 656.72, 0.0154, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(306, 34, 18.236189978197, 44.134471016005, 656.72, 0.0154, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(306, 35, 18.236189978197, 44.134471016005, 656.72, 0.0154, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(306, 36, 18.236189978197, 44.134471016005, 656.72, 0.0154, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(306, 37, 18.236189978197, 44.134471016005, 656.72, 0.0154, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(307, 33, 18.235994009301, 44.134447965771, 653.83, 0.01585, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(307, 34, 18.235994009301, 44.134447965771, 653.83, 0.01585, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(307, 35, 18.235994009301, 44.134447965771, 653.83, 0.01585, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(307, 36, 18.235994009301, 44.134447965771, 653.83, 0.01585, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(307, 37, 18.235994009301, 44.134447965771, 653.83, 0.01585, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(308, 33, 18.235838022083, 44.134563971311, 645.66, 0.01793, -8.17);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(308, 34, 18.235838022083, 44.134563971311, 645.66, 0.01793, -8.17);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(308, 35, 18.235838022083, 44.134563971311, 645.66, 0.01793, -8.17);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(308, 36, 18.235838022083, 44.134563971311, 645.66, 0.01793, -8.17);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(308, 37, 18.235838022083, 44.134563971311, 645.66, 0.01793, -8.17);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(309, 33, 18.235792005435, 44.134566988796, 645.18, 0.00369, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(309, 34, 18.235792005435, 44.134566988796, 645.18, 0.00369, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(309, 35, 18.235792005435, 44.134566988796, 645.18, 0.00369, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(309, 36, 18.235792005435, 44.134566988796, 645.18, 0.00369, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(309, 37, 18.235792005435, 44.134566988796, 645.18, 0.00369, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(310, 33, 18.235706007108, 44.134464981034, 640.38, 0.01326, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(310, 34, 18.235706007108, 44.134464981034, 640.38, 0.01326, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(310, 35, 18.235706007108, 44.134464981034, 640.38, 0.01326, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(310, 36, 18.235706007108, 44.134464981034, 640.38, 0.01326, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(310, 37, 18.235706007108, 44.134464981034, 640.38, 0.01326, -4.8);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(311, 33, 18.235677005723, 44.13440303877, 637.01, 0.00727, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(311, 34, 18.235677005723, 44.13440303877, 637.01, 0.00727, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(311, 35, 18.235677005723, 44.13440303877, 637.01, 0.00727, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(311, 36, 18.235677005723, 44.13440303877, 637.01, 0.00727, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(311, 37, 18.235677005723, 44.13440303877, 637.01, 0.00727, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(312, 33, 18.23551196605, 44.134305976331, 635.57, 0.01703, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(312, 34, 18.23551196605, 44.134305976331, 635.57, 0.01703, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(312, 35, 18.23551196605, 44.134305976331, 635.57, 0.01703, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(312, 36, 18.23551196605, 44.134305976331, 635.57, 0.01703, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(312, 37, 18.23551196605, 44.134305976331, 635.57, 0.01703, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(313, 33, 18.235513977706, 44.13428703323, 633.65, 0.00211, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(313, 34, 18.235513977706, 44.13428703323, 633.65, 0.00211, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(313, 35, 18.235513977706, 44.13428703323, 633.65, 0.00211, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(313, 36, 18.235513977706, 44.13428703323, 633.65, 0.00211, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(313, 37, 18.235513977706, 44.13428703323, 633.65, 0.00211, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(314, 33, 18.235587989911, 44.134230958298, 632.68, 0.00859, -0.97);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(314, 34, 18.235587989911, 44.134230958298, 632.68, 0.00859, -0.97);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(314, 35, 18.235587989911, 44.134230958298, 632.68, 0.00859, -0.97);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(314, 36, 18.235587989911, 44.134230958298, 632.68, 0.00859, -0.97);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(314, 37, 18.235587989911, 44.134230958298, 632.68, 0.00859, -0.97);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(315, 33, 18.235583966598, 44.13411302492, 632.68, 0.01312, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(315, 34, 18.235583966598, 44.13411302492, 632.68, 0.01312, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(315, 35, 18.235583966598, 44.13411302492, 632.68, 0.01312, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(315, 36, 18.235583966598, 44.13411302492, 632.68, 0.01312, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(315, 37, 18.235583966598, 44.13411302492, 632.68, 0.01312, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(316, 33, 18.235327983275, 44.133855029941, 631.24, 0.03522, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(316, 34, 18.235327983275, 44.133855029941, 631.24, 0.03522, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(316, 35, 18.235327983275, 44.133855029941, 631.24, 0.03522, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(316, 36, 18.235327983275, 44.133855029941, 631.24, 0.03522, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(316, 37, 18.235327983275, 44.133855029941, 631.24, 0.03522, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(317, 33, 18.235205020756, 44.133725026622, 630.76, 0.01747, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(317, 34, 18.235205020756, 44.133725026622, 630.76, 0.01747, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(317, 35, 18.235205020756, 44.133725026622, 630.76, 0.01747, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(317, 36, 18.235205020756, 44.133725026622, 630.76, 0.01747, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(317, 37, 18.235205020756, 44.133725026622, 630.76, 0.01747, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(318, 33, 18.234503036365, 44.133340967819, 629.32, 0.07044, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(318, 34, 18.234503036365, 44.133340967819, 629.32, 0.07044, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(318, 35, 18.234503036365, 44.133340967819, 629.32, 0.07044, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(318, 36, 18.234503036365, 44.133340967819, 629.32, 0.07044, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(318, 37, 18.234503036365, 44.133340967819, 629.32, 0.07044, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(319, 33, 18.234461965039, 44.133072998375, 627.4, 0.02998, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(319, 34, 18.234461965039, 44.133072998375, 627.4, 0.02998, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(319, 35, 18.234461965039, 44.133072998375, 627.4, 0.02998, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(319, 36, 18.234461965039, 44.133072998375, 627.4, 0.02998, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(319, 37, 18.234461965039, 44.133072998375, 627.4, 0.02998, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(320, 33, 18.234529020265, 44.133008960634, 626.44, 0.00891, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(320, 34, 18.234529020265, 44.133008960634, 626.44, 0.00891, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(320, 35, 18.234529020265, 44.133008960634, 626.44, 0.00891, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(320, 36, 18.234529020265, 44.133008960634, 626.44, 0.00891, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(320, 37, 18.234529020265, 44.133008960634, 626.44, 0.00891, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(321, 33, 18.234464982525, 44.132990017533, 625.96, 0.00553, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(321, 34, 18.234464982525, 44.132990017533, 625.96, 0.00553, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(321, 35, 18.234464982525, 44.132990017533, 625.96, 0.00553, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(321, 36, 18.234464982525, 44.132990017533, 625.96, 0.00553, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(321, 37, 18.234464982525, 44.132990017533, 625.96, 0.00553, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(322, 33, 18.234391976148, 44.132961016148, 622.11, 0.00666, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(322, 34, 18.234391976148, 44.132961016148, 622.11, 0.00666, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(322, 35, 18.234391976148, 44.132961016148, 622.11, 0.00666, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(322, 36, 18.234391976148, 44.132961016148, 622.11, 0.00666, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(322, 37, 18.234391976148, 44.132961016148, 622.11, 0.00666, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(323, 33, 18.234271025285, 44.132892033085, 623.07, 0.01233, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(323, 34, 18.234271025285, 44.132892033085, 623.07, 0.01233, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(323, 35, 18.234271025285, 44.132892033085, 623.07, 0.01233, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(323, 36, 18.234271025285, 44.132892033085, 623.07, 0.01233, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(323, 37, 18.234271025285, 44.132892033085, 623.07, 0.01233, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(324, 33, 18.234214028344, 44.132854985073, 622.59, 0.00614, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(324, 34, 18.234214028344, 44.132854985073, 622.59, 0.00614, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(324, 35, 18.234214028344, 44.132854985073, 622.59, 0.00614, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(324, 36, 18.234214028344, 44.132854985073, 622.59, 0.00614, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(324, 37, 18.234214028344, 44.132854985073, 622.59, 0.00614, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(325, 33, 18.233871962875, 44.132642000914, 627.88, 0.03614, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(325, 34, 18.233871962875, 44.132642000914, 627.88, 0.03614, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(325, 35, 18.233871962875, 44.132642000914, 627.88, 0.03614, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(325, 36, 18.233871962875, 44.132642000914, 627.88, 0.03614, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(325, 37, 18.233871962875, 44.132642000914, 627.88, 0.03614, 5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(326, 33, 18.23354003951, 44.132321979851, 627.4, 0.04436, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(326, 34, 18.23354003951, 44.132321979851, 627.4, 0.04436, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(326, 35, 18.23354003951, 44.132321979851, 627.4, 0.04436, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(326, 36, 18.23354003951, 44.132321979851, 627.4, 0.04436, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(326, 37, 18.23354003951, 44.132321979851, 627.4, 0.04436, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(327, 33, 18.233501985669, 44.132303036749, 628.36, 0.0037, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(327, 34, 18.233501985669, 44.132303036749, 628.36, 0.0037, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(327, 35, 18.233501985669, 44.132303036749, 628.36, 0.0037, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(327, 36, 18.233501985669, 44.132303036749, 628.36, 0.0037, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(327, 37, 18.233501985669, 44.132303036749, 628.36, 0.0037, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(328, 33, 18.23322404176, 44.132177978754, 634.13, 0.02618, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(328, 34, 18.23322404176, 44.132177978754, 634.13, 0.02618, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(328, 35, 18.23322404176, 44.132177978754, 634.13, 0.02618, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(328, 36, 18.23322404176, 44.132177978754, 634.13, 0.02618, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(328, 37, 18.23322404176, 44.132177978754, 634.13, 0.02618, 5.77);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(329, 33, 18.233098983765, 44.132146965712, 634.13, 0.01056, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(329, 34, 18.233098983765, 44.132146965712, 634.13, 0.01056, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(329, 35, 18.233098983765, 44.132146965712, 634.13, 0.01056, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(329, 36, 18.233098983765, 44.132146965712, 634.13, 0.01056, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(329, 37, 18.233098983765, 44.132146965712, 634.13, 0.01056, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(330, 33, 18.232885999605, 44.132045963779, 638.45, 0.02037, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(330, 34, 18.232885999605, 44.132045963779, 638.45, 0.02037, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(330, 35, 18.232885999605, 44.132045963779, 638.45, 0.02037, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(330, 36, 18.232885999605, 44.132045963779, 638.45, 0.02037, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(330, 37, 18.232885999605, 44.132045963779, 638.45, 0.02037, 4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(331, 33, 18.232749039307, 44.131958959624, 639.89, 0.0146, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(331, 34, 18.232749039307, 44.131958959624, 639.89, 0.0146, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(331, 35, 18.232749039307, 44.131958959624, 639.89, 0.0146, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(331, 36, 18.232749039307, 44.131958959624, 639.89, 0.0146, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(331, 37, 18.232749039307, 44.131958959624, 639.89, 0.0146, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(332, 33, 18.232433963567, 44.131737006828, 642.3, 0.03523, 2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(332, 34, 18.232433963567, 44.131737006828, 642.3, 0.03523, 2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(332, 35, 18.232433963567, 44.131737006828, 642.3, 0.03523, 2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(332, 36, 18.232433963567, 44.131737006828, 642.3, 0.03523, 2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(332, 37, 18.232433963567, 44.131737006828, 642.3, 0.03523, 2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(333, 33, 18.232145961374, 44.131585964933, 644.7, 0.02847, 2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(333, 34, 18.232145961374, 44.131585964933, 644.7, 0.02847, 2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(333, 35, 18.232145961374, 44.131585964933, 644.7, 0.02847, 2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(333, 36, 18.232145961374, 44.131585964933, 644.7, 0.02847, 2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(333, 37, 18.232145961374, 44.131585964933, 644.7, 0.02847, 2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(334, 33, 18.232099022716, 44.131567021832, 644.7, 0.0043, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(334, 34, 18.232099022716, 44.131567021832, 644.7, 0.0043, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(334, 35, 18.232099022716, 44.131567021832, 644.7, 0.0043, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(334, 36, 18.232099022716, 44.131567021832, 644.7, 0.0043, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(334, 37, 18.232099022716, 44.131567021832, 644.7, 0.0043, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(335, 33, 18.231985028833, 44.131441963837, 644.22, 0.01662, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(335, 34, 18.231985028833, 44.131441963837, 644.22, 0.01662, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(335, 35, 18.231985028833, 44.131441963837, 644.22, 0.01662, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(335, 36, 18.231985028833, 44.131441963837, 644.22, 0.01662, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(335, 37, 18.231985028833, 44.131441963837, 644.22, 0.01662, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(336, 33, 18.231985028833, 44.131441041827, 644.7, 0.0001, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(336, 34, 18.231985028833, 44.131441041827, 644.7, 0.0001, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(336, 35, 18.231985028833, 44.131441041827, 644.7, 0.0001, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(336, 36, 18.231985028833, 44.131441041827, 644.7, 0.0001, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(336, 37, 18.231985028833, 44.131441041827, 644.7, 0.0001, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(337, 33, 18.231741031632, 44.131037034094, 643.74, 0.04896, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(337, 34, 18.231741031632, 44.131037034094, 643.74, 0.04896, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(337, 35, 18.231741031632, 44.131037034094, 643.74, 0.04896, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(337, 36, 18.231741031632, 44.131037034094, 643.74, 0.04896, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(337, 37, 18.231741031632, 44.131037034094, 643.74, 0.04896, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(338, 33, 18.231744971126, 44.130978025496, 643.26, 0.00657, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(338, 34, 18.231744971126, 44.130978025496, 643.26, 0.00657, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(338, 35, 18.231744971126, 44.130978025496, 643.26, 0.00657, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(338, 36, 18.231744971126, 44.130978025496, 643.26, 0.00657, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(338, 37, 18.231744971126, 44.130978025496, 643.26, 0.00657, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(339, 33, 18.231635000557, 44.130688011646, 642.3, 0.03342, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(339, 34, 18.231635000557, 44.130688011646, 642.3, 0.03342, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(339, 35, 18.231635000557, 44.130688011646, 642.3, 0.03342, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(339, 36, 18.231635000557, 44.130688011646, 642.3, 0.03342, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(339, 37, 18.231635000557, 44.130688011646, 642.3, 0.03342, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(340, 33, 18.23161396198, 44.130679965019, 641.82, 0.0019, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(340, 34, 18.23161396198, 44.130679965019, 641.82, 0.0019, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(340, 35, 18.23161396198, 44.130679965019, 641.82, 0.0019, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(340, 36, 18.23161396198, 44.130679965019, 641.82, 0.0019, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(340, 37, 18.23161396198, 44.130679965019, 641.82, 0.0019, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(341, 33, 18.231498962268, 44.130475027487, 636.53, 0.02457, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(341, 34, 18.231498962268, 44.130475027487, 636.53, 0.02457, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(341, 35, 18.231498962268, 44.130475027487, 636.53, 0.02457, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(341, 36, 18.231498962268, 44.130475027487, 636.53, 0.02457, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(341, 37, 18.231498962268, 44.130475027487, 636.53, 0.02457, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(342, 33, 18.23148496449, 44.130443008617, 635.57, 0.00373, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(342, 34, 18.23148496449, 44.130443008617, 635.57, 0.00373, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(342, 35, 18.23148496449, 44.130443008617, 635.57, 0.00373, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(342, 36, 18.23148496449, 44.130443008617, 635.57, 0.00373, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(342, 37, 18.23148496449, 44.130443008617, 635.57, 0.00373, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(343, 33, 18.231338029727, 44.130368996412, 633.65, 0.01433, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(343, 34, 18.231338029727, 44.130368996412, 633.65, 0.01433, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(343, 35, 18.231338029727, 44.130368996412, 633.65, 0.01433, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(343, 36, 18.231338029727, 44.130368996412, 633.65, 0.01433, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(343, 37, 18.231338029727, 44.130368996412, 633.65, 0.01433, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(344, 33, 18.231201991439, 44.130280986428, 630.28, 0.01462, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(344, 34, 18.231201991439, 44.130280986428, 630.28, 0.01462, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(344, 35, 18.231201991439, 44.130280986428, 630.28, 0.01462, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(344, 36, 18.231201991439, 44.130280986428, 630.28, 0.01462, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(344, 37, 18.231201991439, 44.130280986428, 630.28, 0.01462, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(345, 33, 18.231153041124, 44.130111001432, 626.44, 0.0193, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(345, 34, 18.231153041124, 44.130111001432, 626.44, 0.0193, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(345, 35, 18.231153041124, 44.130111001432, 626.44, 0.0193, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(345, 36, 18.231153041124, 44.130111001432, 626.44, 0.0193, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(345, 37, 18.231153041124, 44.130111001432, 626.44, 0.0193, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(346, 33, 18.231142982841, 44.129804978147, 623.07, 0.03404, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(346, 34, 18.231142982841, 44.129804978147, 623.07, 0.03404, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(346, 35, 18.231142982841, 44.129804978147, 623.07, 0.03404, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(346, 36, 18.231142982841, 44.129804978147, 623.07, 0.03404, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(346, 37, 18.231142982841, 44.129804978147, 623.07, 0.03404, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(347, 33, 18.231204003096, 44.129369035363, 621.15, 0.04872, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(347, 34, 18.231204003096, 44.129369035363, 621.15, 0.04872, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(347, 35, 18.231204003096, 44.129369035363, 621.15, 0.04872, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(347, 36, 18.231204003096, 44.129369035363, 621.15, 0.04872, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(347, 37, 18.231204003096, 44.129369035363, 621.15, 0.04872, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(348, 33, 18.230910971761, 44.129180023447, 617.3, 0.03144, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(348, 34, 18.230910971761, 44.129180023447, 617.3, 0.03144, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(348, 35, 18.230910971761, 44.129180023447, 617.3, 0.03144, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(348, 36, 18.230910971761, 44.129180023447, 617.3, 0.03144, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(348, 37, 18.230910971761, 44.129180023447, 617.3, 0.03144, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(349, 33, 18.230896973982, 44.12904297933, 612.02, 0.01528, -5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(349, 34, 18.230896973982, 44.12904297933, 612.02, 0.01528, -5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(349, 35, 18.230896973982, 44.12904297933, 612.02, 0.01528, -5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(349, 36, 18.230896973982, 44.12904297933, 612.02, 0.01528, -5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(349, 37, 18.230896973982, 44.12904297933, 612.02, 0.01528, -5.28);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(350, 33, 18.230864033103, 44.128821026534, 608.65, 0.02482, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(350, 34, 18.230864033103, 44.128821026534, 608.65, 0.02482, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(350, 35, 18.230864033103, 44.128821026534, 608.65, 0.02482, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(350, 36, 18.230864033103, 44.128821026534, 608.65, 0.02482, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(350, 37, 18.230864033103, 44.128821026534, 608.65, 0.02482, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(351, 33, 18.230891022831, 44.128780961037, 608.17, 0.00495, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(351, 34, 18.230891022831, 44.128780961037, 608.17, 0.00495, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(351, 35, 18.230891022831, 44.128780961037, 608.17, 0.00495, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(351, 36, 18.230891022831, 44.128780961037, 608.17, 0.00495, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(351, 37, 18.230891022831, 44.128780961037, 608.17, 0.00495, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(352, 33, 18.230974003673, 44.128549033776, 602.88, 0.02663, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(352, 34, 18.230974003673, 44.128549033776, 602.88, 0.02663, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(352, 35, 18.230974003673, 44.128549033776, 602.88, 0.02663, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(352, 36, 18.230974003673, 44.128549033776, 602.88, 0.02663, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(352, 37, 18.230974003673, 44.128549033776, 602.88, 0.02663, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(353, 33, 18.230990013108, 44.128415007144, 599.04, 0.01496, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(353, 34, 18.230990013108, 44.128415007144, 599.04, 0.01496, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(353, 35, 18.230990013108, 44.128415007144, 599.04, 0.01496, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(353, 36, 18.230990013108, 44.128415007144, 599.04, 0.01496, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(353, 37, 18.230990013108, 44.128415007144, 599.04, 0.01496, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(354, 33, 18.230855986476, 44.128121975809, 600.96, 0.03429, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(354, 34, 18.230855986476, 44.128121975809, 600.96, 0.03429, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(354, 35, 18.230855986476, 44.128121975809, 600.96, 0.03429, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(354, 36, 18.230855986476, 44.128121975809, 600.96, 0.03429, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(354, 37, 18.230855986476, 44.128121975809, 600.96, 0.03429, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(355, 33, 18.230862021446, 44.128063973039, 601.44, 0.00647, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(355, 34, 18.230862021446, 44.128063973039, 601.44, 0.00647, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(355, 35, 18.230862021446, 44.128063973039, 601.44, 0.00647, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(355, 36, 18.230862021446, 44.128063973039, 601.44, 0.00647, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(355, 37, 18.230862021446, 44.128063973039, 601.44, 0.00647, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(356, 33, 18.230922035873, 44.127658037469, 602.4, 0.04539, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(356, 34, 18.230922035873, 44.127658037469, 602.4, 0.04539, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(356, 35, 18.230922035873, 44.127658037469, 602.4, 0.04539, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(356, 36, 18.230922035873, 44.127658037469, 602.4, 0.04539, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(356, 37, 18.230922035873, 44.127658037469, 602.4, 0.04539, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(357, 33, 18.230937961489, 44.127526022494, 600, 0.01473, -2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(357, 34, 18.230937961489, 44.127526022494, 600, 0.01473, -2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(357, 35, 18.230937961489, 44.127526022494, 600, 0.01473, -2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(357, 36, 18.230937961489, 44.127526022494, 600, 0.01473, -2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(357, 37, 18.230937961489, 44.127526022494, 600, 0.01473, -2.4);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(358, 33, 18.231022031978, 44.127364000306, 595.67, 0.01923, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(358, 34, 18.231022031978, 44.127364000306, 595.67, 0.01923, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(358, 35, 18.231022031978, 44.127364000306, 595.67, 0.01923, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(358, 36, 18.231022031978, 44.127364000306, 595.67, 0.01923, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(358, 37, 18.231022031978, 44.127364000306, 595.67, 0.01923, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(359, 33, 18.231078023091, 44.127227962017, 591.35, 0.01577, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(359, 34, 18.231078023091, 44.127227962017, 591.35, 0.01577, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(359, 35, 18.231078023091, 44.127227962017, 591.35, 0.01577, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(359, 36, 18.231078023091, 44.127227962017, 591.35, 0.01577, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(359, 37, 18.231078023091, 44.127227962017, 591.35, 0.01577, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(360, 33, 18.231146000326, 44.127113968134, 589.43, 0.01379, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(360, 34, 18.231146000326, 44.127113968134, 589.43, 0.01379, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(360, 35, 18.231146000326, 44.127113968134, 589.43, 0.01379, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(360, 36, 18.231146000326, 44.127113968134, 589.43, 0.01379, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(360, 37, 18.231146000326, 44.127113968134, 589.43, 0.01379, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(361, 33, 18.231149017811, 44.127062000334, 589.43, 0.00578, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(361, 34, 18.231149017811, 44.127062000334, 589.43, 0.00578, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(361, 35, 18.231149017811, 44.127062000334, 589.43, 0.00578, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(361, 36, 18.231149017811, 44.127062000334, 589.43, 0.00578, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(361, 37, 18.231149017811, 44.127062000334, 589.43, 0.00578, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(362, 33, 18.231049021706, 44.12672999315, 587.98, 0.03777, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(362, 34, 18.231049021706, 44.12672999315, 587.98, 0.03777, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(362, 35, 18.231049021706, 44.12672999315, 587.98, 0.03777, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(362, 36, 18.231049021706, 44.12672999315, 587.98, 0.03777, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(362, 37, 18.231049021706, 44.12672999315, 587.98, 0.03777, -1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(363, 33, 18.231033012271, 44.126232024282, 587.02, 0.05539, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(363, 34, 18.231033012271, 44.126232024282, 587.02, 0.05539, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(363, 35, 18.231033012271, 44.126232024282, 587.02, 0.05539, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(363, 36, 18.231033012271, 44.126232024282, 587.02, 0.05539, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(363, 37, 18.231033012271, 44.126232024282, 587.02, 0.05539, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(364, 33, 18.231013985351, 44.12606597878, 590.39, 0.01853, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(364, 34, 18.231013985351, 44.12606597878, 590.39, 0.01853, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(364, 35, 18.231013985351, 44.12606597878, 590.39, 0.01853, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(364, 36, 18.231013985351, 44.12606597878, 590.39, 0.01853, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(364, 37, 18.231013985351, 44.12606597878, 590.39, 0.01853, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(365, 33, 18.231043992564, 44.125787029043, 592.31, 0.03111, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(365, 34, 18.231043992564, 44.125787029043, 592.31, 0.03111, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(365, 35, 18.231043992564, 44.125787029043, 592.31, 0.03111, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(365, 36, 18.231043992564, 44.125787029043, 592.31, 0.03111, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(365, 37, 18.231043992564, 44.125787029043, 592.31, 0.03111, 1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(366, 33, 18.231073999777, 44.125721985474, 592.31, 0.00762, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(366, 34, 18.231073999777, 44.125721985474, 592.31, 0.00762, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(366, 35, 18.231073999777, 44.125721985474, 592.31, 0.00762, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(366, 36, 18.231073999777, 44.125721985474, 592.31, 0.00762, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(366, 37, 18.231073999777, 44.125721985474, 592.31, 0.00762, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(367, 33, 18.230906026438, 44.125593993813, 588.95, 0.01955, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(367, 34, 18.230906026438, 44.125593993813, 588.95, 0.01955, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(367, 35, 18.230906026438, 44.125593993813, 588.95, 0.01955, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(367, 36, 18.230906026438, 44.125593993813, 588.95, 0.01955, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(367, 37, 18.230906026438, 44.125593993813, 588.95, 0.01955, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(368, 33, 18.23080200702, 44.125573039055, 589.43, 0.00862, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(368, 34, 18.23080200702, 44.125573039055, 589.43, 0.00862, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(368, 35, 18.23080200702, 44.125573039055, 589.43, 0.00862, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(368, 36, 18.23080200702, 44.125573039055, 589.43, 0.00862, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(368, 37, 18.23080200702, 44.125573039055, 589.43, 0.00862, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(369, 33, 18.230587011203, 44.125556023791, 587.02, 0.01726, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(369, 34, 18.230587011203, 44.125556023791, 587.02, 0.01726, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(369, 35, 18.230587011203, 44.125556023791, 587.02, 0.01726, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(369, 36, 18.230587011203, 44.125556023791, 587.02, 0.01726, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(369, 37, 18.230587011203, 44.125556023791, 587.02, 0.01726, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(370, 33, 18.230386013165, 44.125369023532, 586.06, 0.02626, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(370, 34, 18.230386013165, 44.125369023532, 586.06, 0.02626, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(370, 35, 18.230386013165, 44.125369023532, 586.06, 0.02626, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(370, 36, 18.230386013165, 44.125369023532, 586.06, 0.02626, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(370, 37, 18.230386013165, 44.125369023532, 586.06, 0.02626, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(371, 33, 18.230049982667, 44.125347984955, 588.95, 0.02692, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(371, 34, 18.230049982667, 44.125347984955, 588.95, 0.02692, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(371, 35, 18.230049982667, 44.125347984955, 588.95, 0.02692, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(371, 36, 18.230049982667, 44.125347984955, 588.95, 0.02692, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(371, 37, 18.230049982667, 44.125347984955, 588.95, 0.02692, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(372, 33, 18.230006983504, 44.12535100244, 588.46, 0.00345, -0.49);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(372, 34, 18.230006983504, 44.12535100244, 588.46, 0.00345, -0.49);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(372, 35, 18.230006983504, 44.12535100244, 588.46, 0.00345, -0.49);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(372, 36, 18.230006983504, 44.12535100244, 588.46, 0.00345, -0.49);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(372, 37, 18.230006983504, 44.12535100244, 588.46, 0.00345, -0.49);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(373, 33, 18.229849990457, 44.12517095916, 589.91, 0.02362, 1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(373, 34, 18.229849990457, 44.12517095916, 589.91, 0.02362, 1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(373, 35, 18.229849990457, 44.12517095916, 589.91, 0.02362, 1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(373, 36, 18.229849990457, 44.12517095916, 589.91, 0.02362, 1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(373, 37, 18.229849990457, 44.12517095916, 589.91, 0.02362, 1.45);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(374, 33, 18.229538016021, 44.124998040497, 593.27, 0.03146, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(374, 34, 18.229538016021, 44.124998040497, 593.27, 0.03146, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(374, 35, 18.229538016021, 44.124998040497, 593.27, 0.03146, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(374, 36, 18.229538016021, 44.124998040497, 593.27, 0.03146, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(374, 37, 18.229538016021, 44.124998040497, 593.27, 0.03146, 3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(375, 33, 18.229473978281, 44.124909024686, 592.31, 0.01114, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(375, 34, 18.229473978281, 44.124909024686, 592.31, 0.01114, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(375, 35, 18.229473978281, 44.124909024686, 592.31, 0.01114, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(375, 36, 18.229473978281, 44.124909024686, 592.31, 0.01114, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(375, 37, 18.229473978281, 44.124909024686, 592.31, 0.01114, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(376, 33, 18.229314973578, 44.124792013317, 586.06, 0.01818, -6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(376, 34, 18.229314973578, 44.124792013317, 586.06, 0.01818, -6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(376, 35, 18.229314973578, 44.124792013317, 586.06, 0.01818, -6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(376, 36, 18.229314973578, 44.124792013317, 586.06, 0.01818, -6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(376, 37, 18.229314973578, 44.124792013317, 586.06, 0.01818, -6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(377, 33, 18.22925596498, 44.124786984175, 586.54, 0.00474, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(377, 34, 18.22925596498, 44.124786984175, 586.54, 0.00474, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(377, 35, 18.22925596498, 44.124786984175, 586.54, 0.00474, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(377, 36, 18.22925596498, 44.124786984175, 586.54, 0.00474, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(377, 37, 18.22925596498, 44.124786984175, 586.54, 0.00474, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(378, 33, 18.228766964749, 44.124726969749, 583.66, 0.0396, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(378, 34, 18.228766964749, 44.124726969749, 583.66, 0.0396, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(378, 35, 18.228766964749, 44.124726969749, 583.66, 0.0396, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(378, 36, 18.228766964749, 44.124726969749, 583.66, 0.0396, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(378, 37, 18.228766964749, 44.124726969749, 583.66, 0.0396, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(379, 33, 18.228702004999, 44.124715989456, 583.18, 0.00533, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(379, 34, 18.228702004999, 44.124715989456, 583.18, 0.00533, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(379, 35, 18.228702004999, 44.124715989456, 583.18, 0.00533, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(379, 36, 18.228702004999, 44.124715989456, 583.18, 0.00533, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(379, 37, 18.228702004999, 44.124715989456, 583.18, 0.00533, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(380, 33, 18.228311995044, 44.124572994187, 583.18, 0.03496, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(380, 34, 18.228311995044, 44.124572994187, 583.18, 0.03496, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(380, 35, 18.228311995044, 44.124572994187, 583.18, 0.03496, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(380, 36, 18.228311995044, 44.124572994187, 583.18, 0.03496, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(380, 37, 18.228311995044, 44.124572994187, 583.18, 0.03496, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(381, 33, 18.22819900699, 44.124480960891, 583.18, 0.01364, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(381, 34, 18.22819900699, 44.124480960891, 583.18, 0.01364, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(381, 35, 18.22819900699, 44.124480960891, 583.18, 0.01364, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(381, 36, 18.22819900699, 44.124480960891, 583.18, 0.01364, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(381, 37, 18.22819900699, 44.124480960891, 583.18, 0.01364, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(382, 33, 18.228008989245, 44.124335031956, 579.81, 0.02221, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(382, 34, 18.228008989245, 44.124335031956, 579.81, 0.02221, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(382, 35, 18.228008989245, 44.124335031956, 579.81, 0.02221, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(382, 36, 18.228008989245, 44.124335031956, 579.81, 0.02221, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(382, 37, 18.228008989245, 44.124335031956, 579.81, 0.02221, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(383, 33, 18.227836992592, 44.124227995053, 576.93, 0.01817, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(383, 34, 18.227836992592, 44.124227995053, 576.93, 0.01817, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(383, 35, 18.227836992592, 44.124227995053, 576.93, 0.01817, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(383, 36, 18.227836992592, 44.124227995053, 576.93, 0.01817, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(383, 37, 18.227836992592, 44.124227995053, 576.93, 0.01817, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(384, 33, 18.227769015357, 44.124182984233, 575.01, 0.00738, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(384, 34, 18.227769015357, 44.124182984233, 575.01, 0.00738, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(384, 35, 18.227769015357, 44.124182984233, 575.01, 0.00738, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(384, 36, 18.227769015357, 44.124182984233, 575.01, 0.00738, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(384, 37, 18.227769015357, 44.124182984233, 575.01, 0.00738, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(385, 33, 18.227368025109, 44.123822981492, 573.08, 0.05125, -1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(385, 34, 18.227368025109, 44.123822981492, 573.08, 0.05125, -1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(385, 35, 18.227368025109, 44.123822981492, 573.08, 0.05125, -1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(385, 36, 18.227368025109, 44.123822981492, 573.08, 0.05125, -1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(385, 37, 18.227368025109, 44.123822981492, 573.08, 0.05125, -1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(386, 33, 18.227316979319, 44.123782999814, 573.56, 0.00603, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(386, 34, 18.227316979319, 44.123782999814, 573.56, 0.00603, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(386, 35, 18.227316979319, 44.123782999814, 573.56, 0.00603, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(386, 36, 18.227316979319, 44.123782999814, 573.56, 0.00603, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(386, 37, 18.227316979319, 44.123782999814, 573.56, 0.00603, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(387, 33, 18.226824039593, 44.123485023156, 575.49, 0.05144, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(387, 34, 18.226824039593, 44.123485023156, 575.49, 0.05144, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(387, 35, 18.226824039593, 44.123485023156, 575.49, 0.05144, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(387, 36, 18.226824039593, 44.123485023156, 575.49, 0.05144, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(387, 37, 18.226824039593, 44.123485023156, 575.49, 0.05144, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(388, 33, 18.226062040776, 44.122961992398, 573.56, 0.08415, -1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(388, 34, 18.226062040776, 44.122961992398, 573.56, 0.08415, -1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(388, 35, 18.226062040776, 44.122961992398, 573.56, 0.08415, -1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(388, 36, 18.226062040776, 44.122961992398, 573.56, 0.08415, -1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(388, 37, 18.226062040776, 44.122961992398, 573.56, 0.08415, -1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(389, 33, 18.225485030562, 44.122836012393, 572.6, 0.04814, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(389, 34, 18.225485030562, 44.122836012393, 572.6, 0.04814, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(389, 35, 18.225485030562, 44.122836012393, 572.6, 0.04814, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(389, 36, 18.225485030562, 44.122836012393, 572.6, 0.04814, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(389, 37, 18.225485030562, 44.122836012393, 572.6, 0.04814, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(390, 33, 18.22523499839, 44.122764011845, 568.28, 0.0215, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(390, 34, 18.22523499839, 44.122764011845, 568.28, 0.0215, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(390, 35, 18.22523499839, 44.122764011845, 568.28, 0.0215, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(390, 36, 18.22523499839, 44.122764011845, 568.28, 0.0215, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(390, 37, 18.22523499839, 44.122764011845, 568.28, 0.0215, -4.32);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(391, 33, 18.22487398982, 44.122763006017, 562.99, 0.02882, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(391, 34, 18.22487398982, 44.122763006017, 562.99, 0.02882, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(391, 35, 18.22487398982, 44.122763006017, 562.99, 0.02882, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(391, 36, 18.22487398982, 44.122763006017, 562.99, 0.02882, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(391, 37, 18.22487398982, 44.122763006017, 562.99, 0.02882, -5.29);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(392, 33, 18.224618006498, 44.122854033485, 559.14, 0.0228, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(392, 34, 18.224618006498, 44.122854033485, 559.14, 0.0228, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(392, 35, 18.224618006498, 44.122854033485, 559.14, 0.0228, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(392, 36, 18.224618006498, 44.122854033485, 559.14, 0.0228, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(392, 37, 18.224618006498, 44.122854033485, 559.14, 0.0228, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(393, 33, 18.22443603538, 44.122933996841, 552.9, 0.01703, -6.24);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(393, 34, 18.22443603538, 44.122933996841, 552.9, 0.01703, -6.24);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(393, 35, 18.22443603538, 44.122933996841, 552.9, 0.01703, -6.24);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(393, 36, 18.22443603538, 44.122933996841, 552.9, 0.01703, -6.24);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(393, 37, 18.22443603538, 44.122933996841, 552.9, 0.01703, -6.24);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(394, 33, 18.224349031225, 44.12302502431, 549.53, 0.01228, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(394, 34, 18.224349031225, 44.12302502431, 549.53, 0.01228, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(394, 35, 18.224349031225, 44.12302502431, 549.53, 0.01228, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(394, 36, 18.224349031225, 44.12302502431, 549.53, 0.01228, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(394, 37, 18.224349031225, 44.12302502431, 549.53, 0.01228, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(395, 33, 18.224342996255, 44.123156033456, 545.2, 0.01458, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(395, 34, 18.224342996255, 44.123156033456, 545.2, 0.01458, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(395, 35, 18.224342996255, 44.123156033456, 545.2, 0.01458, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(395, 36, 18.224342996255, 44.123156033456, 545.2, 0.01458, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(395, 37, 18.224342996255, 44.123156033456, 545.2, 0.01458, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(396, 33, 18.224338972941, 44.123249994591, 545.2, 0.01045, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(396, 34, 18.224338972941, 44.123249994591, 545.2, 0.01045, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(396, 35, 18.224338972941, 44.123249994591, 545.2, 0.01045, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(396, 36, 18.224338972941, 44.123249994591, 545.2, 0.01045, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(396, 37, 18.224338972941, 44.123249994591, 545.2, 0.01045, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(397, 33, 18.22406899184, 44.123312020674, 546.17, 0.02263, 0.97);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(397, 34, 18.22406899184, 44.123312020674, 546.17, 0.02263, 0.97);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(397, 35, 18.22406899184, 44.123312020674, 546.17, 0.02263, 0.97);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(397, 36, 18.22406899184, 44.123312020674, 546.17, 0.02263, 0.97);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(397, 37, 18.22406899184, 44.123312020674, 546.17, 0.02263, 0.97);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(398, 33, 18.223619973287, 44.122965009883, 542.8, 0.05266, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(398, 34, 18.223619973287, 44.122965009883, 542.8, 0.05266, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(398, 35, 18.223619973287, 44.122965009883, 542.8, 0.05266, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(398, 36, 18.223619973287, 44.122965009883, 542.8, 0.05266, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(398, 37, 18.223619973287, 44.122965009883, 542.8, 0.05266, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(399, 33, 18.223582003266, 44.122937014326, 542.8, 0.00434, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(399, 34, 18.223582003266, 44.122937014326, 542.8, 0.00434, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(399, 35, 18.223582003266, 44.122937014326, 542.8, 0.00434, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(399, 36, 18.223582003266, 44.122937014326, 542.8, 0.00434, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(399, 37, 18.223582003266, 44.122937014326, 542.8, 0.00434, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(400, 33, 18.223356027156, 44.122804999352, 542.8, 0.02326, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(400, 34, 18.223356027156, 44.122804999352, 542.8, 0.02326, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(400, 35, 18.223356027156, 44.122804999352, 542.8, 0.02326, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(400, 36, 18.223356027156, 44.122804999352, 542.8, 0.02326, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(400, 37, 18.223356027156, 44.122804999352, 542.8, 0.02326, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(401, 33, 18.22322501801, 44.122692011297, 542.32, 0.01635, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(401, 34, 18.22322501801, 44.122692011297, 542.32, 0.01635, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(401, 35, 18.22322501801, 44.122692011297, 542.32, 0.01635, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(401, 36, 18.22322501801, 44.122692011297, 542.32, 0.01635, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(401, 37, 18.22322501801, 44.122692011297, 542.32, 0.01635, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(402, 33, 18.223081016913, 44.12256100215, 540.88, 0.01856, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(402, 34, 18.223081016913, 44.12256100215, 540.88, 0.01856, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(402, 35, 18.223081016913, 44.12256100215, 540.88, 0.01856, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(402, 36, 18.223081016913, 44.12256100215, 540.88, 0.01856, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(402, 37, 18.223081016913, 44.12256100215, 540.88, 0.01856, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(403, 33, 18.222990995273, 44.12241297774, 540.88, 0.01796, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(403, 34, 18.222990995273, 44.12241297774, 540.88, 0.01796, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(403, 35, 18.222990995273, 44.12241297774, 540.88, 0.01796, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(403, 36, 18.222990995273, 44.12241297774, 540.88, 0.01796, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(403, 37, 18.222990995273, 44.12241297774, 540.88, 0.01796, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(404, 33, 18.222940033302, 44.122335026041, 540.4, 0.00957, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(404, 34, 18.222940033302, 44.122335026041, 540.4, 0.00957, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(404, 35, 18.222940033302, 44.122335026041, 540.4, 0.00957, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(404, 36, 18.222940033302, 44.122335026041, 540.4, 0.00957, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(404, 37, 18.222940033302, 44.122335026041, 540.4, 0.00957, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(405, 33, 18.222404010594, 44.12147898227, 539.44, 0.10436, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(405, 34, 18.222404010594, 44.12147898227, 539.44, 0.10436, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(405, 35, 18.222404010594, 44.12147898227, 539.44, 0.10436, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(405, 36, 18.222404010594, 44.12147898227, 539.44, 0.10436, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(405, 37, 18.222404010594, 44.12147898227, 539.44, 0.10436, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(406, 33, 18.221733961254, 44.120678007603, 537.51, 0.10389, -1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(406, 34, 18.221733961254, 44.120678007603, 537.51, 0.10389, -1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(406, 35, 18.221733961254, 44.120678007603, 537.51, 0.10389, -1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(406, 36, 18.221733961254, 44.120678007603, 537.51, 0.10389, -1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(406, 37, 18.221733961254, 44.120678007603, 537.51, 0.10389, -1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(407, 33, 18.22165299207, 44.120413977653, 537.51, 0.03006, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(407, 34, 18.22165299207, 44.120413977653, 537.51, 0.03006, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(407, 35, 18.22165299207, 44.120413977653, 537.51, 0.03006, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(407, 36, 18.22165299207, 44.120413977653, 537.51, 0.03006, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(407, 37, 18.22165299207, 44.120413977653, 537.51, 0.03006, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(408, 33, 18.221029965207, 44.119999995455, 540.4, 0.06777, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(408, 34, 18.221029965207, 44.119999995455, 540.4, 0.06777, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(408, 35, 18.221029965207, 44.119999995455, 540.4, 0.06777, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(408, 36, 18.221029965207, 44.119999995455, 540.4, 0.06777, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(408, 37, 18.221029965207, 44.119999995455, 540.4, 0.06777, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(409, 33, 18.22033896111, 44.119690032676, 540.4, 0.06504, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(409, 34, 18.22033896111, 44.119690032676, 540.4, 0.06504, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(409, 35, 18.22033896111, 44.119690032676, 540.4, 0.06504, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(409, 36, 18.22033896111, 44.119690032676, 540.4, 0.06504, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(409, 37, 18.22033896111, 44.119690032676, 540.4, 0.06504, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(410, 33, 18.219245038927, 44.1196359694, 539.44, 0.08753, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(410, 34, 18.219245038927, 44.1196359694, 539.44, 0.08753, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(410, 35, 18.219245038927, 44.1196359694, 539.44, 0.08753, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(410, 36, 18.219245038927, 44.1196359694, 539.44, 0.08753, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(410, 37, 18.219245038927, 44.1196359694, 539.44, 0.08753, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(411, 33, 18.218413973227, 44.119208995253, 539.92, 0.08158, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(411, 34, 18.218413973227, 44.119208995253, 539.92, 0.08158, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(411, 35, 18.218413973227, 44.119208995253, 539.92, 0.08158, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(411, 36, 18.218413973227, 44.119208995253, 539.92, 0.08158, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(411, 37, 18.218413973227, 44.119208995253, 539.92, 0.08158, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(412, 33, 18.217176971957, 44.11872100085, 533.67, 0.11267, -6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(412, 34, 18.217176971957, 44.11872100085, 533.67, 0.11267, -6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(412, 35, 18.217176971957, 44.11872100085, 533.67, 0.11267, -6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(412, 36, 18.217176971957, 44.11872100085, 533.67, 0.11267, -6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(412, 37, 18.217176971957, 44.11872100085, 533.67, 0.11267, -6.25);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(413, 33, 18.216622006148, 44.118440039456, 528.86, 0.05421, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(413, 34, 18.216622006148, 44.118440039456, 528.86, 0.05421, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(413, 35, 18.216622006148, 44.118440039456, 528.86, 0.05421, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(413, 36, 18.216622006148, 44.118440039456, 528.86, 0.05421, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(413, 37, 18.216622006148, 44.118440039456, 528.86, 0.05421, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(414, 33, 18.216497031972, 44.118216997012, 529.34, 0.02673, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(414, 34, 18.216497031972, 44.118216997012, 529.34, 0.02673, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(414, 35, 18.216497031972, 44.118216997012, 529.34, 0.02673, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(414, 36, 18.216497031972, 44.118216997012, 529.34, 0.02673, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(414, 37, 18.216497031972, 44.118216997012, 529.34, 0.02673, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(415, 33, 18.215999985114, 44.117798991501, 528.86, 0.06111, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(415, 34, 18.215999985114, 44.117798991501, 528.86, 0.06111, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(415, 35, 18.215999985114, 44.117798991501, 528.86, 0.06111, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(415, 36, 18.215999985114, 44.117798991501, 528.86, 0.06111, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(415, 37, 18.215999985114, 44.117798991501, 528.86, 0.06111, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(416, 33, 18.215339994058, 44.11733597517, 527.42, 0.07366, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(416, 34, 18.215339994058, 44.11733597517, 527.42, 0.07366, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(416, 35, 18.215339994058, 44.11733597517, 527.42, 0.07366, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(416, 36, 18.215339994058, 44.11733597517, 527.42, 0.07366, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(416, 37, 18.215339994058, 44.11733597517, 527.42, 0.07366, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(417, 33, 18.214976973832, 44.117173030972, 525.5, 0.03418, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(417, 34, 18.214976973832, 44.117173030972, 525.5, 0.03418, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(417, 35, 18.214976973832, 44.117173030972, 525.5, 0.03418, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(417, 36, 18.214976973832, 44.117173030972, 525.5, 0.03418, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(417, 37, 18.214976973832, 44.117173030972, 525.5, 0.03418, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(418, 33, 18.214549999684, 44.116942025721, 520.69, 0.04268, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(418, 34, 18.214549999684, 44.116942025721, 520.69, 0.04268, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(418, 35, 18.214549999684, 44.116942025721, 520.69, 0.04268, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(418, 36, 18.214549999684, 44.116942025721, 520.69, 0.04268, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(418, 37, 18.214549999684, 44.116942025721, 520.69, 0.04268, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(419, 33, 18.214455032721, 44.116899026558, 519.25, 0.00896, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(419, 34, 18.214455032721, 44.116899026558, 519.25, 0.00896, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(419, 35, 18.214455032721, 44.116899026558, 519.25, 0.00896, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(419, 36, 18.214455032721, 44.116899026558, 519.25, 0.00896, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(419, 37, 18.214455032721, 44.116899026558, 519.25, 0.00896, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(420, 33, 18.214059993625, 44.116659974679, 514.44, 0.04124, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(420, 34, 18.214059993625, 44.116659974679, 514.44, 0.04124, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(420, 35, 18.214059993625, 44.116659974679, 514.44, 0.04124, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(420, 36, 18.214059993625, 44.116659974679, 514.44, 0.04124, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(420, 37, 18.214059993625, 44.116659974679, 514.44, 0.04124, -4.81);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(421, 33, 18.213837035, 44.116455037147, 511.08, 0.02892, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(421, 34, 18.213837035, 44.116455037147, 511.08, 0.02892, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(421, 35, 18.213837035, 44.116455037147, 511.08, 0.02892, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(421, 36, 18.213837035, 44.116455037147, 511.08, 0.02892, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(421, 37, 18.213837035, 44.116455037147, 511.08, 0.02892, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(422, 33, 18.213590020314, 44.116123029962, 509.16, 0.04185, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(422, 34, 18.213590020314, 44.116123029962, 509.16, 0.04185, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(422, 35, 18.213590020314, 44.116123029962, 509.16, 0.04185, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(422, 36, 18.213590020314, 44.116123029962, 509.16, 0.04185, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(422, 37, 18.213590020314, 44.116123029962, 509.16, 0.04185, -1.92);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(423, 33, 18.212728025392, 44.115193979815, 507.23, 0.12413, -1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(423, 34, 18.212728025392, 44.115193979815, 507.23, 0.12413, -1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(423, 35, 18.212728025392, 44.115193979815, 507.23, 0.12413, -1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(423, 36, 18.212728025392, 44.115193979815, 507.23, 0.12413, -1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(423, 37, 18.212728025392, 44.115193979815, 507.23, 0.12413, -1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(424, 33, 18.212269032374, 44.114988036454, 510.12, 0.04321, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(424, 34, 18.212269032374, 44.114988036454, 510.12, 0.04321, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(424, 35, 18.212269032374, 44.114988036454, 510.12, 0.04321, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(424, 36, 18.212269032374, 44.114988036454, 510.12, 0.04321, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(424, 37, 18.212269032374, 44.114988036454, 510.12, 0.04321, 2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(425, 33, 18.211759999394, 44.114483026788, 506.75, 0.06932, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(425, 34, 18.211759999394, 44.114483026788, 506.75, 0.06932, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(425, 35, 18.211759999394, 44.114483026788, 506.75, 0.06932, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(425, 36, 18.211759999394, 44.114483026788, 506.75, 0.06932, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(425, 37, 18.211759999394, 44.114483026788, 506.75, 0.06932, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(426, 33, 18.211675006896, 44.114398034289, 506.27, 0.01163, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(426, 34, 18.211675006896, 44.114398034289, 506.27, 0.01163, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(426, 35, 18.211675006896, 44.114398034289, 506.27, 0.01163, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(426, 36, 18.211675006896, 44.114398034289, 506.27, 0.01163, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(426, 37, 18.211675006896, 44.114398034289, 506.27, 0.01163, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(427, 33, 18.211168991402, 44.114261996001, 502.91, 0.04314, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(427, 34, 18.211168991402, 44.114261996001, 502.91, 0.04314, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(427, 35, 18.211168991402, 44.114261996001, 502.91, 0.04314, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(427, 36, 18.211168991402, 44.114261996001, 502.91, 0.04314, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(427, 37, 18.211168991402, 44.114261996001, 502.91, 0.04314, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(428, 33, 18.210953995585, 44.114247998223, 503.87, 0.01723, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(428, 34, 18.210953995585, 44.114247998223, 503.87, 0.01723, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(428, 35, 18.210953995585, 44.114247998223, 503.87, 0.01723, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(428, 36, 18.210953995585, 44.114247998223, 503.87, 0.01723, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(428, 37, 18.210953995585, 44.114247998223, 503.87, 0.01723, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(429, 33, 18.210676973686, 44.114203993231, 503.39, 0.02265, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(429, 34, 18.210676973686, 44.114203993231, 503.39, 0.02265, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(429, 35, 18.210676973686, 44.114203993231, 503.39, 0.02265, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(429, 36, 18.210676973686, 44.114203993231, 503.39, 0.02265, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(429, 37, 18.210676973686, 44.114203993231, 503.39, 0.02265, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(430, 33, 18.209955962375, 44.114084970206, 507.23, 0.05906, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(430, 34, 18.209955962375, 44.114084970206, 507.23, 0.05906, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(430, 35, 18.209955962375, 44.114084970206, 507.23, 0.05906, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(430, 36, 18.209955962375, 44.114084970206, 507.23, 0.05906, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(430, 37, 18.209955962375, 44.114084970206, 507.23, 0.05906, 3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(431, 33, 18.209523959085, 44.114053035155, 510.6, 0.03467, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(431, 34, 18.209523959085, 44.114053035155, 510.6, 0.03467, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(431, 35, 18.209523959085, 44.114053035155, 510.6, 0.03467, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(431, 36, 18.209523959085, 44.114053035155, 510.6, 0.03467, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(431, 37, 18.209523959085, 44.114053035155, 510.6, 0.03467, 3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(432, 33, 18.209149958566, 44.114039959386, 510.6, 0.02989, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(432, 34, 18.209149958566, 44.114039959386, 510.6, 0.02989, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(432, 35, 18.209149958566, 44.114039959386, 510.6, 0.02989, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(432, 36, 18.209149958566, 44.114039959386, 510.6, 0.02989, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(432, 37, 18.209149958566, 44.114039959386, 510.6, 0.02989, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(433, 33, 18.208403969184, 44.113924959674, 506.75, 0.06091, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(433, 34, 18.208403969184, 44.113924959674, 506.75, 0.06091, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(433, 35, 18.208403969184, 44.113924959674, 506.75, 0.06091, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(433, 36, 18.208403969184, 44.113924959674, 506.75, 0.06091, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(433, 37, 18.208403969184, 44.113924959674, 506.75, 0.06091, -3.85);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(434, 33, 18.207913041115, 44.113825969398, 503.87, 0.04071, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(434, 34, 18.207913041115, 44.113825969398, 503.87, 0.04071, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(434, 35, 18.207913041115, 44.113825969398, 503.87, 0.04071, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(434, 36, 18.207913041115, 44.113825969398, 503.87, 0.04071, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(434, 37, 18.207913041115, 44.113825969398, 503.87, 0.04071, -2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(435, 33, 18.2076390367, 44.113769978285, 501.46, 0.02274, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(435, 34, 18.2076390367, 44.113769978285, 501.46, 0.02274, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(435, 35, 18.2076390367, 44.113769978285, 501.46, 0.02274, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(435, 36, 18.2076390367, 44.113769978285, 501.46, 0.02274, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(435, 37, 18.2076390367, 44.113769978285, 501.46, 0.02274, -2.41);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(436, 33, 18.206882989034, 44.113581972197, 498.1, 0.06388, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(436, 34, 18.206882989034, 44.113581972197, 498.1, 0.06388, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(436, 35, 18.206882989034, 44.113581972197, 498.1, 0.06388, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(436, 36, 18.206882989034, 44.113581972197, 498.1, 0.06388, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(436, 37, 18.206882989034, 44.113581972197, 498.1, 0.06388, -3.36);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(437, 33, 18.206310002133, 44.113507037982, 494.26, 0.0465, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(437, 34, 18.206310002133, 44.113507037982, 494.26, 0.0465, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(437, 35, 18.206310002133, 44.113507037982, 494.26, 0.0465, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(437, 36, 18.206310002133, 44.113507037982, 494.26, 0.0465, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(437, 37, 18.206310002133, 44.113507037982, 494.26, 0.0465, -3.84);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(438, 33, 18.20523602888, 44.113616002724, 489.93, 0.08659, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(438, 34, 18.20523602888, 44.113616002724, 489.93, 0.08659, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(438, 35, 18.20523602888, 44.113616002724, 489.93, 0.08659, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(438, 36, 18.20523602888, 44.113616002724, 489.93, 0.08659, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(438, 37, 18.20523602888, 44.113616002724, 489.93, 0.08659, -4.33);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(439, 33, 18.205073000863, 44.113693032414, 489.45, 0.01558, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(439, 34, 18.205073000863, 44.113693032414, 489.45, 0.01558, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(439, 35, 18.205073000863, 44.113693032414, 489.45, 0.01558, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(439, 36, 18.205073000863, 44.113693032414, 489.45, 0.01558, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(439, 37, 18.205073000863, 44.113693032414, 489.45, 0.01558, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(440, 33, 18.204850964248, 44.113795040175, 489.45, 0.02104, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(440, 34, 18.204850964248, 44.113795040175, 489.45, 0.02104, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(440, 35, 18.204850964248, 44.113795040175, 489.45, 0.02104, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(440, 36, 18.204850964248, 44.113795040175, 489.45, 0.02104, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(440, 37, 18.204850964248, 44.113795040175, 489.45, 0.02104, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(441, 33, 18.204470006749, 44.114077007398, 489.45, 0.04368, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(441, 34, 18.204470006749, 44.114077007398, 489.45, 0.04368, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(441, 35, 18.204470006749, 44.114077007398, 489.45, 0.04368, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(441, 36, 18.204470006749, 44.114077007398, 489.45, 0.04368, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(441, 37, 18.204470006749, 44.114077007398, 489.45, 0.04368, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(442, 33, 18.203769028187, 44.114373978227, 486.56, 0.06498, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(442, 34, 18.203769028187, 44.114373978227, 486.56, 0.06498, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(442, 35, 18.203769028187, 44.114373978227, 486.56, 0.06498, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(442, 36, 18.203769028187, 44.114373978227, 486.56, 0.06498, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(442, 37, 18.203769028187, 44.114373978227, 486.56, 0.06498, -2.89);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(443, 33, 18.203288996592, 44.114509010687, 486.56, 0.04116, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(443, 34, 18.203288996592, 44.114509010687, 486.56, 0.04116, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(443, 35, 18.203288996592, 44.114509010687, 486.56, 0.04116, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(443, 36, 18.203288996592, 44.114509010687, 486.56, 0.04116, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(443, 37, 18.203288996592, 44.114509010687, 486.56, 0.04116, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(444, 33, 18.202839978039, 44.114615041763, 486.08, 0.03774, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(444, 34, 18.202839978039, 44.114615041763, 486.08, 0.03774, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(444, 35, 18.202839978039, 44.114615041763, 486.08, 0.03774, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(444, 36, 18.202839978039, 44.114615041763, 486.08, 0.03774, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(444, 37, 18.202839978039, 44.114615041763, 486.08, 0.03774, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(445, 33, 18.202102035284, 44.114653011784, 485.12, 0.05906, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(445, 34, 18.202102035284, 44.114653011784, 485.12, 0.05906, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(445, 35, 18.202102035284, 44.114653011784, 485.12, 0.05906, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(445, 36, 18.202102035284, 44.114653011784, 485.12, 0.05906, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(445, 37, 18.202102035284, 44.114653011784, 485.12, 0.05906, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(446, 33, 18.200972992927, 44.114749990404, 486.56, 0.09078, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(446, 34, 18.200972992927, 44.114749990404, 486.56, 0.09078, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(446, 35, 18.200972992927, 44.114749990404, 486.56, 0.09078, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(446, 36, 18.200972992927, 44.114749990404, 486.56, 0.09078, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(446, 37, 18.200972992927, 44.114749990404, 486.56, 0.09078, 1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(447, 33, 18.200824968517, 44.114787038416, 485.6, 0.01251, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(447, 34, 18.200824968517, 44.114787038416, 485.6, 0.01251, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(447, 35, 18.200824968517, 44.114787038416, 485.6, 0.01251, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(447, 36, 18.200824968517, 44.114787038416, 485.6, 0.01251, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(447, 37, 18.200824968517, 44.114787038416, 485.6, 0.01251, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(448, 33, 18.200754979625, 44.114802964032, 484.64, 0.00586, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(448, 34, 18.200754979625, 44.114802964032, 484.64, 0.00586, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(448, 35, 18.200754979625, 44.114802964032, 484.64, 0.00586, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(448, 36, 18.200754979625, 44.114802964032, 484.64, 0.00586, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(448, 37, 18.200754979625, 44.114802964032, 484.64, 0.00586, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(449, 33, 18.200595974922, 44.114851998165, 484.64, 0.01382, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(449, 34, 18.200595974922, 44.114851998165, 484.64, 0.01382, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(449, 35, 18.200595974922, 44.114851998165, 484.64, 0.01382, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(449, 36, 18.200595974922, 44.114851998165, 484.64, 0.01382, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(449, 37, 18.200595974922, 44.114851998165, 484.64, 0.01382, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(450, 33, 18.200428001583, 44.114917963743, 484.16, 0.01528, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(450, 34, 18.200428001583, 44.114917963743, 484.16, 0.01528, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(450, 35, 18.200428001583, 44.114917963743, 484.16, 0.01528, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(450, 36, 18.200428001583, 44.114917963743, 484.16, 0.01528, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(450, 37, 18.200428001583, 44.114917963743, 484.16, 0.01528, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(451, 33, 18.200016031042, 44.114828025922, 483.68, 0.03438, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(451, 34, 18.200016031042, 44.114828025922, 483.68, 0.03438, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(451, 35, 18.200016031042, 44.114828025922, 483.68, 0.03438, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(451, 36, 18.200016031042, 44.114828025922, 483.68, 0.03438, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(451, 37, 18.200016031042, 44.114828025922, 483.68, 0.03438, -0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(452, 33, 18.19995299913, 44.114709002897, 482.72, 0.01416, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(452, 34, 18.19995299913, 44.114709002897, 482.72, 0.01416, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(452, 35, 18.19995299913, 44.114709002897, 482.72, 0.01416, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(452, 36, 18.19995299913, 44.114709002897, 482.72, 0.01416, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(452, 37, 18.19995299913, 44.114709002897, 482.72, 0.01416, -0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(453, 33, 18.19995299913, 44.114709002897, 482.72, 0, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(453, 34, 18.19995299913, 44.114709002897, 482.72, 0, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(453, 35, 18.19995299913, 44.114709002897, 482.72, 0, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(453, 36, 18.19995299913, 44.114709002897, 482.72, 0, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(453, 37, 18.19995299913, 44.114709002897, 482.72, 0, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(454, 33, 18.199482019991, 44.11503598094, 481.28, 0.0523, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(454, 34, 18.199482019991, 44.11503598094, 481.28, 0.0523, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(454, 35, 18.199482019991, 44.11503598094, 481.28, 0.0523, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(454, 36, 18.199482019991, 44.11503598094, 481.28, 0.0523, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(454, 37, 18.199482019991, 44.11503598094, 481.28, 0.0523, -1.44);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(455, 33, 18.199037024751, 44.11527402699, 477.91, 0.0443, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(455, 34, 18.199037024751, 44.11527402699, 477.91, 0.0443, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(455, 35, 18.199037024751, 44.11527402699, 477.91, 0.0443, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(455, 36, 18.199037024751, 44.11527402699, 477.91, 0.0443, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(455, 37, 18.199037024751, 44.11527402699, 477.91, 0.0443, -3.37);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(456, 33, 18.199516972527, 44.115549037233, 477.91, 0.04902, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(456, 34, 18.199516972527, 44.115549037233, 477.91, 0.04902, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(456, 35, 18.199516972527, 44.115549037233, 477.91, 0.04902, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(456, 36, 18.199516972527, 44.115549037233, 477.91, 0.04902, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(456, 37, 18.199516972527, 44.115549037233, 477.91, 0.04902, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(457, 33, 18.200426995754, 44.116206010804, 478.87, 0.10303, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(457, 34, 18.200426995754, 44.116206010804, 478.87, 0.10303, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(457, 35, 18.200426995754, 44.116206010804, 478.87, 0.10303, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(457, 36, 18.200426995754, 44.116206010804, 478.87, 0.10303, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(457, 37, 18.200426995754, 44.116206010804, 478.87, 0.10303, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(458, 33, 18.200075961649, 44.116732981056, 478.87, 0.06495, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(458, 34, 18.200075961649, 44.116732981056, 478.87, 0.06495, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(458, 35, 18.200075961649, 44.116732981056, 478.87, 0.06495, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(458, 36, 18.200075961649, 44.116732981056, 478.87, 0.06495, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(458, 37, 18.200075961649, 44.116732981056, 478.87, 0.06495, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(459, 33, 18.200102029368, 44.116992987692, 479.35, 0.02899, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(459, 34, 18.200102029368, 44.116992987692, 479.35, 0.02899, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(459, 35, 18.200102029368, 44.116992987692, 479.35, 0.02899, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(459, 36, 18.200102029368, 44.116992987692, 479.35, 0.02899, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(459, 37, 18.200102029368, 44.116992987692, 479.35, 0.02899, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(460, 33, 18.200324987993, 44.117488022894, 480.32, 0.05785, 0.97);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(460, 34, 18.200324987993, 44.117488022894, 480.32, 0.05785, 0.97);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(460, 35, 18.200324987993, 44.117488022894, 480.32, 0.05785, 0.97);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(460, 36, 18.200324987993, 44.117488022894, 480.32, 0.05785, 0.97);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(460, 37, 18.200324987993, 44.117488022894, 480.32, 0.05785, 0.97);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(461, 33, 18.200431019068, 44.118796018884, 483.2, 0.14569, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(461, 34, 18.200431019068, 44.118796018884, 483.2, 0.14569, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(461, 35, 18.200431019068, 44.118796018884, 483.2, 0.14569, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(461, 36, 18.200431019068, 44.118796018884, 483.2, 0.14569, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(461, 37, 18.200431019068, 44.118796018884, 483.2, 0.14569, 2.88);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(462, 33, 18.200502013788, 44.118986036628, 483.68, 0.02188, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(462, 34, 18.200502013788, 44.118986036628, 483.68, 0.02188, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(462, 35, 18.200502013788, 44.118986036628, 483.68, 0.02188, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(462, 36, 18.200502013788, 44.118986036628, 483.68, 0.02188, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(462, 37, 18.200502013788, 44.118986036628, 483.68, 0.02188, 0.48);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(463, 33, 18.200641991571, 44.119354002178, 484.64, 0.04241, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(463, 34, 18.200641991571, 44.119354002178, 484.64, 0.04241, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(463, 35, 18.200641991571, 44.119354002178, 484.64, 0.04241, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(463, 36, 18.200641991571, 44.119354002178, 484.64, 0.04241, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(463, 37, 18.200641991571, 44.119354002178, 484.64, 0.04241, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(464, 33, 18.200687002391, 44.119429020211, 484.64, 0.00908, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(464, 34, 18.200687002391, 44.119429020211, 484.64, 0.00908, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(464, 35, 18.200687002391, 44.119429020211, 484.64, 0.00908, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(464, 36, 18.200687002391, 44.119429020211, 484.64, 0.00908, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(464, 37, 18.200687002391, 44.119429020211, 484.64, 0.00908, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(465, 33, 18.200856987387, 44.119676034898, 484.64, 0.03064, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(465, 34, 18.200856987387, 44.119676034898, 484.64, 0.03064, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(465, 35, 18.200856987387, 44.119676034898, 484.64, 0.03064, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(465, 36, 18.200856987387, 44.119676034898, 484.64, 0.03064, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(465, 37, 18.200856987387, 44.119676034898, 484.64, 0.03064, 0);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(466, 33, 18.201192012057, 44.120036037639, 485.6, 0.04814, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(466, 34, 18.201192012057, 44.120036037639, 485.6, 0.04814, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(466, 35, 18.201192012057, 44.120036037639, 485.6, 0.04814, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(466, 36, 18.201192012057, 44.120036037639, 485.6, 0.04814, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(466, 37, 18.201192012057, 44.120036037639, 485.6, 0.04814, 0.96);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(467, 33, 18.201312962919, 44.120485978201, 487.53, 0.05095, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(467, 34, 18.201312962919, 44.120485978201, 487.53, 0.05095, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(467, 35, 18.201312962919, 44.120485978201, 487.53, 0.05095, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(467, 36, 18.201312962919, 44.120485978201, 487.53, 0.05095, 1.93);
INSERT INTO `hist_trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(467, 37, 18.201312962919, 44.120485978201, 487.53, 0.05095, 1.93);

-- --------------------------------------------------------

--
-- Table structure for table `hist_trail_version_points`
--

DROP TABLE IF EXISTS `hist_trail_version_points`;
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
  `symbol` varchar(5) DEFAULT NULL,
  `pictogram` varchar(100) DEFAULT NULL,
  `pictureurl` varchar(500) DEFAULT NULL,
  `time` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`,`id_version`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `hist_trail_version_points`
--

INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(1, 24, 'Voda', 'Voda uz cestu sa desne strane', 44.12709963508, 18.215717934072, 573.08, 89.4, -0.96, 200.44, 0, 1.53, 3.09, 'W', '90-v0', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(1, 33, 'Voda', 'Voda uz cestu sa desne strane', 44.12709963508, 18.215717934072, 573.08, 89.4, -0.96, 200.44, 0, 1.53, 3.09, 'W', '90-v0', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(1, 34, 'Voda', 'Voda uz cestu sa desne strane', 44.12709963508, 18.215717934072, 573.08, 89.4, -0.96, 200.44, 0, 1.53, 3.09, 'W', '90-v0', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(1, 35, 'Voda', 'Voda uz cestu sa desne strane', 44.12709963508, 18.215717934072, 573.08, 89.4, -0.96, 200.44, 0, 1.53, 3.09, 'W', '90-v0', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(1, 36, 'Voda', 'Voda%20uz%20cestu%20sa%20desne%20strane', 44.12709963508, 18.215717934072, 573.08, 89.4, -0.96, 200.44, 0, 1.53, 3.09, 'W', '90-v0', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(1, 37, 'Voda', 'Voda%20uz%20cestu%20sa%20desne%20strane', 44.12709963508, 18.215717934072, 573.08, 89.4, -0.96, 200.44, 0, 1.53, 3.09, 'W', '90-v0', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(2, 24, 'Kopijari', 'Skrenuti desno putem za Bobovac, nastaviti penjanje', 44.150598971173, 18.210224015638, 773.52, 289.84, -0.96, 208.6, -0.48, 4.62, 1.69, 'C', '315-135', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(2, 33, 'Kopijari', 'Skrenuti desno putem za Bobovac, nastaviti penjanje', 44.150598971173, 18.210224015638, 773.52, 289.84, -0.96, 208.6, -0.48, 4.62, 1.69, 'C', '315-135', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(2, 34, 'Kopijari', 'Skrenuti desno putem za Bobovac, nastaviti penjanje', 44.150598971173, 18.210224015638, 773.52, 289.84, -0.96, 208.6, -0.48, 4.62, 1.69, 'C', '315-135', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(2, 35, 'Kopijari', 'Skrenuti desno putem za Bobovac, nastaviti penjanje', 44.150598971173, 18.210224015638, 773.52, 289.84, -0.96, 208.6, -0.48, 4.62, 1.69, 'C', '315-135', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(2, 36, 'Kopijari', 'Skrenuti%20desno%20putem%20za%20Bobovac%2C%20nastaviti%20penjanje', 44.150598971173, 18.210224015638, 773.52, 289.84, -0.96, 208.6, -0.48, 4.62, 1.69, 'C', '315-135', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(2, 37, 'Kopijari', 'Skrenuti%20desno%20putem%20za%20Bobovac%2C%20nastaviti%20penjanje', 44.150598971173, 18.210224015638, 773.52, 289.84, -0.96, 208.6, -0.48, 4.62, 1.69, 'C', '315-135', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(3, 24, 'Prevoj', 'NajviÅ¡a taÄka na ruti. IÄ‡i pravo spuÅ¡tajuÄ‡i se makadamom kroz selo Kopijari', 44.144506249577, 18.225140031427, 981.64, 498.44, -1.44, 4.33, -247.54, 6.31, 2.7, 'P', '90-180-315', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(3, 33, 'Prevoj', 'NajviÅ¡a taÄka na ruti. IÄ‡i pravo spuÅ¡tajuÄ‡i se makadamom kroz selo Kopijari', 44.144506249577, 18.225140031427, 981.64, 498.44, -1.44, 4.33, -247.54, 6.31, 2.7, 'P', '90-180-315', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(3, 34, 'Prevoj', 'NajviÅ¡a taÄka na ruti. IÄ‡i pravo spuÅ¡tajuÄ‡i se makadamom kroz selo Kopijari', 44.144506249577, 18.225140031427, 981.64, 498.44, -1.44, 4.33, -247.54, 6.31, 2.7, 'P', '90-180-315', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(3, 35, 'Prevoj', 'NajviÅ¡a taÄka na ruti. IÄ‡i pravo spuÅ¡tajuÄ‡i se makadamom kroz selo Kopijari', 44.144506249577, 18.225140031427, 981.64, 498.44, -1.44, 4.33, -247.54, 6.31, 2.7, 'P', '90-180-315', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(3, 36, 'Prevoj', 'Najvi%C5%A1a%20ta%C4%8Dka%20na%20ruti.%20I%C4%87i%20pravo%20spu%C5%A1taju%C4%87i%20se%20makadamom%20kroz%20selo%20Kopijari', 44.144506249577, 18.225140031427, 981.64, 498.44, -1.44, 4.33, -247.54, 6.31, 2.7, 'P', '90-180-315', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(3, 37, 'Prevoj', 'Najvi%C5%A1a%20ta%C4%8Dka%20na%20ruti.%20I%C4%87i%20pravo%20spu%C5%A1taju%C4%87i%20se%20makadamom%20kroz%20selo%20Kopijari', 44.144506249577, 18.225140031427, 981.64, 498.44, -1.44, 4.33, -247.54, 6.31, 2.7, 'P', '90-180-315', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(4, 24, 'DragoviÄ‡i', 'Po prelasku mosta, nastaviti putem desno prema selu DragoviÄ‡i', 44.154731668532, 18.23204588145, 738.43, 502.77, -248.98, 49.03, -4.33, 9.01, 0.91, 'C', '90-225', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(4, 33, 'DragoviÄ‡i', 'Po prelasku mosta, nastaviti putem desno prema selu DragoviÄ‡i', 44.154731668532, 18.23204588145, 738.43, 502.77, -248.98, 49.03, -4.33, 9.01, 0.91, 'C', '90-225', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(4, 34, 'DragoviÄ‡i', 'Po prelasku mosta, nastaviti putem desno prema selu DragoviÄ‡i', 44.154731668532, 18.23204588145, 738.43, 502.77, -248.98, 49.03, -4.33, 9.01, 0.91, 'C', '90-225', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(4, 35, 'DragoviÄ‡i', 'Po prelasku mosta, nastaviti putem desno prema selu DragoviÄ‡i', 44.154731668532, 18.23204588145, 738.43, 502.77, -248.98, 49.03, -4.33, 9.01, 0.91, 'C', '90-225', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(4, 36, 'Dragovi%C4%87i', 'Po%20prelasku%20mosta%2C%20nastaviti%20putem%20desno%20prema%20selu%20Dragovi%C4%87i', 44.154731668532, 18.23204588145, 738.43, 502.77, -248.98, 49.03, -4.33, 9.01, 0.91, 'C', '90-225', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(4, 37, 'Dragovi%C4%87i', 'Po%20prelasku%20mosta%2C%20nastaviti%20putem%20desno%20prema%20selu%20Dragovi%C4%87i', 44.154731668532, 18.23204588145, 738.43, 502.77, -248.98, 49.03, -4.33, 9.01, 0.91, 'C', '90-225', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(5, 24, 'DragoviÄ‡i', 'DrÅ¾ati isti pravac kroz selo DragoviÄ‡i', 44.148373911157, 18.238594746217, 783.13, 551.8, -253.31, 39.9, -1.45, 9.92, 0.93, 'C', '90-135-225', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(5, 33, 'DragoviÄ‡i', 'DrÅ¾ati isti pravac kroz selo DragoviÄ‡i', 44.148373911157, 18.238594746217, 783.13, 551.8, -253.31, 39.9, -1.45, 9.92, 0.93, 'C', '90-135-225', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(5, 34, 'DragoviÄ‡i', 'DrÅ¾ati isti pravac kroz selo DragoviÄ‡i', 44.148373911157, 18.238594746217, 783.13, 551.8, -253.31, 39.9, -1.45, 9.92, 0.93, 'C', '90-135-225', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(5, 35, 'DragoviÄ‡i', 'DrÅ¾ati isti pravac kroz selo DragoviÄ‡i', 44.148373911157, 18.238594746217, 783.13, 551.8, -253.31, 39.9, -1.45, 9.92, 0.93, 'C', '90-135-225', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(5, 36, 'Dragovi%C4%87i', 'Dr%C5%BEati%20isti%20pravac%20kroz%20selo%20Dragovi%C4%87i', 44.148373911157, 18.238594746217, 783.13, 551.8, -253.31, 39.9, -1.45, 9.92, 0.93, 'C', '90-135-225', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(5, 37, 'Dragovi%C4%87i', 'Dr%C5%BEati%20isti%20pravac%20kroz%20selo%20Dragovi%C4%87i', 44.148373911157, 18.238594746217, 783.13, 551.8, -253.31, 39.9, -1.45, 9.92, 0.93, 'C', '90-135-225', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(6, 24, 'MijakoviÄ‡i', 'SkrenuvÅ¡i sa ceste blago udesno spustiti se prema Bobovcu', 44.143295986578, 18.240171968937, 821.58, 591.7, -254.76, 5.29, -45.18, 10.85, 0.56, 'C', '45-180', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(6, 33, 'MijakoviÄ‡i', 'SkrenuvÅ¡i sa ceste blago udesno spustiti se prema Bobovcu', 44.143295986578, 18.240171968937, 821.58, 591.7, -254.76, 5.29, -45.18, 10.85, 0.56, 'C', '45-180', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(6, 34, 'MijakoviÄ‡i', 'SkrenuvÅ¡i sa ceste blago udesno spustiti se prema Bobovcu', 44.143295986578, 18.240171968937, 821.58, 591.7, -254.76, 5.29, -45.18, 10.85, 0.56, 'C', '45-180', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(6, 35, 'MijakoviÄ‡i', 'SkrenuvÅ¡i sa ceste blago udesno spustiti se prema Bobovcu', 44.143295986578, 18.240171968937, 821.58, 591.7, -254.76, 5.29, -45.18, 10.85, 0.56, 'C', '45-180', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(6, 36, 'Mijakovi%C4%87i', 'Skrenuv%C5%A1i%20sa%20ceste%20blago%20udesno%20spustiti%20se%20prema%20Bobovcu', 44.143295986578, 18.240171968937, 821.58, 591.7, -254.76, 5.29, -45.18, 10.85, 0.56, 'C', '45-180', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(6, 37, 'Mijakovi%C4%87i', 'Skrenuv%C5%A1i%20sa%20ceste%20blago%20udesno%20spustiti%20se%20prema%20Bobovcu', 44.143295986578, 18.240171968937, 821.58, 591.7, -254.76, 5.29, -45.18, 10.85, 0.56, 'C', '45-180', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(7, 24, 'Bobovac', 'Bobovac', 44.138544453308, 18.238935973495, 781.69, 596.99, -299.94, 61.55, -365.33, 11.41, 5.12, 'M', '90-27', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(7, 33, 'Bobovac', 'Bobovac', 44.138544453308, 18.238935973495, 781.69, 596.99, -299.94, 61.55, -365.33, 11.41, 5.12, 'M', '90-27', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(7, 34, 'Bobovac', 'Bobovac', 44.138544453308, 18.238935973495, 781.69, 596.99, -299.94, 61.55, -365.33, 11.41, 5.12, 'M', '90-27', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(7, 35, 'Bobovac', 'Bobovac', 44.138544453308, 18.238935973495, 781.69, 596.99, -299.94, 61.55, -365.33, 11.41, 5.12, 'M', '90-27', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(7, 36, 'Bobovac', 'Bobovac', 44.138544453308, 18.238935973495, 781.69, 596.99, -299.94, 61.55, -365.33, 11.41, 5.12, 'M', '90-27', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(7, 37, 'Bobovac', 'Bobovac', 44.138544453308, 18.238935973495, 781.69, 596.99, -299.94, 61.55, -365.33, 11.41, 5.12, 'M', '90-27', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(8, 24, 'Magistrala', 'Skrenuti desno cestom prema naselju.', 44.115282911807, 18.199035348371, 477.91, 658.54, -665.27, 5.29, 0, 16.53, 0.45, 'R', '0-180', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(8, 33, 'Magistrala', 'Skrenuti desno cestom prema naselju.', 44.115282911807, 18.199035348371, 477.91, 658.54, -665.27, 5.29, 0, 16.53, 0.45, 'R', '0-180', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(8, 34, 'Magistrala', 'Skrenuti desno cestom prema naselju.', 44.115282911807, 18.199035348371, 477.91, 658.54, -665.27, 5.29, 0, 16.53, 0.45, 'R', '0-180', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(8, 35, 'Magistrala', 'Skrenuti desno cestom prema naselju.', 44.115282911807, 18.199035348371, 477.91, 658.54, -665.27, 5.29, 0, 16.53, 0.45, 'R', '0-180', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(8, 36, 'Magistrala', 'Skrenuti%20desno%20cestom%20prema%20naselju.', 44.115282911807, 18.199035348371, 477.91, 658.54, -665.27, 5.29, 0, 16.53, 0.45, 'R', '0-180', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(8, 37, 'Magistrala', 'Skrenuti%20desno%20cestom%20prema%20naselju.', 44.115282911807, 18.199035348371, 477.91, 658.54, -665.27, 5.29, 0, 16.53, 0.45, 'R', '0-180', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(9, 24, 'Kraljeva Sutjeska', 'Dolazak u Kraljevu Sutjesku', 44.118796018884, 18.200431019068, 483.2, 663.83, -665.27, 0, 0, 16.98, 0, 'P', '90-0', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(9, 33, 'Kraljeva Sutjeska', 'Dolazak u Kraljevu Sutjesku', 44.118796018884, 18.200431019068, 483.2, 663.83, -665.27, 0, 0, 16.98, 0, 'P', '90-0', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(9, 34, 'Kraljeva Sutjeska', 'Dolazak u Kraljevu Sutjesku', 44.118796018884, 18.200431019068, 483.2, 663.83, -665.27, 0, 0, 16.98, 0, 'P', '90-0', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(9, 35, 'Kraljeva Sutjeska', 'Dolazak u Kraljevu Sutjesku', 44.118796018884, 18.200431019068, 483.2, 663.83, -665.27, 0, 0, 16.98, 0, 'P', '90-0', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(9, 36, 'Kraljeva%20Sutjeska', 'Dolazak%20u%20Kraljevu%20Sutjesku', 44.118796018884, 18.200431019068, 483.2, 663.83, -665.27, 0, 0, 16.98, 0, 'P', '90-0', '', NULL);
INSERT INTO `hist_trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(9, 37, 'Kraljeva%20Sutjeska', 'Dolazak%20u%20Kraljevu%20Sutjesku', 44.118796018884, 18.200431019068, 483.2, 663.83, -665.27, 0, 0, 16.98, 0, 'P', '90-0', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `repo_regions`
--

DROP TABLE IF EXISTS `repo_regions`;
CREATE TABLE IF NOT EXISTS `repo_regions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_parent` int(10) unsigned DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `slug` varchar(500) DEFAULT NULL,
  `desc` longtext NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `lat_center` double NOT NULL,
  `lon_center` double NOT NULL,
  `bounds` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `child_parent` (`id_parent`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `repo_regions`
--

INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `slug`, `desc`, `type`, `lat_center`, `lon_center`, `bounds`) VALUES(1, NULL, 'Bosna i Hercegovina', NULL, '', 'Country', 0, 0, '');
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `slug`, `desc`, `type`, `lat_center`, `lon_center`, `bounds`) VALUES(2, 1, 'Bjelašnica', NULL, '', 'Mountain', 0, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `repo_types`
--

DROP TABLE IF EXISTS `repo_types`;
CREATE TABLE IF NOT EXISTS `repo_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `desc` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `repo_types`
--

INSERT INTO `repo_types` (`id`, `name`, `desc`) VALUES(1, 'REK', 'Staza za rekreativce i pocetnike');
INSERT INTO `repo_types` (`id`, `name`, `desc`) VALUES(2, 'XC', 'CrossCountry staza');

-- --------------------------------------------------------

--
-- Table structure for table `trails`
--

DROP TABLE IF EXISTS `trails`;
CREATE TABLE IF NOT EXISTS `trails` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_mnt` int(10) unsigned DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `slug` varchar(500) COLLATE utf8_slovenian_ci DEFAULT NULL,
  `desc` longtext CHARACTER SET utf8,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`,`id_mnt`),
  KEY `region_trail` (`id_mnt`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_slovenian_ci AUTO_INCREMENT=25 ;

--
-- Dumping data for table `trails`
--

INSERT INTO `trails` (`id`, `id_mnt`, `name`, `slug`, `desc`) VALUES(24, 2, 'Kraljeva čaćđšž asd ŠAĐŽČLĆ', NULL, 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.');

-- --------------------------------------------------------

--
-- Table structure for table `trail_versions`
--

DROP TABLE IF EXISTS `trail_versions`;
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
  `review_landscape` int(11) DEFAULT NULL,
  `review_fun` int(11) DEFAULT NULL,
  `required_fitness` int(11) DEFAULT NULL,
  `required_technique` int(11) DEFAULT NULL,
  `lat_center` double DEFAULT NULL,
  `lon_center` double DEFAULT NULL,
  `bounds` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`,`id_trail`,`active`),
  KEY `indexirano` (`id`,`id_trail`,`trail_type`),
  KEY `version_trail` (`id_trail`),
  KEY `version_trail_type` (`trail_type`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=39 ;

--
-- Dumping data for table `trail_versions`
--

INSERT INTO `trail_versions` (`id`, `id_trail`, `date`, `active`, `trail_type`, `distance`, `elev_gain`, `elev_loss`, `elev_min`, `elev_max`, `review_landscape`, `review_fun`, `required_fitness`, `required_technique`, `lat_center`, `lon_center`, `bounds`) VALUES(24, 24, '2016-05-04', 0, 2, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `trail_versions` (`id`, `id_trail`, `date`, `active`, `trail_type`, `distance`, `elev_gain`, `elev_loss`, `elev_min`, `elev_max`, `review_landscape`, `review_fun`, `required_fitness`, `required_technique`, `lat_center`, `lon_center`, `bounds`) VALUES(26, 24, '2016-05-04', 0, 2, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `trail_versions` (`id`, `id_trail`, `date`, `active`, `trail_type`, `distance`, `elev_gain`, `elev_loss`, `elev_min`, `elev_max`, `review_landscape`, `review_fun`, `required_fitness`, `required_technique`, `lat_center`, `lon_center`, `bounds`) VALUES(27, 24, '2016-05-04', 0, 2, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `trail_versions` (`id`, `id_trail`, `date`, `active`, `trail_type`, `distance`, `elev_gain`, `elev_loss`, `elev_min`, `elev_max`, `review_landscape`, `review_fun`, `required_fitness`, `required_technique`, `lat_center`, `lon_center`, `bounds`) VALUES(28, 24, '2016-05-05', 0, 2, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `trail_versions` (`id`, `id_trail`, `date`, `active`, `trail_type`, `distance`, `elev_gain`, `elev_loss`, `elev_min`, `elev_max`, `review_landscape`, `review_fun`, `required_fitness`, `required_technique`, `lat_center`, `lon_center`, `bounds`) VALUES(29, 24, '2016-05-05', 0, 2, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `trail_versions` (`id`, `id_trail`, `date`, `active`, `trail_type`, `distance`, `elev_gain`, `elev_loss`, `elev_min`, `elev_max`, `review_landscape`, `review_fun`, `required_fitness`, `required_technique`, `lat_center`, `lon_center`, `bounds`) VALUES(30, 24, '2016-05-05', 0, 2, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `trail_versions` (`id`, `id_trail`, `date`, `active`, `trail_type`, `distance`, `elev_gain`, `elev_loss`, `elev_min`, `elev_max`, `review_landscape`, `review_fun`, `required_fitness`, `required_technique`, `lat_center`, `lon_center`, `bounds`) VALUES(31, 24, '2016-05-05', 0, 2, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `trail_versions` (`id`, `id_trail`, `date`, `active`, `trail_type`, `distance`, `elev_gain`, `elev_loss`, `elev_min`, `elev_max`, `review_landscape`, `review_fun`, `required_fitness`, `required_technique`, `lat_center`, `lon_center`, `bounds`) VALUES(32, 24, '2016-05-05', 0, 2, 17.1851, 668.16, -665.27, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `trail_versions` (`id`, `id_trail`, `date`, `active`, `trail_type`, `distance`, `elev_gain`, `elev_loss`, `elev_min`, `elev_max`, `review_landscape`, `review_fun`, `required_fitness`, `required_technique`, `lat_center`, `lon_center`, `bounds`) VALUES(33, 24, '2016-05-05', 0, 2, 17.1851, 668.16, -665.27, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `trail_versions` (`id`, `id_trail`, `date`, `active`, `trail_type`, `distance`, `elev_gain`, `elev_loss`, `elev_min`, `elev_max`, `review_landscape`, `review_fun`, `required_fitness`, `required_technique`, `lat_center`, `lon_center`, `bounds`) VALUES(34, 24, '2016-05-05', 0, 2, 17.1851, 668.16, -665.27, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `trail_versions` (`id`, `id_trail`, `date`, `active`, `trail_type`, `distance`, `elev_gain`, `elev_loss`, `elev_min`, `elev_max`, `review_landscape`, `review_fun`, `required_fitness`, `required_technique`, `lat_center`, `lon_center`, `bounds`) VALUES(35, 24, '2016-05-05', 0, 2, 17.1851, 668.16, -665.27, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `trail_versions` (`id`, `id_trail`, `date`, `active`, `trail_type`, `distance`, `elev_gain`, `elev_loss`, `elev_min`, `elev_max`, `review_landscape`, `review_fun`, `required_fitness`, `required_technique`, `lat_center`, `lon_center`, `bounds`) VALUES(36, 24, '2016-05-05', 0, 2, 17.1851, 668.16, -665.27, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `trail_versions` (`id`, `id_trail`, `date`, `active`, `trail_type`, `distance`, `elev_gain`, `elev_loss`, `elev_min`, `elev_max`, `review_landscape`, `review_fun`, `required_fitness`, `required_technique`, `lat_center`, `lon_center`, `bounds`) VALUES(37, 24, '2016-05-05', 0, 2, 17.1851, 668.16, -665.27, 477.91, 985.97, NULL, NULL, NULL, NULL, 18.220711997709998, 44.134125681594, '[[18.256836952641667,44.168490087614],[18.184587042778332,44.099761275574]]');
INSERT INTO `trail_versions` (`id`, `id_trail`, `date`, `active`, `trail_type`, `distance`, `elev_gain`, `elev_loss`, `elev_min`, `elev_max`, `review_landscape`, `review_fun`, `required_fitness`, `required_technique`, `lat_center`, `lon_center`, `bounds`) VALUES(38, 24, '2016-05-17', 1, 2, 17.1851, 668.16, -665.27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `trail_version_path`
--

DROP TABLE IF EXISTS `trail_version_path`;
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=468 ;

--
-- Dumping data for table `trail_version_path`
--

INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(1, 38, 44.120494024828, 18.20129997097, 484.64, 0, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(2, 38, 44.120507016778, 18.201519995928, 483.68, 0.01762, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(3, 38, 44.121152004227, 18.201568024233, 485.12, 0.07182, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(4, 38, 44.121700013056, 18.202779963613, 488.97, 0.11433, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(5, 38, 44.122527977452, 18.203856032342, 492.81, 0.12591, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(6, 38, 44.12272897549, 18.20453396067, 497.14, 0.05855, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(7, 38, 44.122720006853, 18.205986963585, 501.95, 0.11598, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(8, 38, 44.122724030167, 18.207391016185, 506.27, 0.11207, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(9, 38, 44.122727969661, 18.208557022735, 511.08, 0.09307, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(10, 38, 44.122751019895, 18.209449024871, 515.88, 0.07125, 4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(11, 38, 44.122958974913, 18.210054030642, 520.69, 0.05354, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(12, 38, 44.123089984059, 18.210314959288, 522.13, 0.02542, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(13, 38, 44.123392989859, 18.210761966184, 525.98, 0.04907, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(14, 38, 44.123558029532, 18.211574004963, 531.27, 0.06737, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(15, 38, 44.123966982588, 18.212541025132, 537.03, 0.08959, 5.76);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(16, 38, 44.124464029446, 18.213063972071, 542.8, 0.06926, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(17, 38, 44.124992005527, 18.213552972302, 548.57, 0.0705, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(18, 38, 44.125636992976, 18.214229978621, 554.82, 0.0898, 6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(19, 38, 44.125848971307, 18.214663993567, 558.18, 0.0419, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(20, 38, 44.126166980714, 18.214986026287, 561.55, 0.04372, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(21, 38, 44.126218026504, 18.21503598243, 561.55, 0.00694, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(22, 38, 44.126532012597, 18.21528702043, 565.39, 0.04025, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(23, 38, 44.126819008961, 18.215508973226, 568.76, 0.0365, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(24, 38, 44.127315972, 18.215879034251, 573.08, 0.06266, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(25, 38, 44.127923995256, 18.216109033674, 579.81, 0.07006, 6.73);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(26, 38, 44.128139996901, 18.216184973717, 581.73, 0.02477, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(27, 38, 44.128234963864, 18.216155972332, 581.73, 0.01081, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(28, 38, 44.128716001287, 18.216391000897, 586.54, 0.05668, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(29, 38, 44.129096958786, 18.216682020575, 589.91, 0.04831, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(30, 38, 44.129476994276, 18.216675985605, 593.27, 0.04226, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(31, 38, 44.129941016436, 18.216944960877, 598.08, 0.05588, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(32, 38, 44.13035097532, 18.217160962522, 604.33, 0.04874, 6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(33, 38, 44.130775015801, 18.217150988057, 607.21, 0.04716, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(34, 38, 44.131487980485, 18.217274034396, 612.98, 0.07988, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(35, 38, 44.131791992113, 18.217443013564, 616.34, 0.0364, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(36, 38, 44.132192982361, 18.217394985259, 619.23, 0.04475, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(37, 38, 44.132842998952, 18.217242015526, 624.51, 0.0733, 5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(38, 38, 44.133479017764, 18.216936998069, 629.32, 0.07479, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(39, 38, 44.133784035221, 18.216899028048, 632.68, 0.03405, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(40, 38, 44.134438997135, 18.216732982546, 637.97, 0.07402, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(41, 38, 44.134916011244, 18.216760978103, 641.82, 0.05309, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(42, 38, 44.135334016755, 18.216918976977, 646.62, 0.04816, 4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(43, 38, 44.135957965627, 18.21645998396, 652.39, 0.07846, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(44, 38, 44.136571018025, 18.216857034713, 658.16, 0.07517, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(45, 38, 44.136976031587, 18.217379981652, 662.49, 0.0614, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(46, 38, 44.137505013496, 18.217303035781, 665.37, 0.05914, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(47, 38, 44.13834001869, 18.217404959723, 670.66, 0.0932, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(48, 38, 44.138945024461, 18.21786403656, 674.98, 0.0766, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(49, 38, 44.139191033319, 18.217822965235, 675.94, 0.02755, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(50, 38, 44.139539971948, 18.2180320099, 678.83, 0.04223, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(51, 38, 44.139690008014, 18.217837968841, 680.75, 0.02276, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(52, 38, 44.139835014939, 18.217091979459, 685.08, 0.06167, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(53, 38, 44.139870973304, 18.216854017228, 687, 0.01941, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(54, 38, 44.140342036262, 18.21671102196, 691.81, 0.05361, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(55, 38, 44.140495005995, 18.216745974496, 693.25, 0.01724, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(56, 38, 44.140628026798, 18.216775981709, 698.05, 0.01498, 4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(57, 38, 44.140944024548, 18.216906990856, 700.46, 0.03666, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(58, 38, 44.141201013699, 18.217083010823, 703.34, 0.03184, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(59, 38, 44.141985978931, 18.216847982258, 708.15, 0.08928, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(60, 38, 44.142414964736, 18.21602798067, 712.47, 0.08097, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(61, 38, 44.142459975556, 18.215523976833, 715.84, 0.04053, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(62, 38, 44.142509009689, 18.215148970485, 717.28, 0.03042, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(63, 38, 44.142517978325, 18.215115023777, 717.76, 0.00289, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(64, 38, 44.142728028819, 18.214768012986, 719.68, 0.03622, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(65, 38, 44.14303698577, 18.21432704106, 723.53, 0.04918, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(66, 38, 44.143155002967, 18.21399897337, 726.41, 0.02928, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(67, 38, 44.143634028733, 18.213822031394, 731.7, 0.0551, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(68, 38, 44.144264012575, 18.213555989787, 736.51, 0.0732, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(69, 38, 44.144674977288, 18.213390028104, 740.35, 0.04758, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(70, 38, 44.145332034677, 18.213167991489, 745.64, 0.07518, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(71, 38, 44.145926982164, 18.213915992528, 751.89, 0.0891, 6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(72, 38, 44.146324032918, 18.213290031999, 756.21, 0.06666, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(73, 38, 44.147129030898, 18.212102986872, 760.54, 0.13032, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(74, 38, 44.148167967796, 18.211509967223, 764.87, 0.12484, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(75, 38, 44.148733997717, 18.211332019418, 766.31, 0.06452, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(76, 38, 44.148772973567, 18.211295977235, 766.31, 0.0052, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(77, 38, 44.148887973279, 18.211090033874, 766.31, 0.02082, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(78, 38, 44.149075979367, 18.210386037827, 768.23, 0.05993, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(79, 38, 44.149190979078, 18.209612974897, 771.6, 0.06299, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(80, 38, 44.149401029572, 18.209621021524, 772.08, 0.02337, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(81, 38, 44.150017015636, 18.210021005943, 773.52, 0.07556, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(82, 38, 44.150598971173, 18.210224015638, 773.52, 0.06671, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(83, 38, 44.150531999767, 18.210329040885, 779.29, 0.01121, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(84, 38, 44.150314992294, 18.210300961509, 782.65, 0.02423, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(85, 38, 44.150066971779, 18.210344966501, 786.02, 0.0278, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(86, 38, 44.149757009, 18.210267014802, 791.78, 0.03502, 5.76);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(87, 38, 44.149603033438, 18.210401963443, 795.63, 0.02023, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(88, 38, 44.149571014568, 18.210472958162, 795.15, 0.00669, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(89, 38, 44.149520974606, 18.210830027238, 799.47, 0.02903, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(90, 38, 44.149475963786, 18.211296983063, 804.76, 0.03759, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(91, 38, 44.149456014857, 18.211629996076, 808.13, 0.02666, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(92, 38, 44.149403041229, 18.211997039616, 811.49, 0.02987, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(93, 38, 44.14933196269, 18.212318988517, 813.89, 0.02688, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(94, 38, 44.149465989321, 18.21246500127, 817.26, 0.01892, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(95, 38, 44.149668999016, 18.212069962174, 821.58, 0.03877, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(96, 38, 44.149624994025, 18.21275501512, 826.39, 0.05488, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(97, 38, 44.14948602207, 18.213027007878, 830.24, 0.02664, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(98, 38, 44.149207994342, 18.213397990912, 835.52, 0.0428, 5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(99, 38, 44.149089977145, 18.21356697008, 838.41, 0.01881, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(100, 38, 44.148959973827, 18.213764028624, 841.77, 0.02136, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(101, 38, 44.148770039901, 18.213958991691, 845.62, 0.02623, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(102, 38, 44.148557977751, 18.2141400408, 850.42, 0.02765, 4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(103, 38, 44.148267963901, 18.214341960847, 854.75, 0.03605, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(104, 38, 44.14812002331, 18.214402981102, 858.11, 0.01716, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(105, 38, 44.148092027754, 18.214415973052, 858.11, 0.00328, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(106, 38, 44.148020027205, 18.21486800909, 861.48, 0.03694, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(107, 38, 44.148002006114, 18.215130027384, 865.8, 0.021, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(108, 38, 44.147948026657, 18.215563036501, 869.65, 0.03507, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(109, 38, 44.147889018059, 18.216228978708, 874.94, 0.05354, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(110, 38, 44.147686008364, 18.21660800837, 880.71, 0.03774, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(111, 38, 44.147619036958, 18.216913025826, 884.07, 0.02545, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(112, 38, 44.147559022531, 18.217145958915, 887.43, 0.01975, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(113, 38, 44.147519040853, 18.217429015785, 890.8, 0.02302, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(114, 38, 44.147519040853, 18.217520965263, 892.24, 0.00734, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(115, 38, 44.147609984502, 18.217811984941, 897.05, 0.02533, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(116, 38, 44.147626999766, 18.217829000205, 898.97, 0.00233, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(117, 38, 44.147647032514, 18.217880968004, 899.45, 0.00471, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(118, 38, 44.147757003084, 18.218185985461, 902.82, 0.02724, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(119, 38, 44.147697994485, 18.218683032319, 908.1, 0.0402, 5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(120, 38, 44.147719033062, 18.219087040052, 911.47, 0.03232, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(121, 38, 44.147728001699, 18.219762034714, 914.83, 0.05387, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(122, 38, 44.147734036669, 18.21975197643, 914.83, 0.00105, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(123, 38, 44.147731019184, 18.219778966159, 916.75, 0.00218, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(124, 38, 44.147499008104, 18.220447003841, 918.2, 0.05922, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(125, 38, 44.147072033957, 18.221243033186, 924.45, 0.0793, 6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(126, 38, 44.146616980433, 18.222052976489, 929.73, 0.08208, 5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(127, 38, 44.146439032629, 18.222295967862, 933.1, 0.0277, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(128, 38, 44.146268041804, 18.222499983385, 936.46, 0.02503, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(129, 38, 44.146119011566, 18.222737023607, 939.83, 0.02515, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(130, 38, 44.145869985223, 18.223213031888, 946.07, 0.047, 6.24);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(131, 38, 44.145551975816, 18.223541015759, 949.92, 0.04399, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(132, 38, 44.145169006661, 18.223867993802, 956.17, 0.04994, 6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(133, 38, 44.145053001121, 18.224042002112, 956.17, 0.01895, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(134, 38, 44.144902965054, 18.224203018472, 959.05, 0.02106, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(135, 38, 44.144586967304, 18.224238976836, 964.34, 0.03525, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(136, 38, 44.144573975354, 18.224238976836, 964.34, 0.00144, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(137, 38, 44.144429974258, 18.2242300082, 966.26, 0.01603, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(138, 38, 44.14422897622, 18.224298991263, 970.59, 0.02302, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(139, 38, 44.144213972613, 18.224310977384, 970.59, 0.00192, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(140, 38, 44.144240962341, 18.224570984021, 973.95, 0.02096, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(141, 38, 44.14440298453, 18.224720014259, 977.8, 0.02159, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(142, 38, 44.144488982856, 18.224880024791, 980.2, 0.01595, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(143, 38, 44.14452938363, 18.224997203797, 981.64, 0.01037, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(144, 38, 44.144505579025, 18.225120501593, 981.64, 0.01019, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(145, 38, 44.144519912079, 18.225214798003, 981.64, 0.00769, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(146, 38, 44.14456307888, 18.225328875706, 984.05, 0.01029, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(147, 38, 44.144800035283, 18.225606987253, 985.97, 0.03445, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(148, 38, 44.145160038024, 18.226099004969, 983.09, 0.05607, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(149, 38, 44.145616013557, 18.226851029322, 978.28, 0.07856, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(150, 38, 44.14567200467, 18.226951025426, 978.28, 0.01012, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(151, 38, 44.145889012143, 18.227367019281, 974.43, 0.04104, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(152, 38, 44.146018009633, 18.22769600898, 970.59, 0.02991, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(153, 38, 44.146051034331, 18.227787036449, 969.63, 0.00814, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(154, 38, 44.146295031533, 18.228047965094, 965.3, 0.0342, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(155, 38, 44.14685100317, 18.227914022282, 957.13, 0.06274, -8.17);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(156, 38, 44.147040015087, 18.227875968441, 953.77, 0.02124, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(157, 38, 44.147217040882, 18.227816959843, 949.92, 0.02024, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(158, 38, 44.147506970912, 18.227585032582, 946.07, 0.03717, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(159, 38, 44.147817017511, 18.227456035092, 941.75, 0.03598, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(160, 38, 44.148453958333, 18.227752000093, 935.98, 0.07466, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(161, 38, 44.148838017136, 18.227946963161, 929.73, 0.04545, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(162, 38, 44.149171030149, 18.228198001161, 924.93, 0.0421, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(163, 38, 44.14932500571, 18.228377038613, 919.64, 0.0223, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(164, 38, 44.149430030957, 18.228558003902, 916.75, 0.01857, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(165, 38, 44.149542013183, 18.228769982234, 912.43, 0.021, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(166, 38, 44.149562967941, 18.22881096974, 911.47, 0.00402, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(167, 38, 44.149388037622, 18.228910965845, 909.06, 0.02102, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(168, 38, 44.149043038487, 18.228866960853, 905.22, 0.03852, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(169, 38, 44.148408025503, 18.229180024937, 902.33, 0.0749, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(170, 38, 44.147859010845, 18.229725016281, 899.45, 0.07495, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(171, 38, 44.147495990619, 18.229819983244, 897.53, 0.04107, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(172, 38, 44.146956028417, 18.230274030939, 893.2, 0.07012, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(173, 38, 44.146138038486, 18.230560021475, 888.4, 0.09378, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(174, 38, 44.145705029368, 18.230784991756, 884.07, 0.05139, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(175, 38, 44.145289035514, 18.230867972597, 879.74, 0.04673, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(176, 38, 44.145012013614, 18.231049021706, 874.94, 0.03402, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(177, 38, 44.144932972267, 18.231136025861, 873.98, 0.0112, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(178, 38, 44.144788971171, 18.231299975887, 872.53, 0.02068, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(179, 38, 44.144470039755, 18.231552019715, 868.69, 0.04077, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(180, 38, 44.144758963957, 18.231656039134, 864.84, 0.03318, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(181, 38, 44.145129024982, 18.231438025832, 859.08, 0.04467, -5.76);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(182, 38, 44.145528003573, 18.231371976435, 855.71, 0.04468, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(183, 38, 44.145887000486, 18.231411036104, 852.83, 0.04004, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(184, 38, 44.146143989637, 18.231444982812, 850.42, 0.0287, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(185, 38, 44.146481025964, 18.231610022485, 846.1, 0.03972, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(186, 38, 44.146731980145, 18.231975976378, 841.77, 0.04039, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(187, 38, 44.147065998986, 18.232067003846, 838.41, 0.03784, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(188, 38, 44.14753396064, 18.232006989419, 834.08, 0.05225, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(189, 38, 44.147940985858, 18.232322987169, 829.27, 0.05181, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(190, 38, 44.148263018578, 18.232809975743, 824.95, 0.05284, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(191, 38, 44.14836502634, 18.232958000153, 823.99, 0.01638, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(192, 38, 44.148564012721, 18.233168972656, 820.62, 0.0278, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(193, 38, 44.148885961622, 18.233266035095, 817.26, 0.03663, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(194, 38, 44.149193996564, 18.233253965154, 812.93, 0.03427, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(195, 38, 44.149513011798, 18.233307022601, 809.57, 0.03572, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(196, 38, 44.149846024811, 18.233254970983, 804.28, 0.03726, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(197, 38, 44.15022698231, 18.233054978773, 800.44, 0.04527, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(198, 38, 44.150489000604, 18.232714002952, 795.15, 0.03986, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(199, 38, 44.150543985888, 18.232070021331, 789.38, 0.05174, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(200, 38, 44.150889990851, 18.231576997787, 785.53, 0.05502, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(201, 38, 44.151042960584, 18.231313973665, 781.21, 0.02701, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(202, 38, 44.151400029659, 18.231193022802, 776.4, 0.04086, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(203, 38, 44.15172801353, 18.231998020783, 771.6, 0.07386, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(204, 38, 44.152020039037, 18.232327010483, 766.31, 0.04175, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(205, 38, 44.152399990708, 18.232393981889, 762.46, 0.04259, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(206, 38, 44.152836017311, 18.232355006039, 757.18, 0.04858, -5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(207, 38, 44.153247987852, 18.232269007713, 751.89, 0.04632, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(208, 38, 44.153615031391, 18.232108997181, 746.12, 0.04276, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(209, 38, 44.153670016676, 18.232063986361, 746.12, 0.00709, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(210, 38, 44.1541699972, 18.231629971415, 741.79, 0.0655, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(211, 38, 44.154715659097, 18.23185720481, 741.79, 0.06333, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(212, 38, 44.154744325206, 18.23195585981, 738.43, 0.00849, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(213, 38, 44.154731668532, 18.232021741569, 738.43, 0.00544, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(214, 38, 44.15470501408, 18.232141016051, 736.03, 0.00997, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(215, 38, 44.1544470191, 18.232396999374, 734.58, 0.03521, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(216, 38, 44.154174020514, 18.232749039307, 734.58, 0.04136, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(217, 38, 44.153637997806, 18.233150029555, 734.1, 0.06765, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(218, 38, 44.152891002595, 18.233135025948, 737.47, 0.08307, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(219, 38, 44.152632001787, 18.233286989853, 737.47, 0.03125, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(220, 38, 44.152277028188, 18.233535010368, 740.83, 0.04415, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(221, 38, 44.15194099769, 18.234080001712, 742.76, 0.05733, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(222, 38, 44.151551993564, 18.234745021909, 742.76, 0.06845, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(223, 38, 44.150979006663, 18.235314991325, 746.6, 0.07828, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(224, 38, 44.150363020599, 18.23557600379, 752.85, 0.07159, 6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(225, 38, 44.150078035891, 18.235818995163, 756.69, 0.03715, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(226, 38, 44.149991031736, 18.235895019025, 758.62, 0.01142, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(227, 38, 44.149733958766, 18.236114960164, 762.94, 0.03354, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(228, 38, 44.14917002432, 18.236629022285, 768.71, 0.07493, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(229, 38, 44.148914040998, 18.236914006993, 772.08, 0.03643, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(230, 38, 44.1488999594, 18.2369290106, 772.08, 0.00197, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(231, 38, 44.148708013818, 18.237325977534, 775.92, 0.03819, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(232, 38, 44.148543979973, 18.238093005493, 779.29, 0.06386, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(233, 38, 44.148441972211, 18.238351000473, 783.13, 0.0235, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(234, 38, 44.14821096696, 18.238734975457, 785.05, 0.03998, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(235, 38, 44.148051040247, 18.239496974275, 789.38, 0.06334, 4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(236, 38, 44.147983985022, 18.239854965359, 792.74, 0.02952, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(237, 38, 44.147927993909, 18.240268025547, 792.74, 0.03354, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(238, 38, 44.147741999477, 18.240848975256, 794.67, 0.05076, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(239, 38, 44.147968981415, 18.241489017382, 794.67, 0.05696, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(240, 38, 44.147821040824, 18.242386970669, 798.99, 0.07351, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(241, 38, 44.147356012836, 18.242169963196, 803.8, 0.05453, 4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(242, 38, 44.147043032572, 18.242084970698, 805.72, 0.03546, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(243, 38, 44.146911017597, 18.242119001225, 806.68, 0.01493, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(244, 38, 44.146418999881, 18.241885984316, 810.05, 0.05778, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(245, 38, 44.145940979943, 18.241247031838, 811.01, 0.07365, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(246, 38, 44.145913990214, 18.241193974391, 811.01, 0.00519, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(247, 38, 44.145836038515, 18.241051984951, 811.49, 0.01426, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(248, 38, 44.144800035283, 18.240036014467, 811.97, 0.14086, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(249, 38, 44.144337018952, 18.239623960108, 815.34, 0.06109, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(250, 38, 44.143940974027, 18.239896958694, 819.66, 0.04913, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(251, 38, 44.143578959629, 18.240189990029, 823.03, 0.04655, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(252, 38, 44.143295986578, 18.240171968937, 821.58, 0.0315, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(253, 38, 44.143295986578, 18.240171968937, 825.43, 0, 3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(254, 38, 44.14308199659, 18.240142967552, 823.99, 0.02391, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(255, 38, 44.143051989377, 18.240106003359, 823.03, 0.00445, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(256, 38, 44.142964985222, 18.240069039166, 821.58, 0.01011, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(257, 38, 44.142459975556, 18.239588001743, 818.7, 0.06802, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(258, 38, 44.141965024173, 18.239224981517, 812.45, 0.06219, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(259, 38, 44.14172898978, 18.239116016775, 806.68, 0.02765, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(260, 38, 44.141505025327, 18.239014009014, 800.92, 0.0262, -5.76);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(261, 38, 44.141368987039, 18.238933039829, 796.59, 0.01645, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(262, 38, 44.141082996503, 18.238838994876, 790.82, 0.03267, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(263, 38, 44.140533981845, 18.238705974072, 789.38, 0.06196, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(264, 38, 44.14041403681, 18.238677978516, 787.94, 0.01352, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(265, 38, 44.140281016007, 18.238653000444, 787.46, 0.01492, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(266, 38, 44.139929981902, 18.238554010168, 788.9, 0.03982, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(267, 38, 44.139513988048, 18.238460971043, 785.53, 0.04685, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(268, 38, 44.13933201693, 18.238614024594, 784.09, 0.02363, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(269, 38, 44.138962961733, 18.238882999867, 782.65, 0.04631, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(270, 38, 44.138621985912, 18.239024989307, 781.69, 0.03957, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(271, 38, 44.138107001781, 18.238965980709, 777.84, 0.05746, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(272, 38, 44.137828974053, 18.238976038992, 773.04, 0.03093, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(273, 38, 44.137697964907, 18.238844024017, 770.63, 0.01798, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(274, 38, 44.13752797991, 18.238663980737, 766.79, 0.02374, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(275, 38, 44.137528985739, 18.238656017929, 767.27, 0.00065, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(276, 38, 44.137587994337, 18.238521991298, 763.9, 0.01255, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(277, 38, 44.137561004609, 18.238450996578, 759.1, 0.00641, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(278, 38, 44.137398982421, 18.238461976871, 755.25, 0.01804, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(279, 38, 44.137170994654, 18.238425012678, 750.93, 0.02552, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(280, 38, 44.1370320227, 18.238412020728, 747.56, 0.01549, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(281, 38, 44.136768998578, 18.238292997703, 744.2, 0.03075, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(282, 38, 44.136579986662, 18.238102979958, 740.83, 0.02592, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(283, 38, 44.136271029711, 18.237742977217, 737.47, 0.04478, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(284, 38, 44.136102972552, 18.237657984719, 734.1, 0.01988, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(285, 38, 44.135982021689, 18.23764398694, 730.26, 0.0135, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(286, 38, 44.135927958414, 18.237641975284, 727.86, 0.00601, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(287, 38, 44.13537601009, 18.237581960857, 722.09, 0.06156, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(288, 38, 44.135346002877, 18.237538961694, 722.09, 0.00479, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(289, 38, 44.135122038424, 18.237382974476, 716.32, 0.02784, -5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(290, 38, 44.135038973764, 18.237311979756, 711.03, 0.01084, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(291, 38, 44.135089013726, 18.237291024998, 708.15, 0.00581, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(292, 38, 44.134906036779, 18.237150041386, 702.86, 0.02325, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(293, 38, 44.134824983776, 18.237075023353, 702.86, 0.01082, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(294, 38, 44.134691962972, 18.236874025315, 698.05, 0.02182, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(295, 38, 44.134686011821, 18.236860027537, 697.57, 0.0013, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(296, 38, 44.134649969637, 18.236790960655, 692.77, 0.00681, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(297, 38, 44.134594984353, 18.236744021997, 687.96, 0.00717, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(298, 38, 44.13455802016, 18.236843012273, 684.6, 0.00891, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(299, 38, 44.134535975754, 18.236910989508, 681.23, 0.00595, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(300, 38, 44.134483002126, 18.236921969801, 677.87, 0.00596, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(301, 38, 44.134411001578, 18.237026995048, 670.66, 0.01159, -7.21);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(302, 38, 44.134357022122, 18.23698701337, 669.22, 0.0068, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(303, 38, 44.134294996038, 18.236827002838, 664.41, 0.01451, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(304, 38, 44.134303964674, 18.236649977043, 661.52, 0.01416, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(305, 38, 44.1344229877, 18.236371027306, 657.68, 0.0259, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(306, 38, 44.134471016005, 18.236189978197, 656.72, 0.0154, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(307, 38, 44.134447965771, 18.235994009301, 653.83, 0.01585, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(308, 38, 44.134563971311, 18.235838022083, 645.66, 0.01793, -8.17);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(309, 38, 44.134566988796, 18.235792005435, 645.18, 0.00369, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(310, 38, 44.134464981034, 18.235706007108, 640.38, 0.01326, -4.8);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(311, 38, 44.13440303877, 18.235677005723, 637.01, 0.00727, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(312, 38, 44.134305976331, 18.23551196605, 635.57, 0.01703, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(313, 38, 44.13428703323, 18.235513977706, 633.65, 0.00211, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(314, 38, 44.134230958298, 18.235587989911, 632.68, 0.00859, -0.97);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(315, 38, 44.13411302492, 18.235583966598, 632.68, 0.01312, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(316, 38, 44.133855029941, 18.235327983275, 631.24, 0.03522, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(317, 38, 44.133725026622, 18.235205020756, 630.76, 0.01747, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(318, 38, 44.133340967819, 18.234503036365, 629.32, 0.07044, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(319, 38, 44.133072998375, 18.234461965039, 627.4, 0.02998, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(320, 38, 44.133008960634, 18.234529020265, 626.44, 0.00891, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(321, 38, 44.132990017533, 18.234464982525, 625.96, 0.00553, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(322, 38, 44.132961016148, 18.234391976148, 622.11, 0.00666, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(323, 38, 44.132892033085, 18.234271025285, 623.07, 0.01233, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(324, 38, 44.132854985073, 18.234214028344, 622.59, 0.00614, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(325, 38, 44.132642000914, 18.233871962875, 627.88, 0.03614, 5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(326, 38, 44.132321979851, 18.23354003951, 627.4, 0.04436, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(327, 38, 44.132303036749, 18.233501985669, 628.36, 0.0037, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(328, 38, 44.132177978754, 18.23322404176, 634.13, 0.02618, 5.77);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(329, 38, 44.132146965712, 18.233098983765, 634.13, 0.01056, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(330, 38, 44.132045963779, 18.232885999605, 638.45, 0.02037, 4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(331, 38, 44.131958959624, 18.232749039307, 639.89, 0.0146, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(332, 38, 44.131737006828, 18.232433963567, 642.3, 0.03523, 2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(333, 38, 44.131585964933, 18.232145961374, 644.7, 0.02847, 2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(334, 38, 44.131567021832, 18.232099022716, 644.7, 0.0043, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(335, 38, 44.131441963837, 18.231985028833, 644.22, 0.01662, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(336, 38, 44.131441041827, 18.231985028833, 644.7, 0.0001, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(337, 38, 44.131037034094, 18.231741031632, 643.74, 0.04896, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(338, 38, 44.130978025496, 18.231744971126, 643.26, 0.00657, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(339, 38, 44.130688011646, 18.231635000557, 642.3, 0.03342, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(340, 38, 44.130679965019, 18.23161396198, 641.82, 0.0019, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(341, 38, 44.130475027487, 18.231498962268, 636.53, 0.02457, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(342, 38, 44.130443008617, 18.23148496449, 635.57, 0.00373, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(343, 38, 44.130368996412, 18.231338029727, 633.65, 0.01433, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(344, 38, 44.130280986428, 18.231201991439, 630.28, 0.01462, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(345, 38, 44.130111001432, 18.231153041124, 626.44, 0.0193, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(346, 38, 44.129804978147, 18.231142982841, 623.07, 0.03404, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(347, 38, 44.129369035363, 18.231204003096, 621.15, 0.04872, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(348, 38, 44.129180023447, 18.230910971761, 617.3, 0.03144, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(349, 38, 44.12904297933, 18.230896973982, 612.02, 0.01528, -5.28);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(350, 38, 44.128821026534, 18.230864033103, 608.65, 0.02482, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(351, 38, 44.128780961037, 18.230891022831, 608.17, 0.00495, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(352, 38, 44.128549033776, 18.230974003673, 602.88, 0.02663, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(353, 38, 44.128415007144, 18.230990013108, 599.04, 0.01496, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(354, 38, 44.128121975809, 18.230855986476, 600.96, 0.03429, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(355, 38, 44.128063973039, 18.230862021446, 601.44, 0.00647, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(356, 38, 44.127658037469, 18.230922035873, 602.4, 0.04539, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(357, 38, 44.127526022494, 18.230937961489, 600, 0.01473, -2.4);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(358, 38, 44.127364000306, 18.231022031978, 595.67, 0.01923, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(359, 38, 44.127227962017, 18.231078023091, 591.35, 0.01577, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(360, 38, 44.127113968134, 18.231146000326, 589.43, 0.01379, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(361, 38, 44.127062000334, 18.231149017811, 589.43, 0.00578, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(362, 38, 44.12672999315, 18.231049021706, 587.98, 0.03777, -1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(363, 38, 44.126232024282, 18.231033012271, 587.02, 0.05539, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(364, 38, 44.12606597878, 18.231013985351, 590.39, 0.01853, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(365, 38, 44.125787029043, 18.231043992564, 592.31, 0.03111, 1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(366, 38, 44.125721985474, 18.231073999777, 592.31, 0.00762, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(367, 38, 44.125593993813, 18.230906026438, 588.95, 0.01955, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(368, 38, 44.125573039055, 18.23080200702, 589.43, 0.00862, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(369, 38, 44.125556023791, 18.230587011203, 587.02, 0.01726, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(370, 38, 44.125369023532, 18.230386013165, 586.06, 0.02626, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(371, 38, 44.125347984955, 18.230049982667, 588.95, 0.02692, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(372, 38, 44.12535100244, 18.230006983504, 588.46, 0.00345, -0.49);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(373, 38, 44.12517095916, 18.229849990457, 589.91, 0.02362, 1.45);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(374, 38, 44.124998040497, 18.229538016021, 593.27, 0.03146, 3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(375, 38, 44.124909024686, 18.229473978281, 592.31, 0.01114, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(376, 38, 44.124792013317, 18.229314973578, 586.06, 0.01818, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(377, 38, 44.124786984175, 18.22925596498, 586.54, 0.00474, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(378, 38, 44.124726969749, 18.228766964749, 583.66, 0.0396, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(379, 38, 44.124715989456, 18.228702004999, 583.18, 0.00533, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(380, 38, 44.124572994187, 18.228311995044, 583.18, 0.03496, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(381, 38, 44.124480960891, 18.22819900699, 583.18, 0.01364, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(382, 38, 44.124335031956, 18.228008989245, 579.81, 0.02221, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(383, 38, 44.124227995053, 18.227836992592, 576.93, 0.01817, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(384, 38, 44.124182984233, 18.227769015357, 575.01, 0.00738, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(385, 38, 44.123822981492, 18.227368025109, 573.08, 0.05125, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(386, 38, 44.123782999814, 18.227316979319, 573.56, 0.00603, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(387, 38, 44.123485023156, 18.226824039593, 575.49, 0.05144, 1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(388, 38, 44.122961992398, 18.226062040776, 573.56, 0.08415, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(389, 38, 44.122836012393, 18.225485030562, 572.6, 0.04814, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(390, 38, 44.122764011845, 18.22523499839, 568.28, 0.0215, -4.32);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(391, 38, 44.122763006017, 18.22487398982, 562.99, 0.02882, -5.29);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(392, 38, 44.122854033485, 18.224618006498, 559.14, 0.0228, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(393, 38, 44.122933996841, 18.22443603538, 552.9, 0.01703, -6.24);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(394, 38, 44.12302502431, 18.224349031225, 549.53, 0.01228, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(395, 38, 44.123156033456, 18.224342996255, 545.2, 0.01458, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(396, 38, 44.123249994591, 18.224338972941, 545.2, 0.01045, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(397, 38, 44.123312020674, 18.22406899184, 546.17, 0.02263, 0.97);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(398, 38, 44.122965009883, 18.223619973287, 542.8, 0.05266, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(399, 38, 44.122937014326, 18.223582003266, 542.8, 0.00434, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(400, 38, 44.122804999352, 18.223356027156, 542.8, 0.02326, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(401, 38, 44.122692011297, 18.22322501801, 542.32, 0.01635, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(402, 38, 44.12256100215, 18.223081016913, 540.88, 0.01856, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(403, 38, 44.12241297774, 18.222990995273, 540.88, 0.01796, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(404, 38, 44.122335026041, 18.222940033302, 540.4, 0.00957, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(405, 38, 44.12147898227, 18.222404010594, 539.44, 0.10436, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(406, 38, 44.120678007603, 18.221733961254, 537.51, 0.10389, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(407, 38, 44.120413977653, 18.22165299207, 537.51, 0.03006, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(408, 38, 44.119999995455, 18.221029965207, 540.4, 0.06777, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(409, 38, 44.119690032676, 18.22033896111, 540.4, 0.06504, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(410, 38, 44.1196359694, 18.219245038927, 539.44, 0.08753, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(411, 38, 44.119208995253, 18.218413973227, 539.92, 0.08158, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(412, 38, 44.11872100085, 18.217176971957, 533.67, 0.11267, -6.25);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(413, 38, 44.118440039456, 18.216622006148, 528.86, 0.05421, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(414, 38, 44.118216997012, 18.216497031972, 529.34, 0.02673, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(415, 38, 44.117798991501, 18.215999985114, 528.86, 0.06111, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(416, 38, 44.11733597517, 18.215339994058, 527.42, 0.07366, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(417, 38, 44.117173030972, 18.214976973832, 525.5, 0.03418, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(418, 38, 44.116942025721, 18.214549999684, 520.69, 0.04268, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(419, 38, 44.116899026558, 18.214455032721, 519.25, 0.00896, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(420, 38, 44.116659974679, 18.214059993625, 514.44, 0.04124, -4.81);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(421, 38, 44.116455037147, 18.213837035, 511.08, 0.02892, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(422, 38, 44.116123029962, 18.213590020314, 509.16, 0.04185, -1.92);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(423, 38, 44.115193979815, 18.212728025392, 507.23, 0.12413, -1.93);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(424, 38, 44.114988036454, 18.212269032374, 510.12, 0.04321, 2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(425, 38, 44.114483026788, 18.211759999394, 506.75, 0.06932, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(426, 38, 44.114398034289, 18.211675006896, 506.27, 0.01163, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(427, 38, 44.114261996001, 18.211168991402, 502.91, 0.04314, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(428, 38, 44.114247998223, 18.210953995585, 503.87, 0.01723, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(429, 38, 44.114203993231, 18.210676973686, 503.39, 0.02265, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(430, 38, 44.114084970206, 18.209955962375, 507.23, 0.05906, 3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(431, 38, 44.114053035155, 18.209523959085, 510.6, 0.03467, 3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(432, 38, 44.114039959386, 18.209149958566, 510.6, 0.02989, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(433, 38, 44.113924959674, 18.208403969184, 506.75, 0.06091, -3.85);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(434, 38, 44.113825969398, 18.207913041115, 503.87, 0.04071, -2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(435, 38, 44.113769978285, 18.2076390367, 501.46, 0.02274, -2.41);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(436, 38, 44.113581972197, 18.206882989034, 498.1, 0.06388, -3.36);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(437, 38, 44.113507037982, 18.206310002133, 494.26, 0.0465, -3.84);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(438, 38, 44.113616002724, 18.20523602888, 489.93, 0.08659, -4.33);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(439, 38, 44.113693032414, 18.205073000863, 489.45, 0.01558, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(440, 38, 44.113795040175, 18.204850964248, 489.45, 0.02104, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(441, 38, 44.114077007398, 18.204470006749, 489.45, 0.04368, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(442, 38, 44.114373978227, 18.203769028187, 486.56, 0.06498, -2.89);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(443, 38, 44.114509010687, 18.203288996592, 486.56, 0.04116, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(444, 38, 44.114615041763, 18.202839978039, 486.08, 0.03774, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(445, 38, 44.114653011784, 18.202102035284, 485.12, 0.05906, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(446, 38, 44.114749990404, 18.200972992927, 486.56, 0.09078, 1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(447, 38, 44.114787038416, 18.200824968517, 485.6, 0.01251, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(448, 38, 44.114802964032, 18.200754979625, 484.64, 0.00586, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(449, 38, 44.114851998165, 18.200595974922, 484.64, 0.01382, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(450, 38, 44.114917963743, 18.200428001583, 484.16, 0.01528, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(451, 38, 44.114828025922, 18.200016031042, 483.68, 0.03438, -0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(452, 38, 44.114709002897, 18.19995299913, 482.72, 0.01416, -0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(453, 38, 44.114709002897, 18.19995299913, 482.72, 0, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(454, 38, 44.11503598094, 18.199482019991, 481.28, 0.0523, -1.44);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(455, 38, 44.11527402699, 18.199037024751, 477.91, 0.0443, -3.37);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(456, 38, 44.115549037233, 18.199516972527, 477.91, 0.04902, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(457, 38, 44.116206010804, 18.200426995754, 478.87, 0.10303, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(458, 38, 44.116732981056, 18.200075961649, 478.87, 0.06495, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(459, 38, 44.116992987692, 18.200102029368, 479.35, 0.02899, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(460, 38, 44.117488022894, 18.200324987993, 480.32, 0.05785, 0.97);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(461, 38, 44.118796018884, 18.200431019068, 483.2, 0.14569, 2.88);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(462, 38, 44.118986036628, 18.200502013788, 483.68, 0.02188, 0.48);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(463, 38, 44.119354002178, 18.200641991571, 484.64, 0.04241, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(464, 38, 44.119429020211, 18.200687002391, 484.64, 0.00908, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(465, 38, 44.119676034898, 18.200856987387, 484.64, 0.03064, 0);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(466, 38, 44.120036037639, 18.201192012057, 485.6, 0.04814, 0.96);
INSERT INTO `trail_version_path` (`id`, `id_version`, `lat`, `lon`, `elevation`, `prev_dist`, `prev_elev`) VALUES(467, 38, 44.120485978201, 18.201312962919, 487.53, 0.05095, 1.93);

-- --------------------------------------------------------

--
-- Table structure for table `trail_version_points`
--

DROP TABLE IF EXISTS `trail_version_points`;
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
  `symbol` varchar(5) DEFAULT NULL,
  `pictogram` varchar(100) DEFAULT NULL,
  `pictureurl` varchar(500) DEFAULT NULL,
  `time` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`,`id_version`),
  KEY `version_points` (`id_version`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `trail_version_points`
--

INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(1, 38, 'Voda', 'Voda%20uz%20cestu%20sa%20desne%20strane', 44.12709963508, 18.215717934072, 573.08, 89.4, -0.96, 200.44, 0, 1.53, 3.09, 'W', '90-v0', '', '2015-05-28T19:39:32Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(2, 38, 'Kopijari', 'Skrenuti%20desno%20putem%20za%20Bobovac%2C%20nastaviti%20penjanje', 44.150598971173, 18.210224015638, 773.52, 289.84, -0.96, 208.6, -0.48, 4.62, 1.69, 'C', '315-135', '', '2015-05-28T19:37:32Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(3, 38, 'Prevoj', 'Najvi%C5%A1a%20ta%C4%8Dka%20na%20ruti.%20I%C4%87i%20pravo%20spu%C5%A1taju%C4%87i%20se%20makadamom%20kroz%20selo%20Kopijari', 44.144506249577, 18.225140031427, 981.64, 498.44, -1.44, 4.33, -247.54, 6.31, 2.7, 'P', '90-180-315', '', '2010-07-17T10:21:26Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(4, 38, 'Dragovi%C4%87i', 'Po%20prelasku%20mosta%2C%20nastaviti%20putem%20desno%20prema%20selu%20Dragovi%C4%87i', 44.154731668532, 18.23204588145, 738.43, 502.77, -248.98, 49.03, -4.33, 9.01, 0.91, 'C', '90-225', '', '2010-07-17T10:47:02Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(5, 38, 'Dragovi%C4%87i', 'Dr%C5%BEati%20isti%20pravac%20kroz%20selo%20Dragovi%C4%87i', 44.148373911157, 18.238594746217, 783.13, 551.8, -253.31, 39.9, -1.45, 9.92, 0.93, 'C', '90-135-225', '', '2015-05-28T19:37:58Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(6, 38, 'Mijakovi%C4%87i', 'Skrenuv%C5%A1i%20sa%20ceste%20blago%20udesno%20spustiti%20se%20prema%20Bobovcu', 44.143295986578, 18.240171968937, 821.58, 591.7, -254.76, 5.29, -45.18, 10.85, 0.56, 'C', '45-180', '', '2010-07-17T11:00:00Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(7, 38, 'Bobovac', 'Bobovac', 44.138544453308, 18.238935973495, 781.69, 596.99, -299.94, 61.55, -365.33, 11.41, 5.12, 'M', '90-27', '', '2015-05-28T19:40:21Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(8, 38, 'Magistrala', 'Skrenuti%20desno%20cestom%20prema%20naselju.', 44.115282911807, 18.199035348371, 477.91, 658.54, -665.27, 5.29, 0, 16.53, 0.45, 'R', '0-180', '', '2015-05-28T19:38:44Z');
INSERT INTO `trail_version_points` (`id`, `id_version`, `name`, `desc`, `lat`, `lon`, `elevation`, `elevgain`, `elevloss`, `nextelevgain`, `nextelevloss`, `odometer`, `nextstepdist`, `symbol`, `pictogram`, `pictureurl`, `time`) VALUES(9, 38, 'Kraljeva%20Sutjeska', 'Dolazak%20u%20Kraljevu%20Sutjesku', 44.118796018884, 18.200431019068, 483.2, 663.83, -665.27, 0, 0, 16.98, 0, 'P', '90-0', '', '2015-05-28T19:37:11Z');

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

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `active_trails` AS select `t`.`id` AS `trail_id`,`t`.`id_mnt` AS `mnt_id`,`r`.`name` AS `mnt_name`,`r`.`slug` AS `mnt_slug`,`t`.`name` AS `trail_name`,`t`.`slug` AS `trail_slug`,`t`.`desc` AS `trail_desc`,`ty`.`name` AS `type_name`,`ty`.`desc` AS `type_desc`,`v`.`distance` AS `distance`,`v`.`elev_min` AS `elev_min`,`v`.`elev_max` AS `elev_max`,`v`.`elev_gain` AS `elev_gain`,`v`.`elev_loss` AS `elev_loss`,`v`.`review_landscape` AS `review_landscape`,`v`.`review_fun` AS `review_fun`,`v`.`required_fitness` AS `required_fitness`,`v`.`required_technique` AS `required_technique`,`v`.`lat_center` AS `lat_center`,`v`.`lon_center` AS `lon_center`,`v`.`bounds` AS `bounds` from (((`trails` `t` join `trail_versions` `v`) join `repo_regions` `r`) join `repo_types` `ty`) where ((`v`.`id_trail` = `t`.`id`) and (`v`.`active` = 1) and (`t`.`id_mnt` = `r`.`id`) and (`ty`.`id` = `v`.`trail_type`));

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
-- Constraints for table `trails`
--
ALTER TABLE `trails`
  ADD CONSTRAINT `region_trail` FOREIGN KEY (`id_mnt`) REFERENCES `repo_regions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `trail_versions`
--
ALTER TABLE `trail_versions`
  ADD CONSTRAINT `version_trail` FOREIGN KEY (`id_trail`) REFERENCES `trails` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `version_trail_type` FOREIGN KEY (`trail_type`) REFERENCES `repo_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `trail_version_path`
--
ALTER TABLE `trail_version_path`
  ADD CONSTRAINT `version_points0` FOREIGN KEY (`id_version`) REFERENCES `trail_versions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `trail_version_points`
--
ALTER TABLE `trail_version_points`
  ADD CONSTRAINT `version_points` FOREIGN KEY (`id_version`) REFERENCES `trail_versions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
