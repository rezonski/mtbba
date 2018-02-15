-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2016 at 10:09 AM
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
-- Truncate table before insert `repo_types`
--

TRUNCATE TABLE `repo_types`;
--
-- Dumping data for table `repo_types`
--

INSERT INTO `repo_types` (`id`, `name`, `desc`) VALUES(0, 'N/A', 'Nepoznato');
INSERT INTO `repo_types` (`id`, `name`, `desc`) VALUES(1, 'REK', 'Staza za rekreativce i pocetnike');
INSERT INTO `repo_types` (`id`, `name`, `desc`) VALUES(2, 'XC', 'CrossCountry staza');
INSERT INTO `repo_types` (`id`, `name`, `desc`) VALUES(3, 'ALM', 'All Mountain');
INSERT INTO `repo_types` (`id`, `name`, `desc`) VALUES(4, 'DH', 'Downhill');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
