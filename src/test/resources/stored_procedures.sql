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

    -- if provieded email already exists inside database return false and exit
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
--

-- test call for procedure register_employer #1 successfully registration
DELIMITER // ;
call register_employer(
        'petar.petrovic@imail.ev',
        'f2ca1bb6c7e907d06dafe4687e579fce76b37e4e93b7605022da52e6ccc26fd2',
        'slika',
        '026/321-567',
        'Picosoft',
        'Radoja Domanovica 12',
        '123-456-789',
        @p_is_added
    );

select @p_is_added as 'Is employer successfully registered?';
-- select * from user;
-- select * from credentials;
-- select * from employer;
//
DELIMITER ;
--

-- test call for procedure register_employer #2 successfully registration
DELIMITER // ;
call register_employer(
        'mirko.mirkovic@mir.ko',
        'fe3ff87be21485302c816942c3d4e81702c472d7c3c0028cefd3c10fa5e17a11',
        'slika_mirka',
        '026/555-333',
        'Mir Company',
        'Radoja 15',
        '222-456-000',
        @p_is_added
    );

select @p_is_added as 'Is employer successfully registered?';
-- select * from user;
-- select * from credentials;
-- select * from employer;
//
DELIMITER ;
--

-- test call for procedure register_employer #3 unsuccessfully registration - already exists
DELIMITER // ;
call register_employer(
        'mirko.mirkovic@mir.ko',
        'b507c317aa5df1730affdeeb4ee2cda40c2da5e3295479223cef4a0277503562',
        'slika_darka',
        '063/333-000',
        'Dar Company',
        'Doman III 3',
        '451-154-444',
        @p_is_added
    );

select @p_is_added as 'Is employer successfully registered?';
-- select * from user;
-- select * from credentials;
-- select * from employer;
//
DELIMITER ;
-- #######################################################################