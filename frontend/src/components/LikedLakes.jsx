import React, { useState, useEffect } from 'react';
import './LikedLakes.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LikedLakes = () => {
  const [likedLakes, setLikedLakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await axios.get("/favorite/sighting").then((res)=>{
      setLikedLakes(res.data);
      console.log(res.data)
    }).catch((error)=>{
      console.log(error.response);
    }).finally(()=>{
      setLoading(false);
    });
  };

  const handleLakeClick = (lakeId) => {
    navigate(`/explorelake/${lakeId}`);
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h3 className='text-center mt-3'>My Favorite Lakes</h3>
    <div className="lake-container">
      
    {likedLakes.map(
      (lake, index) => (
        <div
          key={index}
          className="lake-card"
          onClick={() => handleLakeClick(lake.lakeId)}
        >
          <img
            src={lake.image}
            className="lake-card-image"
          />
          <div className="lake-card-details">
          <h3 className="lake-card-title">{lake.name}</h3>

            <p className='mb-0 mt-2' >Longtitude:{lake.longitude}</p>
            <p>Latitude:{lake.latitude}</p>
          </div>
        </div>
      )
    )}
  </div>
  </div>
  );
};

export default LikedLakes;
