const Post = require('../models/postModel')
const mongoose = require('mongoose')
const requireAuth = require('../middleware/requireAuth')



//get all posts
const getposts = async (req, res) => {
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



//get a single post
const getPost = async(req,res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such post'})
    }
    const post = await Post.findById(id)

    if (!post) {
        return res.status(404).json({error: 'No such post'})
    }

    res.status(200).json(post)
}



// Create new post 
const createPost = async (req, res) => {
    const { question, description, tags } = req.body; // Destructure tags from req.body
    const author = req.user._id; // Get the authenticated user's ID from the request

    // Add document to the database
    try {
        const post = await Post.create({ question, description, author, tags }); // Pass tags to Post.create
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


//delete a post

const deletePost = async(req,res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such post'})
    }

    const post = await Post.findOneAndDelete({_id: id})

    if (!post) {
        return res.status(404).json({error: 'No such post'})
    }

    res.status(200).json(post)
}
//update a post
const updatePost = async(req,res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such post'})
    }

    const post = await Post.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if (!post) {
        return res.status(404).json({error: 'No such post'})
    }

    res.status(200).json(post)
}



const increaseVoteCount = async (req, res) => {
    try {
        // Extract the post ID from the request parameters
        const { id } = req.params;

        // Check if the received ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such post' });
        }

        // Find the post in the database based on the provided ID
        const post = await Post.findById(id);

        // If no post is found with the provided ID, return a 404 error
        if (!post) {
            return res.status(404).json({ error: 'No such post' });
        }

        // Increment the voteCount by 1
        post.voteCount += 1;

        // Save the updated post
        await post.save();

        // Return the updated post with a 200 status
        res.status(200).json(post);
    } catch (error) {
        // If an error occurs during the execution of the function, return a 500 error
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const decreaseVoteCount = async (req, res) => {
    try {
        // Extract the post ID from the request parameters
        const { id } = req.params;

        // Check if the received ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such post' });
        }

        // Find the post in the database based on the provided ID
        const post = await Post.findById(id);

        // If no post is found with the provided ID, return a 404 error
        if (!post) {
            return res.status(404).json({ error: 'No such post' });
        }

        // Ensure voteCount never goes below 0
        if (post.voteCount > 0) {
            // Decrement the voteCount by 1
            post.voteCount -= 1;
        }

        // Save the updated post
        await post.save();

        // Return the updated post with a 200 status
        res.status(200).json(post);
    } catch (error) {
        // If an error occurs during the execution of the function, return a 500 error
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = {
    getposts,
    getPost,
    createPost,
    deletePost,
    updatePost,
    increaseVoteCount,
    decreaseVoteCount
   
}