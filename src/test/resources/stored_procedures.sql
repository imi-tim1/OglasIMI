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
--

-- test call for procedure check_credentials #1 valid creds & not approved
DELIMITER // ;
call check_credentials( 'pera@wuiii.com',
                       'd32aea39aa588565353ce46716459c77039c06f032ce027519eccf209617cf6e',
                       @user_id,
                       @are_valid,
                       @is_approved,
                       @role);

select @user_id, @are_valid,  @is_approved, @role;
//
DELIMITER ;


-- test call for procedure check_credentials #2 valid creds & approved
DELIMITER // ;
call check_credentials( 'mika@yahoo.rs',
                       '657c5f62072faf7bc0a6ead16b3338b109bf8b7ecffdfe1b545bc25503f5199e',
                       @user_id,
                       @valid_creds,
                       @is_approved,
                       @role);

select @user_id, @valid_creds,  @is_approved, @role;
//
DELIMITER ;



-- test call for procedure check_credentials #3 invalid creds
DELIMITER // ;
call check_credentials( 'mika@yahoo.rs',
                       '0000000000000000000000016b3338b109bf8b7ecffdfe1b545bc25503f5199e',
                       @user_id,
                       @valid_creds,
                       @is_approved,
                       @role);

select @user_id, @valid_creds,  @is_approved, @role;
//
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