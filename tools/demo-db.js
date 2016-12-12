'use strict';

console.time('deploying time');

require('../src/database/database').Init().then(() => {

    const UsersRepository = require('../src/repository/users');
    const SpecialtiesRepository = require('../src/repository/specialties');
    const GroupsRepository = require('../src/repository/groups');
    const SubjectsRepository = require('../src/repository/subjects');
    const AuditoriesRepository = require('../src/repository/auditories');
    const TimingsRepository = require('../src/repository/timings');
    const LessonsRepository = require('../src/repository/lessons');

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
                .then(() => SubjectsRepository.create({ name: 'Инженерная компьютерная графика', shortname: 'Инженерная компьютерная графика' }))
                .then(() => SubjectsRepository.create({ name: 'Операционные системы', shortname: 'Операционные системы' }))
                .then(() => SubjectsRepository.create({ name: 'Русский язык и культура речи', shortname: 'Русский язык и культура речи' }))
                .then(() => SubjectsRepository.create({ name: 'Элементы высшей математики', shortname: 'Элементы высшей математики' }))
                .then(() => SubjectsRepository.create({ name: 'Архитектура аппаратных средств', shortname: 'Архитектура аппаратных средств' }))
                /* 2 курс П */
                .then(() => SubjectsRepository.create({ name: 'Архитектура компьютерных систем', shortname: 'Архитектура компьютерных систем' }))
                .then(() => SubjectsRepository.create({ name: 'Иностранный язык', shortname: 'Иностранный язык' }))
                .then(() => SubjectsRepository.create({ name: 'Информационные технологии', shortname: 'Информационные технологии' }))
                .then(() => SubjectsRepository.create({ name: 'Основы программирования', shortname: 'Основы программирования' }))
                /* 2 курс И */
                .then(() => SubjectsRepository.create({ name: 'Архитектура ЭВМ и вычеслительные системы', shortname: 'Архитектура ЭВМ и выч. системы' }))
                .then(() => SubjectsRepository.create({ name: 'Документационное обеспечение управления', shortname: 'Документационное обеспеч. упр.' }))
                .then(() => SubjectsRepository.create({ name: 'Экономика организации', shortname: 'Экономика организации' }))
                /* 4 курс П */
                .then(() => SubjectsRepository.create({ name: 'ПМ.03:МДК.03.01 Технология разработки программного обеспечения', shortname: 'Технология разработки ПО' }))
                .then(() => SubjectsRepository.create({ name: 'ПМ.05:МДК.05.01 Компьютерная графика', shortname: 'Компьютерная графика' }))
                .then(() => SubjectsRepository.create({ name: 'ПМ.03:МДК.03.02 Инструментальные средства разработки программного обеспечения', shortname: 'Инстр. средства разр-ки ПО' }))
                .then(() => SubjectsRepository.create({ name: 'ПМ.03:МДК.03.03 Документирование и сертификация', shortname: 'Документирование и сертификация' }))
                .then(() => SubjectsRepository.create({ name: 'ПМ.05:МДК.05.02 Системы автоматизированного проектирования', shortname: 'Системы авт. проектирования' }))
                .then(() => SubjectsRepository.create({ name: 'ПМ.05:МДК.05.03 Автоматизированные системы управления', shortname: 'Авт. системы управления' }))
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
                .then(() => GroupsRepository.create({ name: 'П-403', specialtyId: 2 }))
                .then(() => GroupsRepository.create({ name: 'П-404', specialtyId: 2 }))
                .then(() => GroupsRepository.create({ name: 'И-405к', specialtyId: 3 }))
                .then(() => GroupsRepository.create({ name: 'З-406к', specialtyId: 4 }))
        })
        .then(() => {
            return Promise.resolve()
                .then(() => UsersRepository.create({ lastname: 'Кириллов', firstname: 'Алексей', middlename: 'Иванович', type: 'teacher', login: 'alexey.kirillov', password: 'portal' }))
                .then(() => UsersRepository.create({ lastname: 'Глускер', firstname: 'Александр', middlename: 'Игоревич', type: 'teacher', login: 'alexander.glusker', password: 'portal' }))
                .then(() => UsersRepository.create({ lastname: 'Коннова', firstname: 'Ирина', middlename: 'Геннадьевна', type: 'teacher', login: 'irina.konnova', password: 'portal' }))
                .then(() => UsersRepository.create({ lastname: 'Ларионова', firstname: 'Елена', middlename: 'Анатольевна', type: 'teacher', login: 'elena.larionova', password: 'portal' }))
                .then(() => UsersRepository.create({ lastname: 'Миланова', firstname: 'Ирина', middlename: 'Анатольевна', type: 'teacher', login: 'irina.milanova', password: 'portal' }))
                .then(() => UsersRepository.create({ lastname: 'Скачкова', firstname: 'Светлана', middlename: 'Ивановна', type: 'teacher', login: 'svetlana.skachkova', password: 'portal' }))
                .then(() => UsersRepository.create({ lastname: 'Сорокин', firstname: 'Юрий', middlename: 'Сергеевич', type: 'teacher', login: 'yury.sorokin', password: 'portal' }))
                .then(() => UsersRepository.create({ lastname: 'Павлов', firstname: 'Алексей', middlename: 'Владимирович', type: 'teacher', login: 'alexey.pavlov', password: 'portal' }))
                .then(() => UsersRepository.create({ lastname: 'Яблонская', firstname: 'Юлия', middlename: 'Викторовна', type: 'teacher', login: 'rozovay_blonkdinka', password: 'portal' }))
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