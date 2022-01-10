import React, { useRef, useState } from 'react';
import './QueryBot.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import {auth, firestore} from "./Firebaseconfig.js";
// import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// var firebaseConfig = {
//     apiKey: "AIzaSyBfYsqjuTHWO0J7gfiHmlV3F_klAMFX3mg",
//     authDomain: "first-9f463.firebaseapp.com",
//     databaseURL: "https://first-9f463.firebaseio.com",
//     projectId: "first-9f463",
//     storageBucket: "first-9f463.appspot.com",
//     messagingSenderId: "1060000996741",
//     appId: "1:1060000996741:web:f53952716a9d299f"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();
// const firestore = firebase.firestore();
// const analytics = firebase.analytics();


function QueryBot() {

  const [user] = useAuthState(auth);

  return (
    <div className="App1">
      {/* <header> */}
        
        {/* <SignOut /> */}
      {/* </header> */}
      <h5>Query Chat-Bot</h5>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      {/* <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button> */}
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(1000);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL,displayName } = auth.currentUser;
    const ds=auth.currentUser.displayName;
    console.log(uid);
    console.log(ds);
    console.log('');
    console.log('');
    console.log('');

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const ds=auth.currentUser.displayName;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  console.log(ds);
  return (<div className = "wot">
  
  <h1>
    {ds}
  </h1>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://image.shutterstock.com/image-vector/baby-bot-logo-designs-vector-260nw-1427981018.jpg'} />
      <p>{text}</p>
    </div>
  </div>)
}


export default QueryBot;
