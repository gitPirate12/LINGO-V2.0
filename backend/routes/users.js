const express = require('express');
const router = express.Router();

const User = require('../models/userModel');

// Import user controller functions
const {
    loginUser,
    signupUser,
    getAllUsers,
    getUserById,
    deleteUserProfile,
    updateUserProfile
} = require('../controllers/userController');

// Login route
router.post('/login', loginUser);

// Signup route
router.post('/signup', signupUser);
//get all users
router.get('/', getAllUsers);
// Get user profile
router.get('/:id', getUserById);

// Delete user profile
router.delete('/:id', deleteUserProfile);


// Update user profile
router.put('/:id',  updateUserProfile);

module.exports = router;
