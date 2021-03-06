import {getApp, getApps, initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {
  getFirestore,
  FirestoreSettings,
  initializeFirestore,
} from 'firebase/firestore';
import {
  // @ts-ignore
  API_KEY,
  // @ts-ignore
  AUTH_DOMAIN,
  // @ts-ignore
  PROJECT_ID,
  // @ts-ignore
  STORAGE_BUCKET,
  // @ts-ignore
  MESSAGING_SENDER_ID,
  // @ts-ignore
  APP_ID,
  // @ts-ignore
  MEASUREMENT_ID,
} from '@env';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export {db, auth};
