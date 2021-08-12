use oglasimi_db;

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
    WHERE c.email = p_email and c.hashed_password = p_hashed_password;

    IF v_retval != 0 THEN
        SET p_valid_creds = TRUE;
    ELSE
        SET p_valid_creds = FALSE;
    END IF;

    SELECT u.id, u.approved, r.name
    INTO p_user_id, p_approved, p_role
    FROM credentials c
         JOIN user u on c.user_id = u.id
         JOIN role r on u.role_id = r.id
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
    SELECT * from field;
END //
DELIMITER ;
-- #######################################################################



-- #######################################################################
-- Procedure for all cities selection

DELIMITER // ;
CREATE PROCEDURE get_all_cities ()
BEGIN
    SELECT * from city;
END //
DELIMITER ;
-- #######################################################################



-- #######################################################################
-- Procedure for tag list

DELIMITER // ;
CREATE PROCEDURE get_tag_list (IN id int)
BEGIN
    SELECT * FROM tag WHERE field_id = id;
END //
DELIMITER ;
-- #######################################################################



-- #######################################################################
-- Procedure for employer registration
drop procedure if exists register_employer ;
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
        VALUES ( v_employer_role_id, false );

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
        JOIN credentials c on e.user_id = c.user_id;
END //
DELIMITER ;
-- #######################################################################