import React from "react";
import "./Header.css";
import { FaSeedling } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <header className="header-container">
      <FaSeedling className="header-icon" />
      <h1 className="header-title">Garden Guide Bot</h1>
      <FaSeedling className="header-icon" />
    </header>
  );
};

export default Header;
