use oglasimi_db;

insert into role (name)
values ('admin'),
       ('applicant'),
       ('employer');

insert into user (role_id, approved)
values (1, true),
       (2, true),
       (2, false),
       (3, true),
       (3, true);

insert into credentials (user_id, email, hashed_password)
values (1, 'misas@ad.min', 'aeab55bba4162e7a7cde64142532e26955b1d5c8fb251d83ba95a7ba1ffdd238'),
       (2, 'zika@bacv.anin', '92ded8e40979699983b844c5c10bbefaa0fbcadd12795ee75a535e833bc1e9ca'),
       (3, 'pera@wuiii.com', 'd32aea39aa588565353ce46716459c77039c06f032ce027519eccf209617cf6e'),
       (4, 'laza@vass.org', 'be2ac81588a6ef186d73f4738e95a3926c5c88a9d03a7970f1ddd182d9f236cd'),
       (5, 'mika@yahoo.rs', '657c5f62072faf7bc0a6ead16b3338b109bf8b7ecffdfe1b545bc25503f5199e');

insert into employer (user_id, name, tin, address, picture_base64, phone_number)
values (4, 'Lažarus d.o.o', '123456789', 'Keba Kraba, 3', null, '063123456'),
       (5, 'Perperix', '987654321', 'Lignjoslav, 8/B', null, '065987654');

insert into applicant (user_id, first_name, last_name, picture_base64, phone_number)
values (2, 'Pera', 'Peric', null, '060111222'),
       (3, 'Zika', 'Zikic', null, '062454687');

insert into admin (user_id, name)
values (1, 'MisaS.');

insert into field (name)
values ('IT'),
       ('Cvecarstvo');

insert into tag (field_id, name)
values (1, 'java'),
       (1, 'python'),
       (1, 'javascript'),
       (1, 'html'),
       (1, 'css'),
       (2, 'prodavac'),
       (2, 'vrtlarstvo'),
       (2, 'cvetni aranzmani'),
       (2, 'dekoracija');

insert into city (name)
values ('Kragujevac'),
       ('Beograd'),
       ('Nis'),
       ('Novi Sad'),
       ('Vranje'),
       ('Leskovac');

insert into job (employer_id, field_id, post_date, title, description, city_id, salary, work_from_home)
values (4, 2, '2021-05-03 02:36:54.480', 'C Senior Dev', 'Opis1', 1, '1500 - 2000 € (Mesecno)' , false),
       (4, 2, '2021-03-05 05:38:20.420', 'Remote Contract C++ Game Engineer', 'Opis2', 2, '3000 € (Mesecno)', true),
       (5, 1, '2021-06-08 01:15:8.360', 'Bastovan', 'Opis3', 1, '300,000 RSD (Godisnje)', false);

insert into job_tag (job_id, tag_id)
values (1, 1),
       (2, 4),
       (3, 6),
       (3, 7),
       (2, 2);

insert into job_application (job_id, applicant_id, date)
values (1, 3, '2021-05-08 00:26:13.500'),
       (2, 3, '2021-08-02 09:12:15.220'),
       (3, 2, '2021-11-05 11:25:8.260'),
       (3, 3, '2021-07-08 07:36:2.420');







