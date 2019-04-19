const middleware = require('../middlewares')
const controller = require('../controllers')

const paths = [
    {
        'path' : '/health/status',
        'method' : 'get',
        'middlewares' : [],
        'handlers' : controller.processStatus
    },
    {
        'path' : '/health/version',
        'method' : 'get',
        'middlewares' : [],
        'handlers' : controller.processVersion
    }
]


module.exports = paths;
