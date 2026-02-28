const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require('multer');
const upload = multer();

//Création compte & Connexion / D2connexion
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.delete("/logout", authController.logout);

//Actions de l'utilisateur
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.delete("/:id", userController.deleteUser);
router.put("/follow/:id", userController.follow);
router.put("/unfollow/:id", userController.unfollow);
router.put("/:id", userController.setBio);
router.put("/password/:id", userController.changePassword);
router.put("/pseudo/:id", userController.changePseudo);
router.put("/email/:id", userController.changeEmail);
router.put("/banword/:id", userController.addBanWord);
router.put("/unbanword/:id", userController.pullBanWord);

//upload
router.post('/upload', upload.single('file'), uploadController.uploadProfil);

module.exports = router;
