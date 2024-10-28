const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const emojiSchema = new Schema({
    emoji: {
        type: String,
        required: true
    },
    meaningEng: {
        type: String,
        required: true
    },
    meaningSin: {
        type: String,
        required: true
    }
});

const Emoji = mongoose.model("Emoji", emojiSchema);

module.exports = Emoji;