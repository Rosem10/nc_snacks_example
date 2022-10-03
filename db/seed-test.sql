DROP DATABASE IF EXISTS nc_snacks_test;
CREATE DATABASE nc_snacks_test;

\c nc_snacks_test;

CREATE TABLE snacks (
  snack_id SERIAL PRIMARY KEY,
  snack_name TEXT,
  snack_description TEXT
);

CREATE TABLE drinks(
  drink_id SERIAL PRIMARY KEY,
  drink_name TEXT,
  drink_description TEXT
);

CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY,
  category_name TEXT
);

INSERT INTO snacks
(snack_name, snack_description)
VALUES
('Kit Kat', 'time for a break'),
('Hobnob', 'a modern classic'),
('Banana', 'monkeys open them upside down'),
('Chocolate covered raisins', 'you can never stop at one'),
('Butter Croissant', 'always appreciated'),
('Crisps', 'actually belong to Sam and he doesn''t know i''m stealing them, shhhhhh'); -- '' escapes the '

INSERT INTO drinks
(drink_name, drink_description)
VALUES
('Vimto', 'Manchester''s finest'),
('Bovril', 'a meal that you don''t have to chew'),
('Banana Milk', 'monkeys drink it upside down'),
('Coffee', 'devs love Java'),
('7up', 'if you want 6 cans of Sprite, make sure you don''t pick 7up'),
('Tea', 'devs love PG tips');

INSERT INTO categories
(category_name)
VALUES
('Biscuit'),
('Fruit'),
('Chocolate'),
('Pastry'),
('Crisps'),
('Drink');

