import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { Container, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLogout } from '../../hooks/useLogout'; // Import the useLogout hook

const ViewProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { logout } = useLogout(); // Initialize the useLogout hook

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Check if user is logged in
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) {
          setError('You must be logged in to view the profile');
          return;
        }

        const { token, email } = storedUser; // Extract token and email from stored user

        const decodedToken = jwtDecode(token);
        const userId = decodedToken._id;
        
        // Include the token in the request headers
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        // Make a GET request to fetch the user profile data using the user ID
        const response = await axios.get(`http://localhost:3040/api/users/${userId}`, config);

        // Set the user profile data in the component state
        setUser(response.data);
      } catch (error) {
        // Handle any errors that occur during the fetch
        console.error('Error fetching user profile:', error);
        setError('Error fetching user profile');
      }
    };

    fetchProfileData();
  }, []);

  const handleEditProfile = () => {
    window.location.href = '/editprofile';
  };

  const handleDeleteProfile = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser) {
        setError('You must be logged in to delete the profile');
        return;
      }

      const { token } = storedUser; // Extract token from stored user

      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      // Include the token in the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      // Make a DELETE request to delete the user profile
      await axios.delete(`http://localhost:3040/api/users/${userId}`, config);

      // Clear user data from localStorage and state upon successful deletion
      localStorage.removeItem('user');
      setUser(null);

      // Logout the user
      logout(); // Call the logout function from the useLogout hook
    } catch (error) {
      // Handle any errors that occur during the deletion
      console.error('Error deleting user profile:', error);
      setError('Error deleting user profile');
    }
  };

  if (!user) {
    return <div>No user data found</div>;
  }

  return (
    <Container sx={{ minHeight: '100vh', padding: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>User Profile</Typography>
      <div>
        <Typography sx={{ marginBottom: '10px' }}><strong>Email:</strong> {user.email}</Typography>
        <Typography sx={{ marginBottom: '10px' }}><strong>First Name:</strong> {user.firstName}</Typography>
        <Typography sx={{ marginBottom: '10px' }}><strong>Last Name:</strong> {user.lastName}</Typography>
        <Typography sx={{ marginBottom: '10px' }}><strong>City:</strong> {user.city}</Typography>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginRight: '10px' }}
          onClick={handleEditProfile}
          startIcon={<EditIcon />}
        >
          Edit Profile
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDeleteProfile}
          startIcon={<DeleteIcon />}
        >
          Delete Profile
        </Button>
      </div>
    </Container>
  );
};

export default ViewProfile;
