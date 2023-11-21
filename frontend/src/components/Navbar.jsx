import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites, setUser } from "../redux/actions";

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    dispatch(setFavorites([]));
    navigate("/")
  };

  

  let isAdmin = false;
  if (state.user) {
    const role = state.user.userRoles.find((role) => role === "Admin");
    if (role) {
      isAdmin = true;
    }
  }


  return (
    <nav className={`navbar ${visible ? "" : "navbar-hidden"}`}>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-logo">
            <b>
              <i>LakeXplorer</i>
            </b>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/explore" className="nav-link">
              Explore
            </Link>
          </li>

          {state.user && (
            <>
              <div className="dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {state.user.username}
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <Link to="/myprofile" className="nav-link">
                      My Profile
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="/likes" className="nav-link">
                      My Favorites
                    </Link>
                  </li>
                  {isAdmin && (
                    <li className="dropdown-item">
                      <Link to="/lakeslist" className="nav-link">
                        LakeModelList
                      </Link>
                    </li>
                  )}

                  <li onClick={() => handleLogOut()} className="dropdown-item">
                    Logout
                  </li>
                </ul>
              </div>
            </>
          )}
          {!state.user && (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Sign in
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </nav>
  );
};

export default Navbar;
