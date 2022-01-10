import * as firebase from 'firebase';
//import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { functions } from "firebase";
import { useState, useEffect } from 'react';
import 'firebase/storage';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCEQj2la99B2-lV5_PFh9VyWL3p7vG7EwI",
  authDomain: "react-b23e2.firebaseapp.com",
  databaseURL: "https://react-b23e2.firebaseio.com",
  projectId: "react-b23e2",
  storageBucket: "react-b23e2.appspot.com",
  messagingSenderId: "283777205710",
  appId: "1:283777205710:web:63956bf334620188d2d79f"
};
const firebaseconfig = firebase.initializeApp(config);



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL, firstName,lastName } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        firstName,
        lastName,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore.collection(collection)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({...doc.data(), id: doc.id});
        });
        setDocs(documents);
      });

    return () => unsub();
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, [collection]);

  return { docs };
}



const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export { projectStorage, projectFirestore, timestamp, useFirestore };

export default firebaseconfig