import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, List, ListItem, ListItemText, Divider, IconButton, Avatar } from '@mui/material';
import { ThumbUp, ThumbDown, Edit, AddComment, ArrowDropUp, ArrowDropDown } from '@mui/icons-material';
import DeletePost from './DeletePost';
import DeleteReply from './DeleteReply';
import EditReply from './EditReply';
import GenerateReport from './GenerateReport'; // Import the GenerateReport component
import { useLogin } from '../../hooks/useLogin'; // Import the useLogin hook
import HandleVote from './HandleVote';

function ViewPosts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [error, setError] = useState(null);
  const [editReplyId, setEditReplyId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { isLoading, error: loginError } = useLogin();

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
    <Box className="view-posts-container" style={{ minHeight: '100vh' }}>
      <Typography variant="h3" component="div" gutterBottom>
        Discussion forum
      </Typography>
      <Box className="button-container" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <GenerateReport />
        <Button variant="contained" className="add-post-button" onClick={() => navigate('/addpost')}>
          Add Post
        </Button>
        <TextField
          className="search-bar"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </Box>
      <Box className="posts-list">
        {(searchQuery.trim() === '' ? posts : filteredPosts).map((post, index) => (
          <Box key={post._id} className={`post-item post-${index}`} sx={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h4" className={`post-question post-${index}`} gutterBottom>
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
              <IconButton >
                <HandleVote postId={post._id} type="up" />
              </IconButton>
              <IconButton>
                <HandleVote postId={post._id} type="down" />
              </IconButton>
              <Button
                variant="contained"
                className={`action-button action-edit-${index}`}
                onClick={() => handleEditPost(post._id)}
                sx={{ marginLeft: '7px' }}
              >
                Edit
              </Button>
              <DeletePost postId={post._id} />
              <Button onClick={() => handleAddReply(post._id)} sx={{ marginLeft: '-10px' }}>
                <AddComment /> Add Reply
              </Button>
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
                  <ListItemText className={`reply-vote-count reply-${replyIndex}`} style={{ width: '100px', textAlign: 'right', marginLeft: 'auto', paddingRight: '300px'  }}>
                    Vote Count: {reply.voteCount}
                  </ListItemText>
                  <DeleteReply replyId={reply._id} />
                  <Button className={`action-edit-reply action-edit-reply-${replyIndex}`} onClick={() => handleEditReply(reply._id)}>Edit Reply</Button>
                  {editReplyId === reply._id && <EditReply replyId={reply._id} />}
                  <IconButton className={`action-vote-up action-vote-up-${replyIndex}`} onClick={() => handleVoteReply(reply._id, 'upvote')}>
                    <ArrowDropUp />
                  </IconButton>
                  <IconButton className={`action-vote-down action-vote-down-${replyIndex}`} onClick={() => handleVoteReply(reply._id, 'downvote')}>
                    <ArrowDropDown />
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
