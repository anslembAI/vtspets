import React from 'react';
import { ShoppingBag, Search, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <a href="/" className="navbar-logo">
          VTS PETS
        </a>
        
        <div className="navbar-links">
          <a href="#" className="nav-link active">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#shop" className="nav-link">Shop</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        
        <div className="navbar-actions">
          <button className="icon-btn" aria-label="Search">
            <Search size={20} strokeWidth={2.5} />
          </button>
          <button className="icon-btn cart-btn" aria-label="Cart">
            <ShoppingBag size={20} strokeWidth={2.5} />
            <span className="cart-badge">2</span>
          </button>
          <button className="icon-btn mobile-toggle" aria-label="Menu">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
