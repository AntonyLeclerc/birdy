const UserModel = require('../models/user.model');
require('dotenv').config({path: './config/.env'})
const jwt = require('jsonwebtoken');


const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    //Crée un token de connexion

    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge //3 jours
    })
};


module.exports.signUp = async (req,res) => {
    //Crée un nouvel utilisateur 
    const {pseudo,email,password} = req.body;

    try{
        //Crée un nouvel utilisateur avec le tuple (pseudo,email,password), le password sera crypté
        const user = await UserModel.create({ pseudo,email,password });
        res.status(201).json({user:user._id});
    }
    catch(err){
        res.status(400).send({err});
    }
}

module.exports.signIn = async (req, res) => {
    //Connecte un utilisateur
    
    const { email, password } = req.body;

    try {
        //Vérifie si le couple (email, password) existe dans la base de données
        const user = await UserModel.login(email, password);

        //Si le couple existe, crée un token de connexion, et renvoie l'utilsateur connecté
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge});
        res.status(200).json({ user: user._id });
    } catch (err) {
        res.status(400).json({ message: err})
    }
};

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}