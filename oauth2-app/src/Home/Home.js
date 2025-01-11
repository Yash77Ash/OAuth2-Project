import React from 'react';
import Navbar from '../Navbar/Navbar'; 
import '../Home/home.css';
// import '../Home/bootstrap.min.css';
import Features from './Features';
// import bannerImage from '../assets/img/banner-bg.jpg';
const Home = () => {
    const handleSearch = (event) => {
        // Add logic to handle the search functionality
        console.log(event.target.value);
      };
  return (
    <>
      <Navbar />
      
      <div className="main-banner">
      <div className="container ">
        <div className="row">
          {/* Left Section */}
          <div className="col-lg-6 align-self-center">
            <div className="caption header-text">
              <h6>Welcome </h6>
              <h2>Login With Google </h2>
              <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae esse quo porro saepe sunt reprehenderit laudantium necessitatibus quibusdam minima sed provident corporis similique fugit placeat, sit exercitationem! Est, aliquid maxime!
              </p>
              <div className="search-input">
                <form id="search" action="#">
                  <input
                    type="text"
                    placeholder="Type Something"
                    id="searchText"
                    name="searchKeyword"
                    onKeyPress={(event) => handleSearch(event)}
                  />
                  <button type="button">Search Now</button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-lg-4 offset-lg-2">
            <div className="right-image">
              {/* <img src={bannerImage} alt="Banner" /> */}
              {/* <span className="price">$22</span> */}
              {/* <span className="offer">-40%</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>    

    <Features/>
    </>
  );
};

export default Home;
