'use strict';

const fs = require('fs');
const path = require('path');
const gm = require('gm');
const ImageMagick = gm.subClass({ imageMagick: true });
const UUID = require('node-uuid');

const UsersRepository = require('../repository/users');

module.exports.getSettingsPage = (req, res) => {
    const helper = require('./controller-helper')(req.school_context.user.type);

    let settings = "";

    let renderOptions = {
        view: 'common/settings',
        title: 'Настройки',
    };

    helper.render(req, res, { settings }, renderOptions);
}

module.exports.saveProfileImage = (req, res) => {
    req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {

        let imageId = UUID().replace(/-/g, '');

        let oldImageId = req.school_context.user.image_id;
        if (oldImageId) {
            let smallFilePath = path.join(__dirname, '..', '..', 'public', 'user-images', `${oldImageId}_48.jpg`);
            let largeFilePath = path.join(__dirname, '..', '..', 'public', 'user-images', `${oldImageId}_128.jpg`);

            fs.unlink(smallFilePath, (err) => { if (err) console.log(err); });
            fs.unlink(largeFilePath, (err) => { if (err) console.log(err); });
        }

        UsersRepository.updateImageId(req, imageId).then(() => {

            let tempFilePath = path.join(__dirname, '..', '..', 'public', 'user-images', `${imageId}.tmp`);
            let smallFilePath = path.join(__dirname, '..', '..', 'public', 'user-images', `${imageId}_48.jpg`);
            let largeFilePath = path.join(__dirname, '..', '..', 'public', 'user-images', `${imageId}_128.jpg`);

            let fstream = fs.createWriteStream(tempFilePath);

            fstream.on('finish', function () {

                ImageMagick(mimetype == 'image/gif' ? tempFilePath + '[0]' : tempFilePath)
                    .geometry(48, 48, '^')
                    .write(smallFilePath, (err) => {
                        if (err) {
                            console.log(err);
                            res.redirect('/settings?message=error');
                            return;
                        }

                        ImageMagick(mimetype == 'image/gif' ? tempFilePath + '[0]' : tempFilePath)
                            .geometry(128, 128, '^')
                            .write(largeFilePath, (err) => {
                                if (err) {
                                    console.log(err);
                                    res.redirect('/settings?message=error');
                                    return;
                                }

                                fs.unlink(tempFilePath, (err) => { if (err) console.log(err); });
                                res.redirect('/settings');
                            });
                    })
            });

            file.pipe(fstream);
        });
    });
}

module.exports.getSmallProfileImage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'user-images', `${req.params.image_id}_48.jpg`));
}

module.exports.getLargeProfileImage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'user-images', `${req.params.image_id}_128.jpg`));
}