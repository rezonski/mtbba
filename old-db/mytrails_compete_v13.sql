SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


DROP TABLE IF EXISTS `eventlog`;
CREATE TABLE IF NOT EXISTS `eventlog` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `user` varchar(100) DEFAULT NULL,
  `text` text NOT NULL,
  `error` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`,`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `hist_trail_version_path`;
CREATE TABLE IF NOT EXISTS `hist_trail_version_path` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_version` int(10) UNSIGNED NOT NULL,
  `lat` double NOT NULL,
  `lon` double NOT NULL,
  `elevation` float DEFAULT NULL,
  `prev_dist` double DEFAULT NULL,
  `prev_elev` double DEFAULT NULL,
  PRIMARY KEY (`id`,`id_version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `hist_trail_version_points`;
CREATE TABLE IF NOT EXISTS `hist_trail_version_points` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_version` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `desc` longtext,
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
  `elevationprofile` tinyint(1) NOT NULL DEFAULT '0',
  `name_en` varchar(50) NOT NULL,
  `desc_en` varchar(1000) NOT NULL,
  `wp_geojson` varchar(4000) NOT NULL,
  PRIMARY KEY (`id`,`id_version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `repo_point_symbol`;
CREATE TABLE IF NOT EXISTS `repo_point_symbol` (
  `symbol_code` varchar(15) NOT NULL,
  `desc` varchar(100) DEFAULT NULL,
  `desc_en` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`symbol_code`),
  UNIQUE KEY `symbol_code_UNIQUE` (`symbol_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('CITY', 'Grad', 'City, urban area');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('CROSSROAD', 'Raskrsnica', 'Cross road');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('DANGER', 'Oprez', 'Danger');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('END', 'Ciljna tacka', 'End point');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('FOOD', 'Hrana', 'Food');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('MINES', 'Mine', 'Mine');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('PASS', 'Prevoj', 'Pass');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('PHOTO', 'Fotografija', 'Photo');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('PLACE', 'Mjesto', 'Place');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('RIVER', 'Rijeka/potok', 'River');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('SLEEP', 'Prenociste', 'Place to sleep');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('START', 'Polazna tacka', 'Start point');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('SUMMIT', 'Vrh', 'Summit');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('VILLAGE', 'Selo', 'Village, rural area');
INSERT INTO `repo_point_symbol` (`symbol_code`, `desc`, `desc_en`) VALUES('WATER', 'Voda', 'Water');

DROP TABLE IF EXISTS `repo_regions`;
CREATE TABLE IF NOT EXISTS `repo_regions` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_parent` int(10) UNSIGNED DEFAULT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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

DROP TABLE IF EXISTS `repo_types`;
CREATE TABLE IF NOT EXISTS `repo_types` (
  `cat_id` int(11) NOT NULL,
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `desc` varchar(500) DEFAULT NULL,
  `shortdesc` varchar(50) NOT NULL,
  `meta1` varchar(500) NOT NULL,
  `meta2` varchar(500) NOT NULL,
  PRIMARY KEY (`cat_id`,`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `repo_types` (`cat_id`, `id`, `name`, `desc`, `shortdesc`, `meta1`, `meta2`) VALUES(0, 0, 'N/A', 'Nepoznato', '', '', '');
INSERT INTO `repo_types` (`cat_id`, `id`, `name`, `desc`, `shortdesc`, `meta1`, `meta2`) VALUES(0, 1, 'REK', 'Staza za rekreativce i pocetnike', '', '', '');
INSERT INTO `repo_types` (`cat_id`, `id`, `name`, `desc`, `shortdesc`, `meta1`, `meta2`) VALUES(0, 2, 'XC', 'CrossCountry staza', '', '', '');
INSERT INTO `repo_types` (`cat_id`, `id`, `name`, `desc`, `shortdesc`, `meta1`, `meta2`) VALUES(0, 3, 'ALM', 'All Mountain', '', '', '');
INSERT INTO `repo_types` (`cat_id`, `id`, `name`, `desc`, `shortdesc`, `meta1`, `meta2`) VALUES(0, 4, 'DH', 'Downhill', '', '', '');
INSERT INTO `repo_types` (`cat_id`, `id`, `name`, `desc`, `shortdesc`, `meta1`, `meta2`) VALUES(1, 0, 'N/A', 'Nepoznato', '', '', '');
INSERT INTO `repo_types` (`cat_id`, `id`, `name`, `desc`, `shortdesc`, `meta1`, `meta2`) VALUES(1, 1, '*', 'Nezahtjevna staza, pogodna za početnike', '', '', '');
INSERT INTO `repo_types` (`cat_id`, `id`, `name`, `desc`, `shortdesc`, `meta1`, `meta2`) VALUES(1, 2, '**', 'Umjereno zahtjevna staza, pogodna za rekreativce', '', '', '');
INSERT INTO `repo_types` (`cat_id`, `id`, `name`, `desc`, `shortdesc`, `meta1`, `meta2`) VALUES(1, 3, '***', 'Zahtjevna staza, pogodna za spremnije bicikliste i takmičare', '', '', '');
INSERT INTO `repo_types` (`cat_id`, `id`, `name`, `desc`, `shortdesc`, `meta1`, `meta2`) VALUES(1, 4, '****', 'Vrlo zahtjevna staza, preporučuje se samo iskusnim biciklistima u dobroj formi', '', '', '');
INSERT INTO `repo_types` (`cat_id`, `id`, `name`, `desc`, `shortdesc`, `meta1`, `meta2`) VALUES(2, 0, 'N/A', 'Nepoznato', '', '', '');
INSERT INTO `repo_types` (`cat_id`, `id`, `name`, `desc`, `shortdesc`, `meta1`, `meta2`) VALUES(2, 1, '*', 'Asfalt ili dobro utaban put, bez ikakvih prepreka', '', '', '');
INSERT INTO `repo_types` (`cat_id`, `id`, `name`, `desc`, `shortdesc`, `meta1`, `meta2`) VALUES(2, 2, '**', 'Makadamski put ili dobro utabana široka staza', '', '', '');
INSERT INTO `repo_types` (`cat_id`, `id`, `name`, `desc`, `shortdesc`, `meta1`, `meta2`) VALUES(2, 3, '***', 'Loš makadamski put, planinarska staza sa prepekama', '', '', '');
INSERT INTO `repo_types` (`cat_id`, `id`, `name`, `desc`, `shortdesc`, `meta1`, `meta2`) VALUES(2, 4, '****', 'Opasna i tehnički jako zahtjevna staza sa čestim neprohodnim sekcijama', '', '', '');
INSERT INTO `repo_types` (`cat_id`, `id`, `name`, `desc`, `shortdesc`, `meta1`, `meta2`) VALUES(10, 1, 'A', 'Asfalt, utaban makadam', 'asfalt', 'rgba(150,150,150,0.7)', '#999999');
INSERT INTO `repo_types` (`cat_id`, `id`, `name`, `desc`, `shortdesc`, `meta1`, `meta2`) VALUES(10, 2, 'M', 'Makadam', 'makadam', 'rgba(255,128,0,0.7)', '#ff6600');
INSERT INTO `repo_types` (`cat_id`, `id`, `name`, `desc`, `shortdesc`, `meta1`, `meta2`) VALUES(10, 3, 'S', 'Staza (vozljivo)', 'vozljiva staza', 'rgba(255,0,0,0.7)', '#ff0000');
INSERT INTO `repo_types` (`cat_id`, `id`, `name`, `desc`, `shortdesc`, `meta1`, `meta2`) VALUES(10, 4, 'N', 'Pl.staza (nevozljivo)', 'nevozljiva staza', 'rgba(0,0,0,0.7)', '#000000');

DROP TABLE IF EXISTS `tokens`;
CREATE TABLE IF NOT EXISTS `tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(500) NOT NULL,
  `mapboxacc` varchar(100) NOT NULL,
  `mapboxpass` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `emailpass` varchar(100) NOT NULL,
  `mapboxsourceid` varchar(100) NOT NULL,
  `mapboxlayerid` varchar(100) NOT NULL,
  `counter` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `tokens` (`id`, `token`, `mapboxacc`, `mapboxpass`, `email`, `emailpass`, `mapboxsourceid`, `mapboxlayerid`, `counter`) VALUES(0, 'pk.eyJ1IjoibGp1YmljYXN0aSIsImEiOiJjaXN6eWdkOTEwMDY3MnlwZGhieGswNTNtIn0.kCB_5RS5Q8VVfYoqind-qA', 'ljubicasti', 'samolagano', 'purplehaze25g@mail.com', 'samolagano', 'ljubicasti.8ezvpr7w', 'mine-53au2v', 174);
INSERT INTO `tokens` (`id`, `token`, `mapboxacc`, `mapboxpass`, `email`, `emailpass`, `mapboxsourceid`, `mapboxlayerid`, `counter`) VALUES(1, 'pk.eyJ1IjoibWlyemEzOCIsImEiOiJjaXN6emNlYnUwMDZqMnRtbmg4ZDdmdnFtIn0.eGg8hy9au6-HJXz6oM7_Ag', 'mirza38', 'samolagano', 'mirza.teletovic@yandex.com', 'samolagano', 'mirza38.avyty94r', 'mine-9c12fc', 174);
INSERT INTO `tokens` (`id`, `token`, `mapboxacc`, `mapboxpass`, `email`, `emailpass`, `mapboxsourceid`, `mapboxlayerid`, `counter`) VALUES(2, 'pk.eyJ1IjoiY29va2lla3VzaCIsImEiOiJjaXN6eHZ6cjMwMDZvMm9tbjN5ZGxtOHhsIn0.YkSND5AK0HzznBEW6L8Leg', 'cookiekush', 'gradient', 'cookiekush100g@gmail.com', 'gradient', 'cookiekush.dwqtsytk', 'mine-2s65yq', 174);
INSERT INTO `tokens` (`id`, `token`, `mapboxacc`, `mapboxpass`, `email`, `emailpass`, `mapboxsourceid`, `mapboxlayerid`, `counter`) VALUES(3, 'pk.eyJ1IjoiZHphbmFuIiwiYSI6ImNpc3p6ZmZrajAwNnQyb21udGpocmJ2NDgifQ.nT9XVGousc6xZcYGNJQHiQ', 'dzanan', 'samolagano', 'dzanan.musa@yandex.com', 'samolagano', 'dzanan.80crglxm', 'mine-dcge6m', 174);

DROP TABLE IF EXISTS `trails`;
CREATE TABLE IF NOT EXISTS `trails` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(500) DEFAULT NULL,
  `desc` longtext,
  `name_en` varchar(50) NOT NULL,
  `desc_en` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `trail_regions`;
CREATE TABLE IF NOT EXISTS `trail_regions` (
  `id_trail` int(10) UNSIGNED NOT NULL,
  `id_mnt` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id_trail`,`id_mnt`),
  KEY `regions_fk_idx` (`id_mnt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `trail_versions`;
CREATE TABLE IF NOT EXISTS `trail_versions` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_trail` int(10) UNSIGNED NOT NULL,
  `date` date DEFAULT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  `trail_type` int(10) UNSIGNED DEFAULT NULL,
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
  `center` varchar(100) DEFAULT NULL,
  `bounds` varchar(500) DEFAULT NULL,
  `inputfilename` varchar(500) DEFAULT NULL,
  `external_link` varchar(500) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  PRIMARY KEY (`id`,`id_trail`,`active`),
  KEY `indexirano` (`id`,`id_trail`,`trail_type`),
  KEY `version_trail` (`id_trail`),
  KEY `version_trail_type` (`trail_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `trail_version_path`;
CREATE TABLE IF NOT EXISTS `trail_version_path` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_version` int(10) UNSIGNED NOT NULL,
  `lat` double NOT NULL,
  `lon` double NOT NULL,
  `elevation` float DEFAULT NULL,
  `prev_dist` double DEFAULT NULL,
  `prev_elev` double DEFAULT NULL,
  PRIMARY KEY (`id`,`id_version`),
  KEY `version_points0` (`id_version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `trail_version_points`;
CREATE TABLE IF NOT EXISTS `trail_version_points` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_version` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `desc` longtext,
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
  `elevationprofile` int(1) NOT NULL DEFAULT '0',
  `name_en` varchar(50) NOT NULL,
  `desc_en` varchar(1000) NOT NULL,
  `wp_geojson` varchar(4000) NOT NULL,
  PRIMARY KEY (`id`,`id_version`),
  KEY `version_points` (`id_version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


ALTER TABLE `repo_regions`
  ADD CONSTRAINT `child_parent` FOREIGN KEY (`id_parent`) REFERENCES `repo_regions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `trail_regions`
  ADD CONSTRAINT `regions_fk` FOREIGN KEY (`id_mnt`) REFERENCES `repo_regions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `trails_fk` FOREIGN KEY (`id_trail`) REFERENCES `trails` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `trail_versions`
  ADD CONSTRAINT `trail_fk` FOREIGN KEY (`id_trail`) REFERENCES `trails` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `trail_version_path`
  ADD CONSTRAINT `path_version_fk` FOREIGN KEY (`id_version`) REFERENCES `trail_versions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `trail_version_points`
  ADD CONSTRAINT `points_version_fk` FOREIGN KEY (`id_version`) REFERENCES `trail_versions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
