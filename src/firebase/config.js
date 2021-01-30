import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBAP55Nxd84Xszz-G9JrVLcxoQjYivWr0g",
    authDomain: "the-edge-9ad19.firebaseapp.com",
    databaseURL: "https://the-edge-9ad19-default-rtdb.firebaseio.com/",
    projectId: "the-edge-9ad19",
    storageBucket: "the-edge-9ad19.appspot.com",
    messagingSenderId: "601530250397",
    appId: "1:601530250397:ios:412aebb9d8ea809bcc5074"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else firebase.app();

export {firebase};