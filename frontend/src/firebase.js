import firebase from "firebase/compat/app"
import "firebase/compat/auth"
// require("dotenv").config()

const app = firebase.initializeApp({
  apiKey: "AIzaSyBuQXi1gmA-kwW6QcNnGAGlyp5hAimzIZE",
  authDomain: "ecommerce-auth-b8124.firebaseapp.com",
  projectId: "ecommerce-auth-b8124",
  storageBucket: "ecommerce-auth-b8124.appspot.com",
  messagingSenderId: "561630730150",
  appId: "1:561630730150:web:e9dab2e9e44802f5136167"
})

export const auth = app.auth()
export default app