use oglasimi_db;

insert into job (employer_id, field_id, post_date, title, description, city, salary, work_from_home)
values ('1', '2', '2021-05-03 02:36:54.480', 'C Senior Dev', 'Opis1', 'Kragujevac', '1500 - 2000 € (Mesecno)' , false),
       ('1', '2', '2021-03-05 05:38:20.420', 'Remote Contract C++ Game Engineer', 'Opis2', 'Beograd', '3000 € (Mesecno)', true),
       ('2', '1', '2021-06-08 01:15:8.360', 'Bastovan', 'Opis3', 'Nis', '600,000 RSD (Godisnje)', false);

insert into job_tag
values (1, 1),
       (2, 2),
       (3, 1),
       (3,4),
       (2,1);

insert into job_application
values (1, 1, '2021-05-08 00:26:13.500'),
       (2, 3, '2021-08-02 09:12:15.220'),
       (3, 2, '2021-11-05 11:25:8.260'),
       (1,4, '2021-06-05 10:15:54.280'),
       (3,5, '2021-07-08 07:36:2.420');

use oglasimi_db;

insert into role (name)
values ('admin'),
       ('applicant'),
       ('employer');

insert into user (role_id, approved)
values (1, true),
       (2, true),
       (2, true),
       (3, true),
       (3, true);

insert into credentials (user_id, email, password)
values (1, 'misas@ad.min', 'aeab55bba4162e7a7cde64142532e26955b1d5c8fb251d83ba95a7ba1ffdd238'),
       (2, 'zika@bacv.anin', '92ded8e40979699983b844c5c10bbefaa0fbcadd12795ee75a535e833bc1e9ca'),
       (3, 'pera@wuiii.com', 'd32aea39aa588565353ce46716459c77039c06f032ce027519eccf209617cf6e'),
       (4, 'laza@vass.org', 'be2ac81588a6ef186d73f4738e95a3926c5c88a9d03a7970f1ddd182d9f236cd'),
       (5, 'mika@yahoo.rs', '657c5f62072faf7bc0a6ead16b3338b109bf8b7ecffdfe1b545bc25503f5199e');

insert into employer (user_id, name, pib, address, picture_base64, phone)
values (4, 'Lažarus d.o.o', '123456789', 'Keba Kraba, 3', null, '063123456'),
       (4, 'Perperix', '987654321', 'Lignjoslav, 8/B', null, '065987654');