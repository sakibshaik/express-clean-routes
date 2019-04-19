const Controller = {};

Controller.processUserInfo = (req, res)=>{
    res.status(200).send(req.body);
};

Controller.getUserInfo = (req, res)=>{
    res.status(200).send({id:"124", first_name:'sakib', second_name:"sakib", city:"london", country:"UK"});
};


module.exports = Controller;