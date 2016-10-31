'use strict';

const routing_table = {
    'admin': 'a',
    'teacher': 't',
    'student': 's'
}

function init(router) {

    router.get('/', (req, res) => {
        let user_type = req.school_context.user.type;
        let route = routing_table[user_type];

        if (route) {
            res.redirect(`/${route}`);
        } else {
            let error = new Error("Invalid user type");
            console.error(error);
            // TODO: error page
        }
    });

}

module.exports.init = init;