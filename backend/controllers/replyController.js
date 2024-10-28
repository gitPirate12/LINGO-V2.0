const Reply = require('../models/replyModel')
const mongoose = require('mongoose')
const requireAuth = require('../middleware/requireAuth')
const Post = require('../models/postModel')




//get all replies
const getReplies = async (req, res) => {
  
    try {
        const replies = await Reply.find({}).sort({ createdAt: -1 });
        res.status(200).json(replies);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



//get a single reply
const getReply = async(req,res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such reply'})
    }
    const reply = await Reply.findById(id)

    if (!reply) {
        return res.status(404).json({error: 'No such reply'})
    }

    res.status(200).json(reply)
}



const createReply = async (req, res) => {
  // Get author from authenticated user
  const author = req.user._id;
  // Destructure other fields from request body
  const { comment, parentid, parentReplyId } = req.body;

  try {
    // Create new reply with author from req.user
    const reply = await Reply.create({
      author,
      comment,
      parentid,
      parentReplyId  // Include parent reply ID in the new reply
    });



    // Get ID of new reply
    const replyId = reply._id;

    // If the new reply has a parent reply, find and update the parent reply's replies array
    if (parentReplyId) {
      const parentReply = await Reply.findById(parentReplyId);
      if (!parentReply) {
        return res.status(404).json({ error: 'Parent reply not found' });
      }
      parentReply.replies.push(replyId);
      await parentReply.save();
    }

    // If the new reply has a parent post, find and update the parent post's replies array
    if (parentid) {
      const post = await Post.findById(parentid);
      if (!post) {
        return res.status(404).json({ error: 'Parent post not found' });
      }
      post.replies.push(replyId);
      await post.save();
    }

    res.status(201).json(reply);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};




//delete a reply

const deleteReply = async(req,res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such reply'})
    }

    const reply = await Reply.findOneAndDelete({_id: id})

    if (!reply) {
        return res.status(404).json({error: 'No such reply'})
    }

    res.status(200).json(reply)
}
//update a reply
const updateReply = async(req,res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such reply'})
    }

    const reply = await Reply.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if (!reply) {
        return res.status(404).json({error: 'No such reply'})
    }

    res.status(200).json(reply)
}

const updateReplyVoteCount = async (req, res) => {

    const { id } = req.params;
  
    try {
  
      let updateQuery = {};
  
      if(req.originalUrl.includes('upvote')) {
        updateQuery = { $inc: {voteCount: 1} };
      }
  
      if(req.originalUrl.includes('downvote')) {  
        updateQuery = { $inc: {voteCount: -1} };
      }
  
      const updatedReply = await Reply.findByIdAndUpdate(id, updateQuery, {new: true});
  
      res.status(200).json(updatedReply);
  
    } catch (error) {
      // error handling
    }
  
  }

  const getRepliesByPostId = async (req, res) => {
    const { postId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(404).json({ error: 'Invalid post ID' });
        }

        // Find the post by its ID and populate the 'replies' field with 'author' information
        const post = await Post.findById(postId).populate({
            path: 'replies',
            populate: {
                path: 'author',
                model: 'userInfoDetail'
            }
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(post.replies);
    } catch (error) {
        console.error('Error fetching replies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createNestedReply = async (req, res) => {
  // Get author from authenticated user
  const author = req.user._id;
  // Destructure postId, parentReplyId, and other fields from request params and body
  const { postId, parentReplyId } = req.params;
  const { comment } = req.body;

  try {
    // Check if postId is valid
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(404).json({ error: 'Invalid post ID' });
    }

    // Check if parentReplyId is valid
    if (parentReplyId && !mongoose.Types.ObjectId.isValid(parentReplyId)) {
      return res.status(404).json({ error: 'Invalid parent reply ID' });
    }

    // Create new reply with author and other fields
    const reply = await Reply.create({
      author,
      comment,
      parentid: postId,
      parentReplyId // Include parent reply ID in the new reply
    });

    // Get ID of new reply
    const replyId = reply._id;

    // If the new reply has a parent reply, find and update the parent reply's replies array
    if (parentReplyId) {
      const parentReply = await Reply.findById(parentReplyId);
      if (!parentReply) {
        return res.status(404).json({ error: 'Parent reply not found' });
      }
      parentReply.replies.push(replyId);
      await parentReply.save();
    }

    // If the new reply has a parent post, find and update the parent post's replies array
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Parent post not found' });
    }
    post.replies.push(replyId);
    await post.save();

    res.status(201).json(reply);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const getNestedReplies = async (replyId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(replyId)) {
      throw new Error('Invalid reply ID');
    }

    const reply = await Reply.findById(replyId).populate({
      path: 'replies',
      populate: {
        path: 'author',
        model: 'userInfoDetail'
      }
    });

    if (!reply) {
      throw new Error('Reply not found');
    }

    return reply.replies;
  } catch (error) {
    console.error('Error fetching nested replies:', error);
    throw new Error('Internal Server Error');
  }
};




module.exports = {
    getReplies,
    getReply,
    createReply,
    deleteReply,
    updateReply,
    updateReplyVoteCount,
    getRepliesByPostId,
    createNestedReply,
    getNestedReplies
}