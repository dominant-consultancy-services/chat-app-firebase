// import {React,useState,useRef} from 'react';
// import './App.css';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';
// import {useAuthState} from 'react-firebase-hooks/auth';
// import{useCollectionData} from 'react-firebase-hooks/firestore';
// firebase.initializeApp({
//     apiKey: "AIzaSyBw29qJ3Tzcbwlfw-fCn7gF-hUuJ-g7nhw",
//     authDomain: "superchat-f59b6.firebaseapp.com",
//     projectId: "superchat-f59b6",
//     storageBucket: "superchat-f59b6.appspot.com",
//     messagingSenderId: "135464958241",
//     appId: "1:135464958241:web:bdffc0f88eb5216ef6e660"
// })
// const auth=firebase.auth();
// const firestore=firebase.firestore();
// function App() {

//   const [user] = useAuthState(auth);

//   return (
//     <div className="App">
//       <header>
//         <h1>⚛️🔥💬</h1>
//         <SignOut />
//       </header>

//       <section>
//         {user? <ChatRoom/> : <SignIn/>  }
//       </section>
//     </div>
//   );
// }

// const SignIn = () => {
//   const signInWithGoogle = () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     auth.signInWithPopup(provider);
//   }
//   return(
//     <button onClick={signInWithGoogle}>Sing in</button>
//   )
// }

// const ChatRoom = () => {
//   const dummy = useRef();
// const messagesRef=firestore.collection('messages');
// const query=messagesRef.orderBy('createdAt').limit(25);
// const [messages]=useCollectionData(query,{idField:'id'});



// const [formValue, setFormValue] = useState('');

// const sendMessage = async(e) =>{
//     e.preventDefault();

//     const {uid,photoURl}  = auth.currentUser;

//     await messagesRef.add({
//       text:formValue,
//       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//       uid,
//       photoURl
//     });

//     setFormValue('');

//     dummy.current.scrollIntoView({ behavior: 'smooth' });
// }


// return (<>
//   <main>

//     {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

//     <span ref={dummy}></span>

//   </main>

//   <form onSubmit={sendMessage}>

//     <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

//     <button type="submit" disabled={!formValue}>🕊️</button>

//   </form>
// </>)
// }
// const SignOut=()=>{
//   return auth.currentUser && (
//     <button onClick ={()=>auth.signOut()}>Sigh Out</button>
//   )
// }
// const ChatMessage=(props)=>{
//   const{text,uid,photoURl }=props.message;
//   const messageClass=uid===auth.currentUser.uid?'sent':'received'; 
//   return(
//     <div className={`message ${messageClass}`}>
//     <img src={photoURl} alt="chatapp"/>
//     <p>{text}</p>

//     </div>
//   )
// }
// export default App;


import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  // your config
  apiKey: "AIzaSyCB28PpAjSVMAxmgi7ZlSyWv6mvTYNEbLk",
  authDomain: "chat-e8fbc.firebaseapp.com",
  projectId: "chat-e8fbc",
  storageBucket: "chat-e8fbc.appspot.com",
  messagingSenderId: "217322237771",
  appId: "1:217322237771:web:08d4b52cddaf1520a442ce"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header >
        <img className="dominant" src="https://dominantcs.com/upload/logo/logo.png" alt="dominantcs.com"/>
        <SignOut />
      </header>

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
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
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
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

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

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}


export default App;