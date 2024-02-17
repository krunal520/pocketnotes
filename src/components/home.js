import React from 'react';
import home from "../assets/home.png";
import lock from "../assets/lock.png";

function Home() {
  return (
    <div style={{ backgroundColor: "#DAE5F5", flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100vh', width: '100%' }}>
      <img src={home} alt="home" />
      <h1>Pocket Notes</h1>
      <br/>
      <p>Send and receive messages without keeping your phone online.<br />Use Pocket Notes on up to 4 linked Devices and 1 mobile phone.</p>
      <span> <br/><br/> <br/> <br/> <br/> <img style={{width:"16px", height:"19px"}} src={lock} alt="lock" />  end-to-end encrypted</span>
    </div>
  );
}

export default Home;