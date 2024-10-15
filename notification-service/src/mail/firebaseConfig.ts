// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDNWIqwUkwCdBBPnuC2OvPGyzZKa7NL8vo",
  authDomain: "sem-5-project-378d5.firebaseapp.com",
  projectId: "sem-5-project-378d5",
  storageBucket: "sem-5-project-378d5.appspot.com",
  messagingSenderId: "159408553413",
  appId: "1:159408553413:web:7b93386b8aafff54b71fac",
  measurementId: "G-KYL9Y69WHX"
};

const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
