/*create table user_
(
    id              serial          primary key,
    
    login           varchar(32)     not null,
    password        varchar(32)     not null,

    firstname       tname           not null,
    middlename      tname           not null,
    lastname        tname           not null,
    image_id        integer,
    
    type            varchar(1)      not null,

    teacher_id      integer         null,
    student_id      integer         null,

    check (
        (type = 's' and student_id is not null)
        or 
        (type = 't' and teacher_id is not null)
        or
        (type = 'a')
    )
);

insert into user_(login, password, firstname, middlename, lastname, type) values ('admin', '${defaultpassword}', 'admin', 'admin', 'admin', 'a');

create table student_
(
    id              serial          primary key,
    group_id        integer         null -- TODO NOT NULL
);

create table teacher_
(
    id              serial          primary key,
    discipline_id   integer         null -- TODO NOT NULL
);

create table image_
(
    id              serial          primary key,
    name            tname           not null,
    data            bytea           not null
);

create table session_
(
    token           varchar(32)     primary key,
    user_id         integer         not null,
    started         timestamp       DEFAULT CURRENT_TIMESTAMP
);

create table subject
(
    id              serial          primary key,
    name            tname           not null,
    teacher_id      integer,
    descripton      tdescription,
	classroom_id    integer
);

create table study_group
(
    id              serial          primary key,
    name            tname           not null,
    image_id        integer
);

create table lesson
(
    id              serial          primary key,
    group_id        integer         not null,
    subject_id      integer         not null,
    classroom_id    integer,
	timing_id		integer			not null
);

create table timing
(
    id              serial          primary key,
	start			integer			not null,
	end_			integer			not null
);

create table classroom
(
    id              serial          primary key,
    name            tname           not null,
    floor_id        integer         not null
);

create table floor
(
    id              serial          primary key,
    name            tname           not null
);*/