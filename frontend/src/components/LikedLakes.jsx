import React, { useState, useEffect } from 'react';
import './LikedLakes.css';

const LikedLakes = () => {
  const [likedLakes, setLikedLakes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/lakes");
        const data = await response.json();
        setLikedLakes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="liked-lakes-container">
      <h1>My Liked Lakes</h1>
      <ul className="liked-lakes-list">
        {likedLakes.map((lake, index) => (
          <li key={index}>{lake.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LikedLakes;
