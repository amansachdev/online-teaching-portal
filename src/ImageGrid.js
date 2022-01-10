//import React from 'react';
import useFirestore from 'firebase';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import React, { useContext, useState } from "react";
import { UserContext } from "./providers/UserProvider";
import { auth } from "firebase";
import {firestore} from "./Firebaseconfig.js";
import FullScreenComponent from 'react-easyfullscreen';
import ReactP from './ReactVideo';
import * as firebase from 'firebase';
import 'firebase/firestore';


const monitor = () => {
  console.log('plauy')
}

const monitor1 = () => {
  console.log('ends')
}

const style = {
  container: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    color: '#1f2041',
    textTransform: 'uppercase',
  },
  screen: {
    alignItems: 'center',
    backgroundColor: '#417b5a',
    display: 'flex',
    flexFlow: 'column wrap',
    height: 120,
    justifyContent: 'center',
    margin: 10,
    width: 300,
  },
  button: {
    backgroundColor: '#4b3f72',
    border: 0,
    borderRadius: 4,
    color: '#e9d2c0',
    marginBottom: 5,
    minWidth: 120,
    padding: 5,
  },
  image: {
    cursor: 'pointer',
    width: '50%',
  },
  // bgImage: {
  //   backgroundImage:'url('+ "https://images.pexels.com/photos/34153/pexels-photo.jpg" +')',
  // },
  buttonImage: {
    border: 'none',
    background: 'transparent',
    '&:focus': {
      outline: 'none',
    },
  },
};

const ImageGrid = () => {
  // const { docs } = useFirestore('images');
  // const user = useContext(UserContext);
  // const {photoURL, displayName, email, firstName, lastName} = user;

const monitor = () => {
 firestore.collection("attend").add({
   attended: 'hey i'
})
   .then(function(){
     console.log("added displayName/Attendance to firebase");
   })
 };

  return (
    // <div className="flex flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
    //   {docs && docs.map(doc => (
        // <motion.div className="img-wrap" key={doc.id} 
        //   layout
        //   whileHover={{ opacity: 1 }}s
        //   onClick={() => setSelectedImg(doc.url)}
        // >
        //   <motion.img src={doc.url} alt="uploaded pic"
        //     initial={{ opacity: 0 }}
        //     animate={{ opacity: 1 }}
        //     transition={{ delay: 1 }}
        //   />
        // </motion.div>
        <FullScreenComponent>
        {({ ref, onToggle }) => (
          <button  onClick={() => onToggle()} >
      <ReactPlayer url = {'https://firebasestorage.googleapis.com/v0/b/first-4d157.appspot.com/o/bandicam%202020-11-02%2018-57-51-303.mp4?alt=media&token=05c7760f-6443-4752-97fd-47e7cddbe2d2'}  
      light = {false} 
      controls = {true}
      playing = {false} 
      onPlay={monitor}
      onEnded = {monitor1}
      width = {720}
        
      

    
      
      />

</button>
)}
        
</FullScreenComponent>
       


      )}
    // </div>
//   )
// }

export default ImageGrid;