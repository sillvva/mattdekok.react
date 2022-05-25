import admin from "firebase-admin"

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  blogContent: "blog/articles"
};

let fbApp: any; 
try {
  fbApp = admin.app();
}
catch(err) {
  fbApp = admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIAL || "")),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
}

export const app = fbApp;
export const storage = admin.storage(app).bucket();
export const firestore = admin.firestore(app);