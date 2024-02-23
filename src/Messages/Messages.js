import decart from './decart.jpg'
import diogen from './diogen.jpg'
import React from "react";
import { Link, Route, Routes } from 'react-router-dom';
import './Messages.css';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import ElementMsg from "./ElementMsg/ElementMsg";
import { useSocket } from '../SocketContext';
import '../Navbar/Navbar_.css';
const MessageElement = (props) => {
    const { user,imgparam, name, msg, timestamp } = props;
    const relativeTime = moment(timestamp).fromNow();
    const addProps = {
        name: name,
        img: imgparam,
        socket: -1,
    };

    return (
        <Link to={'ElementMsg'} state={addProps} style={{textDecoration: 'none' }}>
            <div className="Element-class">
                <img src={imgparam} alt={name} />
                <h4 className="name-class">{name}</h4>
                <h6 className="date">{relativeTime}</h6>
                <h5 className="mesg">{msg}</h5>
            </div>
        </Link>
    );
}

const Messages = () => {
    const location = useLocation();
    const {user,socket} = useSocket();
    return (
        <div className='Message-chat'>
            <div className="div-class1">
                <div className="title-chat"> 
                    <input type="text" placeholder="search..." />
                </div>
      
                <br />
                <br />
                <div className="Appearmsg">
                   
                    <MessageElement user={user} imgparam={diogen} name={"islam"} msg={"good morning"} timestamp={new Date().getTime()} />
                </div>
            </div>

            <Routes>
                <Route path="ElementMsg" element={<ElementMsg/>} />
            </Routes>
        </div>
    );
}

export default Messages;
