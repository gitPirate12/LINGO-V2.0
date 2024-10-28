const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const {
    getReplies,
    getReply,
    createReply,
    deleteReply,
    updateReplyVoteCount ,
    getRepliesByPostId,
    createNestedReply,
    getNestedReplies,
    updateReply
} = require('../controllers/replyController');

const router = express.Router();

// Get all replies
router.get('/', getReplies);

// Get a single reply
router.get('/:id', getReply);

// Get  reply by post id
router.get('/post/:postId', getRepliesByPostId);

router.get('/nested/:replyId', getNestedReplies);

// Post a new reply
router.post('/', requireAuth, createReply); // Applying requireAuth middleware
// Post a new nested reply
router.post('/:postId/:parentReplyId', requireAuth, createNestedReply); // Applying requireAuth middleware

// Delete a reply
router.delete('/:id', deleteReply); // Applying requireAuth middleware

// Upvote reply
router.patch('/:id/upvote', requireAuth, updateReplyVoteCount);

// Downvote reply
router.patch('/:id/downvote', requireAuth, updateReplyVoteCount);

router.patch('/:id', requireAuth, updateReply);

module.exports = router;
