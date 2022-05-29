const admin = require("firebase-admin");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  blogCollection: "posts",
  blogStorage: "blog/articles"
};

let fbApp; 
try {
  fbApp = admin.app();
}
catch(err) {
  fbApp = admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIAL || "")),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
}

const app = fbApp;
const storage = admin.storage(app).bucket();
const firestore = admin.firestore(app);

module.exports = {
  firebaseConfig,
  app,
  storage,
  firestore
}