import React from 'react';
import videoBg from '../assets/videoBg.mp4';

const Main = () => {
  return (
    <div className='main'>
      <video src={"https://streamable.com/o5kjw6"} autoPlay loop muted />
    </div>
  );
};

export default Main;
