# Banco Solar
## Habilidades a evaluar
- Conectar una base de datos PostgreSQL con Node.
- Realizar consultas DML con Node y el paquete pg.
- Realizar consultas TCL con Node y el paquete pg.
- Construir una API RESTful utilizando PostgreSQL para la persistencia de datos.
- Manejar errores.
- Manejar códigos de estado HTTP
## SQL a ejecutar:
Creación de base de datos
`CREATE DATABASE bancosolar_db;`
Creacion de la tabla usuarios
`CREATE TABLE usuarios (id SERIAL PRIMARY KEY, nombre VARCHAR(50),
balance FLOAT CHECK (balance >= 0));`
Creacion de la tabla transferencias
`CREATE TABLE transferencias (id SERIAL PRIMARY KEY, emisor INT, receptor
INT, monto FLOAT, fecha TIMESTAMP, FOREIGN KEY (emisor) REFERENCES
usuarios(id), FOREIGN KEY (receptor) REFERENCES usuarios(id));`
