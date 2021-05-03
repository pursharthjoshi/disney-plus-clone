import firebase from "firebase";

const firebaseConfig = {
  apiKey: "yourApiKey",
  authDomain: "yourAuthDomain",
  projectId: "yourProjectId",
  storageBucket: "yourStorageBucket",
  messagingSenderId: "yourMessageSenderId",
  appId: "yourAppId",
  measurementId: "yourMeasurementId",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;