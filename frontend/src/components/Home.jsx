import React from "react";
import { Link } from "react-router-dom"; 
import "./Home.css"; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="left-section">
        <img
          src="https://www.celebritycruises.com/blog/content/uploads/2022/06/lakes-in-norway-lovatnet-olden-hero.jpg"
          alt="Lakes"
          className="image"
        />
      </div>
      <div className="right-section">
        <h2>Explore Lakes with Us</h2>
        <p>
         
Exploring lakes offers a serene and captivating experience, inviting you to immerse yourself in the natural beauty and tranquility that these bodies of water provide. 
        </p>
        <p>
        Lakes serve as pristine havens, where the symphony of lapping water against the shores harmonizes with the rustling leaves and the calls of resident wildlife. 
        </p>
        <p>Each lake has a unique personality, reflecting the surrounding landscapes and ecosystems. Whether nestled in the heart of lush forests, cradled by majestic mountains, or glistening under an expansive sky, lakes showcase the diversity of our planet's geography.</p>
        <Link to="/explore">
          <button type="button" className="btn btn-primary">
            Explore Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
