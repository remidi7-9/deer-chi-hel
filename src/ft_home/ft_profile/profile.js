import React from 'react';
import './profile.css';
import Info from './ft_profileDivs/info.js'
import Overview from './ft_profileDivs/overview.js';

import chatIcon from './assets/chat_icon.png';
import MorePlay from './ft_profileDivs/moreplay.js';
import Avatar from './utils/avatar.js';
import Level from './utils/levelup.js';
import LevelUP from './utils/levelup.js';
import Viz from './utils/viz.js';
import ChatBar from './chatBar.js';
import LastGames1 from './LastGames1.js';
import LastGames2 from './LastGames2.js';
function Profile() {
    return (
        <>
        <div className='Profile'>
        <div className="ChatBar">
            <ChatBar/>
        </div>
        <div className="ProfileBis">
        <div className="InfoProfile">
            <div className="Avatar"><Avatar/></div>
            <div className="Level"><LevelUP/></div>
            <div className="Viz"></div>
        </div>
        <div className="Infostats">
            <div className="LastGames"><LastGames2/></div>
            <div className="TotalGames"></div>
        </div>
        </div></div></>
    );
};


export default Profile;

