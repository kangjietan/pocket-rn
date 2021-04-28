import firebase from "firebase/app";
import "firebase/functions";
import "firebase/auth";

import { firebaseFunctions } from "./";

interface LoginData {
  displayName: string;
  email: string;
  uid: string;
}

/**
 * Register a user through firebase auth and then create user doc in firestore.
 * @param username string
 * @param email Email string @ domain.
 * @param password string
 * @returns
 */
export function register(
  username: string,
  email: string,
  password: string
): Promise<void> {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      const { uid } = user!;
      const { creationTime } = user!.metadata;

      /** Update user with display name */
      user!.updateProfile({
        displayName: username,
      });

      /** Create user document */
      firebaseFunctions.httpsCallable("createUser")({
        username,
        email,
        uid,
        creationTime,
      });
    })
    .catch((error) => {
      throw new Error(error);
    });
}

/**
 * Login user with email and password
 * @param email Email string @ domain.
 * @param password string
 * @returns User displayname, email, and uid.
 */
export function login(email: string, password: string): Promise<LoginData> {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      const displayName = user!.providerData[0]!.displayName!;
      return { displayName, email, uid: user!.uid };
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
}

/**
 * Logout user.
 * @returns 
 */
export function logout(): Promise<any> {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        resolve("Logged out");
      })
      .catch((error) => {
        // An error happened.
        reject(error);
      });
  });
}
