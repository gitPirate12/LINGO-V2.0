import React from 'react';
import axios from 'axios';
import { useLogin } from '../../hooks/useLogin';
import { Button } from '@mui/material';
import { ThumbUpOutlined, ThumbDownOffAltOutlined } from '@mui/icons-material';

function HandleVote({ postId, type }) {
  const { isLoading, error, login } = useLogin();

  const handleVote = async (type) => {
    try {
      if (error) {
        console.log('Error:', error);
        return;
      }

      if (isLoading) {
        console.log('Loading...');
        return;
      }

      const isLoggedIn = !!localStorage.getItem('user');

      if (!isLoggedIn) {
        await login('example@example.com', 'examplepassword');
      }

      if (error) {
        console.log('Error:', error);
        return;
      }

      const authToken = JSON.parse(localStorage.getItem('user')).token;
      const endpoint = type === 'up' ? `increaseVoteCount` : `decreaseVoteCount`;

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await axios.patch(`http://localhost:3040/api/posts/${postId}/${endpoint}`, null, config);

      console.log(response.data);

      window.location.reload();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div>
      <Button
        variant="text"
        color="inherit" // Set color to inherit
        onClick={() => handleVote(type)}
        startIcon={
          type === 'up' ? (
            <ThumbUpOutlined sx={{ color: '#A1824A' }} />
          ) : (
            <ThumbDownOffAltOutlined sx={{ color: '#A1824A' }} />
          )
        }
        sx={{
          minWidth: 'auto',
          ':focus': {
            outline: 'none',
          },
          ':focus-visible': {
            outline: 'none',
          },
        }}
      >
      </Button>
    </div>
  );
}

export default HandleVote;
