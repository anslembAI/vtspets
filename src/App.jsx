import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductSection from './components/ProductSection';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <CategoryGrid />
      <ProductSection />

      <footer className="footer">
        <div className="container">
          <p>© 2026 VTS PETS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
