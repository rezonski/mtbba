-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2016 at 02:11 PM
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
-- Table structure for table `repo_regions`
--

CREATE TABLE IF NOT EXISTS `repo_regions` (
  `id` int(10) unsigned NOT NULL,
  `id_parent` int(10) unsigned DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `child_parent` (`id_parent`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `repo_regions`
--

INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `type`) VALUES
(1, NULL, 'Bosna i Hercegovina', 'Country'),
(2, 1, 'Bjelašnica', 'Mountain');

-- --------------------------------------------------------

--
-- Table structure for table `repo_types`
--

CREATE TABLE IF NOT EXISTS `repo_types` (
  `id` int(10) unsigned NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `desc` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `trails`
--

CREATE TABLE IF NOT EXISTS `trails` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `id_mnt` int(10) unsigned DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `desc` longtext CHARACTER SET utf8,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`,`id_mnt`),
  KEY `region_trail` (`id_mnt`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_slovenian_ci AUTO_INCREMENT=2 ;

--
-- Dumping data for table `trails`
--

INSERT INTO `trails` (`id`, `id_mnt`, `name`, `desc`) VALUES
(0000000001, 2, 'Dummy staza na Bjelasnici', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.');

-- --------------------------------------------------------

--
-- Table structure for table `trail_versions`
--

CREATE TABLE IF NOT EXISTS `trail_versions` (
  `id` int(10) unsigned NOT NULL,
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
  PRIMARY KEY (`id`,`id_trail`,`active`),
  KEY `indexirano` (`id`,`id_trail`,`trail_type`),
  KEY `version_trail` (`id_trail`),
  KEY `version_trail_type` (`trail_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `trail_version_path`
--

CREATE TABLE IF NOT EXISTS `trail_version_path` (
  `id_version` int(10) unsigned NOT NULL,
  `id` int(10) unsigned NOT NULL,
  `lat` float NOT NULL,
  `lon` float NOT NULL,
  `elevation` float DEFAULT NULL,
  PRIMARY KEY (`id_version`,`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `trail_version_points`
--

CREATE TABLE IF NOT EXISTS `trail_version_points` (
  `id_version` int(10) unsigned NOT NULL,
  `id` int(10) unsigned NOT NULL,
  `name` varchar(50) NOT NULL,
  `desc` varchar(1000) DEFAULT NULL,
  `lat` float NOT NULL,
  `lon` float NOT NULL,
  `odometer` float NOT NULL,
  `elevation` float DEFAULT NULL,
  `symbol` varchar(5) DEFAULT NULL,
  `pictogram` varchar(100) DEFAULT NULL,
  `picture_url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id_version`,`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
