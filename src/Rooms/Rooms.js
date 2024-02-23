import decart from '../Messages/decart.jpg'
import diogen from '../Messages/diogen.jpg'
import React, { useEffect, useState } from "react";
import { Link, Route, Routes, createRoutesFromChildren, useLocation } from 'react-router-dom';
import './Rooms.css';
import moment from 'moment';
import ElementMsg from "../Messages/ElementMsg/ElementMsg";
import CreateChannel from './CreateChannel/CreateChannel';
import io from 'socket.io-client';
import { useSocket } from '../SocketContext';
import Info from '../Messages/ElementMsg/Info/Info';


const ChannelBar = (props) => {
    return (<><Link to={'CreateChannel'} state={props.user} style={{ textDecoration: 'none' }}>
        <div className='CreateChannel-class'>
            Create New Room
            <span></span><span></span><span></span><span></span></div>
    </Link></>)
}

const ChannelElement = (props) => {
    const { user, imgparam, name, msg, timestamp, room } = props;
    const relativeTime = moment(timestamp).fromNow();
    const addProps = {
        room: room,
        name: name,
        img: imgparam,
    };

    return (
        <>
            <Link to={'ElementMsg'} style={{ textDecoration: 'none' }} state={addProps}>
                {console.log('channelelement')}
                <div className="Element-class">
                    <img src={imgparam} alt={name} />
                    <h4 className="name-class">{name}</h4>
                    <h6 className="date">{relativeTime}</h6>
                    <h5 className="mesg">{msg}</h5>
                </div>
            </Link></>
    );
}
const JoinRoom = (props) => {
    const { img, name, desc, userId, roomId, type, password } = props;
    const [typeRoom, setType] = useState(false);
    const [addpassword, setPassword] = useState('');
    const { socket } = useSocket();


    const handleClick = () => {
        if (type !== 'protected' || password === addpassword) {
            socket.emit('join-room', {
                roomId, user: { id: userId, socketId: socket.id }
            });
        }
    }
    return (<>
        <br />
        <div className="JoinRoom">
            <img src={img} alt={''} />
            <h4 className="name-class">{name}</h4>
            <h5 className="mesg">{desc}</h5>
            {type === "protected" && (<div>
                <input
                    type="password"
                    value={addpassword}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>)}
            <button className='button-chat' onClick={handleClick}>+</button>
        </div>
    </>);
}
const Rooms = (props) => {
    const location = useLocation();
    const { user, socket } = useSocket();

    const [rooms, setRooms] = useState([]);
    const [roomsNotBelong, setRoomsNotBelong] = useState([]);
    const [isTyping, setisTyping] = useState([]);
    const [lastMessage, setLastMessage] = useState([]);
    useEffect(() => {
        console.log('youuu;re in the rrrom');
        const fetchData = async () => {
            try {
                // Replace the following line with your actual API call to get rooms
                if (user.id) {

                    const response = await fetch('http://10.14.56.6:3000/SchoolOfAthensApi/users/' + user.id + '/rooms/');
                    if (!response.ok) {
                        throw new Error('Failed to fetch rooms');
                    }
                    const data = await response.json();
                    setRooms(data);
                    data.forEach(room => {
                        socket.emit('join-room-created-before', { roomId: room.id });
                    });
                    const response1 = await fetch('http://10.14.56.6:3000/SchoolOfAthensApi/rooms/otherRooms/' + user.id);
                    const data1 = await response1.json();
                    setRoomsNotBelong(data1);
                } // Assuming data has a property 'rooms' containing the list of rooms
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchData();
        socket.on('join-event', (message) => {
            if (message.user && message.user.id === user.id) {
                fetchData();
            }
        });
        socket.on('create-room', (message) => {
            fetchData();
        });
        socket.on('typing', (newTyping) => { setisTyping(newTyping) });

        socket.on('newMessage', (messageNew) => { setisTyping([]); setLastMessage(messageNew) });
        return () => {
            socket.off('typing');
            socket.off('newMessage');
        };
    }, [user.id, socket]);
    return (
        <>
        <div className='Room-chat'>
            {console.log('rooom.js', rooms)}
            <div className="div-class">
                <div className="Rooms">
                    <ChannelBar user={user} />
                    <div className="Appearmsg">
                        <ul className='AddNewElement'>

                            {rooms ? (rooms.map((room) => (
                                <li key={room.id}>
                                    {console.log('anaa f channel elemeent', room)}
                                    <ChannelElement
                                        user={user}
                                        imgparam={diogen}
                                        name={room.roomName}
                                        msg={(isTyping && isTyping.roomId === room.id ? (isTyping.username + ": Typing ...") : (lastMessage && lastMessage.roomId === room.id ? (lastMessage.message.sender.username + ": " + lastMessage.message.message) : room.last_message.message))}
                                        room={room}
                                        timestamp={(lastMessage && lastMessage.roomId === room.id ? (lastMessage.message.timeSent) : room.last_message.timeSent)}
                                    />
                                    <br /> </li>
                            ))) : <><h1>{rooms}</h1></>}</ul></div>
                </div>
                <div className='public_protected'>
                    <hr className='line' />
                    <ul className='AddNewElement'>

                        {roomsNotBelong ? (roomsNotBelong.map((room) => (
                            <li key={room.id}>
                                <JoinRoom
                                    img={diogen}
                                    name={room.roomName}
                                    desc={room.description}
                                    roomId={room.id}
                                    userId={user.id}
                                    type={room.type}
                                    password={room.password}

                                />
                                <br /> </li>
                        ))) : <><h1>{roomsNotBelong}</h1></>}</ul>
                </div>
            </div></div>
            <div className='Element-chat'>
            <Routes>
                <Route path="ElementMsg" element={<ElementMsg />} >
                    <Route path="Info" element={<Info />} />
                </Route>
                <Route path="CreateChannel" element={<CreateChannel />} />


            </Routes></div>
        </>
    );
}

export default Rooms;
