import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC8divwtzjft2A6ft4RHooGAQfMSn-WXGQ",
    authDomain: "coolbox-tracker.firebaseapp.com",
    databaseURL: "https://coolbox-tracker.firebaseio.com",
    projectId: "coolbox-tracker",
    storageBucket: "coolbox-tracker.appspot.com",
    messagingSenderId: "609155444075",
    appId: "1:609155444075:web:0a3125d41ae0bb56cdb02e",
    measurementId: "G-SP2Z296Q0K"
};

if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

export const root = firebase.database();