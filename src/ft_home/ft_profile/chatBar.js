import React from 'react';
import './chatBar.css';


function ChatBar() {
    return (
        <> 
            <div className="friendinput">
                <div className="input-group">
            <input type="text" id="myInput" className="input-group__input" placeholder='Search' />
        </div></div>
            <div className="listfriend">
                <div className="Userfriend">

                <div className="com1"><a className="th1" href="https://unsplash.com/photos/UrfpprfDB0k" target="_blank"><img src="https://cdn.intra.42.fr/users/d6a36e6dd8a5213183fe2d27c87bf099/kremidi.JPG"/></a></div>
                
                <div className='FrContent'>
                    <p>Kremidi</p>
                    {/* https://uxwing.com/wp-content/themes/uxwing/download/internet-network-technology/offline-internet-icon.png */}
                    <img src="https://cdn1.iconfinder.com/data/icons/tech-1-2-flat/234/internet-online-offline-web-512.png"/>
                    {/* https://cdn-icons-png.flaticon.com/512/10264/10264703.png */}
                    <img src="https://cdn-icons-png.freepik.com/512/10265/10265398.png"/>
                    <img src="https://cdn4.iconfinder.com/data/icons/sports-57/32/ping_pong-512.png"/>
                    <img src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/45-512.png"/>
                </div>
                </div>
                
    
            </div>
        </>
    );
};

export default ChatBar;