import React from 'react';
import axios from 'axios';
import { useLogin } from '../../hooks/useLogin'; // Import the useLogin hook
import { IconButton } from '@mui/material'; // Import IconButton component from Material-UI
import { Delete } from '@mui/icons-material'; // Import Delete icon from Material-UI icons

function DeleteReply({ replyId }) {
  const { login } = useLogin(); // Use the useLogin hook to handle user login

  const handleDelete = async () => {
    try {
      // Check if the user is logged in before deleting the reply
      const user = JSON.parse(localStorage.getItem('user'));
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

      // Send DELETE request to delete the reply
      await axios.delete(`http://localhost:3040/api/replies/${replyId}`, config);

      // Optionally, you can handle success or display a message
      // Reload the page to fetch the latest data
      window.location.reload();
    } catch (error) {
      console.error('Error deleting reply:', error);
      // Optionally, you can handle errors or display an error message
    }
  };

  return (
    <IconButton onClick={handleDelete} color="primary">
      {/* Use Delete icon from Material-UI */}
      <Delete />
    </IconButton>
  );
}

export default DeleteReply;
