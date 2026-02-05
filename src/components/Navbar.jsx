import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useCart } from '../contexts/CartContext';
import AuthModal from './AuthModal';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const { toggleCart, itemCount, setIsOpen } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="container navbar-container">
          <a href="/" className="navbar-logo">
            VTS PETS
          </a>

          <div className={`navbar-links ${isMenuOpen ? 'mobile-open' : ''}`}>
            <a href="/" className="nav-link active">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#shop" className="nav-link">Shop</a>
            <a href="#services" className="nav-link">Appointments</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>

          <div className="navbar-actions">
            <button className="icon-btn" aria-label="Search">
              <Search size={20} strokeWidth={2.5} />
            </button>
            <button className="icon-btn cart-btn" aria-label="Cart" onClick={() => setIsOpen(true)}>
              <ShoppingBag size={20} strokeWidth={2.5} />
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </button>

            {user ? (
              <div className="user-menu-wrapper">
                <button
                  className="icon-btn"
                  onClick={() => user.role === 'admin' ? navigate('/admin') : alert('Profile coming soon')}
                  title={user.name}
                >
                  <User size={20} strokeWidth={2.5} />
                </button>
                {/* Simple hover dropdown or just use action */}
                <button className="icon-btn" onClick={logout} title="Logout">
                  <LogOut size={20} strokeWidth={2.5} />
                </button>
              </div>
            ) : (
              <button
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.5rem 1rem', borderRadius: '50px' }}
                onClick={() => setIsAuthOpen(true)}
              >
                Sign In
              </button>
            )}

            <button
              className="icon-btn mobile-toggle"
              aria-label="Menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

export default Navbar;
