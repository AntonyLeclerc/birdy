const UserModel = require('../models/user.model');
const MessageModel = require('../models/msg.model');
const ObjectID = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');

module.exports.getAllUsers = async (req, res) => {
    //Retourne la liste des utilisateurs, sans leurs mots de passe
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
};

module.exports.userInfo = async (req, res) => {
    //Retourne les informations d'un utilisateur en particulier

    //Vérifie si l'utilisateur existe, renvoie une erreur s'il n'existe pas
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnue : ' + req.params.id)

    //Renvoie les données d'un utilisateur, sans son mot de passe
    const foundUser = await UserModel.findById(req.params.id).select('-password');
    res.json(
        foundUser,
    )
};

module.exports.deleteUser = async (req,res) => {

    //Supprime un utilisateur, ainsi que tous ses messages

    //Vérfie si l'utilisateur existe
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnue : ' + req.params.id)

    //Si l'utilisateur existe
    try{
        //On récupère notre utilisateur à supprimer, ainsi que tous ses messages
        const userToDelete = await UserModel.findById(req.params.id);
        const UserMessages = await MessageModel.find({userId: req.params.id});
        const allMessages = await MessageModel.find();
        //Boucle permettant de supprimer des "likes" les messages de l'utilisateur à supprimer, de chaque utilisateur ayant liké des messages de l'utilisateur à supprimer
        for(let indexMsgs = 0; indexMsgs < UserMessages.length; indexMsgs++){
            for(let indexUser = 0; indexUser < UserMessages[indexMsgs].likers.length; indexUser++){
                try{
                    await UserModel.findByIdAndUpdate(
                        UserMessages[indexMsgs].likers[indexUser],
                        {
                            $pull : { likes: UserMessages[indexMsgs]._id }
                        }
                    )
                } catch (err){
                    return res.status(500).json({ message: err });
                }
            }
        }

        for(let indexMsgs = 0; indexMsgs < UserMessages.length; indexMsgs++){
            for(let indexUser = 0; indexUser < UserMessages[indexMsgs].sharers.length; indexUser++){
                try{
                    await UserModel.findByIdAndUpdate(
                        UserMessages[indexMsgs].sharers[indexUser],
                        {
                            $pull : { messages: UserMessages[indexMsgs]._id }
                        }
                    )
                } catch (err){
                    return res.status(500).json({ message: err });
                }
            }
        }

        //Supprime ensuite les messages de l'utilisateur
        await MessageModel.deleteMany({ userId: req.params.id });

        //Supprime les likes de l'utilisateur, et l'utilisateur des "likers" des messages likés
        const likedArray = userToDelete.likes;
        for(let indexLikes = 0; indexLikes < likedArray.length; indexLikes++){
            try{
                await MessageModel.findByIdAndUpdate(
                    likedArray[indexLikes],
                    { $pull : { likers: req.params.id } }
                )
            } catch (err) {
                return res.status(500).json({ message: err });
            }
        }

        for(let sharedMessages = 0; sharedMessages < UserMessages; sharedMessages ++){
            for (let sharedByMessages = 0; sharedByMessages < UserMessages[sharedMessages]; sharedByMessages++){
                try{
                    await UserModel.findByIdAndUpdate(UserMessages[sharedMessages][sharedByMessages],{
                        $pull : {messages: UserMessages[sharedMessages][sharedByMessages]}
                    })
                } catch (err) {
                    return res.status(500).json({message :err});
                }
            }
        }

        //Supprime les liens de "following" et "follower" entre l'utilisateur à supprimer, et les autres utilisateurs
        const followingArray = userToDelete.following;
        for(let index = 0; index < followingArray.length; index++){
            try{
                await UserModel.findByIdAndUpdate(
                    followingArray[index],
                    { $pull : { followers: req.params.id }},
                )
                await UserModel.findByIdAndUpdate(
                    followingArray[index],
                    { $pull : { following: req.params.id }},
                )

                
            } catch (err){
                return res.status(500).json({ message: err });
            }
        }
        
        const followersArray = userToDelete.followers;
        for(let index = 0; index < followersArray.length; index++){
            try{
                await UserModel.findByIdAndUpdate(
                    followersArray[index],
                    { $pull : { followers: req.params.id }},
                )

                
                await UserModel.findByIdAndUpdate(
                    followersArray[index],
                    { $pull : { following: req.params.id }},
                )

                
            } catch (err){
                return res.status(500).json({ message: err });
            }
        }


        console.log("Suppression commentaires")
        for (let i = 0; i < allMessages.length; i++){
            console.log("i")
            for (let j = 0; j < allMessages[i].comments.length; j++){
                if (allMessages[i].comments[j].commenterId == req.params.id){
                    console.log("here")
                    await MessageModel.findByIdAndUpdate(
                        allMessages[i]._id,{
                          $pull : {
                            comments : {
                              commenterId : req.params.id
                            }
                          }
                        }
                      )
                }
            }
        }


        //Supprime l'utilisateur
        
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    
        
        res.status(200).json({ message: "Utilisateur supprimé." });
    } catch (err){

        //Renvoi d'une erreur si une erreur a été renvoyée
        return res.status(500).json({ message: err });
    }
};

