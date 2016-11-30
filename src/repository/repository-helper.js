'use strict';

function Create(connection, modelName) {
    let modelAttriutes = connection.models[modelName].attributes;
    let sortingRules = [];

    if (modelAttriutes['name']) {
        sortingRules.push(['name', 'ASC']);
    }

    if (modelAttriutes['lastname']) {
        sortingRules.push(['lastname', 'ASC']);
    }

    return {
        create: (options) => connection.models[modelName].create(options),
        browse: () => connection.models[modelName].findAll({ order: sortingRules }),
        browseWith: (includes) => () => connection.models[modelName].findAll({
            include: includes.map(model => connection.models[model])
        }),
        get: (options) => connection.models[modelName].findOne({ where: options }),
        delete: (options) => connection.models[modelName].destroy({ where: options })
    }
}

module.exports = Create;