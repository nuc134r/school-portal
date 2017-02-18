'use strict';

const url = require('url');

const UsersRepository = require('../repository/users');
const SpecialtiesRepository = require('../repository/specialties');
const GroupsRepository = require('../repository/groups');
const SubjectsRepository = require('../repository/subjects');
const AuditoriesRepository = require('../repository/auditories');
const TimingsRepository = require('../repository/timings');

const helper = require('./controller-helper')('admin', 'a');
const config = require('../../config.json');

module.exports.UsersContoller = helper.generateContoller({
    entityName: 'user',
    entityNamePlural: 'users',
    displayName: 'пользователь',
    displayNamePlural: 'пользователи',
    displayNameGenetive: 'пользователя',
    displayNameAccusative: 'пользователя',
    displayNameIsMasculine: true,
    repository: UsersRepository,
    lists: {
        groups: GroupsRepository.browse
    },
    listProcessors: {
        groups: (item) => {
            return { text: item.name, value: item.id }
        }
    },
    onProcessForm: (formData, req) => {
        return {
            firstname: formData.firstname,
            middlename: formData.middlename,
            lastname: formData.lastname,
            login: formData.login,
            password: formData.user_type == 'admin'
                ? config.default_admin_password
                : config.default_user_password,
            type: formData.user_type,
            groupId: formData.groupId,
            canCreateNews: !!formData.canCreateNews,
            canEditTimetable: !!formData.canEditTimetable
        }
    }
});

module.exports.SpecialtiesContoller = helper.generateContoller({
    entityName: 'specialty',
    entityNamePlural: 'specialties',
    displayName: 'специальность',
    displayNamePlural: 'специальности',
    displayNameGenetive: 'специальности',
    displayNameAccusative: 'специальность',
    displayNameIsMasculine: false,
    repository: SpecialtiesRepository
});

module.exports.GroupsContoller = helper.generateContoller({
    entityName: 'group',
    entityNamePlural: 'groups',
    displayName: 'группа',
    displayNamePlural: 'группы',
    displayNameGenetive: 'группы',
    displayNameAccusative: 'группу',
    displayNameIsMasculine: false,
    repository: GroupsRepository,
    lists: {
        specialties: SpecialtiesRepository.browse
    },
    listProcessors: {
        specialties: (item) => {
            return { text: item.name, value: item.id }
        }
    }
});

module.exports.SubjectsContoller = helper.generateContoller({
    entityName: 'subject',
    entityNamePlural: 'subjects',
    displayName: 'предмет',
    displayNamePlural: 'предметы',
    displayNameGenetive: 'предмета',
    displayNameAccusative: 'предмет',
    displayNameIsMasculine: true,
    repository: SubjectsRepository
});

module.exports.AuditoriesContoller = helper.generateContoller({
    entityName: 'auditory',
    entityNamePlural: 'auditories',
    displayName: 'аудитория',
    displayNamePlural: 'аудитории',
    displayNameGenetive: 'аудитории',
    displayNameAccusative: 'аудиторию',
    displayNameIsMasculine: false,
    repository: AuditoriesRepository
});

module.exports.TimingsContoller = helper.generateContoller({
    entityName: 'timing',
    entityNamePlural: 'timings',
    displayName: 'звонок',
    displayNamePlural: 'звонки',
    displayNameGenetive: 'звонка',
    displayNameAccusative: 'звонок',
    displayNameIsMasculine: true,
    repository: TimingsRepository
});