module.exports.follow = async (req, res) => {
    //Permet de suivre un utilisateur

    //Vérifie si l'utilisateur existe
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow))
        return res.status(400).send("L'une des deux ID est inconnue");

    //Vérifie si l'utilisateur veut se suivre lui-même
    if (req.body.idToFollow === req.params.id)
        return res.status(400).send("L'utilisateur essaye de se suivre lui même");
    
    //Si l'utilisateur existe
    try{
        //Ajoute aux "follows" de l'utilisateur, l'ID de l'utilisateur à suivre
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet : { following: req.body.idToFollow }},
        );

        //Ajoute aux "followers" de l'utilisateur à suivre, l'utilisateur
        await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet : { followers: req.params.id }},
        )

        res.status(200).json({ message: "Utilisateur suivi." , data: res.data});
    } catch (err){
        return res.status(500).json({ message: err });
    }
};

module.exports.unfollow = async (req, res) => {
    //Permet de suivre un utilisateur

    //Vérifie si l'utilisateur existe
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnfollow))
        return res.status(400).send("L'une des deux ID est inconnue");
    
    //Si l'utilisateur existe
    try{

        //Enlève des "follows" de l'utilisateur, l'ID de l'utilisateur à "dé-suivre"
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull : { following: req.body.idToUnfollow }},
        );

        //Enlève des "followers" de l'utilisateur à "dé-suivre", l'utilisateur
        await UserModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull : { followers: req.params.id }},
        )

        res.status(200).json({ message: "Utilisateur dé-suivi." });
    } catch (err){
        return res.status(500).json({ message: err });
    }
};

module.exports.setBio = async (req, res) => {
    //Permet de changer la bio d'un utilisateur
    
    //Vérifie si l'utilisateur existe
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnue : ' + req.params.id);
    
    try{
        //Modifie la bio de l'utilisateur selon la nouvelle bio renseignée
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $set : { bio: req.body.bio }},
        );
        res.status(200).json({ message: "Bio changée" });

    } catch (err){
        console.log("err");
        return res.status(500).json({ message: err });

    }
    
};

module.exports.changePassword = async (req, res) => {
    //Permet de changer le mot de passe d'un utilisateur
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnue : ' + req.params.id);
    
    //Récupère le mot de passe renseigné
    const { enteredPassword } = req.body;

    try{
        //Génère un "salt" permettant de crypter le mot de passe
        const salt = await bcrypt.genSalt();

        //Récupère l'utilisateur dont on veut changer le mot de passe
        const foundUser = await UserModel.findOne({_id: req.params.id});

        //Génère le nouveau mot de passe
        const newPassword = await bcrypt.hash(enteredPassword, salt);
        
        //Change le mot de passe de l'utilisateur par le nouveau
        await UserModel.findByIdAndUpdate(
            foundUser._id,
            { $set : { password: newPassword }},
        );
        
        res.status(200).json({ message: "Password changé" });
    } catch (err){
        console.log("err");
        return res.status(500).json({ message: err });

    }
}

module.exports.changePseudo = async (req, res) => {
    //Permet de changer le pseudo d'un utilisateur

    //Vérifie si l'utilisateur dont on veut changer le pseudo existe
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnue : ' + req.params.id);
    
    try{
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $set : { pseudo: req.body.pseudo }},
        );
        return res.status(200).json({message: "Pseudo changé"});
    } catch (err) {
        return res.status(400).json({message: err})
    }
}

module.exports.addBanWord = async (req, res) => {
    //Permet de bannir un mot, dont les messages le comportant seront non affichés

    //Vérifie si l'utilisateur existe
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnue : ' + req.params.id);

    
    try{
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet : { blockedWords: req.body.banWord.toLowerCase() }},
        );
        return res.status(200).json({message: `Le mot "${req.body.banWord.toLowerCase()}" est désormais bloqué`});
    } catch (err) {
        return res.status(400).json({message: err})
    }
}

module.exports.pullBanWord = async (req, res) => {
    //Permet de changer le bannir un mot, dont les messages en comportant seront non affichés

    //Vérifie si l'utilisateur existe
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnue : ' + req.params.id);

    
    try{
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull : { blockedWords: req.body.banWord.toLowerCase() }},
        );
        return res.status(200).json({message: `Le mot "${req.body.banWord.toLowerCase()}" est désormais débloqué`});
    } catch (err) {
        return res.status(400).json({message: err})
    }

}

module.exports.changeEmail = async (req, res) => {
    //Permet de changer le pseudo d'un utilisateur

    //Vérifie si l'utilisateur dont on veut changer le pseudo existe
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnue : ' + req.params.id);
    
    try{
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $set : { email: req.body.email }},
        );
        return res.status(200).json({message: "Email changé"});
    } catch (err) {
        return res.status(400).json({message: err})
    }
}