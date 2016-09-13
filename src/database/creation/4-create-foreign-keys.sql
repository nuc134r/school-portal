alter table subject add foreign key(teacher_id) references _user(id);
alter table subject add foreign key(classroom_id) references classroom(id);

alter table _user add foreign key(image_id) references image(id);

alter table study_group add foreign key(image_id) references image(id);

alter table lesson add foreign key(group_id) references study_group(id);
alter table lesson add foreign key(subject_id) references subject(id);
alter table lesson add foreign key(classroom_id) references classroom(id);

alter table classroom add foreign key(floor_id) references floor(id);