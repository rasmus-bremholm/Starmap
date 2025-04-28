DROP TABLE IF EXISTS planet_types;
DROP TABLE IF EXISTS planets;
DROP TABLE IF EXISTS systems;

CREATE TABLE planets (id INTEGER PRIMARY KEY AUTOINCREMENT,
   system INTEGER NOT NULL,
   title CHAR(20) UNIQUE NOT NULL,
   desc TEXT,
   population INTEGER NOT NULL,
   diameter REAL NOT NULL,
   mass REAL NOT NULL,
   temperature REAL NOT NULL,
   image TEXT DEFAULT ('./placeholder.png'),
   FOREIGN KEY (system) REFERENCES systems(id))
CREATE TABLE systems (id INTEGER PRIMARY KEY AUTOINCREMENT,
   name CHAR(20) UNIQUE NOT NULL,
   description TEXT)
CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT,
   email CHAR(20) UNIQUE NOT NULL,
   password TEXT NOT NULL,
   isAdmin BOOLEAN NOT NULL DEFAULT (false))

CREATE TABLE planets (id INTEGER PRIMARY KEY AUTOINCREMENT,
   system INTEGER NOT NULL,
   name CHAR(20) UNIQUE NOT NULL,
   description TEXT,
   image TEXT DEFAULT ('./placeholder.png'),
   planet_type INTEGER NOT NULL ,
   FOREIGN KEY (system) REFERENCES systems(id),
   FOREIGN KEY (planet_type) REFERENCES planet_types(id));
CREATE TABLE planet_types(id INTEGER PRIMARY KEY AUTOINCREMENT,
   name CHAR(20) UNIQUE NOT NULL,
   description TEXT,
   planets INTEGER, FOREIGN KEY (planets) REFERENCES planets(id));
CREATE TABLE systems (id INTEGER PRIMARY KEY AUTOINCREMENT,
   name CHAR(20) UNIQUE NOT NULL,
   description TEXT);
