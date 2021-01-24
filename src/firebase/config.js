import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAmvGAGleB_oaQekWdBEoV3F5GclwYfNBs',
    authDomain: 'the-edge-32a69.firebaseapp.com',
    databaseURL: 'https://the-edge-32a69.firebaseio.com',
    projectId: 'the-edge-32a69',
    storageBucket: 'the-edge-32a69.appspot.com',
    messagingSenderId: '971963592101',
    appId: '1:971963592101:ios:d746c454fe962f14aa8c4c',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export {firebase};