import React, { Component, useContext, useState } from "react";
import { UserContext } from "./providers/UserProvider";
import { navigate } from "@reach/router";
import Title from './Title';
import {auth} from "firebase";
import UploadForm from './UploadForm';
import ImageGrid from './ImageGrid';
import Modal from './Modal';
import Chatbot from "react-chatbot-kit";
import config from "./chatbot/config";
import ActionProvider from "./chatbot/ActionProvider";
import MessageParser from "./chatbot/MessageParser";
import { render } from 'react-dom';
import Example from './Example';
import { Container } from 'reactstrap';
import { Button } from 'reactstrap';
// import "./App1.css";



  
const ProfilePage = () => {
  
  const user = useContext(UserContext);
  const {photoURL, displayName, email, firstName, lastName} = user;
  console.log(user);
  
  const [selectedImg, setSelectedImg] = useState(null);
  
  return (
    <div className = "mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
        <div
          style={{
            background: `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px"
          }}
          className="border border-blue-300"
        ></div>
        <div className = "md:pl-4">
        <h2 className = "text-2xl font-semibold">{displayName}</h2>
        <h3 className = "italic">{email}</h3>
        </div>
      </div>
      <button className = "w-full py-3 bg-red-600 mt-4 text-white" onClick = {() => {auth.signOut()}}>Sign out</button>
      
      <Title/>
      
      
      <Container>
      
      </Container>
      <UploadForm/>
      <Example/>
      
      <ImageGrid setSelectedImg={setSelectedImg} />
      
      { selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
      
      
      
      <div className="App1 flex flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4 w-auto p-3">
        <div style={{Width: "600px"}}>
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
          width={7120}
        />
        
        </div>
        </div>
        </div>
        

    
  ) 
};



export default ProfilePage;

