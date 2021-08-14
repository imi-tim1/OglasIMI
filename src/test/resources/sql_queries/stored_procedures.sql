USE oglasimi_db;

-- #######################################################################
-- Procedure for checking login credentials
DELIMITER // ;
CREATE PROCEDURE check_credentials (
    IN p_email VARCHAR(190),
    IN p_hashed_password VARCHAR(300),
    OUT p_user_id INT,
    OUT p_valid_creds BOOLEAN,
    OUT p_approved BOOLEAN,
    OUT p_role VARCHAR(20)
)
BEGIN
    DECLARE v_retval INT;
    SELECT COUNT(c.user_id)
    INTO v_retval
    FROM credentials c
    WHERE c.email = p_email AND c.hashed_password = p_hashed_password;

    IF v_retval != 0 THEN
        SET p_valid_creds = TRUE;
    ELSE
        SET p_valid_creds = FALSE;
    END IF;

    SELECT u.id, u.approved, r.name
    INTO p_user_id, p_approved, p_role
    FROM credentials c
         JOIN user u ON c.user_id = u.id
         JOIN role r ON u.role_id = r.id
    WHERE c.email = p_email
    LIMIT 1;
END //
DELIMITER ;
-- #######################################################################



-- #######################################################################
-- Procedure for all fields selection

DELIMITER // ;
CREATE PROCEDURE get_all_fields ()
BEGIN
    SELECT * FROM field;
END //
DELIMITER ;
-- #######################################################################



-- #######################################################################
-- Procedure for all cities selection

DELIMITER // ;
CREATE PROCEDURE get_all_cities ()
BEGIN
    SELECT * FROM city;
END //
DELIMITER ;
-- #######################################################################



-- #######################################################################
-- Procedure for tag list

DELIMITER // ;
CREATE PROCEDURE get_tag_list (IN id INT)
BEGIN
    SELECT * FROM tag WHERE field_id = id;
END //
DELIMITER ;
-- #######################################################################



-- #######################################################################
-- Procedure for employer registration
DELIMITER // ;
CREATE PROCEDURE register_employer (
    IN p_email VARCHAR(190),
    IN p_hashed_password VARCHAR(300),
    IN p_picture_base64 TEXT(65000),
    IN p_phone_number VARCHAR(30),
    IN p_name VARCHAR(30),
    IN p_address VARCHAR(50),
    IN p_tin VARCHAR(20),
    OUT p_is_added BOOLEAN
)
leave_label:BEGIN

    DECLARE v_retval INT;
    DECLARE v_employer_role_id INT;
    DECLARE v_employer_id INT;

    DECLARE exit HANDLER FOR sqlexception
        BEGIN
            ROLLBACK;
        END;
    DECLARE exit HANDLER FOR sqlwarning
        BEGIN
            ROLLBACK;
        END;


    SET p_is_added = FALSE;

    -- count number of users which have the same email as user that is attempting to make
    -- an account
    SELECT COUNT(c.user_id)
    INTO v_retval
    FROM credentials c
    WHERE c.email = p_email;

    -- if provided email already exists inside database return false and exit
    IF v_retval != 0 THEN
        LEAVE leave_label;
    END IF;

    -- get id for role employer
    SELECT id
    INTO v_employer_role_id
    FROM role
    WHERE name = 'employer';

    START TRANSACTION;

    -- add employer into table "user"
    INSERT INTO user ( role_id, approved )
        VALUES ( v_employer_role_id, FALSE );

    -- get employer's id
    SELECT LAST_INSERT_ID()
    INTO v_employer_id;

    -- add employer's profile details into table "employer"
    INSERT INTO employer ( user_id, picture_base64, phone_number, name, address, tin )
        VALUES ( v_employer_id, p_picture_base64, p_phone_number, p_name, p_address, p_tin );

    -- add employer's credentials into table "credentials"
    INSERT INTO credentials ( user_id, email, hashed_password  )
    VALUES ( v_employer_id, p_email, p_hashed_password );

    SET p_is_added = TRUE;

    COMMIT;
END //
DELIMITER ;
-- #######################################################################



-- #######################################################################
-- Procedure for getting list of all employers
DELIMITER // ;
CREATE PROCEDURE get_all_employers()
BEGIN
    SELECT e.user_id, e.name, e.tin, e.address, e.picture_base64, e.phone_number, c.email
    FROM employer e
        JOIN credentials c ON e.user_id = c.user_id;
END //
DELIMITER ;
-- #######################################################################



-- #######################################################################
-- Procedure for getting an employer
DELIMITER // ;
CREATE PROCEDURE get_employer(
    IN p_id INT
)
BEGIN
    SELECT e.user_id, e.name, e.tin, e.address, e.picture_base64, e.phone_number, c.email
    FROM employer e
             JOIN credentials c ON e.user_id = c.user_id
    WHERE e.user_id = p_id;
