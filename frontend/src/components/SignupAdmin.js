import React, { useState } from 'react';
import './SignupAdmin.css';

const SignupAdmin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if email is a Georgia Tech email
  const isGTEmail = (email) => {
    return email.endsWith('@gatech.edu') || email.endsWith('@gt.edu');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (!isGTEmail(email)) {
        setError('Please use your Georgia Tech email address');
        setIsLoading(false);
        return;
      }

      if (password !== 'gtlibrary2024') {
        setError('Invalid password');
        setIsLoading(false);
        return;
      }

      // Login success
      onLoginSuccess();
      setIsLoading(false);
    }, 1000); // Simulate delay for login
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* Header */}
        <div className="login-header">
          <div className="login-icon">🔐</div>
          <h1 className="login-title">Employee Login</h1>
          <p className="login-subtitle">Access the maintenance dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="input-group">
            <label className="input-label">Georgia Tech Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.name@gatech.edu"
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`login-button ${isLoading ? 'disabled' : 'active'}`}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                <span>Signing in...</span>
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Demo Info */}
        <div className="demo-info">
          <h3 className="demo-title">Demo Credentials:</h3>
          <p className="demo-text"><strong>Email:</strong> Any @gatech.edu or @gt.edu address</p>
          <p className="demo-text"><strong>Password:</strong> gtlibrary2024</p>
        </div>

        {/* Back Link */}
        <div className="back-button">
          <a
            href="#"
            className="back-link"
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
          >
            ← Back to main page
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupAdmin;
