import '../Navbar/Navbar.css';
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie'; // Add this import to access cookies
import axios from 'axios'; // Import axios for API requests
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for the toast
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState({
    name: "",  // Initialize with default empty values
    email: "", // Same here
  });
  const cookies = new Cookies();
  const location = useLocation(); 
  // Check if the user is logged in by checking if the token exists in cookies
  const token = cookies.get('Token'); // This checks if the 'Token' exists in cookies

  // Function to fetch user profile data from /user/profile
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`, // Correct string interpolation
        },
      });

      console.log("User profile response:", response);  // Log the response to check data
      if (response && response.data) {
        setUser({
          name: response.data.name || "No name",  // Handle case if no name is provided
          email: response.data.email || "No email", // Handle case if no email is provided
        });
      } else {
        console.error("Error: Response does not contain user data.");
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchCurrentUser = async () => {
    console.log("Fetching current user data...");
    try {
      const response = await axios.get('/current-user');  // No token required here
      console.log("Current user response:", response);  // Log the response to check data
      if (response && response.data) {
        setUser({
          name: response.data.name || "No name",  // Handle case if no name is provided
          email: response.data.email || "No email", // Handle case if no email is provided
        });
      } else {
        console.error("Error: Response does not contain current user data.");
      }
    } catch (error) {
      console.error('Error fetching current user data:', error);
    }
  };
  

  // Toggle the sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle logout functionality
  const handleLogout = () => {
    // Clear the token and user data
    cookies.remove('Token');
    console.log("User logged out");
    setIsSidebarOpen(false);
    // Optionally redirect to login page
    window.location.href = "/signin";

    // Show success toast message after logout
    toast.success("Successfully logged out!");
  };

  // Fetch the user profile data when the component is mounted or token is changed
  useEffect(() => {
    console.log("Im in Useeffec");
    fetchCurrentUser();
    if (token) {
      
      // Fetch user details after login (only if token exists)
      fetchUserProfile();
      console.log("........................................");
       // Fetch data from /current-user without token
    }
  }, [token]);
  const getActiveClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };
  return (
    <>
      {/* Toast container to display toasts */}
      <ToastContainer />

      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                {/* ***** Logo Start ***** */}
                {/* <a href="/" className="logo">
                  <img
                    src="assets/images/logo.png"
                    alt="Logo"
                    style={{ width: "158px" }}
                  />
                </a> */
                }
                <h1>OAuth2</h1>
                {/* ***** Logo End ***** */}

                {/* ***** Menu Start ***** */}
                <ul className="nav">
                  <li>
                  <a href="/home" className={getActiveClass('/home')}>
                      Home
                    </a>
                  </li>
                  <li>
                  <a href="/aboutus" className={getActiveClass('/aboutus')}> About-us</a>
                  </li>
                  <li>
                  <a href="/services" className={getActiveClass('/services')}> Services</a>
                  </li>
                  <li>
                  <a href="/contactus" className={getActiveClass('/contactus')}> Contact-us</a>
                  </li>
                  {/* Conditionally render Sign In or Profile based on token */}
                  {!1 ? (
                    <li>
                      <a href="/signin">Sign In</a>
                    </li>
                  ) : (
                    <li>
                      <a className='profile' onClick={toggleSidebar}>
                        Profile
                      </a>
                    </li>
                  )}
                </ul>
                {/* ***** Menu End ***** */}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Modal */}
      {isSidebarOpen && (
        <div className="sidebar-modal">
          <div className="sidebar-content">
            <button className="close-btn" onClick={toggleSidebar}>
              &times;
            </button>
            <h2>Profile</h2>
            <div className="user-info">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              {/* <p><strong>Role:</strong> {user.role}</p> */}
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
