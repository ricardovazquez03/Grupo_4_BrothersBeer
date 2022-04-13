-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: brothersbeers
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `orden`
--

DROP TABLE IF EXISTS `orden`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orden` (
  `orden_id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `producto_id` int NOT NULL,
  PRIMARY KEY (`orden_id`),
  KEY `producto_id_idx` (`producto_id`),
  KEY `usuario_id_idx` (`usuario_id`),
  CONSTRAINT `producto_id` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`producto_id`),
  CONSTRAINT `usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orden`
--

LOCK TABLES `orden` WRITE;
/*!40000 ALTER TABLE `orden` DISABLE KEYS */;
/*!40000 ALTER TABLE `orden` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `producto_id` int NOT NULL AUTO_INCREMENT,
  `producto_name` varchar(40) NOT NULL,
  `price` int NOT NULL,
  `description` varchar(500) NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `rango` decimal(2,1) NOT NULL,
  `type_name` varchar(40) NOT NULL,
  PRIMARY KEY (`producto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Sol',25,'Sol es una cerveza clara con exquisito aroma, poco amarga y refrescante. Su sabor suave y el significado de su nombre le han permitido conquistar un importante lugar en más de 70 países','sol.jpg',4.0,'Cerveza'),(2,'Heineken',40,'Heineken® es una cerveza única, y desde 1873 hasta la fecha conserva la misma calidad, principios e ingredientes. A diferencia de cualquier otra cerveza en México, Heineken® se fermenta en el fondo de tanques horizontales, lo que la hace mas clara, pura y durable.','heineken.jpg',4.0,'Cerveza'),(3,'Bocanegra',30,'Nuestro origen es nuestra esencia. Bocanegra es la creación de dos amigos que decidieron seguir su pasión e inspirar a aquellos que se atreven a ir más allá. Con sede en Monterrey, esta cerveza ha cambiado la percepción de los consumidores llevándola al nivel que merece. Una cerveza digna de colocarse en las mejores mesas, la cerveza Bocanegra de Monterrey ha dominado el arte de la cerveza bohemia.','bocanegra.jpg',3.5,'Cerveza'),(4,'Pácifico',26,'Cerveza Pacífico es la cerveza mexicana tradicional y líder en el noroeste de nuestro país de Grupo Modelo. Creada a principios del siglo XX en la región de Mazatlán, Sinaloa, es de tipo lager y estilo Pilsner, clara, color dorado pálido, muy suave, refrescante y un final muy fresco.','pacifico.jpg',5.0,'Cerveza'),(5,'Margarita',50,'La margarita es un cóctel compuesto por tequila, triple sec y jugo de lima o limón. A menudo se sirve con sal en el borde de la copa. La bebida se sirve sacudiendo el hielo (con hielo), mezclado con hielo, o sin hielo.','margarita.jpg',4.5,'Cóctel'),(6,'Martini',55,'El martini o martini seco (Dry Martini en inglés) es uno de los cócteles más conocidos, compuesto de ginebra con un chorro de vermut. Suele servirse en copa de cóctel, adornado con una aceituna cruzada.','martini.png',5.0,'Cóctel'),(7,'daiquiri',55,'El Daiquiri tradicional es una bebida que se prepara a base de azúcar, limón y ron blanco. Con el paso del tiempo, a partir de esta receta tradicional se han desarrollado muchas variantes, que mantienen algunos ingredientes básicos pero incorporan algunos nuevos.','daiquiri.png',5.0,'Cóctel'),(8,'Shirley temple',45,'Un Shirley Temple es un cóctel no alcohólico, bautizado en honor de la actriz infantil de cine y posteriormente diplomática estadounidense Shirley Temple. Está compuesto de cinco medidas de refresco de lima-limón o de ginger-ale y un toque de granadina, decorado con una guinda al marrasquino y una rodaja de naranja.','shirley_temple.png',3.5,'Cóctel'),(11,'Corona Extra',23,'Cerveza Corona Extra es la marca líder en el mercado nacional, la cerveza mexicana de mayor venta en el mundo. Es una cerveza tipo Pilsner de 4.5º de alcohol que actualmente se vende en más de 180 países en los cinco continentes. ','1649819298009.jpg',4.5,'Cerveza'),(12,'Heroica Carajillo Jarocho',38,'Cerveza oscura y de cuerpo cremoso, con aromas a café, avellana y una ligera nota de canela.','1649819417271.jpg',3.5,'Cerveza'),(13,'Heroica Isla de Sacrificios',50,'Esta cerveza le rinde homenaje al icono más bello y representativo del puerto de Veracruz, la Isla de Sacrificios. La etiqueta cuenta una leyenda prehispánica en la que se sacrificó a una doncella en la isla como ofrenda a los dioses.\r\n\r\nSe elabora con malta de trigo y es de color amarillo pajizo, refrescante y ligera, con un suave aroma a cáscara de naranja. Sabores a trigo y banana.','1649819506623.jpg',4.5,'Cerveza'),(14,'Negra Modelo',40,'Negra Modelo es a menudo llamada \"la crema de la cerveza\". Es la cerveza oscura número uno en México, y ha sido elaborada con la misma receta desde que la cervecería Grupo Modelo la introdujo al mercado en 1925. Puede que ahora tenga una imagen nueva y más sofisticada, pero el sabor balanceado y el delicado aroma a malta, caramelo y lúpulos, no ha cambiado en lo más mínimo.','1649819579175.jpg',5.0,'Cerveza'),(15,'Modelo Especial ',38,'Modelo especial, una cerveza pilsner americana, fue la primera cerveza creada y producida por Grupo Modelo en 1925. Relanzada utilizando la misma receta en 2010, Especial tiene un color dorado brillante, y un sabor dulce y bien equilibrado con lúpulos ligeros y un final fresco.','1649819650076.jpg',4.5,'Cerveza');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `usuario_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(80) NOT NULL,
  `direccion` varchar(40) NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `desarrollador` tinyint DEFAULT NULL,
  PRIMARY KEY (`usuario_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Angel','angel@hotmail.com','$2a$10$4HjVpbQk5WJTuVQqxxZolexYv3XArNI.pGN9Q4t8EwzeRhNKpq9NG','Omnipresente','lal2.jpg',1),(2,'Ricardo','ricardo@hotmail.com','$2a$10$VTnvwEwLgJmhlCBxexBU.ePY/3hlLZamZcScB.3rfjlbeiWZZn/sK','Padawan','user.png',1),(3,'Gerardo','gerardo@hotmail.com','$2a$10$O4jo2XphmyFM5Ku5r/91R.M9KrYUl9rz7rs7ySD8LXQ1WYmYUSUj6','Monterrey','user.png',1),(4,'LuisVG','luis@hotmail.com','$2a$10$uo.e00JpEUQ21MTKSMkrEOta6t2omVU7XjrC86/aTtl1UunA6U2HK','Jalisco 20','1649818106399.png',NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-12 22:16:37
