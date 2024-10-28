import React from 'react';
import axios from 'axios';
import { useLogin } from '../../hooks/useLogin'; // Import the useLogin hook
import { Button } from '@mui/material'; // Import Button component from Material-UI
import { ThumbUp, ThumbDown } from '@mui/icons-material'; // Import icons for voting

function HandleVote({ postId, type }) {
  const { isLoading, error, login } = useLogin(); // Get login function, loading state, and error from the useLogin hook

  const handleVote = async (type) => {
    try {
      // Check if the user is logged in before allowing to vote
      if (error) {
        // Handle the case when there is an error
        console.log('Error:', error);
        return;
      }

      // Check if the user is still loading
      if (isLoading) {
        // Handle the case when the login status is still loading
        console.log('Loading...');
        return;
      }

      // Determine if the user is logged in based on the presence of user data in local storage
      const isLoggedIn = !!localStorage.getItem('user');

      // If the user is not logged in, call the login function
      if (!isLoggedIn) {
        // Call the login function with appropriate credentials
        await login('example@example.com', 'examplepassword');
      }

      // If there is still an error after attempting login, return
      if (error) {
        console.log('Error:', error);
        return;
      }

      // Get the authentication token from local storage
      const authToken = JSON.parse(localStorage.getItem('user')).token;

      // Determine the endpoint based on the type of vote
      const endpoint = type === 'up' ? `increaseVoteCount` : `decreaseVoteCount`;

      // Configure request headers with the authentication token
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      // Send a PATCH request to the corresponding endpoint with the configured headers
      const response = await axios.patch(`http://localhost:3040/api/posts/${postId}/${endpoint}`, null, config);

      // Log the updated post data
      console.log(response.data);

      // Optionally, you can handle success or display a message

      // Refresh the page to load the latest changes
      window.location.reload();
    } catch (error) {
      // Log any errors that occur during voting
      console.error('Error voting:', error);
      // Optionally, you can handle errors or display an error message
    }
  };

  return (
    <div>
      {/* Use icons for voting */}
      <Button
        variant="contained"
        color="primary" // Use primary color for the button
        onClick={() => handleVote(type)}
        startIcon={type === 'up' ? <ThumbUp /> : <ThumbDown />} // Use ThumbUp icon for upvote, ThumbDown icon for downvote
      >
        {/* Display dynamic text based on the vote type */}
        {type === 'up' ? 'Upvote' : 'Downvote'}
      </Button>
    </div>
  );
}

export default HandleVote;
