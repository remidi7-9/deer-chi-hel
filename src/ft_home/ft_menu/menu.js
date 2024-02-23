import React from 'react';
import './menu.css';
import {Route , Link, Routes} from 'react-router-dom'
import Navbar from '../../Navbar/Navbar';
import Profile from '../ft_profile/profile';


function Menu()
{
    return(
        <>

        <div className="header">  
                <div className="Logo">
                    <strong>Kremidi</strong>
                </div>

                <nav className="navbar">
                    <ul className="navbar__menu">
                        <li className="navbar__item">
                        <Link to={"profile"} style={{textDecoration: 'none'}}  className="navbar__link">
                                <span>Profile</span>
                            </Link>
                        </li>
                        <li className="navbar__item">
                            <a href="#" className="navbar__link">
                                <span>Data Analysis</span>
                            </a>
                        </li>
                        <li className="navbar__item">
                            <a href="#" className="navbar__link">
                                <span>Friends</span>
                            </a>
                        </li>
                        <li className="navbar__item">
                            <Link to={"chat"} style={{textDecoration: 'none'}}  className="navbar__link">
                                <span>Chat</span>
                            </Link>
                        </li>
                        <li className="navbar__item">
                            <a href="#" className="navbar__link">
                                <span>Settings</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div></>
    )
};

export default Menu;