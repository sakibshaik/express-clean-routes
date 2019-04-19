const Controller = {};

Controller.processStatus = (req, res)=>{
    res.status(200).send({message:"app running"});
};

Controller.processVersion = (req, res)=>{
    res.status(200).send({version:"1.0"});
};


module.exports = Controller;