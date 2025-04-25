DROP TABLE IF EXISTS planet_types;
DROP TABLE IF EXISTS planets;
DROP TABLE IF EXISTS systems;


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
