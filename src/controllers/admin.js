'use strict';

const url = require('url');

const UsersRepository = require('../repository/users');
const SpecialtiesRepository = require('../repository/specialties');
const GroupsRepository = require('../repository/groups');

const helper = require('./controller-helper')('admin', 'a');
const config = require('../../config.json');

const UsersCrud = helper.generateCrud({
    entityName: 'user',
    entityNamePlural: 'users',
    displayName: 'пользователь',
    displayNamePlural: 'пользователи',
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

const SpecialtiesCrud = helper.generateCrud({
    entityName: 'specialty',
    entityNamePlural: 'specialties',
    displayName: 'специальность',
    displayNamePlural: 'специальности',
    displayNameIsMasculine: false,
    repository: SpecialtiesRepository
});

const GroupsCrud = helper.generateCrud({
    entityName: 'group',
    entityNamePlural: 'groups',
    displayName: 'группа',
    displayNamePlural: 'группы',
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

module.exports.UsersCrud = UsersCrud;
module.exports.SpecialtiesCrud = SpecialtiesCrud;
module.exports.GroupsCrud = GroupsCrud;
