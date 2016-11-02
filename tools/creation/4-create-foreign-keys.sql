alter table user_    add foreign key(image_id)    references image_(id);
alter table session_ add foreign key(user_id)     references user_(id);


alter table user_ add foreign key(student_id) references student_(id);
alter table user_ add foreign key(teacher_id) references teacher_(id);

/*
alter table subject add foreign key(teacher_id) references user_(id);
alter table subject add foreign key(classroom_id) references classroom(id);


alter table study_group add foreign key(image_id) references image(id);

alter table lesson add foreign key(group_id) references study_group(id);
alter table lesson add foreign key(subject_id) references subject(id);
alter table lesson add foreign key(classroom_id) references classroom(id);
alter table lesson add foreign key(timing_id) references timing(id);

alter table classroom add foreign key(floor_id) references floor(id);*/