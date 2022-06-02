-- Creación de base de datos
CREATE DATABASE bancosolar_db;
-- Creacion de la tabla usuarios
CREATE TABLE usuarios (id SERIAL PRIMARY KEY, nombre VARCHAR(50),
balance FLOAT CHECK (balance >= 0));
-- Creacion de la tabla transferencias
CREATE TABLE transferencias (id SERIAL PRIMARY KEY, emisor INT, receptor
INT, monto FLOAT, fecha TIMESTAMP, FOREIGN KEY (emisor) REFERENCES
usuarios(id), FOREIGN KEY (receptor) REFERENCES usuarios(id));

SELECT * FROM transferencias INNER JOIN usuarios ON usuarios.id = transferencias.emisor;


trans 1  e1 r2
trans 2   e3 r2
trans 3   e1  r3

SELECT usuarios.nombre as emisor, usuarios.nombre as receptor, transferencias.monto  FROM transferencias INNER JOIN usuarios ON transferencias.id = usuarios.;
SELECT fecha, n.nombre, p.nombre, monto FROM transferencias AS t INNER JOIN usuarios AS n ON t.emisor = n.id INNER JOIN usuarios AS p ON t.receptor = p.id;
SELECT fecha, nombreemisor.nombre, nombrereceptor.nombre, monto FROM transferencias AS t INNER JOIN usuarios AS nombreemisor ON t.emisor = nombreemisor.id INNER JOIN usuarios AS nombrereceptor ON t.receptor = nombrereceptor.id;