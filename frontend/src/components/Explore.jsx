import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Explore.css";
import "./Details";

const Explore = () => {
  const [lakes, setLakes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    await axios
      .get("/lakes")
      .then((res) => {
        setLakes(res.data);
        console.log("lakes", res.data);
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const handleSearch = () => {
    const results = lakes.filter((lake) =>
      lake.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLakeClick = (lakeId) => {
    navigate(`/explore/${lakeId}`);
  };
  return (
    <div>
      <>
        <div className="group">
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input
            placeholder="Search"
            type="search"
            className="input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </>
      <div className="lake-container">
        {(searchResults.length > 0 ? searchResults : lakes).map(
          (lake, index) => (
            <div
              key={index}
              className="lake-card"
              onClick={() => handleLakeClick(lake.id)}
            >
              <img
                src={lake.image}
                alt={lake.name}
                className="lake-card-image"
              />
              <div className="lake-card-details">
                <h3 className="lake-card-title">{lake.name}</h3>
                <p className="lake-card-author">By {lake.description.slice(0,150)}...</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Explore;
