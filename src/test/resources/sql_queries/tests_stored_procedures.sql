USE oglasimi_db;

-- #######################################################################
-- check_credentials

-- test call for procedure check_credentials #1 valid creds & not approved; role applicant
DELIMITER // ;
call check_credentials( 'pera@wuiii.com',
                        'd32aea39aa588565353ce46716459c77039c06f032ce027519eccf209617cf6e',
                        @user_id,
                        @are_valid,
                        @is_approved,
                        @role);

SELECT @user_id, @are_valid,  @is_approved, @role;
//
DELIMITER ;
--


-- test call for procedure check_credentials #2 valid creds & approved; role employer
DELIMITER // ;
CALL check_credentials( 'mika@yahoo.rs',
                        '657c5f62072faf7bc0a6ead16b3338b109bf8b7ecffdfe1b545bc25503f5199e',
                        @user_id,
                        @valid_creds,
                        @is_approved,
                        @role);

SELECT @user_id, @valid_creds,  @is_approved, @role;
//
DELIMITER ;
--


-- test call for procedure check_credentials #3 invalid creds
DELIMITER // ;
CALL check_credentials( 'mika@yahoo.rs',
                        '0000000000000000000000016b3338b109bf8b7ecffdfe1b545bc25503f5199e',
                        @user_id,
                        @valid_creds,
                        @is_approved,
                        @role);

SELECT @user_id, @valid_creds,  @is_approved, @role;
//
DELIMITER ;
-- #######################################################################



-- #######################################################################
-- register_employer

-- test call for procedure register_employer #1 successfully registration
DELIMITER // ;
CALL register_employer(
        'petar.petrovic@imail.ev',
        'f2ca1bb6c7e907d06dafe4687e579fce76b37e4e93b7605022da52e6ccc26fd2',
        'slika',
        '026/321-567',
        'Picosoft',
        'Radoja Domanovica 12',
        '123-456-789',
        @p_is_added
);

SELECT @p_is_added AS 'Is employer successfully registered?';
SELECT user_id, email, approved, name, hashed_password
FROM credentials c
    JOIN user u on u.id = c.user_id
    JOIN role r on r.id = u.role_id;
//
DELIMITER ;
--

-- test call for procedure register_employer #2 successfully registration
DELIMITER // ;
CALL register_employer(
        'mirko.mirkovic@mir.ko',
        'fe3ff87be21485302c816942c3d4e81702c472d7c3c0028cefd3c10fa5e17a11',
        'slika_mirka',
        '026/555-333',
        'Mir Company',
        'Radoja 15',
        '222-456-000',
        @p_is_added
);

SELECT @p_is_added AS 'Is employer successfully registered?';
SELECT user_id, email, approved, name, hashed_password
FROM credentials c
         JOIN user u on u.id = c.user_id
         JOIN role r on r.id = u.role_id;
//
DELIMITER ;
--

-- test call for procedure register_employer #3 unsuccessfully registration - already exists
DELIMITER // ;
CALL register_employer(
        'mirko.mirkovic@mir.ko',
        'b507c317aa5df1730affdeeb4ee2cda40c2da5e3295479223cef4a0277503562',
        'slika_darka',
        '063/333-000',
        'Dar Company',
        'Doman III 3',
        '451-154-444',
        @p_is_added
);

SELECT @p_is_added AS 'Is employer successfully registered?';
SELECT user_id, email, approved, name, hashed_password
FROM credentials c
         JOIN user u on u.id = c.user_id
         JOIN role r on r.id = u.role_id;
//
DELIMITER ;
-- #######################################################################



-- #######################################################################
-- approve_user

-- test call for procedure approve_user #1 successfully approved
DELIMITER // ;
CALL approve_user(3, @approved_successfully);
SELECT @approved_successfully 'Is successfully approved?'
//
DELIMITER ;
--


-- test call for procedure approve_user #2 unsuccessfully approved; user is already approved
DELIMITER // ;
CALL approve_user(1, @approved_successfully);
SELECT @approved_successfully 'Is successfully approved?'
//
DELIMITER ;
-- #######################################################################