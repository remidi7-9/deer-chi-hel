// ElementMsg.js
import decart from '../decart.jpg';
import { Link, json } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './ElementMsg.css';
import sendbutton from './aaa.png';
import { useRef } from 'react';
import threedots from './three_dots.png';
import { useLocation } from 'react-router-dom';
import { useSocket } from '../../SocketContext';
import { Routes, Route } from 'react-router-dom';
import Info from './Info/Info'
import { Socket } from 'socket.io-client';

const ThreeDotBar = (props) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = () => {

    console.log('anaa dkhelt hnaaaa 1');

      const divClassMsg = document.querySelector('.Element-chat');
      if (divClassMsg) {
        if(divClassMsg.style.gridTemplateColumns === '1fr 1fr')
            divClassMsg.style.gridTemplateColumns = '2fr';
        else
          divClassMsg.style.gridTemplateColumns = '1fr 1fr'
        // Change the background color to blue
        // Add more style modifications as needed
      }

  };

  return (<>{showInfo ? <Info /> : (
    <div className='plus_info' onClick={() => setShowInfo(true)}>{console.log('kanbgheek')}
      <ul className='threedot-element'>
        <li>
          <div onClick={handleClick}>Infos</div>
        </li>
        <li>Membres</li>
        <li>Quit</li>
        <li>Remove</li>
      </ul>

    </div>)}</>
  );
}
const Sign = () => {

}

// const GenerateRandomString = () =>
// {
//   const charac = "ABCDEFJHIJKLMNOPQRSIUVQSWZabcdefghijklmnopqrsiov1234567890";
//   let result = '';
//   for(let i = 0; i < 8; i++)
//   {
//     const ranind = Math.floor(Math.random() * charac.length);
//     result += charac.charAt(ranind);
//   }
//   return result;
// }
const HeaderChat = (props) => {
  const { room, name, img } = props;

  const [showBar, setShowbar] = useState(false);

  const handleClick = () => {

    console.log('anaa dkhelt hnaaaa 1');

      const divClassMsg = document.querySelector('.Element-chat');
      if (divClassMsg) {
        if(divClassMsg.style.gridTemplateColumns === '1fr 1fr')
        {
            divClassMsg.style.gridTemplateColumns = '2fr';
            setShowbar(false)
        }
        
        else
        {
          divClassMsg.style.gridTemplateColumns = '1fr 1fr'
          setShowbar(true);

        }
        // Change the background color to blue
        // Add more style modifications as needed
      }

  };
  return (
    <div>
    <div className='Header-chat'>
      <img src={decart} alt='User Avatar' />
      <h3>{name}</h3>
      <p className='status'>
        <small>online</small>
      </p>
      <div className='search-bar'>search</div>
      <span className="plus_info_dots" onClick={handleClick}><img src={threedots} /></span>
     
    </div> {showBar && <Info />}</div>
  );
};

