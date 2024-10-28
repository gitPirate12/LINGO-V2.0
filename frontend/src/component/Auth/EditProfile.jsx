import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { Container, Typography, TextField, Button } from '@mui/material';

function EditProfile() {
  const [profile, setProfile] = useState({
    email: '',
    firstName: '',
    lastName: '',
    city: ''
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) {
          setError('You must be logged in to view the profile');
          return;
        }

        const { token } = storedUser;
        const decodedToken = jwtDecode(token);
        const userId = decodedToken._id;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get(`http://localhost:3040/api/users/${userId}`, config);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Error fetching user profile');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser) {
        setError('You must be logged in to edit the profile');
        return;
      }

      const { token } = storedUser;
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      await axios.put(`http://localhost:3040/api/users/${userId}`, profile, config);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating user profile:', error);
      setError('Error updating user profile');
    }
  };

  if (!profile.email) {
    return <div>Loading...</div>;
  }

  return (
    <Container sx={{ minHeight: '100vh', padding: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>Edit Profile</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          value={profile.email}
          fullWidth
          disabled
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          label="First Name"
          name="firstName"
          value={profile.firstName}
          fullWidth
          onChange={handleChange}
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={profile.lastName}
          fullWidth
          onChange={handleChange}
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          label="City"
          name="city"
          value={profile.city}
          fullWidth
          onChange={handleChange}
          sx={{ marginBottom: '20px' }}
        />
        <Button variant="contained" color="primary" type="submit">
          Save Changes
        </Button>
      </form>
      {error && <Typography sx={{ color: 'error', marginTop: '20px' }}>{error}</Typography>}
    </Container>
  );
}

export default EditProfile;
