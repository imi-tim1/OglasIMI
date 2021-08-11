
DROP USER IF EXISTS 'oglasimi'@'localhost';
CREATE USER 'oglasimi'@'localhost' IDENTIFIED BY '12345';

DROP DATABASE IF EXISTS oglasimi_db;
CREATE DATABASE oglasimi_db;

GRANT ALL PRIVILEGES ON oglasimi_db.* TO 'oglasimi'@'localhost' WITH GRANT OPTION;




