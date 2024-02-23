import React from 'react';
import messge from './chat.png';
import hyp from './Hypatia.png';
import rooms from './rooms.png';
import settings from './settings.png'
import { useState, useEffect } from 'react';
import { useLocation,  } from 'react-router-dom';
import notif from './notif.png';
import { useSocket } from '../SocketContext';
import '../Navbar/Navbar_.css';
import { Link, Route, Routes } from 'react-router-dom';

import Messages from '../Messages/Messages';

import Settings from '../Settings/Settings';
import Rooms from '../Rooms/Rooms';
import ElementMsg from '../Messages/ElementMsg/ElementMsg';
import CreateChannel from '../Rooms/CreateChannel/CreateChannel';
import Info from '../Messages/ElementMsg/Info/Info';

const GenerateRandomString = () => {
  const charac = "ABCDEFJHIJKLMNOPQRSIUVQSWZabcdefghijklmnopqrsiov1234567890";
  let result = '';
  for (let i = 0; i < 8; i++) {
    const ranind = Math.floor(Math.random() * charac.length);
    result += charac.charAt(ranind);
  }
  return result;
}

const Navbar = (props) => {


  const {user, updateUser } = useSocket();


  //   const [user, setUser] = useState({
  //     userId: '',
  //     id: -1,
  //     username: '',
  //     displayName: '',
  //     avatar: '',
  //     socketId: '',
  //   });
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         // Make a request to your API endpoint
  //         console.log("hhaha");
  //         const response = await fetch('http://10.14.56.6:3000/SchoolOfAthensApi/auth/logged', {

  //         });
  // console.log("hhaha1");
  //         // Check if the response is OK (status code 200-299)
  //         if (!response.ok) {
  //           console.log('request faild'
  //           );
  //           throw new Error('Request failed');
  //         }

  //         // Parse the response JSON
  //         console.log("hhaha4");

  //         const data = await response;
  //         console.log("hhaha5");


  //         // Update the state with the fetched data
  //         console.log('anaa khawya',data);
  //         setUser(data);
  //       } catch (error) {
  //       }
  //     };

  //     // Call the fetchData function when the component mounts
  //     fetchData();
  //   },[]);
  {/*   
    <div class="Allchat">
      <div class="msgContainer"></div>
      <div class="Elementofmsg">
        <div class="HeaderMsg"></div>
        <div class="MsgInfo"></div>
        <div class="Convo">
          <div class="MsgBar"></div>
          <div class="Conversation"></div>
        </div>
      </div> */}
 

  return (<>
  <div className="Chat">
      <div className="sidebar">
    
        <div className='ProfileIcon'>
        <img src={user.avatar}/>
        </div>
        <div className='fourItems'>
        <Link to={"Messages"} className='MessageIcon'>
        <img src={messge}/>
        </Link>
        
        <Link to={"Rooms"} className='RoomIcon'>
          <img src={rooms}/>
        </Link>
        <Link to={"Settings"} className='NotifIcon'>
        <img src={notif}/>
        </Link>
        </div>
        
      </div><div className='Allchat'>
  <Routes>
  <Route path="Messages/*" element={<Messages />} >
            <Route path="ElementMsg" element={<ElementMsg />} />
          </Route>
      <Route path="Settings" element={<Settings />} />
      <Route path="Rooms" element={<Rooms />} >
      <Route path="ElementMsg" element={<ElementMsg />} >
                    <Route path="Info" element={<Info />} />
                </Route>
                <Route path="CreateChannel" element={<CreateChannel />} />
        </Route>
    </Routes>
    </div></div></> 

  );
};

export default Navbar;