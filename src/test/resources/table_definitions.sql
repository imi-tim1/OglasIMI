create table role
(
    id int auto_increment,
    name varchar(20) not null,
    constraint primary key (id),
    constraint unique key (name)
);

create table user
(
    id int auto_increment,
    email varchar(300) not null ,
    role_id int not null ,
    approved bool not null ,
    constraint primary key (id),
    constraint unique key (email),
    constraint foreign key (role_id) references role (id)
);

create table credentials
(
    user_id int not null,
    user_email varchar(300) not null,
    password varchar(50) not null,
    constraint primary key (user_id),
    constraint foreign key (user_id) references user (id),
    constraint unique key (user_email),
    constraint foreign key (user_email) references user (email)
);

create table field
(
    id int auto_increment,
    name varchar(30) not null,
    constraint primary key (id)
);

create table tag
(
    id int auto_increment,
    field_id int not null,
    name varchar(30) not null,
    constraint primary key (id),
    constraint foreign key (field_id) references field (id)
);

create table applicant
(
    user_id int not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    picture varchar(65000) not null,
    phone varchar(30) not null,
    constraint primary key (user_id),
    constraint foreign key (user_id) references user (id)
);

create table admin
(
    user_id int,
    name varchar(30) not null,
    constraint primary key (user_id),
    constraint foreign key (user_id) references user (id)
);

create table employer
(
    user_id int,
    name varchar(30) not null,
    pib varchar(20) not null,
    address varchar(50) not null,
    picture varchar(65000) not null,
    phone varchar(30) not null,
    constraint primary key (user_id),
    constraint foreign key (user_id) references user (id)
);

create table job
(
    id int primary key auto_increment,
    employer_id int not null,
    field_id int not null,
    post_date DATETIME not null,
    title varchar(50) not null,
    description varchar(510) not null,
    city varchar(50),
    salary varchar(50),
    work_from_home boolean,
    constraint foreign key (employer_id) references employer (user_id),
    constraint foreign key (field_id) references field (id)
);

create table job_application
(
    job_id int not null,
    applicant_id int not null,
    date DATETIME not null,
    constraint foreign key (job_id) references job (id),
    constraint foreign key (applicant_id) references applicant (user_id)
);

create table job_tag
(
    job_id int not null,
    tag_id int not null ,
    constraint foreign key (job_id) references job (id),
    constraint foreign key (tag_id) references tag (id)
);