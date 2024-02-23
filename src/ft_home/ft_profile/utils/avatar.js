import React from 'react';
import './avatar.css';



function Avatar() {
    return (
        <>
        <div className="com"><a className="th" href="https://unsplash.com/photos/UrfpprfDB0k" target="_blank"><img src="https://cdn.intra.42.fr/users/d6a36e6dd8a5213183fe2d27c87bf099/kremidi.JPG"/></a></div>
        <div className="besideAvatar">
        <button type="button" className="Playnow">Play</button>
        <button type="button" className="Playnow">Train</button>
        </div>
        </>
    );
};


export default Avatar;

