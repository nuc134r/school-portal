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

function createCrudRoutes(prefix, router, crud) {
    let entity = crud.options.entityNamePlural;

    router.get(`/${prefix}/${entity}`, crud.browse);

    router.get(`/${prefix}/${entity}/create`, crud.createPage);
    router.post(`/${prefix}/${entity}/create`, crud.create);

    router.get(`/${prefix}/${entity}/:id/delete`, crud.deletePage);
    router.delete(`/${prefix}/${entity}/:id/delete`, crud.delete);
}

module.exports.init = init;
module.exports.createCrudRoutes = createCrudRoutes;