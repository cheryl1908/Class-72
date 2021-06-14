
import firebase from 'firebase';
require("@firebase/firestore")
var firebaseConfig = {
    apiKey: "AIzaSyCMHg-o2ikQAHf8DX1g8Us7iqp_nSkt830",
    authDomain: "wily-a439d.firebaseapp.com",
    projectId: "wily-a439d",
    storageBucket: "wily-a439d.appspot.com",
    messagingSenderId: "112358934308",
    appId: "1:112358934308:web:8bca535ce76e28fb1255b1"
  };
  // Initialize Firebase
  if(!firebase.apps.length)
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();