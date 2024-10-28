const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {
    getposts,
    getPost,
    createPost,
    deletePost,
    updatePost,
    increaseVoteCount,
    decreaseVoteCount
} = require('../controllers/postController');

// Get all posts
router.get('/', getposts);

// Get a single post
router.get('/:id', getPost);

// Post a new post
router.post('/', requireAuth, createPost); // Applying requireAuth middleware

// Delete a post
router.delete('/:id', requireAuth, deletePost); // Applying requireAuth middleware

// Update a post
router.patch('/:id', requireAuth, updatePost); // Applying requireAuth middleware

// UpdateVoteCount of a post
router.patch('/:id/increaseVoteCount',requireAuth, increaseVoteCount);

// UpdateVoteCount of a post
router.patch('/:id/decreaseVoteCount',requireAuth, decreaseVoteCount);

    

module.exports = router;
