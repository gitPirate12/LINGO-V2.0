const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CultureSchema = new Schema({
    GalleWord: {
        type: String,
        required: false
    },
    NO :{
        type:String,
        required:true
    }
});

const Word = mongoose.model("CulturalWords", CultureSchema);

module.exports = Word;