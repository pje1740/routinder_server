-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: routinder
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `routines`
--

DROP TABLE IF EXISTS `routines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `startDate` timestamp NOT NULL,
  `endDate` timestamp NOT NULL,
  `days` varchar(255) NOT NULL,
  `stickerId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `stickerId` (`stickerId`),
  CONSTRAINT `routines_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `routines_ibfk_2` FOREIGN KEY (`stickerId`) REFERENCES `stickerInfo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routines`
--

LOCK TABLES `routines` WRITE;
/*!40000 ALTER TABLE `routines` DISABLE KEYS */;
INSERT INTO `routines` VALUES (1,1,'스트레칭','2021-05-03 05:17:30','2021-04-01 00:00:00','2021-05-01 00:00:00','0123456',1),(2,1,'블로그쓰기','2021-05-03 05:24:09','2021-03-01 00:00:00','2021-06-01 00:00:00','5',2),(3,1,'근력운동','2021-05-03 05:24:09','2021-03-17 00:00:00','2021-05-23 00:00:00','024',3);
/*!40000 ALTER TABLE `routines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stickerInfo`
--

DROP TABLE IF EXISTS `stickerInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stickerInfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stickerInfo`
--

LOCK TABLES `stickerInfo` WRITE;
/*!40000 ALTER TABLE `stickerInfo` DISABLE KEYS */;
INSERT INTO `stickerInfo` VALUES (1,'red','https://i.imgur.com/hfWvR6S.png'),(2,'blue','https://i.imgur.com/yvAjmbi.png'),(3,'yellow','https://i.imgur.com/57HW19I.png');
/*!40000 ALTER TABLE `stickerInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stickerStamps`
--

DROP TABLE IF EXISTS `stickerStamps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stickerStamps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `routineId` int DEFAULT NULL,
  `isCompleted` tinyint(1) NOT NULL,
  `when` datetime NOT NULL,
  `completedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `routineId` (`routineId`),
  CONSTRAINT `stickerStamps_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `stickerStamps_ibfk_2` FOREIGN KEY (`routineId`) REFERENCES `routines` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stickerStamps`
--

LOCK TABLES `stickerStamps` WRITE;
/*!40000 ALTER TABLE `stickerStamps` DISABLE KEYS */;
INSERT INTO `stickerStamps` VALUES (1,1,1,1,'2021-04-02 00:00:00','2021-04-02 17:00:00'),(2,1,1,0,'2021-04-03 00:00:00',NULL);
/*!40000 ALTER TABLE `stickerStamps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'jhur');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-03 14:32:11
