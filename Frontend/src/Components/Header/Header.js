import React from 'react';
import './Header.css';
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <div className='header'>
        <img src={"../images/MedSolution4.png"} className='logo'/>
        <ul className='header-list'>
            <li className='hover-style'><Link to={"/"}>Home</Link></li>
            <li className='hover-style'><Link to={"/about"}>About</Link></li>
            <li className='hover-style'><Link to={"/contactus"}>Contact</Link></li>
            <li className='hover-style'><Link to={"/login"}>Login</Link></li>
        </ul>
    </div>
  )
}

export default Header;
