import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyCP73Kofmzvn7hxP5bY9FHJMIkvgAXgLX8",
    authDomain: "event0-9d814.firebaseapp.com",
    projectId: "event0-9d814",
    storageBucket: "event0-9d814.firebasestorage.app",
    messagingSenderId: "1055830067813",
    appId: "1:1055830067813:web:d4ab8c6d810d00229f148c",
    measurementId: "G-Z02DY44GT6"
};

const app = initializeApp(firebaseConfig);
const DB = getFirestore();
const AUTH =  initializeAuth(app,{
    persistence: getReactNativePersistence(AsyncStorage)
});

export { AUTH, DB }