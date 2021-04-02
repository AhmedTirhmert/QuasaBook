import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";
import "firebase/auth";
import firebaseconfig from "../components/firebase/firebaseconfig";

const firebaseApp = firebase.initializeApp(firebaseconfig);
let storage = firebaseApp.storage();
let firestore = firebaseApp.firestore();
let database = firebaseApp.database();
let Auth = firebaseApp.auth();
let LOCAL = firebase.auth.Auth.Persistence.LOCAL;
export { firestore, storage, database, Auth, LOCAL };
