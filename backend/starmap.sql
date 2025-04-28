DROP TABLE IF EXISTS planet_types;
DROP TABLE IF EXISTS planets;
DROP TABLE IF EXISTS systems;
DROP TABLE IF EXISTS users;


-- Systems
CREATE TABLE systems (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name CHAR(20) UNIQUE NOT NULL,
   description TEXT
);
-- Planets Table
CREATE TABLE planets (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   system INTEGER NOT NULL,
   title CHAR(20) UNIQUE NOT NULL,
   desc TEXT,
   population INTEGER NOT NULL,
   diameter REAL NOT NULL,
   mass REAL NOT NULL,
   temperature REAL NOT NULL,
   image TEXT DEFAULT ('./placeholder.png'),
   FOREIGN KEY (system) REFERENCES systems(id)
);
-- Users, inte säker på att ja använder.
CREATE TABLE users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   email CHAR(20) UNIQUE NOT NULL,
   password TEXT NOT NULL,
   isAdmin BOOLEAN NOT NULL DEFAULT (false)
);

-- Planet types.
CREATE TABLE planet_types (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name CHAR(20) UNIQUE NOT NULL,
   description TEXT
);


INSERT INTO systems (name, description) VALUES
('Sol', 'The home system of mankind, origin of Terra and the Imperium.');

-- Inset planets.
INSERT INTO planets (system, title, desc, population, diameter, mass, temperature, image)
VALUES
(1,
'Prospero',
'Prospero was the original homeworld of the Thousand Sons Traitor Legion and their Primarch Magnus the Red. A center of knowledge and sorcery, it was destroyed before the Horus Heresy.',
 500000000,
 12000.5,
  6.524,
   22.0,
    './prospero.png'),

(1, 'Caliban', 'Caliban was a Death World of deadly forests and monstrous beasts. Its people lived in fortress-monasteries and followed a feudal warrior code.', 20000000, 9800.0, 5.124, 16.0, './caliban.png'),

(1, 'Fenris', 'Fenris is an icy Death World. Known for its harsh environment and great fortress, The Fang.', 10000000, 9600.0, 4.824, -30.0, './fenris.png');
