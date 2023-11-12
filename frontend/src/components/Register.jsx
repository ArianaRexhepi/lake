
import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div>
      <h2>Register</h2>
      <form>
        <label htmlFor="username"></label>
        <input type="text" id="username" placeholder="Username" required />

        <label htmlFor="email"></label>
        <input type="email" id="email" placeholder="Email" required />

        <label htmlFor="password"></label>
        <input type="password" id="password" placeholder="Password" required />

        <button type="submit">Register</button>
      </form>
      <p>
        You already have an account?{' '}
        <a href="/">Log in here</a>
      </p>
            
    </div>
  );
};

export default Register;
