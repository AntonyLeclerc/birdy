const MessageModel = require("../models/msg.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");
const sharp = require("sharp");
const path = require("path");

module.exports.createMessage = async (req, res) => {
  //Crée un message
  

  //Vérifie si l'utilisateur essayant de créer son message existe dans la base de données
  if (!ObjectID.isValid(req.body.userId))
    return res
      .status(400)
      .send("ID d'utilisateur inconnue : " + req.body.userId);

  //Crée le message avec les données entrées
  const newPost = new MessageModel({
    userId: req.body.userId,
    message: req.body.msg,
    likers: [],
    comments: [],
  });

  try {
    //Sauvegarde le message, dans la base de données, et tente d'en ajouter l'id aux messages de l'utilisateur
    const post = await newPost.save();
    await UserModel.findByIdAndUpdate(req.body.userId, {
      $addToSet: { messages: post._id },
    });
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.getAllMessages = async (req, res) => {
  try {
    const msgs = await MessageModel.find().sort({ createdAt: -1 });
    res.json(msgs);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.getAllMessagesFromUser = async (req, res) => {
  //Permet de récupérer tous les messages d'un utilisateur dans la base de données

  //Vérifie si l'utilisateur existe dans la base de données
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID d'utilisateur inconnue : " + req.params.id);

  try {
    //Récupère les messages ayant pour "userId", l'id entrée dans l'URL
    const msgs = await MessageModel.find({ userId: req.params.id });
    res.json(msgs);
  } catch (err) {
    //Renvoie une erreur, si erreur il y'a
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteMessage = async (req, res) => {
  //Supprime un message

  //Vérifie si le message à supprimer existe
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnue : " + req.params.id);

  //Si le message existe
  try {
    //Récupère le message à supprimer, ainsi que l'ID de l'utilisateur, et une liste des utilisateurs ayant liké le message
    const foundMsg = await MessageModel.findById(req.params.id);
    const foundUser = await UserModel.findOne({ pinnedMessage: req.params.id });
    const userMessageId = foundMsg.userId;
    const likedByArray = foundMsg.likers;
    const sharedByArray = foundMsg.sharers;

    //Boucle permettant de retirer de la liste des messages "likés" des utilisateurs ayant "liké" le message, le message à supprimer
    for (let index = 0; index < likedByArray.length; index++) {
      try {
        await UserModel.findByIdAndUpdate(likedByArray[index], {
          $pull: { likes: req.params.id },
        });
      } catch (err) {
        return res.status(400).send("ID inconnue : " + req.params.id);
      }
    }

    for (let index = 0; index < sharedByArray.length; index++) {
      try {
        await UserModel.findByIdAndUpdate(sharedByArray[index], {
          $pull: { messages: req.params.id },
        });
      } catch (err) {
        return res.status(400).send("ID inconnue : " + req.params.id);
      }
    }

    //Supprime de la liste de messages de l'utilisateur ayant créé le message, l'ID du message supprimé
    await UserModel.findByIdAndUpdate(userMessageId, {
      $pull: { messages: req.params.id },
    });

    if (foundUser) {
      await UserModel.findByIdAndUpdate(foundMsg.userId, {
        $set: {
          pinnedMessage: "",
        },
      });
    }

    //Supprime le message
    await MessageModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Message supprimé." });
  } catch (err) {
    //Renvoi une erreur, si erreur il y'a
    return res.status(500).json({ message: err });
  }
};

module.exports.likeMessage = async (req, res) => {
  //Like un message

  //Vérifie si le message à liker existe
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnue : " + req.params.id);

  try {
    //Ajoute l'ID du "liker" dans la liste "likers" du message
    await MessageModel.findByIdAndUpdate(req.params.id, {
      $addToSet: { likers: req.body.id },
    });

    //Ajoute l'ID du message dans les "likes" du "liker"
    await UserModel.findByIdAndUpdate(req.body.id, {
      $addToSet: { likes: req.params.id },
    });

    res.status(200).json({ message: "Message liké" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports.unlikeMessage = async (req, res) => {
  //Like un message

  //Vérifie si le message à unliker existe
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnue : " + req.params.id);

  try {
    //Retire de la liste des "likers", l'ID de l'utilisateur qui "unlike" le message
    await MessageModel.findByIdAndUpdate(req.params.id, {
      $pull: { likers: req.body.id },
    });

    //Retire de la liste des "likes" de l'utilisateur ayant "liké" le message, ce même utilisateur
    await UserModel.findByIdAndUpdate(req.body.id, {
      $pull: { likes: req.params.id },
    });

    res.status(200).json({ message: "Message unliké" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports.updateMessage = async (req, res) => {
  //Permet de changer le contenu d'un message

  //Vérifie si le message à changer existe
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnue : " + req.params.id);

  try {
    //Trouve le message dans la base de données, et modifie son champ "message"
    await MessageModel.findByIdAndUpdate(req.params.id, {
      $set: { message: req.body.newMsg },
    });
    res.status(200).json({ message: "Message modifié." });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

module.exports.pingMessage = async (req, res) => {
  //Permet d'épingler un message sur son profil

  //Vérifie si le message à épingler existe
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnue : " + req.params.id);

  try {
    //Trouve le message dans la base de données, et modifie son champ "message"
    await UserModel.findByIdAndUpdate(req.body.userId, {
      $set: { pinnedMessage: req.params.id },
    });
    res.status(200).json({ message: "Message épinglé." });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

module.exports.cancelPingMessage = async (req, res) => {
  //Permet d'épingler un message sur son profil

  try {
    //Trouve le message dans la base de données, et modifie son champ "message"
    await UserModel.findByIdAndUpdate(req.params.id, {
      $set: { pinnedMessage: "" },
    });
    res.status(200).json({ message: "Message désépinglé." });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

module.exports.getPingedMessageFromUser = async (req, res) => {
  //Permet de récupérer le message épinglé d'un utilisateur

  //Vérifie si l'utilisateur du message épinglé à récupérer existe
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnue : " + req.params.id);

  try {
    //Trouve le message dans la base de données, et modifie son champ "message"
    const foundUser = await UserModel.findById(req.params.id);
    console.log(foundUser.pseudo);
    const msgs = await MessageModel.find({
      userId: foundUser._id,
      _id: { $eq: foundUser.pingedMessage },
    });
    res.json(msgs);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

module.exports.retweet = async (req, res) => {
  //Permet de retweet un message

  //Vérifie si le message existe
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnue : " + req.params.id);

  try {
    const post = await MessageModel.findById(req.params.id);
    await UserModel.findByIdAndUpdate(req.body.sharerId, {
      $addToSet: { messages: post._id },
    });

    await MessageModel.findByIdAndUpdate(req.params.id, {
      $addToSet: { sharers: req.body.sharerId },
    });
    res.status(200).json({ message: "Message retweeté" });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

module.exports.cancelRetweet = async (req, res) => {
  //Permet de dé-retweet un message
  //Vérifie si le message existe
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnue : " + req.params.id);

  try {
    const post = await MessageModel.findById(req.params.id);
    await UserModel.findByIdAndUpdate(req.body.sharerId, {
      $pull: { messages: post._id },
    });

    await MessageModel.findByIdAndUpdate(req.params.id, {
      $pull: { sharers: req.body.sharerId },
    });
    res.status(200).json({ message: "Message dé-retweeté" });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

module.exports.addCommentaire = async (req, res) => {
  //Vérifie si le message à commenter existe
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await MessageModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date()
          },
        },
      },)
        
      return res.status(200).json({message: "Commentaire posté"})
    } catch (err) {
        return res.status(400).send(err);
    }
};


module.exports.deleteCommentaire = async (req, res) => {
  //Vérifie si le commentaire à supprimer existe
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await MessageModel.findByIdAndUpdate(
      req.params.id,{
        $pull : {
          comments : {
            _id : req.body.commentId
          }
        }
      }
    )
    return res.status(200).json({message: "Commentaire supprimé !"})
  } catch (err) {
    return res.status(400).send(err);
  }
};

