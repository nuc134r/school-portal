'use strict';

const routing_table = {
    'admin': 'a',
    'teacher': 't',
    'student': 's'
}

let helper_router = null;

function init(router) {

    helper_router = router;

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

function createContollerRoutes(prefix, router, crud) {
    let entity = crud.options.entityNamePlural;

    router.get(`/${prefix}/${entity}`, crud.browse);

    router.get(`/${prefix}/${entity}/create`, crud.createPage);
    router.post(`/${prefix}/${entity}/create`, crud.create);

    router.get(`/${prefix}/${entity}/:id/delete`, crud.deletePage);
    router.delete(`/${prefix}/${entity}/:id/delete`, crud.delete);

    router.get(`/${prefix}/${entity}/:id/edit`, crud.editPage);
    router.post(`/${prefix}/${entity}/:id/edit`, crud.edit);
}

function whitelist(pathMask, valueGetter, assertValue) {
    helper_router.all(pathMask, (req, res, next) => {
        if (valueGetter(req) == assertValue) {
            next();
        } else {
            res.redirect('/404');
        }
    });
}

function blacklist(pathMask, valueGetter, assertValue) {
    helper_router.all(pathMask, (req, res, next) => {
        if (valueGetter(req) != assertValue) {
            next();
        } else {
            res.redirect('/404');
        }
    });
}

module.exports.init = init;
module.exports.blacklist = blacklist;
module.exports.createContollerRoutes = createContollerRoutes;
module.exports.whitelist = whitelist;