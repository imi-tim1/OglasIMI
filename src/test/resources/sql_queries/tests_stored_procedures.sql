USE oglasimi_db;

-- #######################################################################
-- check_credentials

-- test call for procedure check_credentials #1 valid creds & not approved; role applicant
DELIMITER // ;
call check_credentials( 'mirko@imejl.rs',
                        '99958dbb3802e08c4dbfe26b227e19896b18589fc70cff4c4551a1d4624dfc86b5770d5fe3b120db6a5ea0f035cd0e95954802d683f45b7e62f88b25bc7bae88',
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
                        'a7fce35f48a350ae1125a3ca4e0af6e37316a9ed4555b146b9f663d52c33eda09a49aa813c9d36c1a617c2453156bb273c93eb68ece01ca7c38e5f247794104c',
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
                        '00000000000000000000000000000000000000000000000009f663d52c33eda09a49aa813c9d36c1a617c2453156bb273c93eb68ece01ca7c38e5f247794104c',
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
        'b2e077df1d4a917166b627ec77e35895b3859f09aa68ee8ec4a954c5e025cabf8adcb2997c86f4fc2b3cbc72fd228d4941fa9510360c194d1ceb8b3fe9ee4500',
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
    JOIN user u ON u.id = c.user_id
    JOIN role r ON r.id = u.role_id;
//
DELIMITER ;
--

-- test call for procedure register_employer #2 successfully registration
DELIMITER // ;
CALL register_employer(
        'mirko.mirkovic@mir.ko',
        '99958dbb3802e08c4dbfe26b227e19896b18589fc70cff4c4551a1d4624dfc86b5770d5fe3b120db6a5ea0f035cd0e95954802d683f45b7e62f88b25bc7bae88',
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
         JOIN user u ON u.id = c.user_id
         JOIN role r ON r.id = u.role_id;
//
DELIMITER ;
--

-- test call for procedure register_employer #3 unsuccessfully registration - already exists
DELIMITER // ;
CALL register_employer(
        'mirko.mirkovic@mir.ko',
        '99958dbb3802e08c4dbfe26b227e19896b18589fc70cff4c4551a1d4624dfc86b5770d5fe3b120db6a5ea0f035cd0e95954802d683f45b7e62f88b25bc7bae88',
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
         JOIN user u ON u.id = c.user_id
         JOIN role r ON r.id = u.role_id;
//
DELIMITER ;
-- #######################################################################



-- #######################################################################
-- approve_user

-- test call for procedure approve_user #1 successfully approved
DELIMITER // ;
CALL approve_user(6, @approved_successfully);
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



-- #######################################################################
-- delete_user

-- test call for procedure delete_user #1 non-admin account; successful delete
DELIMITER // ;
CALL delete_user(3, @deleted_successfully);
SELECT @deleted_successfully 'Is successfully deleted?'
//
DELIMITER ;
--


-- test call for procedure delete_user #1 non-admin account; successful delete
DELIMITER // ;
CALL delete_user(1, @deleted_successfully);
SELECT @deleted_successfully 'Is successfully deleted?'
//
DELIMITER ;
--
-- #######################################################################


-- #######################################################################
-- test call for procedure get_job_tag_filter
DELIMITER // ;
CALL get_job_tag_filter(
        0,
        0,
        0,
        NULL,
        FALSE
    );
//
DELIMITER ;
--

-- test call for procedure get_job_tag_filter
DELIMITER // ;
CALL get_job_common_filter(
        0,
        0,
        0,
        NULL,
        FALSE
    );
//
DELIMITER ;
--
-- #######################################################################


-- #######################################################################
-- test call for procedure get_job_tag_filter
DELIMITER // ;
CALL get_tags_for_a_job(
        1
    );
//
DELIMITER ;