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
} from "firebase/firestore";

const db = getFirestore(app);

const dweetList = (setDweets) => {
  const q = query(collection(db, "dweets"), orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshot) => {
    const dweetArr = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setDweets(dweetArr);
  });
};

const addDweet = (dweetObj) => {
  try {
    const docRef = addDoc(collection(db, "dweets"), dweetObj);
    console.log(`Document written with ID : ${docRef.id}`);
    return docRef;
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
  db,
  dweetList,
  addDweet,
  delDweet,
  editDweet,
};
