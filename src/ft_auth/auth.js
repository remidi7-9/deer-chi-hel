import React, { useEffect, useState } from 'react';
import './auth.css';
import building from './assets/build.png'
import cloud1 from './assets/cloud1.png'
import cloud2 from './assets/cloud2.png'
import cloud3 from './assets/cloud3.png'
import {useNavigate} from 'react-router-dom'
import { useSocket } from '../SocketContext';



const DelayOfSun = () => {
  const navigate = useNavigate();
  const [showSun, setShowSun] = useState(false);

  useEffect(() => {
    // Wait for 5 seconds before showing the sun
    const timeout = setTimeout(() => {
      setShowSun(true);
    }, 5000); // 5000 milliseconds (5 seconds)

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // After showing the sun for 10 seconds, navigate to the specified route
    if (showSun) {
      const timeout = setTimeout(() => {
        navigate('/Charac');
      }, 700); // 10000 milliseconds (10 seconds)

      // Clean up the timeout to avoid memory leaks
      return () => clearTimeout(timeout);
    }
  }, [navigate, showSun]);
  return (
    <div>

          {showSun && <div><div className="_sun">{console.log("kiikiaaaaaaaa")}</div></div>}
        {/* <div className='_cloud'>
        <img src={cloud1} className = "_cloud1" alt =""/>
        <img src={cloud2} className = "_cloud2" alt =""/>
        <img src={cloud3}  className = "_cloud3" alt =""/>
        <img src={cloud1} className = "_cloud4" alt =""/>
        <img src={cloud2} className = "_cloud5" alt =""/>
        <img src={cloud3} className = "_cloud6" alt =""/>
        
        </div> */}
    </div>
  );
};
const Auth = () => {
  // State to handle loading and error states
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchingstatus, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const { updateUser } = useSocket();
  const [user, setUser] = useState({
    id: -1,
    username: '',
    displayName: '',
    avatar: '',
    socketId: '',
  });

  const fetchData = async () => {
    try {
      // Make a request to your API endpoint
      const response = await fetch('http://10.14.56.6:3000/SchoolOfAthensApi/auth/logged', {
        credentials: 'include',
      });

      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        throw new Error('Request failed');
      }

      // Parse the response JSON
      const data = await response.json();

      // Update the state with the fetched data
      console.log(data); setApiData(data);
      setUser(data);
      updateUser(data);

      setLoading(false); // Set loading to false
    } catch (error) {
      setError(error.message);
      setLoading(false); // Set loading to false
    }
  };

 const openNewWindowAndFetchData = async () => {
    // Open a new window
    const newWindow = window.open('http://10.14.56.6:3000/SchoolOfAthensApi/auth/login/42/', '_blank', 'width=500,height=500');

    // Perform the fetch operation after a short delay (adjust as needed)
     setTimeout(async() => {
      await fetchData();
      setError(null);
    }, 1000); // 1 second delay (adjust as needed)
  };

  const logout = async () => {
    try {
      // Make a request to logout endpoint
      const response = await fetch('http://10.14.56.6:3000/SchoolOfAthensApi/auth/logout', {
        credentials: 'include',
      });
      // Perform additional logout logic if needed
      console.log('Logout successful');

      // Update the state after logout
      setUser({
        id: -1,
        username: '',
        displayName: '',
        avatar: '',
        socketId: '',
      });
      updateUser({
        id: -1,
        username: '',
        displayName: '',
        avatar: '',
        socketId: '',
      });
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  useEffect(() => {
    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  return (
    <>
      {user.id === -1 ? (<div className='Allauth'><div className='Place'><div className='diogenes'>
      <div className='cloud'>
    <img src={cloud1} className = "cloud1" alt =""/>
    <img src={cloud2} className = "cloud2" alt =""/>
    <img src={cloud3}  className = "cloud3" alt =""/>
    <img src={cloud1} className = "cloud4" alt =""/>
    <img src={cloud2} className = "cloud5" alt =""/>
    <img src={cloud3} className = "cloud6" alt =""/></div>

    

    
        </div></div>    <div className='Neo'><button className="neon" onClick={openNewWindowAndFetchData}>Neon</button></div></div>) : (
          <>
          <div className='Allauth'><div className='Place_'>
          
        <div className="sun"></div>
        <div className='cloud'>
        <img src={cloud1} className = "cloud1" alt =""/>
        <img src={cloud2} className = "cloud2" alt =""/>
        <img src={cloud3}  className = "cloud3" alt =""/>
        <img src={cloud1} className = "cloud4" alt =""/>
        <img src={cloud2} className = "cloud5" alt =""/>
        <img src={cloud3} className = "cloud6" alt =""/>
        
        </div>

</div></div><DelayOfSun/></>
    )}</>
  );
};




export default Auth;

