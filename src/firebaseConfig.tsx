import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyB_LN7OD5rbA1sKtszhsq_KTsHHmj6G3IQ",
  authDomain: "react-ionic-app.firebaseapp.com",
  projectId: "react-ionic-app",
  storageBucket: "react-ionic-app.appspot.com",
  messagingSenderId: "627770625141",
  appId: "1:627770625141:web:70f22d2df308d851877c3c",
  measurementId: "G-XGX299CJMQ",
};

firebase.initializeApp(config);
const db = firebase.firestore();

export default db;
