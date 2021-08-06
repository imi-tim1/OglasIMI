CREATE USER 'oglasimi'@'localhost' IDENTIFIED BY '12345';
create database oglasimi_db;
GRANT ALL PRIVILEGES ON oglasimi_db.* TO 'oglasimi'@'localhost' WITH GRANT OPTION;






drop database oglasimi_db;
create database oglasimi_db;
GRANT ALL PRIVILEGES ON oglasimi_db.* TO 'oglasimi'@'localhost' WITH GRANT OPTION;