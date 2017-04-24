'use strict';

const database = require('./database/database');
const connection = database.getConnection();
const SecurityManager = require('./security-manager');

let sessions = require('./session/sessions');

function authorize(login, password) {
    return new Promise((resolve, reject) => {
        if (!login || !password) {
            reject('no_credentials_supplied');
        }

        connection.models.user.find({ where: { login } })
            .then(user => {
                if (user) {
                    if (SecurityManager.isPasswordCorrect(password, user.password, user.salt)) {
                        sessions.create(user)
                            .then(token => resolve(token))
                            .catch(error => {
                                console.error(error);
                                reject(error.message);
                            });
                    } else {
                        reject('invalid_credentials');
                    }
                } else {
                    reject('invalid_credentials');
                }
            })
            .catch(error => reject(error.message));
    });
}

module.exports.authorize = authorize;