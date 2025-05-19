import React from 'react'
import { Link } from "react-router-dom";
import './Navbar.css'

export default function Header() {
  return (
    <>
      <div className="header-container">
        <p><Link to={"/"}>Home</Link></p>
        <p><Link to={"/about"}>About</Link></p>
         <p><Link to={"/projects"}>Projects</Link></p>
         <p><Link to={"/contact"}>Contact</Link></p>
      </div>
    </>
  );
}