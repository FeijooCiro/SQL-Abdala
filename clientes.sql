-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-11-2023 a las 19:31:37
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `motormysql`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `idClientes` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `FechaNac` date NOT NULL,
  `peso` float NOT NULL,
  `altura` float NOT NULL,
  `localidad` varchar(50) NOT NULL,
  `nombreCalleDomicilio` varchar(50) NOT NULL,
  `numeroCalleDomicilio` int(11) NOT NULL,
  `Movil01` int(11) NOT NULL,
  `Movil02` int(11) DEFAULT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`idClientes`, `nombre`, `apellido`, `FechaNac`, `peso`, `altura`, `localidad`, `nombreCalleDomicilio`, `numeroCalleDomicilio`, `Movil01`, `Movil02`, `email`) VALUES
(1, 'Ciro Luciano', 'Feijoo', '2004-12-30', 95, 1.79, 'Mar del Plata', 'el tejado', 4844, 2147483647, 0, 'cirolucianofeijoo@gmail.com'),
(2, 'rodrigo sebastian', 'Fernandes', '2009-07-08', 100, 1.79, 'Musaicos', 'al aire', 1134, 23234, 34224, 'pepe@gmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`idClientes`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `idClientes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
