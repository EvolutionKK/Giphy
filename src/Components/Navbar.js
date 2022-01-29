import React from 'react';
import "./Navbar.css"

export default function Navbar() {

    return (
        <>
            <div className="nevbar">
                <input className="nav-input" placeholder='Search'></input>
                <div style={{marginLeft:'12rem'}}>
                    <button className='nav-button'>Feed</button>
                    <button className='nav-button'>Friends</button>
                    <button className='nav-button'>Messages</button>
                    <button className='nav-button'>Notifications</button>
                    <img className="profile" src='https://www.vhv.rs/dpng/d/433-4336634_thumb-image-android-user-icon-png-transparent-png.png' alt="" />
                </div>
            </div>
        </>
    );
}
