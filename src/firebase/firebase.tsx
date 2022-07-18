
import firebase from "firebase";
import { firebaseConfig } from "./firbaseConfig";

// Initialize Cloud Firestore through Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();

// const getusers = db.collection("danhSachVe").get().then((data:any) => {
 
//   data.forEach((doc:any) => {
//       console.log(doc.data())
//   });
// });
