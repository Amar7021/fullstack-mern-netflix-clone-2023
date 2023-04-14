import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "netflix-cf064.firebaseapp.com",
  projectId: "netflix-cf064",
  storageBucket: "netflix-cf064.appspot.com",
  messagingSenderId: "9068215181",
  appId: "1:9068215181:web:4d59010f8daf60609ddbc4",
  measurementId: "G-P98X927FWR",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
