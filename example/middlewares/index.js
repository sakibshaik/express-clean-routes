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