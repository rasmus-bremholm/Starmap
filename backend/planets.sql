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
