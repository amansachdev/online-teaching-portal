import React from 'react';
import ReactPlayer from 'react-player';



const ReactP = (props) => {
    
console.log('working player')
    return (
        <div >
          <ReactPlayer url = {'https://www.youtube.com/watch?v=7S_tz1z_5bA'}  
          light = {false} 
          controls = {true}
          playing = {false} 
          onPlay={console.log('latest-played')}
        //   onEnded = {monitor}
          width = {720}
            
          
    
        
          
          />
    
    </div>
    );
};

export default ReactP;