#!/bin/bash


mysql --user=oglasimi --password=12345 --execute="DROP DATABASE IF EXISTS oglasimi_db; CREATE DATABASE oglasimi_db; GRANT ALL PRIVILEGES ON oglasimi_db.* TO 'oglasimi'@'localhost' WITH GRANT OPTION;"

mysql --user=oglasimi --password=12345 < "./sql_queries/table_definitions.sql"
mysql --user=oglasimi --password=12345 < "./sql_queries/table_data.sql"
mysql --user=oglasimi --password=12345 < "./sql_queries/stored_procedures.sql"
