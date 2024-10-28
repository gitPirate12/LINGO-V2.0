import React from 'react';
import axios from 'axios';
import { useLogin } from '../../hooks/useLogin'; // Import the useLogin hook
import { IconButton } from '@mui/material'; // Import IconButton component from Material-UI
import { Delete } from '@mui/icons-material'; // Import Delete icon from Material-UI icons

function DeletePost({ postId }) {
  const { isLoading, error } = useLogin(); // Use the useLogin hook to handle user login

  const handleDelete = async () => {
    try {
      // Extract user details from local storage
      const userData = localStorage.getItem('user');

      // Parse the user details into JSON format
      const user = JSON.parse(userData);

      // Check if the user is logged in before deleting the post
      if (!user) {
        // If user is not logged in, redirect to login page or display a message
        return;
      }

      // Attach the authentication token to the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // Send DELETE request to delete the post
      await axios.delete(`http://localhost:3040/api/posts/${postId}`, config);
      
      // Optionally, you can handle success or display a message
      // Reload the page to fetch the latest data
      window.location.reload();
    } catch (error) {
      console.error('Error deleting post:', error);
      // Optionally, you can handle errors or display an error message
    }
  };

  return (
    <IconButton onClick={handleDelete} disabled={isLoading}>
      {/* Use IconButton with Delete icon */}
      <Delete color="primary" sx={{ fontSize: 40 }} />
    </IconButton>
  );
}

export default DeletePost;
