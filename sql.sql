-- Creación de base de datos
CREATE DATABASE bancosolar_db;

-- Creacion de la tabla usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    balance FLOAT CHECK (balance >= 0)
);

-- Creacion de la tabla transferencias
CREATE TABLE transferencias (
    id SERIAL PRIMARY KEY,
    emisor INT,
    receptor INT,
    monto FLOAT,
    fecha TIMESTAMP,
    FOREIGN KEY (emisor) REFERENCES usuarios(id),
    FOREIGN KEY (receptor) REFERENCES usuarios(id)
);

-- Consulta para mostrar las transferencias con los nombres de emisor y recpetor
SELECT
    fecha,
    nombreemisor.nombre,
    nombrereceptor.nombre,
    monto
FROM
    transferencias AS transf
    INNER JOIN usuarios AS nombreemisor ON transf.emisor = nombreemisor.id
    INNER JOIN usuarios AS nombrereceptor ON transf.receptor = nombrereceptor.id;