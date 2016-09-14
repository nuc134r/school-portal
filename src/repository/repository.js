'use strict';

let LessonsRepository = require('./lessons');
let TasksRepository = require('./tasks');
let TimeRepository = require('./time');
let StudentsRepository = require('./students');

function CreateRepository(db) {
    function MiddleWareFunction(req, res, next) {
        
        let repository = {
            lessons: new LessonsRepository(db, req.user),
            tasks: new TasksRepository(db, req.user),
            time: new TimeRepository(),
            students: new StudentsRepository()
        };

        req.repository = repository;
        next();
    }

    return MiddleWareFunction;
}

module.exports = CreateRepository;