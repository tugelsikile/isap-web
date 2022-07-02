import firebase from "firebase/compat/app";
import 'firebase/compat/analytics';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAPtSSATdbuJ6_tpiB2oNsqAXssP-lWVvc",
    authDomain: "rstnet-sistem.firebaseapp.com",
    projectId: "rstnet-sistem",
    storageBucket: "rstnet-sistem.appspot.com",
    messagingSenderId: "131661347904",
    appId: "1:131661347904:web:617d11a98fcebf0be4f3a5",
    measurementId: "G-9N5NN1M3DY"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
