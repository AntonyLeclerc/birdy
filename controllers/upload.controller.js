const UserModel = require("../models/user.model");
const sharp = require("sharp");
const path = require("path");

module.exports.uploadProfil = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("Aucun fichier n'a été envoyé");
  }

  const validMimeTypes = ["image/jpg", "image/jpeg", "image/png"];
  if (!validMimeTypes.includes(req.file.mimetype)) {
    return res.status(400).send("Le type de fichier n'est pas valide");
  }

  if (req.file.size > 500000) {
    return res.status(400).send("La taille du fichier est trop grande");
  }

  const fileName = `${req.body.name}.jpg`;
  const filepath = path.join(
    __dirname,
    "..",
    "client",
    "public",
    "uploads",
    "profil",
    fileName
  );

  try {
    await sharp(req.file.buffer)
      .resize({ width: 150, height: 150 })
      .toFile(filepath);
  } catch (err) {
    return res.status(400).send(err);
  }

  try {
    await UserModel.findByIdAndUpdate(req.body.userId, {
      $set: { picture: "./uploads/profil/" + fileName },
    });
    return res.status(200).send({ message: "Photo de profil changée." });
  } catch (err) {
    return res.status(400).send({ message: err });
  }
};
