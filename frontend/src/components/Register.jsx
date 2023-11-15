import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../redux/actions";

const Register = () => {
  const RegisterForm = {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  };
  const [register, setRegister] = useState(RegisterForm);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (register.username.trim().includes(" ")) {
      toast.error("Username must not contain white spaces");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(register.email)) {
      toast.error("Invalid email format");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(register.password)) {
      toast.error(
        "Password must be at least 6 characters and contain both upper and lower case letters"
      );
      return;
    }

    if (register.password !== register.confirmpassword) {
      toast.error("Password and Confirm Password do not match!");
      return;
    }
    await axios
      .post("/account/register", register)
      .then((response) => {
        const result = response.data;
        localStorage.setItem("token", result.token);
        dispatch(setUser(result));
      })
      .catch((error) => {
        toast.error(error.response.data);
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit ={handleRegister}>
        <label htmlFor="username"></label>
        <input
          type="text"
          name="username"
          onChange={handleInputChange}
          id="username"
          placeholder="Username"
          required
        />

        <label htmlFor="email"></label>
        <input
          type="email"
          name="email"
          onChange={handleInputChange}
          id="email"
          placeholder="Email"
          required
        />

        <label htmlFor="password"></label>
        <input
          type="password"
          name="password"
          onChange={handleInputChange}
          id="password"
          placeholder="Password"
          required
        />
        <label htmlFor="confirmpassword"></label>
        <input
          type="password"
          name="confirmpassword"
          onChange={handleInputChange}
          id="confirmpassword"
          placeholder="Confirm Password"
          required
        />

        <button type="submit">Register</button>
      </form>
      <p>
        You already have an account? <a href="/login">Log in here</a>
      </p>
    </div>
  );
};

export default Register;
