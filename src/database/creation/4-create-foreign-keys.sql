alter table subject add foreign key(teacher_id) references teacher(id);

alter table teacher add foreign key(image_id) references image(id);

alter table student add foreign key(image_id) references image(id);

alter table student_group add foreign key(image_id) references image(id);

alter table lesson add foreign key(group_id) references student_group(id);
alter table lesson add foreign key(subject_id) references subject(id);
alter table lesson add foreign key(teacher_id) references teacher(id);

alter table classroom add foreign key(floor_id) references floor(id);