import { app } from "firebaseService/fbase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const auth = getAuth(app);

const authStateChanged = (setUserObj, setIsInit) => {
  onAuthStateChanged(auth, (user) => {
    user ? setUserObj(user) : setUserObj(null);
    setIsInit(true);
  });
};

const createUser = (email, pass) => {
  return createUserWithEmailAndPassword(auth, email, pass);
};

const signIn = (email, pass) => {
  return signInWithEmailAndPassword(auth, email, pass);
};

const socialLogin = (name) => {
  let provider;

  if (name === "google") {
    provider = new GoogleAuthProvider();
  } else if (name === "github") {
    provider = new GithubAuthProvider();
  }
  return signInWithPopup(auth, provider);
};

const logOut = () => {
  signOut(auth);
};

export const authService = {
  authStateChanged,
  createUser,
  signIn,
  socialLogin,
  logOut,
};
