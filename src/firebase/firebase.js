import * as firebase from 'firebase';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {
  // Existing and future Auth states are now persisted in the current 
  // session only. Closing the window would clear any existing state even
  // if a user forgets to sign out.
  // ...
  // New sign-in will be persisted with session persistence.
  return firebase.auth().signInWithEmailAndPassword(email, password);
})
.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
})

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, firebaseui, googleAuthProvider, database as default };