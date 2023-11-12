import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Register from './Register';
import './Login.css'; 

const Login = () => {
    const [showRegister, setShowRegister] = useState(false);
  return (
    <div>
      <div className="login-container">
        <div className="image-section">
          <img src="https://res.cloudinary.com/simpleview/image/upload/v1627494161/clients/whitemountainsnh/Towns_LakesRegion_20853a40-13fc-446c-9080-d9372c1b1656.jpg" alt="Background" />
        </div>
        <div className="form-section">
          <div className="login-form">
            {showRegister ? (
              <Register />
            ) : (
              <>
            <h2>Login</h2>
            <form>
              <label htmlFor="username"></label>
              <input type="text" id="username" placeholder="Username" required />

              <label htmlFor="password"></label>
              <input type="password" id="password" placeholder="Password" required />
              
              <button type="submit">Login</button>
             
            </form>
            <p>
                  Don't have an account?{' '}
                  <Link onClick={() => setShowRegister(true)}>Register here</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
