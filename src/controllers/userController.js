const userModel = require('../models/userModel');
const jobModel = require('../models/jobModel');
const jwt = require('jsonwebtoken');

const createUser = async function (req, res) {
    try {
        const body = req.body;

        const {name, email, password, resume, coverLetter} = body;
    
        if (!name) return res.status(400).send({status: false, message: 'name is required'});
        if (!validName(name)) return res.status(400).send({status: false, message: 'please enter a valid name'});
    
        if (!email) return res.status(400).send({status: false, message: 'email is required'});
        if (!validMail(email)) return res.status(400).send({status: false, message: 'please enter a valid email'});
    
        if (!password) return res.status(400).send({status: false, message: 'password is required'});
        if (!validPassword) return res.status(400).send({status: false, message: 'password must contain at least one upper case, one lower case, one number and one special character'});
        

        const user = await userModel.findOne({email: email});
        if (!user) return res.status(404).send({status: false, message: 'email must be unique'});
    
        const userCreated = await userModel.create(body);
        res.status(201).send({status: true, data: userCreated});
    } catch (error) {
      res.status(500).send({status: false, message: error.message});  
    };
};

const loginUser = async function (req, res) {
    try {
        const body = req.body;

        const {email, password} = body;
    
        if (!email) return res.status(400).send({status: false, message: 'email is required'});
        if (!validMail(email)) return res.status(400).send({status: false, message: 'please enter a valid email'});
    
        if (!password) return res.status(400).send({status: false, message: 'password is required'});
        
        const user = await userModel.findOne({email: email, password: password});
        
        if (!user) return res.status(400).send({status: false, message: 'email or password is invalid'});
    
        const token = jwt.sign({userId: email}, 'key');
    
        res.setHeader('x-uth-token', token);
        res.status(200).send({status: true, data: token});
    } catch (error) {
        res.status(500).send({status: false, message: error.message});
    };
};

