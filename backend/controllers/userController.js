const User = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
  }


// Login user
const loginUser = async (req, res) => {
    const {email, password} = req.body
  
    try {
      const user = await User.login(email, password)
  
      // create a token
      const token = createToken(user._id)
  
      res.status(200).json({email, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  
  }

// Signup user
const signupUser = async (req, res) => {
  const { email, password, firstName, lastName, city } = req.body;

  try {
      const user = await User.signup(email, password, firstName, lastName, city);

      // create a token
      const token = createToken(user._id);

      res.status(200).json({ email, token , password, firstName, lastName, city});
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}
  
  

// // Get user profile
// const getUserProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select('-password');
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         res.json(user);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send('Server Error');
//     }
// };

// Delete user profile
const deleteUserProfile = async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndRemove(id); // Use id extracted from route parameters
        res.json({ msg: 'User profile deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};


const updateUserProfile = async (req, res) => {
    try {
      const { firstName, lastName, city } = req.body;
  
      // Retrieve user from database
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update user details
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (city) user.city = city;
  
      // Save updated user details
      await user.save();
  
      res.json({ msg: 'User profile updated successfully', user });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };
  

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Get single user by ID
const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}


module.exports = {
    loginUser,
    signupUser,
    getAllUsers,
    getUserById,
    deleteUserProfile,
    updateUserProfile
}
