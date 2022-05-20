const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc, getDoc } = require("firebase/firestore");
const { getStorage, ref, getDownloadURL, list, getMetadata } = require("firebase/storage");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  blogContent: "blog/articles"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app, firebaseConfig.storageBucket);
const firestore = getFirestore(app);

module.exports = {
  firebaseConfig,
  ref: (url) => ref(storage, url),
  getDownloadURL,
  list,
  getMetadata,
  doc: (path) => doc(firestore, path),
  setDoc,
  getDoc
}