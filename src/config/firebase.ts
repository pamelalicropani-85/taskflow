import {getApps, initializeApp} from 'firebase/app'
import {getAuth} from '@firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAoYmEsWIqpTef7sayGKpbHAFLdSzO-Ghw",
  authDomain: "taskflow-1e8e8.firebaseapp.com",
  projectId: "taskflow-1e8e8",
  storageBucket: "taskflow-1e8e8.firebasestorage.app",
  messagingSenderId: "300527787238",
  appId: "1:300527787238:web:114bb8a532eff8fea66f27"
};

const app =
 getApps().length ===0
 ? initializeApp(firebaseConfig)
 : getApps()[0]

export const auth = getAuth (app)
export const db = getFirestore(app)

export default app