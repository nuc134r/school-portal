'use strict';

const moment = require('moment');

function formatAuditFields(items) {
    return items.map(item => {
        item.dataValues.createdAt = moment(item.createdAt).format('LLL');
        item.dataValues.updatedAt = moment(item.updatedAt).format('LLL');

        return item;
    });
}

function Create(connection, modelName) {
    let modelAttriutes = connection.models[modelName].attributes;
    let sortingRules = [];

    if (modelAttriutes['lastname']) {
        sortingRules.push(['lastname', 'ASC']);
    }

    if (modelAttriutes['dueDate']) {
        sortingRules.push(['dueDate', 'ASC']);
    } else if (modelAttriutes['name']) {
        sortingRules.push(['name', 'ASC']);
    }

    if (modelAttriutes['start']) {
        sortingRules.push(['start', 'ASC']);
    }



    return {
        create: (options) => connection.models[modelName].create(options),
        browse: () => connection.models[modelName].findAll({ order: sortingRules }).then(formatAuditFields),
        browseWith: (includes, options, rawIncludes) => () => connection.models[modelName].findAll({
            order: sortingRules,
            include: (includes.map(model => connection.models[model]) || []).concat(rawIncludes || []),
            where: options
        }).then(formatAuditFields),
        get: (options) => connection.models[modelName].findOne({ where: options }),
        getWith: (includes) => (options) => connection.models[modelName].findOne({ 
            include: (includes.map(model => connection.models[model]) || []),
            where: options
        }),
        delete: (options) => connection.models[modelName].destroy({ where: options }),
        update: (entityId, options) => connection.models[modelName].update(options, { where: { id: entityId }, returning: true, individualHooks: true }),
    }
}

module.exports = Create;