-- RESET DATABASE

-- Réinitialisation des DB
DROP DATABASE IF EXISTS database_development_pictionary;
DROP DATABASE IF EXISTS database_test_pictionary;
DROP DATABASE IF EXISTS database_production_pictionary;

CREATE DATABASE database_development_pictionary;
CREATE DATABASE database_test_pictionary;
CREATE DATABASE database_production_pictionary;

-- Gestion de droit
CREATE USER IF NOT EXISTS 'pictionary_user'@'localhost' IDENTIFIED BY 'kHnDD6XgSpx7pyqMJnSAjTxI5nOwFcp2';
GRANT ALL PRIVILEGES ON database_test_pictionary.* TO 'pictionary_user'@'localhost';
GRANT ALL PRIVILEGES ON database_development_pictionary.* TO 'pictionary_user'@'localhost';
GRANT ALL PRIVILEGES ON database_production_pictionary.* TO 'pictionary_user'@'localhost';

-- Puis effectuer les migrations de SEQUELIZE et implanter les SEEDS
