CREATE DATABASE  IF NOT EXISTS `db_amazon` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `db_amazon`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: db_amazon
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `almacen`
--

DROP TABLE IF EXISTS `almacen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `almacen` (
  `id_almacen` int(11) NOT NULL AUTO_INCREMENT,
  `ubicacion` varchar(100) DEFAULT NULL,
  `capacidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_almacen`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `almacen`
--

LOCK TABLES `almacen` WRITE;
/*!40000 ALTER TABLE `almacen` DISABLE KEYS */;
INSERT INTO `almacen` VALUES (1,'Lima',1000),(2,'Arequipa',800),(3,'Cusco',600);
/*!40000 ALTER TABLE `almacen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Electrónica','Dispositivos y accesorios'),(2,'Hogar','Artículos del hogar'),(3,'Deportes','Ropa y artículos deportivos'),(4,'Tecnología','Equipos y gadgets'),(5,'Ropa','Ropa masculina y femenina'),(6,'Juguetería','Juguetes para niños y niñas'),(7,'Alimentos','Productos comestibles'),(8,'Salud','Productos de salud e higiene'),(9,'Mascotas','Accesorios para animales'),(10,'Libros','Libros físicos y digitales');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_cliente` varchar(100) NOT NULL,
  `id_tipo_documento_identidad` int(11) NOT NULL,
  `numero_documento` varchar(20) NOT NULL,
  `direccion` varchar(150) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email_cliente` varchar(100) DEFAULT NULL,
  `fecha_registro` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id_cliente`),
  KEY `fk_cliente_tipo_doc` (`id_tipo_documento_identidad`),
  CONSTRAINT `fk_cliente_tipo_doc` FOREIGN KEY (`id_tipo_documento_identidad`) REFERENCES `tipo_documento_identidad` (`id_tipo_documento_identidad`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Carlos Sánchez',1,'12345678','Av. Primavera 123','987654321','carlos@gmail.com','2025-04-28 19:31:12'),(2,'María Torres',1,'87654321','Jr. Los Sauces 456','912345678','maria@gmail.com','2025-04-28 19:31:12'),(3,'Empresa ABC SAC',2,'20123456789','Av. Las Flores 789','998877665','ventas@abc.com','2025-04-28 19:31:12'),(4,'José Romero',1,'43218765','Av. Industrial 123','987654111','jose@correo.com','2025-04-28 19:31:12'),(5,'Ana Cecilia López',1,'12348765','Jr. Libertad 321','987888222','ana@correo.com','2025-04-28 19:31:12'),(6,'Empresa XYZ SRL',2,'20456789123','Calle Los Robles 789','993344556','contacto@xyzsrl.com','2025-04-28 19:31:12'),(7,'Pedro Quispe',1,'87451236','Av. Las Gardenias 654','998765432','pedro@gmail.com','2025-04-28 19:31:12'),(8,'Luis Salazar',1,'98765432','Jr. Los Cedros 852','987111222','luis@correo.com','2025-04-28 19:31:12'),(9,'Inmobiliaria CasaFeliz',2,'20654321987','Av. Angamos 741','911223344','ventas@casafeliz.com','2025-04-28 19:31:12'),(10,'Susana Aguilar',1,'87654329','Calle San Martín 741','912667788','susana@correo.com','2025-04-28 19:31:12');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalleventas`
--

DROP TABLE IF EXISTS `detalleventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalleventas` (
  `id_detalle` int(11) NOT NULL AUTO_INCREMENT,
  `id_venta` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `flg_esbonificado` tinyint(1) DEFAULT 0,
  `precio_unitario` decimal(10,2) NOT NULL,
  `precio_unitario_sin_igv` decimal(10,2) NOT NULL,
  `descuento` decimal(10,2) DEFAULT 0.00,
  `subtotal_con_descuento` decimal(10,2) NOT NULL,
  `monto_igv` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `fk_detalle_venta` (`id_venta`),
  KEY `fk_detalle_producto` (`id_producto`),
  CONSTRAINT `fk_detalle_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  CONSTRAINT `fk_detalle_venta` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalleventas`
--

LOCK TABLES `detalleventas` WRITE;
/*!40000 ALTER TABLE `detalleventas` DISABLE KEYS */;
INSERT INTO `detalleventas` VALUES (1,1,1,1,0,100.00,84.75,5.00,95.00,17.10,112.10),(2,1,2,1,0,18.00,15.25,0.00,18.00,2.70,20.70),(3,2,3,1,0,50.00,42.37,5.00,45.00,8.10,53.10),(4,2,4,1,0,9.00,7.63,1.00,8.00,1.44,9.44),(5,3,5,2,0,100.00,84.75,0.00,200.00,36.00,236.00),(6,4,6,1,0,30.00,25.42,0.00,30.00,5.40,35.40),(7,5,7,1,0,100.00,84.75,0.00,100.00,18.00,118.00),(8,6,8,1,0,40.00,33.90,0.00,40.00,7.20,47.20),(9,7,9,1,0,150.00,127.12,0.00,150.00,27.00,177.00),(10,8,10,1,0,20.00,16.95,0.00,20.00,3.60,23.60),(11,9,1,1,0,70.00,59.32,5.00,65.00,11.70,76.70),(12,10,2,1,0,30.00,25.42,0.00,30.00,5.40,35.40);
/*!40000 ALTER TABLE `detalleventas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventario`
--

DROP TABLE IF EXISTS `inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventario` (
  `id_inventario` int(11) NOT NULL AUTO_INCREMENT,
  `id_producto` int(11) DEFAULT NULL,
  `id_almacen` int(11) DEFAULT NULL,
  `stock_actual` int(11) DEFAULT NULL,
  `fecha_actualizacion` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id_inventario`),
  KEY `id_producto` (`id_producto`),
  KEY `id_almacen` (`id_almacen`),
  CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  CONSTRAINT `inventario_ibfk_2` FOREIGN KEY (`id_almacen`) REFERENCES `almacen` (`id_almacen`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario`
--

LOCK TABLES `inventario` WRITE;
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
INSERT INTO `inventario` VALUES (1,1,1,50,'2025-04-11 20:05:34'),(2,2,1,30,'2025-04-11 20:05:34'),(3,3,2,20,'2025-04-11 20:05:34'),(4,4,2,10,'2025-04-11 20:05:34'),(5,5,3,60,'2025-04-11 20:05:34'),(6,6,3,40,'2025-04-11 20:05:34'),(7,7,1,25,'2025-04-11 20:05:34'),(8,8,2,100,'2025-04-11 20:05:34'),(9,9,1,15,'2025-04-11 20:05:34'),(10,10,3,12,'2025-04-11 20:05:34');
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `id_categoria` int(11) DEFAULT NULL,
  `id_proveedor` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `id_categoria` (`id_categoria`),
  KEY `id_proveedor` (`id_proveedor`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
  CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Mouse inalámbrico','Mouse recargable',49.90,100,1,1,2),(2,'Audífonos Bluetooth','Audífonos con estuche',89.00,80,1,1,3),(3,'Cafetera','Cafetera italiana 6 tazas',120.50,40,1,2,1),(4,'Bicicleta','Montañera aluminio',850.00,20,1,3,6),(5,'Polo deportivo','Dryfit azul M',35.00,150,1,5,6),(6,'Cepillo dental eléctrico','Cepillo con temporizador',65.00,60,1,8,10),(7,'Comedero para perro','Tamaño mediano',22.00,90,1,9,8),(8,'Libro de cuentos','Historias mágicas',29.90,200,1,10,9),(9,'Termómetro digital','Alta precisión',15.90,70,1,8,10),(10,'Pelota de fútbol','Tamaño profesional',49.00,45,1,3,6),(11,'Mouse','Mouse Gamer',89.90,30,0,1,1),(12,'Mouse','Mouse Gamer',89.90,30,1,1,1),(13,'Monitor Samsung 27 Edit','Monitor curvo Full HD',139.99,30,0,1,4),(14,'Monitor Samsung 54\"','Monitor curvo Full HD',1999.99,25,1,1,4);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `id_proveedor` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `ruc` varchar(20) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  PRIMARY KEY (`id_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES (1,'Distribuciones Perú','104000001','999111222','Av. Lima 123'),(2,'TechDistribuidora','104000002','988222333','Av. Arequipa 456'),(3,'ElectroWorld','104000003','977333444','Av. Javier Prado 789'),(4,'GlobalImport','104000004','966444555','Av. Bolívar 101'),(5,'Casa Blanca','104000005','955555666','Av. Tacna 202'),(6,'SportLife','104000006','944666777','Av. Benavides 303'),(7,'Súper Hogar','104000007','933777888','Av. San Borja 404'),(8,'Animal Center','104000008','922888999','Av. Mascotas 505'),(9,'Almacenes Mundo','104000009','911999000','Av. Global 606'),(10,'EcoSalud','104000010','900000111','Av. Salud 707');
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_documento`
--

DROP TABLE IF EXISTS `tipo_documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_documento` (
  `id_tipo_documento` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`id_tipo_documento`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_documento`
--

LOCK TABLES `tipo_documento` WRITE;
/*!40000 ALTER TABLE `tipo_documento` DISABLE KEYS */;
INSERT INTO `tipo_documento` VALUES (1,'Pedido'),(2,'Factura'),(3,'Boleta'),(4,'Nota de Crédito');
/*!40000 ALTER TABLE `tipo_documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_documento_identidad`
--

DROP TABLE IF EXISTS `tipo_documento_identidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_documento_identidad` (
  `id_tipo_documento_identidad` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`id_tipo_documento_identidad`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_documento_identidad`
--

LOCK TABLES `tipo_documento_identidad` WRITE;
/*!40000 ALTER TABLE `tipo_documento_identidad` DISABLE KEYS */;
INSERT INTO `tipo_documento_identidad` VALUES (1,'DNI'),(2,'RUC'),(3,'Carné de Extranjería');
/*!40000 ALTER TABLE `tipo_documento_identidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `fecha_registro` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `ultimo_login` datetime DEFAULT NULL,
  `intentos_fallidos` int(11) DEFAULT 0,
  `bloqueado_hasta` datetime DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Admin General','admin@amazonventas.com','admin123','ADMIN',1,'2025-04-28 19:31:04','2025-05-12 22:57:02','2025-05-12 22:57:02',0,NULL),(2,'Vendedor 1','vendedor1@amazonventas.com','vendedor123','VENDEDOR',1,'2025-04-28 19:31:04','2025-05-12 19:07:15','2025-04-28 22:20:19',4,'2025-05-12 19:12:15'),(3,'Vendedor 2','vendedor2@amazonventas.com','vendedor123','VENDEDOR',1,'2025-04-28 19:31:04','2025-04-28 19:31:04',NULL,0,NULL),(4,'Cajero 1','cajero1@amazonventas.com','cajero123','CAJERO',1,'2025-04-28 19:31:04','2025-04-28 19:31:04',NULL,0,NULL),(5,'Cajero 2','cajero2@amazonventas.com','cajero123','CAJERO',1,'2025-04-28 19:31:04','2025-04-28 19:31:04',NULL,0,NULL),(6,'Supervisor','supervisor@amazonventas.com','supervisor123','SUPERVISOR',1,'2025-04-28 19:31:04','2025-04-28 19:31:04',NULL,0,NULL),(7,'Soporte Técnico','soporte@amazonventas.com','soporte123','SOPORTE',1,'2025-04-28 19:31:04','2025-04-28 19:31:04',NULL,0,NULL),(8,'RRHH','rrhh@amazonventas.com','rrhh123','RRHH',1,'2025-04-28 19:31:04','2025-04-28 19:31:04',NULL,0,NULL),(9,'Logística','logistica@amazonventas.com','logistica123','LOGISTICA',1,'2025-04-28 19:31:04','2025-04-28 19:31:04',NULL,0,NULL),(10,'Gerente','gerente@amazonventas.com','gerente123','GERENTE',1,'2025-04-28 19:31:04','2025-04-28 19:31:04',NULL,0,NULL),(11,'Jeremy Servan','Hola@gmail.com','1234567','ADMIN',0,'2025-04-28 22:22:22','2025-04-28 22:23:15',NULL,0,NULL),(12,'Messi','Messi@gmail.com','123456','ADMIN',1,'2025-05-12 21:12:12','2025-05-12 21:12:12',NULL,0,NULL),(14,'Messi','Messi12345@gmail.com','123456','ADMIN',0,'2025-05-13 04:10:39','2025-05-13 04:11:37',NULL,0,NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendedor`
--

DROP TABLE IF EXISTS `vendedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendedor` (
  `id_vendedor` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_vendedor` varchar(100) NOT NULL,
  `id_tipo_documento_identidad` int(11) NOT NULL,
  `numero_documento` varchar(20) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email_vendedor` varchar(100) DEFAULT NULL,
  `fecha_registro` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id_vendedor`),
  KEY `fk_vendedor_tipo_doc` (`id_tipo_documento_identidad`),
  CONSTRAINT `fk_vendedor_tipo_doc` FOREIGN KEY (`id_tipo_documento_identidad`) REFERENCES `tipo_documento_identidad` (`id_tipo_documento_identidad`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendedor`
--

LOCK TABLES `vendedor` WRITE;
/*!40000 ALTER TABLE `vendedor` DISABLE KEYS */;
INSERT INTO `vendedor` VALUES (1,'Luis Ramirez',1,'12345678','987654321','luisramirez@ventas.com','2025-04-28 19:31:20'),(2,'Ana Torres',1,'87654321','998877665','anatorres@ventas.com','2025-04-28 19:31:20'),(3,'José Salinas',1,'34561278','912345678','josesalinas@ventas.com','2025-04-28 19:31:20'),(4,'Paola Fernández',1,'76543212','998833221','paolafernandez@ventas.com','2025-04-28 19:31:20'),(5,'Enrique Mendoza',2,'20567891234','987776655','enriquemendoza@ventas.com','2025-04-28 19:31:20'),(6,'Lucía Cabrera',1,'21346578','911223344','luciacabrera@ventas.com','2025-04-28 19:31:20'),(7,'Ricardo Gómez',1,'31245678','912334455','ricardogomez@ventas.com','2025-04-28 19:31:20'),(8,'Gabriela Álvarez',1,'42315678','923344556','gabrielaalvarez@ventas.com','2025-04-28 19:31:20'),(9,'Claudia Reyes',1,'54612387','933221144','claudiareyes@ventas.com','2025-04-28 19:31:20'),(10,'Fernando Paredes',1,'65478912','944556677','fernandoparedes@ventas.com','2025-04-28 19:31:20');
/*!40000 ALTER TABLE `vendedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `id_venta` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) NOT NULL,
  `id_vendedor` int(11) NOT NULL,
  `id_tipo_documento` int(11) NOT NULL,
  `serie_documento` varchar(10) NOT NULL,
  `nro_documento` varchar(50) NOT NULL,
  `fecha_venta` datetime NOT NULL,
  `id_estado_documento` int(11) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `fecha_registro` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_venta`),
  KEY `fk_venta_cliente` (`id_cliente`),
  KEY `fk_venta_vendedor` (`id_vendedor`),
  KEY `fk_venta_tipo_documento` (`id_tipo_documento`),
  KEY `fk_venta_estado_documento` (`id_estado_documento`),
  CONSTRAINT `fk_venta_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `fk_venta_estado_documento` FOREIGN KEY (`id_estado_documento`) REFERENCES `ventas_estado_documento` (`id_estado_documento`),
  CONSTRAINT `fk_venta_tipo_documento` FOREIGN KEY (`id_tipo_documento`) REFERENCES `tipo_documento` (`id_tipo_documento`),
  CONSTRAINT `fk_venta_vendedor` FOREIGN KEY (`id_vendedor`) REFERENCES `vendedor` (`id_vendedor`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (1,1,1,2,'F001','000001','2024-04-01 10:00:00',2,1,'2025-04-28 19:48:19','2025-04-28 19:48:19'),(2,2,2,3,'B001','000002','2024-04-02 11:00:00',1,1,'2025-04-28 19:48:19','2025-04-28 19:48:19'),(3,3,3,2,'F001','000003','2024-04-03 12:30:00',2,1,'2025-04-28 19:48:19','2025-04-28 19:48:19'),(4,4,4,3,'B001','000004','2024-04-04 13:00:00',1,1,'2025-04-28 19:48:19','2025-04-28 19:48:19'),(5,5,5,2,'F001','000005','2024-04-05 14:00:00',2,1,'2025-04-28 19:48:19','2025-04-28 19:48:19'),(6,6,6,1,'P001','000006','2024-04-06 15:00:00',1,1,'2025-04-28 19:48:19','2025-04-28 19:48:19'),(7,7,7,2,'F001','000007','2024-04-07 16:00:00',2,1,'2025-04-28 19:48:19','2025-04-28 19:48:19'),(8,8,8,3,'B001','000008','2024-04-08 17:00:00',1,1,'2025-04-28 19:48:19','2025-04-28 19:48:19'),(9,9,9,4,'NC001','000009','2024-04-09 18:00:00',3,1,'2025-04-28 19:48:19','2025-04-28 19:48:19'),(10,10,10,2,'F001','000010','2024-04-10 19:00:00',2,1,'2025-04-28 19:48:19','2025-04-28 19:48:19');
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas_estado_documento`
--

DROP TABLE IF EXISTS `ventas_estado_documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas_estado_documento` (
  `id_estado_documento` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`id_estado_documento`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas_estado_documento`
--

LOCK TABLES `ventas_estado_documento` WRITE;
/*!40000 ALTER TABLE `ventas_estado_documento` DISABLE KEYS */;
INSERT INTO `ventas_estado_documento` VALUES (1,'Pendiente'),(2,'Pagado'),(3,'Anulado'),(4,'En Proceso'),(5,'Observado'),(6,'Facturado'),(7,'Enviado'),(8,'Recibido'),(9,'Cancelado'),(10,'Devuelto');
/*!40000 ALTER TABLE `ventas_estado_documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'db_amazon'
--

--
-- Dumping routines for database 'db_amazon'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-12 23:20:16
