import React from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div className="container">
      <div className="row">
        <h1><i>Explore lakes with us</i></h1>
        <div className="col-md-8">
          <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="https://www.rockymountaineer.com/sites/default/files/styles/node__blog_post__bp_blog_hero/public/bp_hero_image/Emerald-Lake---Credit-Suran-Gaw%2C-Adobe-Stock_2.jpg?h=600f3c74&itok=ScUsCbCV" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://res.cloudinary.com/simpleview/image/upload/v1627494161/clients/whitemountainsnh/Towns_LakesRegion_20853a40-13fc-446c-9080-d9372c1b1656.jpg" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/other/d/_DSC1838_wilderness.png?crop=0%2C175%2C3000%2C1650&wid=4000&hei=2200&scl=0.75" className="d-block w-100" alt="..." />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="text-right">
            <h2>Have you ever wanted to take a closer look at lakes?</h2>
            <p>
              This is your chance to see the beauty of lakes.
            </p>
          </div>
          <button type="button" class="btn btn-info">Explore now</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
