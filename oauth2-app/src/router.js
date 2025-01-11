import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './SignIn/signin';
import SignUp from './SignUp/signup';
import Home from './Home/Home';
import AboutUs from './AboutUs/AboutUs';
import Services from './Services/Services';
import ContactUs from './ContactUs/ContactUs';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/contactus" element={<ContactUs/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
