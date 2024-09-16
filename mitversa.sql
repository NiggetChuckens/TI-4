-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-09-2024 a las 04:26:43
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mitversa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--

CREATE TABLE `direccion` (
  `id_direccion` int(10) UNSIGNED NOT NULL,
  `ciudad` varchar(50) NOT NULL,
  `comuna` varchar(50) NOT NULL,
  `calle` varchar(100) NOT NULL,
  `numero` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Disparadores `direccion`
--
DELIMITER $$
CREATE TRIGGER `verificar_direccion` BEFORE INSERT ON `direccion` FOR EACH ROW BEGIN
  DECLARE existing_id INT;
  DECLARE error_msg VARCHAR(255);

  -- Busca si ya existe una dirección igual
  SELECT id_direccion INTO existing_id
  FROM Direccion
  WHERE ciudad = NEW.ciudad
    AND comuna = NEW.comuna
    AND calle = NEW.calle
    AND (numero = NEW.numero OR (numero IS NULL AND NEW.numero IS NULL))
  LIMIT 1;

  -- Si existe una dirección con esos datos, retorna un error
  IF existing_id IS NOT NULL THEN
    SET error_msg = CONCAT('La dirección ya está registrada con ID: ', existing_id);
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = error_msg;
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `verificar_direccion_update` BEFORE UPDATE ON `direccion` FOR EACH ROW BEGIN
  DECLARE existing_id INT;
  DECLARE error_msg VARCHAR(255);

  -- Busca si ya existe una dirección igual a la que se intenta actualizar
  SELECT id_direccion INTO existing_id
  FROM Direccion
  WHERE ciudad = NEW.ciudad
    AND comuna = NEW.comuna
    AND calle = NEW.calle
    AND (numero = NEW.numero OR (numero IS NULL AND NEW.numero IS NULL))
    AND id_direccion != OLD.id_direccion -- Se excluye la dirección actual
  LIMIT 1;

  -- Si existe una dirección con esos datos, retorna un error
  IF existing_id IS NOT NULL THEN
    SET error_msg = CONCAT('No se puede actualizar, la dirección ya está registrada con ID: ', existing_id);
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = error_msg;
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `envio`
--

CREATE TABLE `envio` (
  `id_envio` int(10) UNSIGNED NOT NULL,
  `estado_envio` varchar(100) NOT NULL,
  `id_repartidor` int(10) UNSIGNED NOT NULL,
  `id_cliente` int(10) UNSIGNED NOT NULL,
  `fecha_pedido_inicio` datetime NOT NULL,
  `fecha_pedido_fin` datetime NOT NULL,
  `direccion_origen` int(10) UNSIGNED NOT NULL,
  `direccion_destino` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Disparadores `envio`
--
DELIMITER $$
CREATE TRIGGER `verificar_direcciones_diferentes_envio` BEFORE INSERT ON `envio` FOR EACH ROW BEGIN
  -- Verificar que direccion_origen sea diferente de direccion_destino
  IF NEW.direccion_origen = NEW.direccion_destino THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'La direccion_origen debe ser diferente de la direccion_destino.';
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `verificar_direcciones_diferentes_envio_update` BEFORE UPDATE ON `envio` FOR EACH ROW BEGIN
  -- Verificar que direccion_origen sea diferente de direccion_destino en una actualización
  IF NEW.direccion_origen = NEW.direccion_destino THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'La direccion_origen debe ser diferente de la direccion_destino.';
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `verificar_fechas_envio` BEFORE INSERT ON `envio` FOR EACH ROW BEGIN
  -- Verificar que fecha_pedido_inicio sea anterior a fecha_pedido_fin
  IF NEW.fecha_pedido_inicio >= NEW.fecha_pedido_fin THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'La fecha de inicio del pedido debe ser anterior a la fecha de fin.';
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `verificar_fechas_envio_update` BEFORE UPDATE ON `envio` FOR EACH ROW BEGIN
  -- Verificar que fecha_pedido_inicio sea anterior a fecha_pedido_fin en una actualización
  IF NEW.fecha_pedido_inicio >= NEW.fecha_pedido_fin THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'La fecha de inicio del pedido debe ser anterior a la fecha de fin.';
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `verificar_tipo_cliente_envio` BEFORE INSERT ON `envio` FOR EACH ROW BEGIN
  -- Verifica si el id_cliente pertenece a un usuario de tipo 'cliente'
  DECLARE tipo_usuario VARCHAR(20);
  
  -- Obtener el tipo de usuario correspondiente al id_cliente
  SELECT tipo_usuario INTO tipo_usuario
  FROM Usuario
  WHERE id_usuario = NEW.id_cliente;

  -- Si el tipo de usuario no es 'cliente', generar un error
  IF tipo_usuario != 'cliente' THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El id_cliente debe ser un usuario de tipo cliente.';
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `verificar_tipo_cliente_envio_update` BEFORE UPDATE ON `envio` FOR EACH ROW BEGIN
  -- Verifica si el id_cliente pertenece a un usuario de tipo 'cliente'
  DECLARE tipo_usuario VARCHAR(20);
  
  -- Obtener el tipo de usuario correspondiente al id_cliente
  SELECT tipo_usuario INTO tipo_usuario
  FROM Usuario
  WHERE id_usuario = NEW.id_cliente;

  -- Si el tipo de usuario no es 'cliente', generar un error
  IF tipo_usuario != 'cliente' THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El id_cliente debe ser un usuario de tipo cliente.';
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `verificar_tipo_repartidor_envio` BEFORE INSERT ON `envio` FOR EACH ROW BEGIN
  -- Declarar una variable para almacenar el tipo de usuario
  DECLARE tipo_usuario VARCHAR(20);
  
  -- Obtener el tipo de usuario correspondiente al id_repartidor
  SELECT tipo_usuario INTO tipo_usuario
  FROM Usuario
  WHERE id_usuario = NEW.id_repartidor;

  -- Si el tipo de usuario no es 'repartidor', generar un error
  IF tipo_usuario != 'repartidor' THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El id_repartidor debe ser un usuario de tipo repartidor.';
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `verificar_tipo_repartidor_envio_update` BEFORE UPDATE ON `envio` FOR EACH ROW BEGIN
  -- Declarar una variable para almacenar el tipo de usuario
  DECLARE tipo_usuario VARCHAR(20);
  
  -- Obtener el tipo de usuario correspondiente al id_repartidor
  SELECT tipo_usuario INTO tipo_usuario
  FROM Usuario
  WHERE id_usuario = NEW.id_repartidor;

  -- Si el tipo de usuario no es 'repartidor', generar un error
  IF tipo_usuario != 'repartidor' THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El id_repartidor debe ser un usuario de tipo repartidor.';
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `envio_producto`
--

CREATE TABLE `envio_producto` (
  `id_envio` int(10) UNSIGNED NOT NULL,
  `id_producto` int(10) UNSIGNED NOT NULL,
  `cantidad` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_asignacion`
--

CREATE TABLE `historial_asignacion` (
  `id_historial` int(10) UNSIGNED NOT NULL,
  `id_repartidor` int(10) UNSIGNED NOT NULL,
  `id_vehiculo` int(10) UNSIGNED NOT NULL,
  `fecha_asignacion` datetime NOT NULL,
  `fecha_devolucion` datetime DEFAULT NULL,
  `kilometraje_inicial` decimal(10,2) NOT NULL,
  `kilometraje_final` decimal(10,2) DEFAULT NULL,
  `motivo` varchar(100) NOT NULL
) ;

--
-- Disparadores `historial_asignacion`
--
DELIMITER $$
CREATE TRIGGER `verificar_fechas_asignacion_insert` BEFORE INSERT ON `historial_asignacion` FOR EACH ROW BEGIN
  -- Verificar que fecha_devolucion sea posterior a fecha_asignacion
  IF NEW.fecha_devolucion IS NOT NULL AND NEW.fecha_devolucion <= NEW.fecha_asignacion THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'La fecha de devolución debe ser posterior a la fecha de asignación.';
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `verificar_fechas_asignacion_update` BEFORE UPDATE ON `historial_asignacion` FOR EACH ROW BEGIN
  -- Verificar que fecha_devolucion sea posterior a fecha_asignacion en una actualización
  IF NEW.fecha_devolucion IS NOT NULL AND NEW.fecha_devolucion <= NEW.fecha_asignacion THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'La fecha de devolución debe ser posterior a la fecha de asignación.';
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `verificar_tipo_repartidor_historial_asignacion` BEFORE INSERT ON `historial_asignacion` FOR EACH ROW BEGIN
  -- Declarar una variable para almacenar el tipo de usuario
  DECLARE tipo_usuario VARCHAR(20);
  
  -- Obtener el tipo de usuario correspondiente al id_repartidor
  SELECT tipo_usuario INTO tipo_usuario
  FROM Usuario
  WHERE id_usuario = NEW.id_repartidor;

  -- Si el tipo de usuario no es 'repartidor', generar un error
  IF tipo_usuario != 'repartidor' THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El id_repartidor debe ser un usuario de tipo repartidor.';
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `verificar_tipo_repartidor_historial_asignacion_update` BEFORE UPDATE ON `historial_asignacion` FOR EACH ROW BEGIN
  -- Declarar una variable para almacenar el tipo de usuario
  DECLARE tipo_usuario VARCHAR(20);
  
  -- Obtener el tipo de usuario correspondiente al id_repartidor
  SELECT tipo_usuario INTO tipo_usuario
  FROM Usuario
  WHERE id_usuario = NEW.id_repartidor;

  -- Si el tipo de usuario no es 'repartidor', generar un error
  IF tipo_usuario != 'repartidor' THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El id_repartidor debe ser un usuario de tipo repartidor.';
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_envio`
--

CREATE TABLE `historial_envio` (
  `id_historial` int(10) UNSIGNED NOT NULL,
  `id_envio` int(10) UNSIGNED NOT NULL,
  `fecha` datetime NOT NULL,
  `detalles` varchar(200) DEFAULT NULL,
  `id_repartidor` int(10) UNSIGNED NOT NULL,
  `direccion` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Disparadores `historial_envio`
--
DELIMITER $$
CREATE TRIGGER `verificar_tipo_repartidor_historial_envio` BEFORE INSERT ON `historial_envio` FOR EACH ROW BEGIN
  -- Declarar una variable para almacenar el tipo de usuario
  DECLARE tipo_usuario VARCHAR(20);
  
  -- Obtener el tipo de usuario correspondiente al id_repartidor
  SELECT tipo_usuario INTO tipo_usuario
  FROM Usuario
  WHERE id_usuario = NEW.id_repartidor;

  -- Si el tipo de usuario no es 'repartidor', generar un error
  IF tipo_usuario != 'repartidor' THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El id_repartidor debe ser un usuario de tipo repartidor.';
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `verificar_tipo_repartidor_historial_envio_update` BEFORE UPDATE ON `historial_envio` FOR EACH ROW BEGIN
  -- Declarar una variable para almacenar el tipo de usuario
  DECLARE tipo_usuario VARCHAR(20);
  
  -- Obtener el tipo de usuario correspondiente al nuevo id_repartidor
  SELECT tipo_usuario INTO tipo_usuario
  FROM Usuario
  WHERE id_usuario = NEW.id_repartidor;

  -- Si el tipo de usuario no es 'repartidor', generar un error
  IF tipo_usuario != 'repartidor' THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El id_repartidor debe ser un usuario de tipo repartidor.';
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificacion`
--

CREATE TABLE `notificacion` (
  `id_notificacion` int(10) UNSIGNED NOT NULL,
  `mensaje` varchar(100) NOT NULL,
  `id_cliente` int(10) UNSIGNED NOT NULL,
  `id_envio` int(10) UNSIGNED NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Disparadores `notificacion`
--
DELIMITER $$
CREATE TRIGGER `verificar_tipo_cliente_notificacion` BEFORE INSERT ON `notificacion` FOR EACH ROW BEGIN
  -- Verifica si el id_cliente pertenece a un usuario de tipo 'cliente'
  DECLARE tipo_usuario VARCHAR(20);
  
  -- Obtener el tipo de usuario correspondiente al id_cliente
  SELECT tipo_usuario INTO tipo_usuario
  FROM Usuario
  WHERE id_usuario = NEW.id_cliente;

  -- Si el tipo de usuario no es 'cliente', generar un error
  IF tipo_usuario != 'cliente' THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El id_cliente debe ser un usuario de tipo cliente.';
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `verificar_tipo_cliente_notificacion_update` BEFORE UPDATE ON `notificacion` FOR EACH ROW BEGIN
  -- Verifica si el id_cliente pertenece a un usuario de tipo 'cliente'
  DECLARE tipo_usuario VARCHAR(20);
  
  -- Obtener el tipo de usuario correspondiente al id_cliente
  SELECT tipo_usuario INTO tipo_usuario
  FROM Usuario
  WHERE id_usuario = NEW.id_cliente;

  -- Si el tipo de usuario no es 'cliente', generar un error
  IF tipo_usuario != 'cliente' THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El id_cliente debe ser un usuario de tipo cliente.';
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` decimal(10,2) UNSIGNED NOT NULL,
  `stock` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` char(64) NOT NULL,
  `tipo_usuario` varchar(20) NOT NULL,
  `id_vehiculo` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Disparadores `usuario`
--
DELIMITER $$
CREATE TRIGGER `hash_password_usuario` BEFORE INSERT ON `usuario` FOR EACH ROW BEGIN
  -- Hash de la contraseña con SHA-256 y almacenarla en la columna password
  SET NEW.password = SHA2(NEW.password, 256);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `hash_password_usuario_update` BEFORE UPDATE ON `usuario` FOR EACH ROW BEGIN
  -- Hash de la contraseña con SHA-256 y almacenarla en la columna password
  SET NEW.password = SHA2(NEW.password, 256);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `verificar_tipo_usuario` BEFORE INSERT ON `usuario` FOR EACH ROW BEGIN
  -- Verifica que el tipo de usuario sea válido
  IF NEW.tipo_usuario NOT IN ('cliente', 'gerente', 'repartidor') THEN
    SIGNAL SQLSTATE '45000' 
    SET MESSAGE_TEXT = 'Tipo de usuario inválido. Solo se permiten los valores: cliente, gerente, repartidor.';
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `verificar_tipo_usuario_update` BEFORE UPDATE ON `usuario` FOR EACH ROW BEGIN
  -- Verifica que el tipo de usuario sea válido
  IF NEW.tipo_usuario NOT IN ('cliente', 'gerente', 'repartidor') THEN
    SIGNAL SQLSTATE '45000' 
    SET MESSAGE_TEXT = 'Tipo de usuario inválido. Solo se permiten los valores: cliente, gerente, repartidor.';
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

CREATE TABLE `vehiculo` (
  `id_vehiculo` int(10) UNSIGNED NOT NULL,
  `matricula` varchar(10) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `estado` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD PRIMARY KEY (`id_direccion`);

--
-- Indices de la tabla `envio`
--
ALTER TABLE `envio`
  ADD PRIMARY KEY (`id_envio`),
  ADD KEY `id_repartidor` (`id_repartidor`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `direccion_origen` (`direccion_origen`),
  ADD KEY `direccion_destino` (`direccion_destino`);

--
-- Indices de la tabla `envio_producto`
--
ALTER TABLE `envio_producto`
  ADD PRIMARY KEY (`id_envio`,`id_producto`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `historial_asignacion`
--
ALTER TABLE `historial_asignacion`
  ADD PRIMARY KEY (`id_historial`),
  ADD KEY `id_repartidor` (`id_repartidor`),
  ADD KEY `id_vehiculo` (`id_vehiculo`);

--
-- Indices de la tabla `historial_envio`
--
ALTER TABLE `historial_envio`
  ADD PRIMARY KEY (`id_historial`),
  ADD KEY `id_envio` (`id_envio`),
  ADD KEY `direccion` (`direccion`),
  ADD KEY `id_repartidor` (`id_repartidor`);

--
-- Indices de la tabla `notificacion`
--
ALTER TABLE `notificacion`
  ADD PRIMARY KEY (`id_notificacion`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_envio` (`id_envio`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `id_vehiculo` (`id_vehiculo`);

--
-- Indices de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD PRIMARY KEY (`id_vehiculo`),
  ADD UNIQUE KEY `matricula` (`matricula`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `direccion`
--
ALTER TABLE `direccion`
  MODIFY `id_direccion` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `envio`
--
ALTER TABLE `envio`
  MODIFY `id_envio` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historial_asignacion`
--
ALTER TABLE `historial_asignacion`
  MODIFY `id_historial` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historial_envio`
--
ALTER TABLE `historial_envio`
  MODIFY `id_historial` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notificacion`
--
ALTER TABLE `notificacion`
  MODIFY `id_notificacion` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  MODIFY `id_vehiculo` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `envio`
--
ALTER TABLE `envio`
  ADD CONSTRAINT `envio_ibfk_1` FOREIGN KEY (`id_repartidor`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `envio_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `envio_ibfk_3` FOREIGN KEY (`direccion_origen`) REFERENCES `direccion` (`id_direccion`),
  ADD CONSTRAINT `envio_ibfk_4` FOREIGN KEY (`direccion_destino`) REFERENCES `direccion` (`id_direccion`);

--
-- Filtros para la tabla `envio_producto`
--
ALTER TABLE `envio_producto`
  ADD CONSTRAINT `envio_producto_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `envio_producto_ibfk_2` FOREIGN KEY (`id_envio`) REFERENCES `envio` (`id_envio`);

--
-- Filtros para la tabla `historial_asignacion`
--
ALTER TABLE `historial_asignacion`
  ADD CONSTRAINT `historial_asignacion_ibfk_1` FOREIGN KEY (`id_repartidor`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `historial_asignacion_ibfk_2` FOREIGN KEY (`id_vehiculo`) REFERENCES `vehiculo` (`id_vehiculo`);

--
-- Filtros para la tabla `historial_envio`
--
ALTER TABLE `historial_envio`
  ADD CONSTRAINT `historial_envio_ibfk_1` FOREIGN KEY (`id_envio`) REFERENCES `envio` (`id_envio`),
  ADD CONSTRAINT `historial_envio_ibfk_2` FOREIGN KEY (`direccion`) REFERENCES `direccion` (`id_direccion`),
  ADD CONSTRAINT `historial_envio_ibfk_3` FOREIGN KEY (`id_repartidor`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `notificacion`
--
ALTER TABLE `notificacion`
  ADD CONSTRAINT `notificacion_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `notificacion_ibfk_2` FOREIGN KEY (`id_envio`) REFERENCES `envio` (`id_envio`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_vehiculo`) REFERENCES `vehiculo` (`id_vehiculo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