const InputConversation = (props) => {
  const [message, setMessage] = useState('');
  const { user, socket } = useSocket();
  const [isTyping, setisTyping] = useState(false);
  const { room } = props;
  const [messages, setMessages] = useState([]);
  // const [room, setRoom] = useState(room);
  const [isConnected, setIsconnected] = useState(socket.connected);
  const conversationRef = useRef(null);

  useEffect(() => {

    console.log('room', room);
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.14.56.6:3000/SchoolOfAthensApi/rooms/' + room.id);
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const data = await response.json();
        room.conversation = data.conversation;
        const updatedMessages = data.conversation.chat.map(msg => ({
          message: msg,
          roomId: data.id
        }));
        setMessages(updatedMessages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      // Cleanup function
      // You can add any cleanup logic here if needed
    };
  }, [socket, room.id]);

  useEffect(() => {

    if (socket !== -1) {
      const updatedMessages = room.conversation.chat.map(msg => ({
        message: msg,
        roomId: room.id
      }));
      setMessages(updatedMessages);
      socket.on('connect', () => {
        setIsconnected(true);
      });
      socket.on('disconnect', () => {
        setIsconnected(false);
      });
      socket.on('room-message', (newMessage) => {

        setMessages((prevMessages) => [...prevMessages, newMessage]);

        if (conversationRef.current) {
          conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
        }
      });

      return () => {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('room-message');
      };
    }
  }, [room.id, socket]);

  const sendMessage = () => {
    if (user) {
      socket.emit('room-message', {
        room: room,
        messageU: {
          sender: user,
          timeSent: new Date(Date.now()).toLocaleString('en-US'),
          message: message,
        },
      });
    }
    setMessage('');
  };

  const handleWheel = (event) => {
    if (conversationRef.current) {
      const { deltaY } = event;
      conversationRef.current.scrollTop += deltaY;
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };
  const handleTyping = (typing) => {
    if (typing)
      socket.emit('typing', { username: user.username, roomId: room.id })
  }
  return (
    <>
      <div className='Input-conversation'>
        {console.log('inputconversation === ', room)}

        <div className='Conversation' ref={conversationRef} onWheel={handleWheel}>
          <ul>
            {messages.map((msg, index) => (
              (msg.roomId === room.id ? (
                <li className={msg.message.sender.id === user.id ? 'Mymessage' : 'message'}>
                  <h6>{msg.message.sender.username}: {msg.message.message}</h6>
                </li>
              ) : <></>)
            ))}
          </ul>
        </div>
        <div className='send-bar'>
          <input
            type='text'
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (e.target.value) {
                handleTyping(true);
              } else {
                handleTyping(false);
              }
            }}
            placeholder='Compose your own Symposium... 📜'
            className='text-input' onKeyDown={handleKeyPress}
          />
          <button className='send-button' onClick={sendMessage}   >
            <img src={sendbutton} alt='Send Button' />
          </button>
        </div>
      </div>
    </>
  );
};
// const InputConversation = (props) => {
//   const [isConnected, setIsconnected] = useState(socket.connected);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const { user } = props;
//   const conversationRef = useRef(null);

//   useEffect(() => {
//     console.log('Socket connected:', isConnected);

//     socket.on('connect', () => {
//       setIsconnected(true);
//     });
//     socket.on('disconnect', () => {
//       setIsconnected(false);
//     });
//     socket.on('message', (newMessage) => {
//       console.log('Received message from server:', newMessage);
//       setMessages((prevMessages) => [...prevMessages, newMessage]);

//       if (conversationRef.current) {
//         conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
//       }
//     });

//     return () => {
//       socket.off('connect');
//       socket.off('disconnect');
//       socket.off('message');
//     };
//   }, [isConnected]);

//   const sendMessage = () => {
//     if (user) {
//       console.log('Sending message:', message);
//       socket.emit('message', {
//         sender: user,
//         timeSent: new Date(Date.now()).toLocaleString('en-US'),
//         message: message,
//       });
//     }
//     setMessage('');
//   };

//   const handleWheel = (event) => {
//     if (conversationRef.current) {
//       const { deltaY } = event;
//       conversationRef.current.scrollTop += deltaY;
//     }
//   };
//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       sendMessage();
//     }
//   };
//   return (
//     <>
//       <div className='Input-conversation'>
//         <div className='Conversation' ref={conversationRef} onWheel={handleWheel}>
//           <ul>
//             {messages.map((msg, index) => (
//               <li key={index} className={msg.sender.id === user.id ? 'Mymessage' : 'message'}>
//                 <h6>{msg.sender.username}: {msg.message}</h6>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className='send-bar'>
//           <input
//             type='text'
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder='Compose your own Symposium... 📜'
//             className='text-input' onKeyDown={handleKeyPress}
//           />
//           <button className='send-button' onClick={sendMessage}   >
//             <img src={sendbutton} alt='Send Button' />
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };
const ElementMsg = (props) => {
  const { name, img } = props;
  const location = useLocation();
  const prop = location.state || {};

  return (
 
     <>
        <HeaderChat room={prop.room} name={(prop.room ? prop.room.roomName : name)} img={img} />
        <hr />

        <br />

        <InputConversation room={prop.room} user={prop.user} socket={prop.socket} />

      </> 

  );
};

export default ElementMsg;
