import React from 'react';
import './home.css';
import Profile from './ft_profile/profile.js'
import Menu from './ft_menu/menu.js'
import {Route , Routes } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.js';
import Messages from '../Messages/Messages.js';
import Settings from '../Settings/Settings.js';
import Rooms from '../Rooms/Rooms.js';
import ElementMsg from '../Messages/ElementMsg/ElementMsg.js';
import Info from './ft_profile/ft_profileDivs/info.js';
import CreateChannel from '../Rooms/CreateChannel/CreateChannel.js';
function Home()
{
    return(
        <>
    <div className="Home"><div className="Header">
            <Menu/>
        </div>
        
        {/* <div className="Profile"><Profile/></div> */}
        
        <div className="Footer"></div>
    
    <Routes>
        <Route path="profile" element={<Profile/>} />
        <Route path="chat" element={<Navbar/>} >
    
        <Route path="Messages/*" element={<Messages />} >
            <Route path="ElementMsg" element={<ElementMsg />} />
          </Route>
          <Route path="Rooms/*" element={<Rooms/>} >
            <Route path="CreateChannel" element={<CreateChannel />} />
            <Route path = "ElementMsg" element={<ElementMsg />} >

          <Route path="Info" element={<Info/>} />
            </Route>
            <Route path="Settings" element={<Settings />} />
      </Route>
      </Route>

    </Routes></div>
    </>
    );
};

export default Home;

