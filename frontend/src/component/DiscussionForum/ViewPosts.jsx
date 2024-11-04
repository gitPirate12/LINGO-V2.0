import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, List, ListItem, ListItemText, Divider, IconButton, Avatar, InputAdornment ,Menu, MenuItem } from '@mui/material';
import { AddComment, ArrowDropUp, ArrowDropDown , ThumbUpOutlined, ThumbDownOffAltOutlined } from '@mui/icons-material';
import DeletePost from './DeletePost';
import DeleteReply from './DeleteReply';
import EditReply from './EditReply';
import GenerateReport from './GenerateReport'; // Import the GenerateReport component
import { useLogin } from '../../hooks/useLogin'; // Import the useLogin hook
import HandleVote from './HandleVote';
import MoreVertIcon from '@mui/icons-material/MoreVert';


function ViewPosts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [error, setError] = useState(null);
  const [editReplyId, setEditReplyId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { isLoading, error: loginError } = useLogin();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Set the anchor element to the button
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleEdit = () => {
    // Add your edit functionality here
    handleClose(); // Close the menu after action
  };

  const handleDelete = async (postId) => {
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);
    if (!user) return;
  
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  
    try {
      await axios.delete(`http://localhost:3040/api/posts/${postId}`, config);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  


  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3040/api/posts/');
      const updatedPosts = await Promise.all(response.data.map(async post => {
        try {
          const authorInfo = await axios.get(`http://localhost:3040/api/users/${post.author}`);
          const repliesResponse = await axios.get(`http://localhost:3040/api/replies/post/${post._id}`);
          const replies = repliesResponse.data;
          return {
            ...post,
            author: `${authorInfo.data.firstName} ${authorInfo.data.lastName}`,
            replies: replies
          };
        } catch (error) {
          console.error('Error fetching author info:', error);
          return post;
        }
      }));
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError(error.message || 'Error fetching posts');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEditPost = (postId) => {
    navigate(`/editpost/${postId}`);
  };

  const handleAddReply = (postId) => {
    navigate(`/addreply/${postId}`);
  };

  const handleEditReply = (replyId) => {
    setEditReplyId(replyId);
  };

  

  const handleVoteReply = async (replyId, voteType) => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      if (!token) {
        throw new Error('User not authenticated');
      }
      const response = await axios.patch(`http://localhost:3040/api/replies/${replyId}/${voteType}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        fetchPosts();
      } else {
        throw new Error('Failed to vote on reply');
      }
    } catch (error) {
      console.error('Error voting on reply:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() !== '') {
      const filtered = posts.filter(post =>
        post.author.toLowerCase().includes(query.toLowerCase()) ||
        post.question.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts([]);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box className="view-posts-container" sx={{ minHeight: '100vh', padding: '20px', backgroundColor: '' }}>
      <Typography variant="h3" component="div" gutterBottom sx={{ color: 'black' }}>
        Discussion Forum
      </Typography>
      <Box className="button-container" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <GenerateReport />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/addpost')}
          sx={{
            borderRadius: '20px',
            backgroundColor: 'rgba(0, 153, 99, 1)', // Normal background color
            display: 'flex',
            minWidth: '84px',
            minHeight: '40px',
            maxWidth: '480px',
            alignItems: 'center',
            overflow: 'hidden',
            color: '#fff',
            textAlign: 'center',
            justifyContent: 'center',
            padding: '0 16px',
            font: '700 14px Plus Jakarta Sans, -apple-system, Roboto, Helvetica, sans-serif',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(0, 153, 99, 1)', // Keep the background color the same on hover
              boxShadow: 'none', // Remove any box shadow if applicable
            },
          }}
        >
          <span style={{ alignSelf: 'stretch', width: '80px', overflow: 'hidden', margin: 'auto 0' }}>
            Add Post
          </span>
        </Button>


        <section className="search-container" style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
          <div className="search-wrapper" style={{ flexGrow: 1 }}>
            <form className="search-input-container" role="search" style={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                id="search-input"
                className="search-input"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c125b7b8ff0836408a9f63056f9422f6309bbe4834f77d62de8e703025c96268?placeholderIfAbsent=true&apiKey=32eae747db0848928735b2b1f6ffe638"
                        alt="Search Icon"
                        style={{ width: '24px', height: '24px' }} // Adjust size as necessary
                      />
                    </InputAdornment>
                  ),
                  style: {
                    borderRadius: '12px',
                    backgroundColor: '#F5F0E5',
                    color: '#A1824A',
                    height: '40px',
                    padding: '8px 16px',
                    font: '400 16px Plus Jakarta Sans, -apple-system, Roboto, Helvetica, sans-serif',
                    border: 'none',
                  },
                }}
                sx={{
                  width: '100%',
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#A1824A', // Default border color
                    },
                    '&:hover fieldset': {
                      borderColor: '#A1824A', // Border color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#A1824A', // Border color when focused
                    },
                  },
                }} // Ensure it fills the container
              />
              <IconButton type="submit" aria-label="search" style={{ backgroundColor: 'transparent', padding: '10px' }}>
                {/* Optional: You can keep the button for additional functionality */}
              </IconButton>
            </form>
          </div>
    </section>
      </Box>
      <Box className="posts-list">
        {(searchQuery.trim() === '' ? posts : filteredPosts).map((post, index) => (
          <Box key={post._id} className={`post-item post-${index}`} sx={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', borderRadius: '8px', backgroundColor: '#fff' }}>
            <Typography variant="h4" className={`post-question post-${index}`} gutterBottom color="text.primary">
              {post.question}
            </Typography>
            <Typography className={`post-description post-${index}`} gutterBottom>
              {post.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Avatar alt={post.author} src="/broken-image.jpg" sx={{ width: 24, height: 24, marginRight: '5px' }} />
              <Typography className={`post-author post-${index}`} gutterBottom>
                Author: {post.author}
              </Typography>
            </Box>
            <Typography className={`post-tags post-${index}`} gutterBottom>
              Tags: {post.tags.join(', ')}
            </Typography>
            <Typography className={`post-vote-count post-${index}`} gutterBottom>
              Vote Count: {post.voteCount}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <IconButton   >
                <HandleVote postId={post._id} type="up"  />
              </IconButton>
              <IconButton>
                <HandleVote postId={post._id} type="down" />
              </IconButton>
            
              <Button onClick={() => handleAddReply(post._id)} sx={{ marginLeft: '10px' , color: '#A1824A' }} >
                Reply
              </Button>
              <Button onClick={handleMenuClick} sx={{ color: '#A1824A' }}>
                  <MoreVertIcon />
              </Button>

              <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleEditPost(post._id)}>Edit</MenuItem>
        <MenuItem onClick={() => {handleDelete(post._id); handleClose();}}>Delete</MenuItem>
      </Menu>

              
            </Box>
            <Typography variant="h5" className={`post-replies-header post-${index}`} gutterBottom>
              Replies:
            </Typography>
            <List className={`post-replies post-${index}`}>
              {post.replies.map((reply, replyIndex) => (
                <ListItem key={reply._id} className={`reply-item reply-${replyIndex}`} style={{ display: 'flex', alignItems: 'center' }}>
                  {typeof reply.author === 'object' && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar alt={`${reply.author.firstName} ${reply.author.lastName}`} src="/broken-image.jpg" sx={{ width: 24, height: 24, marginRight: '5px' }} />
                      <ListItemText className={`reply-author reply-${replyIndex}`}>
                        <span>{reply.author.firstName} {reply.author.lastName}: {reply.comment}</span>
                      </ListItemText>
                    </div>
                  )}
                  <ListItemText className={`reply-vote-count reply-${replyIndex}`} style={{ width: '100px', textAlign: 'right', marginLeft: 'auto' }}>
                    Vote Count: {reply.voteCount}
                  </ListItemText>
                  
                  <DeleteReply replyId={reply._id} />
                  <Button className={`action-edit-reply action-edit-reply-${replyIndex}`} sx={{ color: '#A1824A ' }} onClick={() => handleEditReply(reply._id)}>Edit Reply</Button>
                  {editReplyId === reply._id && <EditReply replyId={reply._id} />}
                  <IconButton className={`action-vote-up action-vote-up-${replyIndex}`} sx={{ color: '#A1824A ' }} onClick={() => handleVoteReply(reply._id, 'upvote')}>
                     <ThumbUpOutlined/>
                  </IconButton>
                  <IconButton className={`action-vote-down action-vote-down-${replyIndex}`} sx={{ color: '#A1824A ' }} onClick={() => handleVoteReply(reply._id, 'downvote')}>
                    <ThumbDownOffAltOutlined />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ViewPosts;
