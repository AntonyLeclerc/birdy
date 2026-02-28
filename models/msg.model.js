const mongoose = require(('mongoose'));

const msgSchema = new mongoose.Schema(
    {
        userId : {
            type: String,
            required: true,
        },
        message : {
            type: String,
            trim: true,
            maxLength: 300,
        },
        picture: {
            type: String,
        },
        likers : {
            type : [String],
            required: true,
        },
        comments : {
            type : [
                {
                    commenterId: String,
                    commenterPseudo: String,
                    text: String,
                    timestamp: Number,
                }
            ],
            required: true,
        },
        sharers : {
            type: [String],
            required: true,
            default: []
        }
    },
    {
        timestamps: true,
    }
)

const MessageModel = mongoose.model('messages',msgSchema);
module.exports = MessageModel;