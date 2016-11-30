'use strict';

const url = require('url');

const UsersRepository = require('../repository/users');
const SpecialtiesRepository = require('../repository/specialties');
const GroupsRepository = require('../repository/groups');
const SubjectsRepository = require('../repository/subjects');
const AuditoriesRepository = require('../repository/auditory');

const helper = require('./controller-helper')('admin', 'a');
const config = require('../../config.json');

module.exports.UsersCrud = helper.generateCrud({
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
    onProcessForm: (formData) => {
        return {
            firstname: formData.firstname,
            middlename: formData.middlename,
            lastname: formData.lastname,
            login: formData.login,
            password: formData.user_type == 'admin'
                ? config.default_admin_password
                : config.default_user_password,
            type: formData.user_type,
            groupId: formData.groupId
        }
    }
});

module.exports.SpecialtiesCrud = helper.generateCrud({
    entityName: 'specialty',
    entityNamePlural: 'specialties',
    displayName: 'специальность',
    displayNamePlural: 'специальности',
    displayNameGenetive: 'специальности',
    displayNameAccusative: 'специальность',
    displayNameIsMasculine: false,
    repository: SpecialtiesRepository
});

module.exports.GroupsCrud = helper.generateCrud({
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
            return { text: item.shortname, value: item.id }
        }
    }
});

module.exports.SubjectsCrud = helper.generateCrud({
    entityName: 'subject',
    entityNamePlural: 'subjects',
    displayName: 'предмет',
    displayNamePlural: 'предметы',
    displayNameGenetive: 'предмета',
    displayNameAccusative: 'предмет',
    displayNameIsMasculine: true,
    repository: SubjectsRepository
});

module.exports.AuditoriesCrud = helper.generateCrud({
    entityName: 'auditory',
    entityNamePlural: 'auditories',
    displayName: 'аудитория',
    displayNamePlural: 'аудитории',
    displayNameGenetive: 'аудитории',
    displayNameAccusative: 'аудиторию',
    displayNameIsMasculine: false,
    repository: AuditoriesRepository
});
