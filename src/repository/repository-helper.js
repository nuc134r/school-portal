'use strict';

function Create(connection, modelName) {
    return {
        create: (options) => connection.models[modelName].create(options),
        browse: () => connection.models[modelName].findAll(),
        browseWith: (includes) => () => connection.models[modelName].findAll({
            include: includes.map(model => connection.models[model])
        }),
        get: (options) => connection.models[modelName].findOne({ where: options })
    }
}

module.exports = Create;