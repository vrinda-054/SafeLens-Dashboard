// Firebase is disabled - using mock data only
// To enable Firebase, uncomment the code below and add your config

/*
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, query, orderByChild, equalTo } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth, ref, onValue, query, orderByChild, equalTo };
export default app;
*/

// Mock exports for development
export const database = null;
export const auth = null;
export const ref = () => null;
export const onValue = () => null;
export const query = () => null;
export const orderByChild = () => null;
export const equalTo = () => null;
export default null;
