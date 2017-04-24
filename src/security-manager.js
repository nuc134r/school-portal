'use strict';

let crypto = require('crypto');

let generateRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length)
};

let sha512 = function (password, salt) {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

module.exports.hashPassword = function(password) {
    let salt = generateRandomString(16);
    let passwordData = sha512(password, salt);

    return passwordData;
}

module.exports.isPasswordCorrect = function(givenPassword, passwordHash, passwordSalt) {
    let passwordData = sha512(givenPassword, passwordSalt);

    return passwordData.passwordHash === passwordHash;
}