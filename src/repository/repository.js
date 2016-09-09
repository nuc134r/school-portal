'use strict';

let LessonsRepository = require('./lessons-repository');
let TasksRepository = require('./tasks-repository');

function CreateRepository(db) {
    function MiddleWareFunction(req, res, next) {
        
        let repository = {
            lessons: new LessonsRepository(db, req.user),
            tasks: new TasksRepository(db, req.user)
        };

        req.repository = repository;
        next();
    }

    return MiddleWareFunction;
}

module.exports = CreateRepository;