use oglasimi_db;

-- #######################################################################
-- Procedure for checking login credentials
DELIMITER // ;
CREATE PROCEDURE checkCredentials (
    IN email VARCHAR(190),
    IN hashed_password VARCHAR(300),
    OUT user_id INT,
    OUT valid_creds BOOLEAN,
    OUT approved BOOLEAN,
    OUT role VARCHAR(20)
)
BEGIN
    DECLARE retval INT;
SELECT COUNT(c.user_id) INTO retval FROM credentials c WHERE c.email = email and c.hashed_password = hashed_password;
IF retval != 0 THEN
        SET valid_creds = TRUE;
ELSE
        SET valid_creds = FALSE;
END IF;

SELECT u.id, u.approved, r.name
INTO user_id, approved, role
FROM credentials c
         JOIN user u on c.user_id = u.id
         JOIN role r on u.role_id = r.id
WHERE c.email = email
    LIMIT 1;
END //
DELIMITER ;
--

-- test call for procedure checkCredentials #1 valid creds & not approved
DELIMITER // ;
call checkCredentials( 'pera@wuiii.com',
                       'd32aea39aa588565353ce46716459c77039c06f032ce027519eccf209617cf6e',
                       @user_id,
                       @are_valid,
                       @is_approved,
                       @role);

select @user_id, @are_valid,  @is_approved, @role;
//
DELIMITER ;


-- test call for procedure checkCredentials #2 valid creds & approved
DELIMITER // ;
call checkCredentials( 'mika@yahoo.rs',
                       '657c5f62072faf7bc0a6ead16b3338b109bf8b7ecffdfe1b545bc25503f5199e',
                       @user_id,
                       @valid_creds,
                       @is_approved,
                       @role);

select @user_id, @valid_creds,  @is_approved, @role;
//
DELIMITER ;



-- test call for procedure checkCredentials #3 invalid creds
DELIMITER // ;
call checkCredentials( 'mika@yahoo.rs',
                       '0000000000000000000000016b3338b109bf8b7ecffdfe1b545bc25503f5199e',
                       @user_id,
                       @valid_creds,
                       @is_approved,
                       @role);

select @user_id, @valid_creds,  @is_approved, @role;
//
DELIMITER ;


-- #######################################################################
-- Procedure for all fields selection

DELIMITER // ;
CREATE PROCEDURE getAllFields ()
BEGIN
    SELECT * from field;
END //
DELIMITER ;
-- #######################################################################
-- Procedure for all cities selection

DELIMITER // ;
CREATE PROCEDURE getAllCities ()
BEGIN
    SELECT * from city;
END //
DELIMITER ;
-- #######################################################################
-- Procedure for tag list

DELIMITER // ;
CREATE PROCEDURE getTagList (IN id int)
BEGIN
    SELECT * FROM tag WHERE field_id = id;
END //
DELIMITER ;