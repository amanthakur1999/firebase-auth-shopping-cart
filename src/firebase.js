// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBvFexm25jOdPNQLxw15Wrcq5Ts4bKLpAI',
  authDomain: 'fir-auth-c7a87.firebaseapp.com',
  projectId: 'fir-auth-c7a87',
  storageBucket: 'fir-auth-c7a87.appspot.com',
  messagingSenderId: '540487403343',
  appId: '1:540487403343:web:71944ea7e005ec0f28673a',
  measurementId: 'G-QF84ZX4K2T',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { app, auth };
