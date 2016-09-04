create table subject
(
    id              serial          primary key,
    name            tname           not null,
    teacher_id      integer,
    descripton      tdescription
);

create table teacher
(
    id              serial          primary key,
    name            tname           not null,
    lastname        tname           not null,
    middlename      tname           not null,
    image_id        integer,
    descripton      tdescription
);

create table student
(
    id              serial          primary key,
    name            tname           not null,
    lastname        tname           not null,
    middlename      tname           not null,
    image_id        integer,
    group_id        integer         not null
);

create table image
(
    id              serial          primary key,
    name            tname           not null,
    data            bytea           not null
);

create table student_group
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
    teacher_id      integer         not null
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
);