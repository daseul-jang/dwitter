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
  updateProfile,
} from "firebase/auth";

const auth = getAuth(app);

const authStateChanged = (setUserObj, setIsInit) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const index = user.email.indexOf("@");
      const name = user.email.substring(0, index);

      setUserObj({
        displayName: user.displayName ?? name,
        uid: user.uid,
      });
    } else {
      setUserObj(null);
    }

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

const profileUpdate = (newName) => {
  return updateProfile(auth.currentUser, {
    displayName: newName,
  });
};

const logOut = () => {
  signOut(auth);
};

export const authService = {
  auth,
  authStateChanged,
  createUser,
  signIn,
  socialLogin,
  profileUpdate,
  logOut,
};
