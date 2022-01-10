
import React, { useRef, useEffect,useState } from "react";
import {Redirect, useHistory} from 'react-router-dom';

import firebaseconfig from './Firebaseconfig';


// import "./App.css";
import * as tf from "@tensorflow/tfjs";
import swal from 'sweetalert2';
// OLD MODEL
//import * as facemesh from "@tensorflow-models/facemesh";

// NEW MODEL
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawMesh } from "./utilities";
import { Conv2DBackpropFilter } from "@tensorflow/tfjs";

function CameraM() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const history = useHistory();

  //  Load posenet
  const runFacemesh = async () => {
    // OLD MODEL
    // const net = await facemesh.load({
    //   inputResolution: { width: 640, height: 480 },
    //   scale: 0.8,
    // });
    // NEW MODEL
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    setInterval(() => {
      detect(net);
    }, 10);
  };
  
  let counter = 0;
  

  const detect = async (net) => {
    
    
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      // OLD MODEL
      //       const face = await net.estimateFaces(video);
      // NEW MODEL
      const face = await net.estimateFaces({input:video});
      console.log(face);
      

      if(face.length === 0){
        
        console.log('face is not  detected');
        counter = counter+1;
        console.log(counter);
        
      }
      else{
        console.log('face is detected');
      }

      if(counter>100){
        counter =0;
        clearInterval(detect(net));
        swal({
            type: 'error',
            title: 'You are not in front of camera',
          }).then((value) => {
            // setTimeout(function(){
            // }, 1000)
          //   that.setState({
          //     showEditForm: false,
          // })
          firebaseconfig.auth().signOut();
            history.push('/');
        });
        
        return;

      }
      
      // Get canvas context
      const ctx = canvasRef.current.getContext("2d");
      

      requestAnimationFrame(()=>{drawMesh(face, ctx)});
    }
  };
  

  useEffect(()=>{runFacemesh()}, []);

  return (
    <div className="App">
      {/* <header className="App-header"> */}
        <Webcam
          ref={webcamRef}
          style={{
            position: "left",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 300,
            height: 250,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 300,
            height: 250,
          }}
        />
      {/* </header> */}
    </div>
  );
}

export default CameraM;
