import React, { useState } from 'react';
import './AdminSignup.css';

function AdminSignup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      // Use the correct backend URL structure
      const response = await fetch('http://localhost:4000/api/auth/register/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          firstName, 
          lastName, 
          email, 
          password, 
          employeeId, 
          role: 'admin' 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Admin registration successful!');
        // Clear form
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setEmployeeId('');
      } else {
        setMessage(data.message || 'Admin registration failed.');
      }
    } catch (error) {
      console.error('Error during admin registration:', error);
      setMessage('Connection error. Please check if the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <span>👨‍💼</span>
          </div>
          <h2 className="login-title">Admin Registration</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="firstName" className="input-label">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName" className="input-label">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email" className="input-label">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="input-group">
            <label htmlFor="employeeId" className="input-label">Employee ID:</label>
            <input
              type="text"
              id="employeeId"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <button 
            type="submit" 
            className={`login-button ${isLoading ? '' : 'active'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register Admin'}
          </button>
        </form>
        {message && (
          <p className={`error-message ${message.includes('successful') ? 'success-message' : ''}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminSignup;