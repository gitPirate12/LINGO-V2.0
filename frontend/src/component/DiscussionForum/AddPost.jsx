import React, { useState } from 'react';
import axios from 'axios';
import { useLogin } from '../../hooks/useLogin'; // Import the useLogin hook
import { Typography, TextField, Button, Box } from '@mui/material';
import { Send, ArrowBack } from '@mui/icons-material';

function AddPost() {
  const { login } = useLogin(); // Use the useLogin hook to handle user login
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Check if the user is logged in before adding a post
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        setError('You must be logged in to add a post');
        return;
      }

      // Send POST request to create a new post
      const response = await axios.post('http://localhost:3040/api/posts/', {
        question,
        description,
        tags: tags.split(',').map(tag => tag.trim()) // Convert comma-separated tags to an array
      }, {
        headers: {
          'Authorization': `Bearer ${user.token}` // Attach the authentication token to the request headers
        }
      });

      // Log the response data
      console.log(response.data);

      // Clear form fields after successful submission
      setQuestion('');
      setDescription('');
      setTags('');

      // Redirect to ViewPosts page
      window.location.href = '/viewposts';
    } catch (error) {
      // Log any errors that occur during form submission
      console.error('Error submitting form:', error);
      setError(error.message || 'Error submitting form');
    }
  };

  return (
    <Box className='Addpost' style={{ minHeight: '100vh', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Add New Post</Typography>
      {error && <Typography variant="body1" color="error">Error: {error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Question"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Tags"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          helperText="Separate tags with commas (e.g., tag1, tag2, tag3)"
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary"  sx={{ marginRight: '30px' }}>Submit</Button>
        {/* Add button to redirect to ViewPosts page */}
        <Button onClick={() => { window.location.href = '/viewposts' }} variant="outlined" startIcon={<ArrowBack />}>Back</Button>
      </form>
    </Box>
  );
}

export default AddPost;
