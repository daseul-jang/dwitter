import { app } from "firebaseService/fbase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const db = getFirestore(app);
const collRef = collection(db, "dweets");

const dweetList = (setDweets) => {
  const q = query(collRef, orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshot) => {
    const dweetArr = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDweets(dweetArr);
  });
};

const myDweets = (uid, setMyDweets) => {
  const q = query(collRef, where("creatorId", "==", uid));
  onSnapshot(q, (snapshot) => {
    const myDweetArr = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMyDweets(myDweetArr);
  });
};

const addDweet = async (dweetObj) => {
  try {
    const docRef = await addDoc(collection(db, "dweets"), dweetObj);
    console.log(`Document written with ID : ${docRef.id}`);
  } catch (error) {
    console.log(`Error adding document : ${error}`);
  }
};

const delDweet = (uid) => {
  return deleteDoc(doc(db, "dweets", `${uid}`));
};

const editDweet = (uid, newDweet) => {
  return updateDoc(doc(db, "dweets", `${uid}`), {
    text: newDweet,
  });
};

export const dbService = {
  dweetList,
  myDweets,
  addDweet,
  delDweet,
  editDweet,
};
