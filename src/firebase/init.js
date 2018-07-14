import firebase from 'firebase'

import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDiJp5ds-aeUgMFSmEUIXVuOyXIqOhHgO0",
    authDomain: "cocktails-79df0.firebaseapp.com",
    databaseURL: "https://cocktails-79df0.firebaseio.com",
    projectId: "cocktails-79df0",
    storageBucket: "cocktails-79df0.appspot.com",
    messagingSenderId: "664193606092"
  };

  const firebaseApp = firebase.initializeApp(config);

  firebaseApp.firestore().settings({ timestampsInSnapshots: true })

  export default firebaseApp.firestore()
