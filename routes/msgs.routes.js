const router = require('express').Router();
const msgController = require('../controllers/msg.controller');
const multer = require('multer');
const upload = multer();

router.post('/', msgController.createMessage);
router.get('/', msgController.getAllMessages);
router.get('/:id', msgController.getAllMessagesFromUser);
router.put('/update-msg/:id', msgController.updateMessage)
router.delete('/:id', msgController.deleteMessage);
router.put('/like-msg/:id', msgController.likeMessage)
router.put('/unlike-msg/:id', msgController.unlikeMessage)
router.put('/ping/:id', msgController.pingMessage);
router.put('/unping/:id', msgController.cancelPingMessage);
router.put('/share/:id', msgController.retweet);
router.put('/unshare/:id', msgController.cancelRetweet);


//Commentaires
router.put("/comment/:id", msgController.addCommentaire);
router.delete("/deleteComment/:id", msgController.deleteCommentaire);

module.exports = router;