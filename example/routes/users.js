const middleware = require('../middlewares')
const controller = require('../controllers/users')

const paths = [
    {
        'path' : '/users/info',
        'method' : 'get',
        'middlewares' : [middleware.checkAuth],
        'handlers' : controller.getUserInfo
    },
    {
        'path' : '/users/info',
        'method' : 'post',
        'middlewares' : [middleware.checkAuth, middleware.checkData],
        'handlers' : controller.processUserInfo
    }
]


module.exports = paths;
