import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { Typography, TextField, Button, Box, Grid } from '@mui/material'; // Import Material-UI components
import './SignupStyles.css'; // Import your custom styles for the Signup component

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, firstName, lastName, city);
    console.log(email, password, firstName, lastName, city);
  };

  return (
    <Box className="SignupContainer" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <form className="signup" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: '400px', padding: '20px', textAlign: 'center' }}>
        <Typography variant="h3" sx={{ marginBottom: '20px' }}>Sign Up</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="City"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Button type="submit" disabled={isLoading} variant="contained" sx={{ marginTop: '20px' }}>Sign up</Button>
        {error && <div className="error" sx={{ marginTop: '20px' }}>{error}</div>}
      </form>
    </Box>
  );
};

export default Signup;