END //
DELIMITER ;
-- #######################################################################



-- #######################################################################
-- Procedure for approving user registration
DELIMITER // ;
CREATE PROCEDURE approve_user(
    IN p_id INT,
    OUT p_approved_successfully BOOLEAN
)
BEGIN
    SET p_approved_successfully = FALSE;

    UPDATE user
    SET approved = TRUE
    WHERE id = p_id AND approved = FALSE;

    IF ROW_COUNT() != 0
    THEN
        SET p_approved_successfully = TRUE;
    END IF;
END //
DELIMITER ;
-- #######################################################################



-- #######################################################################
-- Procedure for deleting user's records from the database
DELIMITER // ;
CREATE PROCEDURE delete_user(
    IN p_id INT,
    OUT p_deleted_successfully BOOLEAN
)
BEGIN
    SET p_deleted_successfully = FALSE;

    DELETE u.*
    FROM user u
    INNER JOIN role r ON u.role_id = r.id
    WHERE u.id = p_id AND r.name <> 'admin';

    IF ROW_COUNT() != 0
    THEN
        SET p_deleted_successfully = TRUE;
    END IF;
END //
DELIMITER ;
-- #######################################################################



-- #######################################################################
-- Procedure for getting employer's job posts (without tags)
DELIMITER // ;
CREATE PROCEDURE employer_get_posts_without_tags(
    IN p_employer_id INT
)
BEGIN
    SELECT j.*, -- j.id, j.title,j.employer_id, j.description, j.city_id, j.field_id, j.post_date, j.salary, j.work_from_home,
           c.name AS 'city_name',
           f.name AS 'field_name',
           e.name AS 'employer_name', e.phone_number, e.picture_base64, e.address, e.tin,
           creds.email
    FROM job j
        JOIN employer e on e.user_id = j.employer_id
        JOIN city c on c.id = j.city_id
        JOIN field f on f.id = j.field_id
        JOIN credentials creds on j.employer_id = creds.user_id
    WHERE p_employer_id = j.employer_id;
END //
DELIMITER ;

-- DROP PROCEDURE employer_get_posts_without_tags
-- #######################################################################



-- #######################################################################
-- Procedure for getting tags for particular job
DELIMITER // ;
CREATE PROCEDURE get_tags_for_a_job(
    IN p_job_id INT
)
BEGIN
    SELECT t.*
    FROM job_tag jt
        JOIN tag t on jt.tag_id = t.id
    WHERE p_job_id = jt.job_id;
END //
DELIMITER ;
-- #######################################################################



-- #######################################################################
-- Main procedure for getting filtered jobs
DELIMITER // ;
CREATE PROCEDURE get_filtered_jobs
(
    IN p_employer_id int,
    IN p_field_id int,
    IN p_city_id int,
    IN p_title varchar(30),
    IN p_work_from_home boolean
)
BEGIN
    SELECT j.*,
           f.id f_id, f.name f_name,
           c.id c_id, c.name c_name,
           e.user_id, e.name e_name, e.tin, e.address, e.picture_base64,e.phone_number
    from job j left join field f on j.field_id = f.id
               left join city c on c.id = j.city_id
               left join employer e on e.user_id = j.employer_id
    WHERE
        (p_field_id = 0 OR p_field_id = field_id)
      AND (p_employer_id = 0 OR p_employer_id = employer_id)
      AND (p_city_id = 0 OR p_city_id = city_id)
      AND (p_title is NULL OR p_title = 'default' OR title RLIKE(CONCAT(p_title,'+')))
      AND (p_work_from_home = false OR p_work_from_home = work_from_home)
    ORDER BY post_date DESC;
END //
DELIMITER ;
-- #######################################################################



-- #######################################################################
-- Procedure job counting
DELIMITER // ;
CREATE PROCEDURE count_jobs()
BEGIN
    SELECT COUNT(*) AS job_num from job;
END //
DELIMITER ;
-- #######################################################################



-- #######################################################################
-- Procedure for job posting
DELIMITER // ;
CREATE PROCEDURE post_job (
    IN p_employer_id int,
    IN p_field_id int,
    IN p_city_id int,
    IN p_post_date DATETIME,
    IN p_title varchar(30),
    IN p_description varchar(510),
    IN p_salary varchar(50),
    IN p_work_from_home boolean,
    OUT p_is_posted boolean
)
BEGIN
    INSERT INTO job (employer_id, field_id, city_id, post_date, title, description, salary, work_from_home)
    VALUES (p_employer_id, p_field_id, p_city_id, p_post_date, p_title, p_description, p_salary, p_work_from_home);

    IF ROW_COUNT() != 0
    THEN
        SET p_is_posted = TRUE;
    END IF;

END //
DELIMITER ;