import { app } from "firebaseService/fbase";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const storage = getStorage(app);

const uploadFile = (uid, fileUrl) => {
  const fileRef = ref(storage, `${uid}/${uuidv4()}`);
  return uploadString(fileRef, fileUrl, "data_url");
};

const downloadFile = (ref) => {
  return getDownloadURL(ref);
};

const deleteFile = (url) => {
  return deleteObject(ref(storage, url));
};

export const storageService = {
  storage,
  uploadFile,
  downloadFile,
  deleteFile,
};
