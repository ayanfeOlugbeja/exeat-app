import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC_hCuFBALhttZ7FMhNNNJCdPQTypz8ey8',
  authDomain: 'exeat-94a00.firebaseapp.com',
  projectId: 'exeat-94a00',
  storageBucket: 'exeat-94a00.appspot.com',
  messagingSenderId: '844988828917',
  appId: '1:844988828917:web:2f994b5231a93d8ae149bc',
  measurementId: 'G-2T82D7R7RH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const storage = getStorage(app);
const firestore = getFirestore(app);
export const db = getFirestore(app);
export { auth, app, firestore, storage };
