CREATE USER 'oglasimi'@'localhost' IDENTIFIED BY '12345';
go
create database oglasimi_db;
go
GRANT ALL PRIVILEGES ON oglasimi_db.* TO 'oglasimi'@'localhost' WITH GRANT OPTION;