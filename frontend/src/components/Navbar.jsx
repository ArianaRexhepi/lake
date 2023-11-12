import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);
  return (
    <nav className={`navbar ${visible ? '' : 'navbar-hidden'}`}>
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/lakes" className="nav-link">Lake Sightseeing</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link">Contact</Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">My Profile</Link>
        </li>
        <li className="nav-item">
          <Link to="/lakeslist" className="nav-link">LakeModelList</Link>
        </li>
      </ul>
    </nav>
    </nav>
  );
};

export default Navbar;
