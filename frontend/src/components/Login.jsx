import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Register from "./Register";
import "./Login.css";
import axios from "axios";
import { useDispatch} from "react-redux";
import { setUser } from "../redux/actions/index";
import { toast } from "react-toastify";

const Login = () => {
  const INITIAL_LOGIN = {
    email: "",
    password: "",
  };
  const [login, setLogin] = useState(INITIAL_LOGIN);
  const [showRegister, setShowRegister] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {   
    const { value, name } = e.target;
    setLogin({...login,[name]:value});
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post("/account/login", login)
      .then((result) => {
        if (result.data.token) {
          localStorage.setItem("token", result.data.token);
          dispatch(setUser(result.data));
        }
        console.log(result);
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response.data);
      });
  };

  return (
    <div>
      <div className="login-container">
        <div className="form-section">
          <div className="login-form">
            {showRegister ? (
              <Register />
            ) : (
              <>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                  <label htmlFor="email"></label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                  />

                  <label htmlFor="password"></label>
                  <input
                    onChange={handleInputChange}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                  />

                  <button type="submit">Login</button>
                </form>
                <p>
                  Don't have an account?{" "}
                  <Link onClick={() => setShowRegister(true)}>
                    Register here
                  </Link>
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
