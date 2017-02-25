'use strict';

console.time('deploying time');

const copydir = require('copy-dir');
const path = require('path');

const Sequelize = require('sequelize');

const database = require('../src/database/database');
const connection = database.getConnection();

let konnova, skachkova, yablonskaya, glusker;
let programming_subjects = [];
let yablonskaya_subjects = [];
let P_403;

database.Init().then(() => {
    const UsersRepository = require('../src/repository/users');
    const SpecialtiesRepository = require('../src/repository/specialties');
    const GroupsRepository = require('../src/repository/groups');
    const SubjectsRepository = require('../src/repository/subjects');
    const AuditoriesRepository = require('../src/repository/auditories');
    const TimingsRepository = require('../src/repository/timings');
    const LessonsRepository = require('../src/repository/lessons');
    const NewsRepository = require('../src/repository/news');

    Promise.resolve()
        .then(() => {
            return Promise.resolve()
                .then(() => TimingsRepository.create({ beginHour: 8, beginMinute: 30, endHour: 10, endMinute: 0 }))
                .then(() => TimingsRepository.create({ beginHour: 10, beginMinute: 10, endHour: 11, endMinute: 40 }))
                .then(() => TimingsRepository.create({ beginHour: 11, beginMinute: 50, endHour: 13, endMinute: 40 }))
                .then(() => TimingsRepository.create({ beginHour: 13, beginMinute: 50, endHour: 15, endMinute: 20 }))
                .then(() => TimingsRepository.create({ beginHour: 15, beginMinute: 30, endHour: 17, endMinute: 0 }))
                .then(() => TimingsRepository.create({ beginHour: 17, beginMinute: 10, endHour: 18, endMinute: 40 }))
                .then(() => TimingsRepository.create({ beginHour: 18, beginMinute: 50, endHour: 20, endMinute: 20 }))
        })
        .then(() => {
            return Promise.resolve()
                .then(() => SpecialtiesRepository.create({ name: 'Компьютерные сети', shortname: 'Компьютерные сети' }))
                .then(() => SpecialtiesRepository.create({ name: 'Программирование в компьютерных системах', shortname: 'Программирование' }))
                .then(() => SpecialtiesRepository.create({ name: 'Прикладная информатика (по отраслям)', shortname: 'Прикладная информатика' }))
                .then(() => SpecialtiesRepository.create({ name: 'Информационная безопасность автоматизированных систем', shortname: 'Информационная безопасность' }))
                .then(() => SpecialtiesRepository.create({ name: 'Земельно-имущественные отношения', shortname: 'Земельно-имущественные отношения' }))
                .then(() => SpecialtiesRepository.create({ name: 'Реклама', shortname: 'Реклама' }))
        })
        .then(() => {
            return Promise.resolve()
                /* 1 курс */
                .then(() => SubjectsRepository.create({ name: 'Физическая культура', shortname: 'Физическая культура' }))
                .then(() => SubjectsRepository.create({ name: 'Математика: алгебра и начала мат.анализа, геометрия', shortname: 'Математика' }))
                .then(() => SubjectsRepository.create({ name: 'Русский язык и литература', shortname: 'Русский язык и литература' }))
                .then(() => SubjectsRepository.create({ name: 'История', shortname: 'История' }))
                .then(() => SubjectsRepository.create({ name: 'Российское казачество', shortname: 'Российское казачество' }))
                .then(() => SubjectsRepository.create({ name: 'Основы безопасности жизнедеятельности', shortname: 'ОБЖ' }))
                .then(() => SubjectsRepository.create({ name: 'Химия', shortname: 'Химия' }))
                .then(() => SubjectsRepository.create({ name: 'Индивидуальный проект', shortname: 'Индивидуальный проект' }))
                .then(() => SubjectsRepository.create({ name: 'Обществознание (включая экономику и право)', shortname: 'Обществознание' }))
                .then(() => SubjectsRepository.create({ name: 'Физика', shortname: 'Физика' }))
                .then(() => SubjectsRepository.create({ name: 'Информатика', shortname: 'Информатика' }))
                /* 2 курс */
                /* 2 курс КС */
                .then(() => SubjectsRepository.create({ name: 'Основы теории информации', shortname: 'Основы теории информации' }))
                .then(() => SubjectsRepository.create({ name: 'Основы программирования баз данных', shortname: 'Основы программ-ия баз данных' }))
                .then(() => SubjectsRepository.create({ name: 'Инженерная компьютерная графика', shortname: 'Инженерная компьютерная графика' }).then(_ => yablonskaya_subjects.push(_)))
                .then(() => SubjectsRepository.create({ name: 'Операционные системы', shortname: 'Операционные системы' }))
                .then(() => SubjectsRepository.create({ name: 'Русский язык и культура речи', shortname: 'Русский язык и культура речи' }))
                .then(() => SubjectsRepository.create({ name: 'Элементы высшей математики', shortname: 'Элементы высшей математики' }))
                .then(() => SubjectsRepository.create({ name: 'Архитектура аппаратных средств', shortname: 'Архитектура аппаратных средств' }))
                /* 2 курс П */
                .then(() => SubjectsRepository.create({ name: 'Архитектура компьютерных систем', shortname: 'Архитектура компьютерных систем' }))
                .then(() => SubjectsRepository.create({ name: 'Иностранный язык', shortname: 'Иностранный язык' }))
                .then(() => SubjectsRepository.create({ name: 'Информационные технологии', shortname: 'Информационные технологии' }).then(_ => yablonskaya_subjects.push(_)))
                .then(() => SubjectsRepository.create({ name: 'Основы программирования', shortname: 'Основы программирования' }).then(_ => programming_subjects.push(_)))
                /* 2 курс И */
                .then(() => SubjectsRepository.create({ name: 'Архитектура ЭВМ и вычеслительные системы', shortname: 'Архитектура ЭВМ и выч. системы' }))
                .then(() => SubjectsRepository.create({ name: 'Документационное обеспечение управления', shortname: 'Документационное обеспеч. упр.' }))
                .then(() => SubjectsRepository.create({ name: 'Экономика организации', shortname: 'Экономика организации' }))
                /* 4 курс П */
                .then(() => SubjectsRepository.create({ name: 'ПМ.03:МДК.03.01 Технология разработки программного обеспечения', shortname: 'Технология разработки ПО' }).then(_ => programming_subjects.push(_)))
                .then(() => SubjectsRepository.create({ name: 'ПМ.05:МДК.05.01 Компьютерная графика', shortname: 'Компьютерная графика' }).then(_ => yablonskaya_subjects.push(_)))
                .then(() => SubjectsRepository.create({ name: 'ПМ.03:МДК.03.02 Инструментальные средства разработки программного обеспечения', shortname: 'Инстр. средства разр-ки ПО' }).then(_ => programming_subjects.push(_)))
                .then(() => SubjectsRepository.create({ name: 'ПМ.03:МДК.03.03 Документирование и сертификация', shortname: 'Документирование и сертификация' }))
                .then(() => SubjectsRepository.create({ name: 'ПМ.05:МДК.05.02 Системы автоматизированного проектирования', shortname: 'Системы авт. проектирования' }))
                .then(() => SubjectsRepository.create({ name: 'ПМ.05:МДК.05.03 Автоматизированные системы управления', shortname: 'Авт. системы управления' }).then(_ => programming_subjects.push(_)))
        })
        .then(() => {
            return Promise.resolve()
                .then(() => AuditoriesRepository.create({ name: '103' }))
                .then(() => AuditoriesRepository.create({ name: '105' }))
                .then(() => AuditoriesRepository.create({ name: '107' }))
                .then(() => AuditoriesRepository.create({ name: '13' }))
                .then(() => AuditoriesRepository.create({ name: '17' }))
                .then(() => AuditoriesRepository.create({ name: '18' }))
                .then(() => AuditoriesRepository.create({ name: '21' }))
                .then(() => AuditoriesRepository.create({ name: '22' }))
                .then(() => AuditoriesRepository.create({ name: '23' }))
                .then(() => AuditoriesRepository.create({ name: '24' }))
                .then(() => AuditoriesRepository.create({ name: '25' }))
                .then(() => AuditoriesRepository.create({ name: '26' }))
                .then(() => AuditoriesRepository.create({ name: '27' }))
                .then(() => AuditoriesRepository.create({ name: '305' }))
                .then(() => AuditoriesRepository.create({ name: '31' }))
                .then(() => AuditoriesRepository.create({ name: '32' }))
                .then(() => AuditoriesRepository.create({ name: '33' }))
                .then(() => AuditoriesRepository.create({ name: '34' }))
                .then(() => AuditoriesRepository.create({ name: '35' }))
                .then(() => AuditoriesRepository.create({ name: '36' }))
                .then(() => AuditoriesRepository.create({ name: '37' }))
                .then(() => AuditoriesRepository.create({ name: '404' }))
                .then(() => AuditoriesRepository.create({ name: '405' }))
        })
        .then(() => {
            return Promise.resolve()
                .then(() => GroupsRepository.create({ name: '101', specialtyId: 1 }))
                .then(() => GroupsRepository.create({ name: '102', specialtyId: 1 }))
                .then(() => GroupsRepository.create({ name: '103', specialtyId: 2 }))
                .then(() => GroupsRepository.create({ name: '104к', specialtyId: 2 }))
                .then(() => GroupsRepository.create({ name: '105', specialtyId: 3 }))
                .then(() => GroupsRepository.create({ name: '106', specialtyId: 3 }))
                .then(() => GroupsRepository.create({ name: '107к', specialtyId: 3 }))
                .then(() => GroupsRepository.create({ name: '108', specialtyId: 4 }))
                .then(() => GroupsRepository.create({ name: '109к', specialtyId: 4 }))

                .then(() => GroupsRepository.create({ name: 'КС-201', specialtyId: 1 }))
                .then(() => GroupsRepository.create({ name: 'КС-202к', specialtyId: 1 }))
                .then(() => GroupsRepository.create({ name: 'П-203', specialtyId: 2 }))
                .then(() => GroupsRepository.create({ name: 'П-204', specialtyId: 2 }))
                .then(() => GroupsRepository.create({ name: 'П-205к', specialtyId: 2 }))
                .then(() => GroupsRepository.create({ name: 'И-206', specialtyId: 3 }))
                .then(() => GroupsRepository.create({ name: 'И-207', specialtyId: 3 }))
                .then(() => GroupsRepository.create({ name: 'И-208к', specialtyId: 3 }))
                .then(() => GroupsRepository.create({ name: 'З-209', specialtyId: 4 }))
                .then(() => GroupsRepository.create({ name: 'З-210', specialtyId: 4 }))
                .then(() => GroupsRepository.create({ name: 'З-211к', specialtyId: 4 }))
                .then(() => GroupsRepository.create({ name: 'ЗО-212к', specialtyId: 5 }))
                .then(() => GroupsRepository.create({ name: 'Р-213к', specialtyId: 6 }))

                .then(() => GroupsRepository.create({ name: 'КС-401', specialtyId: 1 }))
                .then(() => GroupsRepository.create({ name: 'КС-402к', specialtyId: 1 }))
                .then(() => GroupsRepository.create({ name: 'П-403', specialtyId: 2 }).then(_ => P_403 = _))
                .then(() => GroupsRepository.create({ name: 'П-404', specialtyId: 2 }))
                .then(() => GroupsRepository.create({ name: 'И-405к', specialtyId: 3 }))
                .then(() => GroupsRepository.create({ name: 'З-406к', specialtyId: 4 }))
        })
        .then(() => {
            return Promise.resolve()
                .then(() => UsersRepository.create({ lastname: 'Кириллов', firstname: 'Алексей', middlename: 'Иванович', type: 'teacher', login: 'alexey.kirillov', password: 'portal', image_id: 'kirillov' }))
                .then(() => UsersRepository.create({ lastname: 'Глускер', firstname: 'Александр', middlename: 'Игоревич', type: 'teacher', login: 'alexander.glusker', password: 'portal', image_id: 'glu' }).then(_ => glusker = _))
                .then(user => user.update({ canCreateNews: true, canEditTimetable: true }))
                .then(() => UsersRepository.create({ lastname: 'Коннова', firstname: 'Ирина', middlename: 'Геннадьевна', type: 'teacher', login: 'irina.konnova', password: 'portal', image_id: 'konnova' }).then(_ => konnova = _))
                .then(() => UsersRepository.create({ lastname: 'Ларионова', firstname: 'Елена', middlename: 'Анатольевна', type: 'teacher', login: 'elena.larionova', password: 'portal', image_id: 'konnova' }))
                .then(() => UsersRepository.create({ lastname: 'Миланова', firstname: 'Ирина', middlename: 'Анатольевна', type: 'teacher', login: 'irina.milanova', password: 'portal', image_id: 'milanova' }))
                .then(() => UsersRepository.create({ lastname: 'Скачкова', firstname: 'Светлана', middlename: 'Ивановна', type: 'teacher', login: 'svetlana.skachkova', password: 'portal' }).then(_ => skachkova = _))
                .then(() => UsersRepository.create({ lastname: 'Сорокин', firstname: 'Юрий', middlename: 'Сергеевич', type: 'teacher', login: 'yury.sorokin', password: 'portal', image_id: 'sorokin' }))
                .then(() => UsersRepository.create({ lastname: 'Павлов', firstname: 'Алексей', middlename: 'Владимирович', type: 'teacher', login: 'alexey.pavlov', password: 'portal' }))
                .then(() => UsersRepository.create({ lastname: 'Яблонская', firstname: 'Юлия', middlename: 'Викторовна', type: 'teacher', login: 'rozovay_blondinka', password: 'portal', image_id: 'blondinko' }).then(_ => yablonskaya = _))
                .then(() => UsersRepository.create({ lastname: 'Тихонов', firstname: 'Сергей', middlename: 'Сергеевич', type: 'student', login: 'sergey.tikhonov', password: 'portal', groupId: 25, image_id: 'tixon' }))
        })
        .then(() => {
            return Promise.resolve()
                .then(() => NewsRepository.create({
                    title: 'Введение обязательной казаческой формы для студентов и преподавателей',
                    userId: konnova.id,
                    text: `{"ops":[{"insert":"В наш колледж поступил указ от "},{"attributes":{"italic":true},"insert":"Главного Казаческого Управления Российской Федерации"},{"insert":" (ГКУ РФ) о том, что молодые казаки, обучающиеся в Первом Казаческом Колледже Информационных Технологий, а также преподаватели обязаны "},{"attributes":{"bold":true},"insert":"с 1 марта "},{"insert":"носить парадную форму казаческого образца.\\n\\nФорма будет повторять образ боевых казаков XVII века. \\n\\n"},{"attributes":{"link":"https://www.google.ru/search?q=%D0%BA%D0%B0%D0%B7%D0%B0%D1%87%D1%8C%D0%B8+%…D%D0%B0%D1%80%D1%8F%D0%B4%D1%8B+%D0%BA%D0%B0%D0%B7%D0%B0%D0%BA%D0%BE%D0%B2"},"insert":"Подробнее про казаческие наряды"},{"insert":".\\n"}]}`,
                    createdAt: new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate() - 3)
                }))
                .then(newsEntry => {
                    return connection
                        .models['news_groups']
                        .create({ newId: newsEntry.id, groupId: P_403.id });
                })
                .then(() => NewsRepository.create({
                    title: 'Новое предложение в студенческой столовой',
                    userId: skachkova.id,
                    text: `{"ops":[{"insert":"По утрам в нашей столовой теперь можно заказать комплексный казаческий завтрак.\\n\\nСкажи промокод \\"казачок \\" тёте Рае и получи казан харчёв бесплатно.\\n"}]}`,
                    createdAt: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 25)
                }))
                .then(newsEntry => {
                    return connection
                        .models['news_groups']
                        .create({ newId: newsEntry.id, groupId: P_403.id });
                })
                .then(() => NewsRepository.create({
                    title: 'Повышение стипендий для 1-4 курсов',
                    userId: yablonskaya.id,
                    text: `{"ops":[{"insert":"По причине благополучного финансового положения России в последние 20 лет со следующего семестра для студентов всех курсов стипендия будет повышена "},{"attributes":{"bold":true},"insert":"до 45 000 руб"},{"insert":".\\n"}]}`,
                    createdAt: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 3)
                }))
                .then(newsEntry => {
                    return connection
                        .models['news_groups']
                        .create({ newId: newsEntry.id, groupId: P_403.id });
                })
        })
        .then(() => {
            return Promise.resolve()
                .then(() => {
                    return connection
                        .models['task']
                        .create({
                            name: 'Практическая работа №1. Простые программы с использованием событийно-ориентированного программирования (2 часа)',
                            text: `{"ops":[{"insert":"Цель работы: \\nпрактическое закрепление знаний компонентов Delphi (TForm, TLabel, TEdit, TComboBox, TButton и, возможно, некоторых других – на выбор студента); "},{"attributes":{"list":"ordered"},"insert":"\\n"},{"insert":"практическое закрепление знаний об использовании событий в программировании; "},{"attributes":{"list":"ordered"},"insert":"\\n"},{"insert":"практическое закрепление знаний о функциях IntToStr; StrToInt; FloatToStr; StrToFloat; исключениях. "},{"attributes":{"list":"ordered"},"insert":"\\n"},{"insert":"\\nПорядок выполнения:\\nосуществите визуальное проектирование пользовательского интерфейса формы;"},{"attributes":{"list":"ordered"},"insert":"\\n"},{"insert":"разработайте методы – обработчики тех событий, что необходимо использовать в вашей программе; "},{"attributes":{"list":"ordered"},"insert":"\\n"},{"insert":"приведите вашу программу в соответствие с требованиями. "},{"attributes":{"list":"ordered"},"insert":"\\n"},{"insert":"\\nВарианты заданий – во вложенном файле.\\n"}]}`,
                            isRemote: true,
                            hasDueDate: true,
                            dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1),
                            userId: glusker.id,
                            subjectId: programming_subjects[0].id
                        })
                        .then(task => {
                            return connection
                                .models['tasks_groups']
                                .create({ taskId: task.id, groupId: P_403.id });
                        })
                })
                .then(() => {
                    return connection
                        .models['task']
                        .create({
                            name: 'Практическая работа №2. Программирование графики и таймера (6 часов)',
                            text: `{"ops":[{"insert":"Цель работы:\\nпрактическое изучение компонентов TImage, TChart, TTimer, TOpenDialog; класса TCanvas."},{"attributes":{"list":"ordered"},"insert":"\\n"},{"insert":"Порядок выполнения: \\nосуществите визуальное проектирование пользовательского интерфейса формы (1-ое задание); "},{"attributes":{"list":"ordered"},"insert":"\\n"},{"insert":"разработайте методы – обработчики тех событий, что необходимо использовать в вашей программе (1-ое задание);"},{"attributes":{"list":"ordered"},"insert":"\\n"},{"insert":"приведите вашу программу в соответствие с требованиями (1-ое задание). "},{"attributes":{"list":"ordered"},"insert":"\\n"},{"insert":"осуществите визуальное проектирование пользовательского интерфейса формы (2-ое задание);"},{"attributes":{"list":"ordered"},"insert":"\\n"},{"insert":"разработайте методы – обработчики тех событий, что необходимо использовать в вашей программе (2-ое задание);"},{"attributes":{"list":"ordered"},"insert":"\\n"},{"insert":"приведите вашу программу в соответствие с требованиями (2-ое задание). "},{"attributes":{"list":"ordered"},"insert":"\\n"},{"insert":"\\nВторое задание для всех студентов имеет нулевой уровень. \\n\\nВарианты находятся во вложенном файле.\\n"}]}`,
                            isRemote: true,
                            hasDueDate: true,
                            dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 10),
                            userId: glusker.id,
                            subjectId: programming_subjects[0].id
                        })
                        .then(task => {
                            return connection
                                .models['tasks_groups']
                                .create({ taskId: task.id, groupId: P_403.id });
                        })
                })
                .then(() => {
                    return connection
                        .models['task']
                        .create({
                            name: 'Лабораторная работа №1',
                            text: `{"ops":[{"insert":"Необходимо создать иллюстрацию средствами простейших инструментов Adobe Photoshop.\\n\\nДля выполнения задания нужно прислать "},{"attributes":{"bold":true},"insert":"файл .psd "},{"insert":"и "},{"attributes":{"bold":true},"insert":"отчёт "},{"insert":"в формате Microsoft Word.\\n\\n"},{"attributes":{"italic":true},"insert":"Варианты и исходные изображения приложены к заданию."},{"insert":"\\n"}]}`,
                            isRemote: false,
                            hasDueDate: false,
                            dueDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate() + 2),
                            userId: yablonskaya.id,
                            subjectId: yablonskaya_subjects[2].id
                        })
                        .then(task => {
                            return connection
                                .models['tasks_groups']
                                .create({ taskId: task.id, groupId: P_403.id });
                        })
                })

        })
        .then(() => {
            return connection
                .models['teachers_subjects']
                .bulkCreate(programming_subjects.map(function (subject) {
                    return {
                        subjectId: subject.id,
                        teacherId: glusker.id
                    }
                }));
        })
        .then(() => {
            return connection
                .models['teachers_subjects']
                .bulkCreate(yablonskaya_subjects.map(function (subject) {
                    return {
                        subjectId: subject.id,
                        teacherId: yablonskaya.id
                    }
                }));
        })
        .then(() => {
            function getRandom(modelName) {
                return connection.models[modelName].find({ order: [Sequelize.fn('RANDOM')], limit: 1 });
            }

            function randomInteger(min, max) {
                var rand = min - 0.5 + Math.random() * (max - min + 1)
                rand = Math.round(rand);
                return rand;
            }

            let timetable = [];
            let thePromise = Promise.resolve();

            let weeks = ['upper', 'lower'];
            for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
                let days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
                for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
                    let day;
                    let maxLessons = randomInteger(4, 6);

                    for (let index = 1; index < maxLessons; index++) {
                        thePromise =
                            thePromise
                                .then(() => {
                                    day = {
                                        groupId: P_403.id,
                                        timingId: index,
                                        weekday: days[dayIndex],
                                        weektype: weeks[weekIndex]
                                    };
                                    return getRandom('subject');
                                })
                                .then(subject => {
                                    day.subjectId = subject.id;
                                    return getRandom('teacher');
                                })
                                .then(teacher => {
                                    day.teacherId = teacher.id;
                                    return getRandom('auditory');
                                })
                                .then(auditory => {
                                    day.auditoryId = auditory.id;
                                    timetable.push(day);
                                });
                    }

                }
            }

            return thePromise.then(() => connection.models['lesson'].bulkCreate(timetable));
        })
        .then(() => {
            return new Promise((resolve, reject) => {
                console.log('copying images..')
                copydir(
                    path.join(__dirname, 'demo-images'),
                    path.join(__dirname, '..', 'public', 'user-images'),
                    function (err) {
                        if (err) {
                            return reject(err);
                        }
                        console.log('images copied!')
                        resolve();
                    });
            });
        })
        .then(() => {
            console.log("Successfully deployed demo db");
        })
        .catch((err) => {
            console.log(err);
            console.error(err);
        })
        .then(() => {
            console.timeEnd('deploying time');
            process.exit();
        })
});