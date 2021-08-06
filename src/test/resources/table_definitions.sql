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

