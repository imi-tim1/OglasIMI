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