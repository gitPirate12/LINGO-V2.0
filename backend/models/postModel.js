const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    question: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "userInfoDetail",
      },
      replies: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Reply",
        default: [],
      },
      tags: {
        type: [String],
        default: [],
      },
      voteCount: {
        type: Number,
        default: 0,
      }
      

      
        
      
    
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);