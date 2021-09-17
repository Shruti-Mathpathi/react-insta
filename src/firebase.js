import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCcS5qoSEA_QbRO31JrtimNgiz_zzK-slo",
    authDomain: "reactinsta-91912.firebaseapp.com",
    projectId: "reactinsta-91912",
    storageBucket: "reactinsta-91912.appspot.com",
    messagingSenderId: "867297032845",
    appId: "1:867297032845:web:e02d1eb03a686858e840c4"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export {db , auth , storage , provider};
