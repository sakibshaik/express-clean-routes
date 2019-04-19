const Utils = {};

Utils.validateRouteMethod = (method) => {
    return ["get", "post", "delete", "put"].indexOf(method.toLowerCase()) !== -1;
}

Utils.validateMiddlewares = (methods) => {
    let isValid = true;
    methods.forEach((obj) => {
        isValid = Utils.validateRouteHandler(obj);
    });
    return isValid;
}

Utils.validateRouteHandler = (functionToCheck) => !!(functionToCheck && functionToCheck.constructor && functionToCheck.call && functionToCheck.apply)

Utils.validatePath = (path) => Object.prototype.toString.call(path) === "[object String]"

module.exports = Utils;