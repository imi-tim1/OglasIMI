USE oglasimi_db;

CREATE TABLE role
(
    id INT AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    CONSTRAINT PRIMARY KEY (id),
    CONSTRAINT UNIQUE KEY (name)
);

CREATE TABLE user
(
    id INT AUTO_INCREMENT,
    role_id INT NOT NULL,
    approved BOOLEAN NOT NULL,
    CONSTRAINT PRIMARY KEY (id),
    CONSTRAINT FOREIGN KEY (role_id) REFERENCES role (id)
        ON UPDATE CASCADE
);

CREATE TABLE credentials
(
    user_id INT NOT NULL,
    email VARCHAR(190) NOT NULL,
    hashed_password VARCHAR(300) NOT NULL,
    CONSTRAINT PRIMARY KEY (user_id),
    CONSTRAINT FOREIGN KEY (user_id) REFERENCES user (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT UNIQUE KEY (email)
);

CREATE TABLE field
(
    id INT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    CONSTRAINT PRIMARY KEY (id)
);

CREATE TABLE city
(
  id INT AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  CONSTRAINT PRIMARY KEY (id)
);

CREATE TABLE tag
(
    id INT AUTO_INCREMENT,
    field_id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    CONSTRAINT PRIMARY KEY (id),
    CONSTRAINT FOREIGN KEY (field_id) REFERENCES field (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE applicant
(
    user_id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    picture_base64 TEXT(65000),
    phone_number VARCHAR(30) NOT NULL,
    CONSTRAINT PRIMARY KEY (user_id),
    CONSTRAINT FOREIGN KEY (user_id) REFERENCES user (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE admin
(
    user_id INT,
    name VARCHAR(30) NOT NULL,
    CONSTRAINT PRIMARY KEY (user_id),
    CONSTRAINT FOREIGN KEY (user_id) REFERENCES user (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE employer
(
    user_id INT,
    name VARCHAR(30) NOT NULL,
    tin VARCHAR(13) NOT NULL,
    address VARCHAR(50) NOT NULL,
    picture_base64 TEXT(65000),
    phone_number VARCHAR(30) NOT NULL,
    CONSTRAINT PRIMARY KEY (user_id),
    CONSTRAINT FOREIGN KEY (user_id) REFERENCES user (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE job
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    employer_id INT NOT NULL,
    field_id INT NOT NULL,
    city_id INT,
    post_date DATETIME NOT NULL,
    title VARCHAR(50) NOT NULL,
    description TEXT(10000) NOT NULL,
    salary VARCHAR(50),
    work_from_home BOOLEAN,
    CONSTRAINT FOREIGN KEY (employer_id) REFERENCES employer (user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (field_id) REFERENCES field (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (city_id) REFERENCES city (id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE job_application
(
    job_id INT NOT NULL,
    applicant_id INT NOT NULL,
    date DATETIME NOT NULL,
    CONSTRAINT PRIMARY KEY (job_id, applicant_id),
    CONSTRAINT FOREIGN KEY (job_id) REFERENCES job (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (applicant_id) REFERENCES applicant (user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE job_tag
(
    job_id INT NOT NULL,
    tag_id INT NOT NULL,
    CONSTRAINT PRIMARY KEY (job_id, tag_id),
    CONSTRAINT FOREIGN KEY (job_id) REFERENCES job (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (tag_id) REFERENCES tag (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE rating
(
    applicant_id INT NOT NULL,
    employer_id INT NOT NULL,
    feedback_value LONG NOT NULL,
    CONSTRAINT PRIMARY KEY (applicant_id, employer_id),
    CONSTRAINT FOREIGN KEY (applicant_id) REFERENCES applicant (user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (employer_id) REFERENCES employer (user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE t_like
(
    applicant_id INT NOT NULL,
    job_id INT NOT NULL,
    CONSTRAINT PRIMARY KEY (applicant_id, job_id),
    CONSTRAINT FOREIGN KEY (applicant_id) REFERENCES applicant (user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (job_id) REFERENCES job (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE comment
(
    id INT NOT NULL,
    author_id INT NOT NULL,
    job_id INT NOT NULL,
    parent_id INT,
    text varchar(200),
    post_date DATETIME,
    CONSTRAINT PRIMARY KEY (id),
    CONSTRAINT FOREIGN KEY (author_id) REFERENCES user (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (job_id) REFERENCES job (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);