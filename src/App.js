import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Intro from './ft_intro/intro.js';
import Auth from './ft_auth/auth.js';
import Charachter from './ft_charachter/charachter.js';
import Home from './ft_home/home.js'
import Navbar from './Navbar/Navbar';
import Messages from './Messages/Messages';
import Profile from './Profile/Profile';
import Settings from './Settings/Settings';
import ElementMsg from './Messages/ElementMsg/ElementMsg';
import Rooms from './Rooms/Rooms'
import Info from './Messages/ElementMsg/Info/Info'
import CreateChannel from './Rooms/CreateChannel/CreateChannel';
import { SocketProvider } from './SocketContext'; 
import AllGame from './ft_home/ft_game/game.js';
function App() {
  return (
    <Router>
      <SocketProvider>
      <Routes>
        <Route path="/" element={<AllGame />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/Charac" element={<Charachter />} />
        <Route path="/Home/*" element={<Home />} >
          <Route path="profile" element={<Profile/>} />
        <Route path='chat/*' element={<Navbar/>} >
        <Route path="Messages/*" element={<Messages />} >
            <Route path="ElementMsg" element={<ElementMsg />} />
          </Route>
          <Route path="Rooms/*" element={<Rooms/>} >
            <Route path="CreateChannel" element={<CreateChannel />} />
            <Route path = "ElementMsg" element={<ElementMsg />} >

          <Route path="Info" element={<Info/>} />
            </Route>
          </Route>
          <Route path="Profile" element={<Profile />} />
          <Route path="Settings" element={<Settings />} />
          </Route>
          </Route>

      </Routes></SocketProvider>
    </Router>
  );
}

export default App;
