# express-clean-routes

[![Build Status](https://travis-ci.com/sakibshaik/express-clean-routes.svg?token=xgYW8ST28NstUyTtHiqH&branch=master)](https://travis-ci.com/sakibshaik/express-clean-routes)
[![Coverage Status](https://coveralls.io/repos/github/sakibshaik/express-routes-mapper/badge.svg?branch=master)](https://coveralls.io/github/sakibshaik/express-routes-mapper?branch=master)

##### `Easy to use library that helps to write clean routes for express applications.`

## Install

```sh
$ npm i -s express-clean-routes
```

## Supported HTTP Methods

`get`
`post`
`delete`
`put`

## Clean route definition

```js
const path = [
    {
        'path' : '/users/info',
        'method' : 'get',
        'middlewares' : [middleware.checkAuth],
        'handlers' : controller.getUserInfo
    }
]
```

'path' can take Dynamic Routes like:
```js
 const path = [
     {
         'path' : '/users/:id',
         'method' : 'get',
         'middlewares' : [middleware.checkAuth],
         'handlers' : controller.getUserInfo
     }
 ]

```

'middlewares' can take multiple middleware functions:
```js
 const path = [
     {
         'path' : '/users/:id',
         'method' : 'get',
         'middlewares' : [middleware.checkAuth, middleware.validateData],
         'handlers' : controller.getUserInfo
     }
 ]

```

## Usage



express-clean-routes can be used with any project structure, here lets consider the following structure 

```sh
.
+-- server
|   |
|   |
|   +-- controllers
|   |   +-- index.js
|   |   +-- users.js
|   |
|   +-- middlewares
|   |   |   +-- index.js
|   |
|   +-- public
|   |
|   +-- routes
|   |   +-- index.js
|   |   +-- users.js
|   |   +-- healthcheck.js
|   |
|   app.js
|
package.json
```

#### Setting up routes

The users.js file in routes directory:

```js

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


```

The healthcheck.js file in routes directory:

```js

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

```

The index.js file in routes directory:

```js

var paths = [];

paths.push(require('./healthcheck'));
paths.push(require('./users'));

module.exports = paths;


```

#### Setting up the middlewares

The index.js file in middlewares directory:

```js

const Middleware = {};

Middleware.checkAuth = (req, res, next)=>{
    if(req.query.fail === 'true'){
        return res.status(401).send({message:"Auth Failed"});
    }
    next();
};


Middleware.checkData = (req, res, next)=>{
    const body = req.body;
    if(!body.hasOwnProperty("first_name")){
        return res.status(400).send({message:"bad request"});
    }
    next();
};


module.exports = Middleware;

```


#### Setting up express to use express-clean-routes (Option 1)

Your app.js will look similar to this:

```js
const express = require('express');
const http = require('http');
const cleanroutes = require('express-clean-routes');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use('/', cleanroutes(routes));

const server = http.Server(app);
const port = 3000;

server.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});

```

#### Setting up express to use express-clean-routes (Option 2)

Your app.js will look similar to this:

```js
const express = require('express');
const http = require('http');
const cleanroutes = require('express-clean-routes');
const routes = [];

const app = express();

app.use(express.json());

// include routes here
routes.push(require('./routes/healthcheck'));
routes.push(require('./routes/users'));
app.use('/', cleanroutes(routes));

const server = http.Server(app);
const port = 3000;

server.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});

```

#### Setting up express to use express-clean-routes (Option 3)

Your app.js will look similar to this:

```js
const express = require('express');
const http = require('http');
const cleanroutes = require('express-clean-routes');
const healthRouter = require('./routes/healthcheck');
const userRouter = require('./routes/users');

const app = express();

app.use(express.json());

app.use('/', cleanroutes([healthRouter, userRouter]));

const server = http.Server(app);
const port = 3000;

server.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});

```


See [Example](https://github.com/sakibshaik/express-clean-routes/tree/master/example).

## License
#### ISC License (ISC)
##### © 2019 Shaik Sakib

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.