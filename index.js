const utils = require('./utils');
const express = require('express');

function registerRoutes(routes) {
    const router = express.Router();
    routes.forEach(paths => {
        paths.forEach(obj => {
            const path = utils.validatePath(obj.path);
            const middleware = utils.validateMiddlewares(obj.middlewares);
            const handlers = utils.validateRouteHandler(obj.handlers);
            const isMethodValid = utils.validateRouteMethod(obj.method);
            if (isMethodValid && path && middleware && handlers) {
                router.route(obj.path)[obj.method](obj.middlewares, obj.handlers);
            }else{
                throw new Error(`invalid route for ${obj.path} Method:${obj.method}`);
            }
        });
    });

    return router;
}



module.exports = registerRoutes;
