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
  const q = query(collection(db, "dweets"), orderBy("createAt", "desc"));
  onSnapshot(q, (snapshot) => {
    const dweetArr = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(dweetArr);
    setDweets(dweetArr);
  });
};

const addDweet = async (dweet, userObj) => {
  try {
    const docRef = await addDoc(collection(db, "dweets"), {
      text: dweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
    });
    console.log(`Document written with ID : ${docRef.id}`);
  } catch (error) {
    console.log(`Error adding document : ${error}`);
  }
};

const delDweet = async (id) => {
  await deleteDoc(doc(db, "dweets", `${id}`));
};

const editDweet = async (id, newDweet) => {
  await updateDoc(doc(db, "dweets", `${id}`), {
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
