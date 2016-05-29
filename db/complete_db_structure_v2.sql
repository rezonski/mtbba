-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2016 at 04:47 PM
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `calc_bounds`(IN p_trail_id INT)
BEGIN
	declare maxLon double;
    declare minLon double;
    declare maxLat double;
    declare minLat double;
	declare latDelta double;
    declare lonDelta double;
    
    SELECT max(p.lon) into maxLon from active_path as p where p.trail_id = p_trail_id; -- 44.154744325206
	SELECT min(p.lon) into minLon from active_path as p where p.trail_id = p_trail_id; -- 44.113507037982
	SELECT max(p.lat) into maxLat from active_path as p where p.trail_id = p_trail_id; -- 18.242386970669
	SELECT min(p.lat) into minLat from active_path as p where p.trail_id = p_trail_id; -- 18.199037024751

    update `trail_versions`
    set `bounds` =  CONCAT('[[', (maxLat + (maxLat - minLat) / 3) ,',', (maxLon + (maxLon - minLon) / 3) ,'],[', (minLat - (maxLat - minLat) / 3) , ',', (minLon - (maxLon - minLon) / 3) ,']]'),
    `lat_center` = (maxLat + minLat)/2, `lon_center` = (maxLon + minLon)/2
    where `id_trail` = p_trail_id
    and `active` = 1;
END$$

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
,`mnt_id` int(10) unsigned
,`mnt_name` varchar(50)
,`trail_name` varchar(100)
,`trail_desc` longtext
,`type_name` varchar(100)
,`type_desc` varchar(500)
,`distance` float
,`elev_gain` float
,`elev_loss` float
,`review_landscape` int(11)
,`review_fun` int(11)
,`required_fitness` int(11)
,`required_technique` int(11)
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
,`symbol` varchar(5)
,`pictogram` varchar(100)
,`pictureurl` varchar(500)
);
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
  `symbol` varchar(5) DEFAULT NULL,
  `pictogram` varchar(100) DEFAULT NULL,
  `pictureurl` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`,`id_version`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

-- --------------------------------------------------------

--
-- Table structure for table `repo_regions`
--

CREATE TABLE IF NOT EXISTS `repo_regions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_parent` int(10) unsigned DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `child_parent` (`id_parent`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Table structure for table `repo_types`
--

CREATE TABLE IF NOT EXISTS `repo_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `desc` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Table structure for table `trails`
--

CREATE TABLE IF NOT EXISTS `trails` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_mnt` int(10) unsigned DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `desc` longtext CHARACTER SET utf8,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`,`id_mnt`),
  KEY `region_trail` (`id_mnt`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_slovenian_ci AUTO_INCREMENT=25 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=38 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=468 ;

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
  `symbol` varchar(5) DEFAULT NULL,
  `pictogram` varchar(100) DEFAULT NULL,
  `pictureurl` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`,`id_version`),
  KEY `version_points` (`id_version`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

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

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `active_trails` AS select `t`.`id` AS `trail_id`,`t`.`id_mnt` AS `mnt_id`,`r`.`name` AS `mnt_name`,`t`.`name` AS `trail_name`,`t`.`desc` AS `trail_desc`,`ty`.`name` AS `type_name`,`ty`.`desc` AS `type_desc`,`v`.`distance` AS `distance`,`v`.`elev_gain` AS `elev_gain`,`v`.`elev_loss` AS `elev_loss`,`v`.`review_landscape` AS `review_landscape`,`v`.`review_fun` AS `review_fun`,`v`.`required_fitness` AS `required_fitness`,`v`.`required_technique` AS `required_technique` from (((`trails` `t` join `trail_versions` `v`) join `repo_regions` `r`) join `repo_types` `ty`) where ((`v`.`id_trail` = `t`.`id`) and (`v`.`active` = 1) and (`t`.`id_mnt` = `r`.`id`) and (`ty`.`id` = `v`.`trail_type`));

-- --------------------------------------------------------

--
-- Structure for view `active_waypoints`
--
DROP TABLE IF EXISTS `active_waypoints`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `active_waypoints` AS select `t`.`id` AS `trail_id`,`p`.`id` AS `point_id`,`p`.`name` AS `point_name`,`p`.`desc` AS `point_desc`,`p`.`lon` AS `lon`,`p`.`lat` AS `lat`,`p`.`elevation` AS `elevation`,`p`.`elevgain` AS `elevgain`,`p`.`elevloss` AS `elevloss`,`p`.`nextelevgain` AS `nextelevgain`,`p`.`nextelevloss` AS `nextelevloss`,`p`.`odometer` AS `odometer`,`p`.`nextstepdist` AS `nextstepdist`,`p`.`symbol` AS `symbol`,`p`.`pictogram` AS `pictogram`,`p`.`pictureurl` AS `pictureurl` from ((`trails` `t` join `trail_versions` `v`) join `trail_version_points` `p`) where ((`v`.`id_trail` = `t`.`id`) and (`v`.`active` = 1) and (`p`.`id_version` = `v`.`id`)) order by `p`.`id`;

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
