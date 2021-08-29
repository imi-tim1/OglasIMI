USE oglasimi_db;

INSERT INTO role (name)
VALUES ('admin'),
       ('applicant'),
       ('employer');

INSERT INTO user (role_id, approved)
VALUES (1, TRUE),
       (2, TRUE),
       (2, TRUE),
       (3, TRUE),
       (3, TRUE),
       (2, FALSE),
       (3, TRUE),
       (3, TRUE),
       (3, TRUE);

INSERT INTO credentials (user_id, email, hashed_password)
VALUES (1, 'misas@ad.min', '283d0cb1289e2dccb8c1ee70c5c3382d2ec25e160742ca2bcb67971dcba3d28ffa920e6bf7b37fe939e29100d96849c61f61338c5dab27943beda77137b85151'),
       (2, 'zika@bacv.anin', '5739d5d6e80ef1fbdf3b6ce697ba827108c3d1bd0f9da652803044e4861138330f315039f44d173e6f5d5cd3a8d0869c224c72c30814088b942df2eb8804a42c'),
       (3, 'pera@wuiii.com', '3a772c82dc28af481ff4099526353598f8ada4d243ddd0ae182a3ac631b7a6432afe0d215108e28a4fcd2ad61a70c8d45e97d87ba36665f8c55c18dc524105ea'),
       (4, 'laza@vass.org', 'f3c2eedfc3c558e50972dcb4d909ca391a79dd2acca9d3fc750fffe6db03a3a1431713da854fbb8bc48a2c6ffdb6f699c5cf6f6885652c6cd730ed5f9005523f'),
       (5, 'mika@yahoo.rs', 'a7fce35f48a350ae1125a3ca4e0af6e37316a9ed4555b146b9f663d52c33eda09a49aa813c9d36c1a617c2453156bb273c93eb68ece01ca7c38e5f247794104c'),
       (6, 'mirko@imejl.rs', '99958dbb3802e08c4dbfe26b227e19896b18589fc70cff4c4551a1d4624dfc86b5770d5fe3b120db6a5ea0f035cd0e95954802d683f45b7e62f88b25bc7bae88'),
       (7, 'slavko@imejl.rs', '99958dbb3802e08c4dbfe26b227e19896b18589fc70cff4c4551a1d4624dfc86b5770d5fe3b120db6a5ea0f035cd0e95954802d683f45b7e62f88b25bc7bae88'),
       (8, 'marko@imejl.rs', '99958dbb3802e08c4dbfe26b227e19896b18589fc70cff4c4551a1d4624dfc86b5770d5fe3b120db6a5ea0f035cd0e95954802d683f45b7e62f88b25bc7bae88'),
       (9, 'zarko@imejl.rs', '99958dbb3802e08c4dbfe26b227e19896b18589fc70cff4c4551a1d4624dfc86b5770d5fe3b120db6a5ea0f035cd0e95954802d683f45b7e62f88b25bc7bae88');

INSERT INTO employer (user_id, name, tin, address, picture_base64, phone_number)
VALUES (4, 'Lažarus d.o.o', '123456789', 'Keba Kraba, 3', NULL, '063123456'),
       (5, 'Perperix', '987654321', 'Lignjoslav, 8/B', NULL, '065987654'),
       (7, 'Slavko d.o.o', '123456789', 'Keba Kraba, 3', NULL, '063123456'),
       (8, 'Marko d.o.o', '123456789', 'Keba Kraba, 3', NULL, '063123456'),
       (9, 'Žarko d.o.o', '123456789', 'Keba Kraba, 3', NULL, '063123456');

INSERT INTO applicant (user_id, first_name, last_name, picture_base64, phone_number)
VALUES (3, 'Pera', 'Peric', NULL, '060111222'),
       (2, 'Zika', 'Zikic', NULL, '062454687'),
       (6, 'Mirko', 'Mirkovic', NULL, '062555333');

INSERT INTO admin (user_id, name)
VALUES (1, 'MisaS.');

INSERT INTO field (name)
VALUES ('IT'),
       ('Cvecarstvo');

INSERT INTO tag (field_id, name)
VALUES (1, 'java'),
       (1, 'python'),
       (1, 'javascript'),
       (1, 'html'),
       (1, 'css'),
       (2, 'prodavac'),
       (2, 'vrtlarstvo'),
       (2, 'cvetni aranzmani'),
       (2, 'dekoracija');

INSERT INTO city (name)
VALUES ('Kragujevac'),
       ('Beograd'),
       ('Nis'),
       ('Novi Sad'),
       ('Vranje'),
       ('Leskovac');

INSERT INTO job (employer_id, field_id, city_id, post_date, title, description, salary, work_from_home)
VALUES (4, 1, 1, '2021-05-03 02:36:54.480', 'C Senior Dev', 'Opis1', '1500 - 2000 € (Mesecno)' , FALSE),
       (4, 1, NULL, '2021-03-05 05:38:20.420', 'Remote Contract C++ Game Engineer', 'Opis2', '3000 € (Mesecno)', TRUE),
       (5, 2, 1, '2021-06-08 01:15:8.360', 'Bastovan', 'Opis3', '300,000 RSD (Godisnje)', FALSE),
       (5, 2, 3, '2021-02-01 03:20:8.360', 'Prodavac buketa', 'Opis4', '500,000 RSD (Godisnje)', FALSE),
       (4, 1, NULL, '2021-02-11 08:38:20.420', 'JS Dev', 'Opis5', '800 € (Mesecno)', TRUE),
       (4, 1, 2, '2021-03-05 12:23:18.520', 'Python Dev', 'Opis6', '1800 - 2000 € (Mesecno)', FALSE),
       (5, 2, 4, '2021-03-05 12:23:18.520', 'Potreban bastovan', 'Opis7', '180 - 200 € (Mesecno)', FALSE);

INSERT INTO job_tag (job_id, tag_id)
VALUES (1, 1),
       (1, 2),
       (2, 4),
       (3, 6),
       (3, 7),
       (2, 2),
       (5, 8),
       (5, 9);

INSERT INTO job_application (job_id, applicant_id, date)
VALUES (1, 3, '2021-05-08 00:26:13.500'),
       (2, 3, '2021-08-02 09:12:15.220'),
       (3, 2, '2021-11-05 11:25:8.260'),
       (3, 3, '2021-07-08 07:36:2.420');

INSERT INTO rating (applicant_id, employer_id, feedback_value)
VALUES (3,4,4),
       (2,5,3),
       (3,5,4);

INSERT INTO comment (author_id, job_id, parent_id, text, post_date)
VALUES (3,4,null,'Komentar1','2021-05-08 07:36:2.420'),
       (2,4,null,'Kako ide poso?','2021-07-08 07:36:2.420'),
       (5,4,2,'Borba','2021-07-08 08:36:2.420'),
       (3,1,null,'Komentar2','2021-09-08 08:36:2.420');

INSERT INTO t_like (applicant_id, job_id)
VALUES (2,1),
       (3,1),
       (2,4)