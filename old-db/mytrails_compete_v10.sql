-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 01, 2018 at 03:19 PM
-- Server version: 5.7.20-0ubuntu0.16.04.1
-- PHP Version: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `staze`
--

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `token` varchar(500) NOT NULL,
  `mapboxacc` varchar(100) NOT NULL,
  `mapboxpass` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `emailpass` varchar(100) NOT NULL,
  `mapboxsourceid` varchar(100) NOT NULL,
  `mapboxlayerid` varchar(100) NOT NULL,
  `counter` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`token`, `mapboxacc`, `mapboxpass`, `email`, `emailpass`, `mapboxsourceid`, `mapboxlayerid`, `counter`) VALUES
('pk.eyJ1IjoibGp1YmljYXN0aSIsImEiOiJjaXN6eWdkOTEwMDY3MnlwZGhieGswNTNtIn0.kCB_5RS5Q8VVfYoqind-qA', 'ljubicasti', 'samolagano', 'purplehaze25g@mail.com', 'samolagano', 'ljubicasti.8ezvpr7w', 'mine-53au2v', 169),
('pk.eyJ1IjoibWlyemEzOCIsImEiOiJjaXN6emNlYnUwMDZqMnRtbmg4ZDdmdnFtIn0.eGg8hy9au6-HJXz6oM7_Ag', 'mirza38', 'samolagano', 'mirza.teletovic@yandex.com', 'samolagano', 'mirza38.avyty94r', 'mine-9c12fc', 169),
('pk.eyJ1IjoiY29va2lla3VzaCIsImEiOiJjaXN6eHZ6cjMwMDZvMm9tbjN5ZGxtOHhsIn0.YkSND5AK0HzznBEW6L8Leg', 'cookiekush', 'gradient', 'cookiekush100g@gmail.com', 'gradient', 'cookiekush.dwqtsytk', 'mine-2s65yq', 169),
('pk.eyJ1IjoiZHphbmFuIiwiYSI6ImNpc3p6ZmZrajAwNnQyb21udGpocmJ2NDgifQ.nT9XVGousc6xZcYGNJQHiQ', 'dzanan', 'samolagano', 'dzanan.musa@yandex.com', 'samolagano', 'dzanan.80crglxm', 'mine-dcge6m', 169);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD UNIQUE KEY `token` (`token`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
