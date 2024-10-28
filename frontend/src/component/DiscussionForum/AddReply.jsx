import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import the useNavigate and useParams hooks
import { useLogin } from '../../hooks/useLogin'; // Import the useLogin hook
import { Typography, TextField, Button, Box } from '@mui/material'; // Import Box component from MUI
import { ArrowBack } from '@mui/icons-material';

function AddReply({ parentReplyId, onSuccess }) {
  const { postId } = useParams(); // Extract postId from URL params
  const navigate = useNavigate(); // Initialize navigate function from useNavigate
  const [comment, setComment] = useState('');
  const { isLoading, error } = useLogin(); // Get login status and error from the useLogin hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the user is logged in before adding a reply
      if (!localStorage.getItem('user')) {
        // If not logged in, return and display an error message
        console.error('User is not logged in');
        return;
      }

      // Get the authentication token from local storage
      const authToken = JSON.parse(localStorage.getItem('user')).token;

      // Send a POST request to add the reply with the authentication token
      const response = await axios.post('http://localhost:3040/api/replies', {
        comment,
        parentid: postId,
        parentReplyId
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Optionally, you can handle success or display a message
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error('Error adding reply:', error);
      // Optionally, you can handle errors or display an error message
    }
  };

  const handleBack = () => {
    // Navigate back to the view post page
    navigate('/viewposts');
  };

  return (
    <div className='addReply' style={{ minHeight: '100vh', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Add Reply</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Reply"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your reply here..."
          required
          margin="normal"
        />
        <Box display="flex"  alignItems="center" mt={2}> {/* Wrap buttons in a Box with Flexbox styling */}
          <Button type="submit" variant="contained" disabled={isLoading} style={{ marginRight:'30px' }}>Submit Reply</Button>
          <Button onClick={handleBack} startIcon={<ArrowBack />}>Back</Button>
        </Box>
        {error && <Typography variant="body1" color="error">Error: {error}</Typography>}
      </form>
    </div>
  );
}

export default AddReply;
