import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "bitify-7d21a.firebaseapp.com",
  databaseURL: "https://bitify-7d21a.firebaseio.com",
  projectId: "bitify-7d21a",
  storageBucket: "bitify-7d21a.appspot.com",
  messagingSenderId: "65565251263",
  appId: "1:65565251263:web:f5f52d19a4954d0b31180a",
  measurementId: "G-VTX13ZFZRH",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const initialiseDB = async (drizzleState) => {
  const db = firestore;
  console.log(drizzleState);
  Object.values(drizzleState.accounts).map(async (item, index) => {
    await db
      .collection("users")
      .doc(item)
      .set({
        walletid: item,
        type: index > 10 ? "Listener" : "Artist",
      });
  });
  await db.collection("users").doc(drizzleState.accounts["0"]).set({
    walletid: drizzleState.accounts["0"],
    type: "Admin",
  });
};
