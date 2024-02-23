import React, { createContext, useContext, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket] = useState(io('http://10.14.56.6:3000', { path: '/websocket' }));
  const [user, setUser] = useState(null);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  // Combine socket and user into one object
  const socketWithUser = { socket, user, updateUser };

  return (
    <SocketContext.Provider value={socketWithUser}>
      {children}
    </SocketContext.Provider>
  );
};