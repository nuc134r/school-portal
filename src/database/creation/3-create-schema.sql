create table _user
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

create table image
(
    id              serial          primary key,
    name            tname           not null,
    data            bytea           not null
);

create table student
(
    id              serial          primary key,
    group_id        integer         not null
);


/*
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