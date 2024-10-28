import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { Typography, TextField, Button, Box } from '@mui/material'; // Import Material UI components
import './LoginStyles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Box className="login-container" sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {/* Use the new container class */}
      <form className="login" onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>Log In</Typography>
        
        <TextField
          fullWidth
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button type="submit" disabled={isLoading} variant="contained">Log in</Button>
        {error && <Typography variant="body2" color="error">{error}</Typography>}
      </form>
    </Box>
  );
};

export default Login;
