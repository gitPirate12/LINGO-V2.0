import React, { useState } from 'react';
import axios from 'axios';
import { useLogin } from '../../hooks/useLogin'; // Import the useLogin hook

function EditReply({ replyId }) {
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);
  const { login } = useLogin(); // Use the useLogin hook to handle user login

  const handleEdit = async () => {
    try {
      // Check if the user is logged in before editing the reply
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        // If user is not logged in, display a message or redirect to login page
        setError('Please log in to edit the reply');
        return;
      }

      // Attach the authentication token to the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // Send a PATCH request to update the reply
      await axios.patch(`http://localhost:3040/api/replies/${replyId}`, {
        comment: newComment
      }, config);

      // Handle success, maybe close the edit form or show a success message
      window.location.reload(); // Refresh the page after successful edit
    } catch (error) {
      console.error('Error editing reply:', error);
      setError('Error editing reply');
    }
  };

  return (
    <div>
      <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
      <button onClick={handleEdit}>Save</button>
      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default EditReply;
