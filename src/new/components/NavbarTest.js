import React, { useState } from 'react';
import './NavbarTest.css'; // Import your CSS file for styling

const NavbarTest = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Logo</div>
      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <div className={`line ${isOpen ? 'open' : ''}`}></div>
        <div className={`line ${isOpen ? 'open' : ''}`}></div>
        <div className={`line ${isOpen ? 'open' : ''}`}></div>
      </div>
    </nav>
  );
};

export default NavbarTest;
