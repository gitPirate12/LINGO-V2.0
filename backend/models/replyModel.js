const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const replySchema = new Schema({
    parentid: {
        type: Schema.Types.ObjectId, // Reference to the parent post
        ref: 'Post',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'userInfoDetail', // Reference to the user model collection
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    voteCount: {
        type: Number,
        default: 0
    },
    parentReplyId: {
        type: Schema.Types.ObjectId,
        ref: 'Reply' // Reference to the parent reply within the same model
    },
    replies: [{
        
            type: Schema.Types.ObjectId,
            ref: 'Reply', // Reference to the parent reply within the same model
            required: true
        } 
    ]
}, { timestamps: true });

module.exports = mongoose.model('Reply', replySchema);
