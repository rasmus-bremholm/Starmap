DROP TABLE IF EXISTS planet_types;
DROP TABLE IF EXISTS planet_type_map;
DROP TABLE IF EXISTS planets;
DROP TABLE IF EXISTS systems;
DROP TABLE IF EXISTS users;

CREATE TABLE systems (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name CHAR(20) UNIQUE NOT NULL,
   description TEXT
);

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

CREATE TABLE planet_types (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name CHAR(20) UNIQUE NOT NULL,
   description TEXT
);


CREATE TABLE planet_type_map (
   planet_id INTEGER NOT NULL,
   planet_type_id INTEGER NOT NULL,
   PRIMARY KEY (planet_id, planet_type_id),
   FOREIGN KEY (planet_id) REFERENCES planets(id),
   FOREIGN KEY (planet_type_id) REFERENCES planet_types(id)
);

CREATE TABLE users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   email CHAR(20) UNIQUE NOT NULL,
   password TEXT NOT NULL,
   isAdmin BOOLEAN NOT NULL DEFAULT (false)
);


INSERT INTO systems (name, description) VALUES
('Ultima Segmentum', 'The Ultima Segmentum is one of the divisions of the Galaxy known as Segmentums of the Imperium and is by far the largest.'),
('Segmentum Obscurus', 'A starsector covered in mystery and unexplored subsectors.'),
('Segmentum Solar', 'The center of the Galaxy, where Earth is located.');

INSERT INTO planet_types (name, description) VALUES
('Death World', 'Extremely dangerous worlds where survival is hard.'),
('Forge World', 'Planets dedicated to manufacturing and industry.'),
('Hive World', 'Planets mostly populated by a single gigantic city.'),
('Feudal World', 'Planets with societies based on primitive or feudal structures.');

INSERT INTO planets (system, title, desc, population, diameter, mass, temperature, image)
VALUES
(1, 'Prospero','A center of knowledge and sorcery, it was eventuallyt destroyed.', 500000000, 12000.5, 6.5e24, 22.0, './prospero.png'),

(2, 'Caliban', 'Caliban was a Death World of deadly forests and monstrous beasts. Its people lived in fortress-monasteries and followed a feudal warrior code.', 20000000, 9800.0, 5.1e24, 16.0, './caliban.png'),

(3, 'Fenris', 'Fenris is an icy Death World, home to the Space Wolves Chapter. Known for its harsh environment and great fortress, The Fang.', 10000000, 9600.0, 4.8e24, -30.0, './fenris.png');

INSERT INTO planet_type_map (planet_id, planet_type_id) VALUES
 -- Prospero / Death World
 -- Prospero / Hive World
(1, 1),
(1, 3),
-- Caliban / Death World
(2, 1),
-- Caliban Feudal World
(2, 4),

 -- Fenris / Death World
(3, 1);
