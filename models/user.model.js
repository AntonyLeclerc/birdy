const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20,
            unique: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        picture :{
            type: String,
            default: "./uploads/profil/random-user.png",
        },
        bio: {
            type: String,
            default: "",
            max: 1024,
        },
        messages : {
            type: [String],
        },
        pinnedMessage: {
            type: String,
            default: "",
        },
        followers: {
            type: [String],
        },
        following: {
            type: [String]
        },
        likes:{
            type: [String]
        },
        blockedWords:{
            type: [String],
            default: []
        }
    },{
        timestamps:true,
    }
)

userSchema.pre("save",  async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password){
    //Permet de connecter un utilisateur

    //Cherche dans la requête, si l'utilisateur a renseigné son pseudo, ou son email
    const userEmail = await this.findOne({email});

    //Si email
    if(userEmail){
        //Compare le couple (email, password) renseigné à celui dans la base de données
        const authEmail = await bcrypt.compare(password, userEmail.password);
        if (authEmail){
            //Retourne notre utilisateur si les informations données correspondent
            return userEmail;
        }

        throw Error('incorrect password');
    }

    throw Error('incorrect email');
};

const UserModel = mongoose.model('user',userSchema);
module.exports = UserModel;