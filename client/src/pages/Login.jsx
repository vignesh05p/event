// client/src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, signInWithGoogle, guestLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGuestLogin = async () => {
    try {
      await guestLogin();
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
            required 
          />
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Login</button>
      </form>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      <button onClick={handleGuestLogin} style={{ marginLeft: '1rem' }}>Guest Login</button>
      <p style={{ marginTop: '1rem' }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
