import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Chatbot from "./components/Chatbot";
import Login from './pages/Login';
import Signup from './pages/Signup';
import TopDonors from './pages/TopDonors';
import Dashboard from './pages/Dashboard';
import AboutUs from './pages/AboutUs';
import Contact from './pages/ContactUs';
import ProfilePage from './pages/Profile';
import Demand from './pages/Demand';
import PredictDemand from './pages/PredictDemand';
import Donate from './pages/Donate';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import LiveDonorBoard from './pages/LiveDonorBoard';
import Hospital from './pages/Hospital';
import HospitalDashboardPage from './pages/HospitalDashboard';
import HospitalLoginPage from './pages/HospitalLogin';

function AppContent() {
  const location = useLocation();
  const hideFooterRoutes = ['/login', '/signup'];

  return (
    <div className="app-container">
      <Navbar />
      <div className="routes-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/request" element={<TopDonors />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/demand" element={<Demand />} />
          <Route path="/predict-demand" element={<PredictDemand />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/TermsOfService" element={<TermsOfService />} />
          <Route path="/LiveDonorBoard" element={<LiveDonorBoard />} />
          <Route path="/Hospital" element={<Hospital />} />
          <Route path="/hospital-dashboard" element={<HospitalDashboardPage />} />
          <Route path="/hospital-login" element={<HospitalLoginPage />} />
        </Routes>
      </div>

      <Chatbot />

      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

