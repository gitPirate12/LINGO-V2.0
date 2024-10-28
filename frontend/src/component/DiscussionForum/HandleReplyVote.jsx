import React from 'react';
import { useLogin } from '../../hooks/useLogin'; // Import the useLogin hook

function HandleReplyVote({ replyId, type }) {
  const { isLoading, error } = useLogin(); // Use the useLogin hook to handle user login

  const handleVote = async (voteType) => {
    try {
      // Extract token from localStorage
      const token = JSON.parse(localStorage.getItem('user'))?.token;

      // Check if token exists
      if (!token) {
        throw new Error('User not authenticated');
      }

      // Send a PATCH request to update the reply vote count
      const response = await fetch(`http://localhost:3040/api/replies/${replyId}/${voteType}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to vote on reply');
      }
      // Handle success, maybe update UI or show a success message
    } catch (error) {
      console.error('Error voting on reply:', error);
    }
  };

  return (
    <div>
      <button onClick={() => handleVote('upvote')} className="upvote-btn">Upvote</button>
      <button onClick={() => handleVote('downvote')} className="downvote-btn">Downvote</button>
    </div>
  );
}

export default HandleReplyVote;
