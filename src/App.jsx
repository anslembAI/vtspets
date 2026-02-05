import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductSection from './components/ProductSection';
import Services from './components/Services';
import Contact from './components/Contact';
import Admin from './pages/Admin';
import './App.css';
import './admin.css';
import './auth.css';

// Wrapper to conditionally show Navbar/Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="app">
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && (
        <footer className="footer">
          <div className="container">
            <p>© 2026 VTS PETS. All rights reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
};

const HomePage = () => (
  <>
    <Hero />
    <CategoryGrid />
    <ProductSection />
    <Services />
    <Contact />
  </>
);

import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  );
}

export default App;
