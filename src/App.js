import React, { Component } from 'react';
import './App.css';
import './Bootstrap.min.css';
import MyRoutes from './Routes'
import ReactPlayer from 'react-player';
// import CameraM from './cameraM';
const monitor = () => {
  console.log('plauy')
}

class App extends Component {

  render() {
    return (
	
      <div className="App">
        <div className="container-fluid">
          <MyRoutes />
          {/* <CameraM />           */}
        </div>
      </div>
    );
  }
}

export default App;
