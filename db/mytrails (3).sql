-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2016 at 02:22 PM
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

--
-- Truncate table before insert `repo_regions`
--

TRUNCATE TABLE `repo_regions`;
--
-- Dumping data for table `repo_regions`
--

INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `type`) VALUES(1, NULL, 'Bosna i Hercegovina', 'Country');
INSERT INTO `repo_regions` (`id`, `id_parent`, `name`, `type`) VALUES(2, 1, 'Bjelašnica', 'Mountain');

--
-- Truncate table before insert `repo_types`
--

TRUNCATE TABLE `repo_types`;
--
-- Dumping data for table `repo_types`
--

INSERT INTO `repo_types` (`id`, `name`, `desc`) VALUES(1, 'REK', 'Staza za rekreativce i pocetnike');
INSERT INTO `repo_types` (`id`, `name`, `desc`) VALUES(2, 'XC', 'CrossCountry staza');

--
-- Truncate table before insert `trails`
--

TRUNCATE TABLE `trails`;
--
-- Dumping data for table `trails`
--

INSERT INTO `trails` (`id`, `id_mnt`, `name`, `desc`) VALUES(1, 2, 'Dummy staza na Bjelasnici', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.');

--
-- Truncate table before insert `trail_versions`
--

TRUNCATE TABLE `trail_versions`;
--
-- Truncate table before insert `trail_version_path`
--

TRUNCATE TABLE `trail_version_path`;
--
-- Truncate table before insert `trail_version_points`
--

TRUNCATE TABLE `trail_version_points`;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
