import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyB-9XsazaY_UW_1Tl78_vMfbWHl9f6t5EI",
    authDomain: "node-reactjs.firebaseapp.com",
    databaseURL: "https://node-reactjs.firebaseio.com",
    projectId: "node-reactjs",
    storageBucket: "node-reactjs.appspot.com",
    messagingSenderId: "858973212721",
    appId: "1:858973212721:web:c61544733c9f0243ba0510",
    measurementId: "G-BGS58KXQR4"
  };


const data = firebase.initializeApp(firebaseConfig);

export default data;
