import firebase from "firebase/app";
import "firebase/functions";
import "firebase/auth";

// import { Dispatch, SetStateAction } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCDPpvK7Ra9HzZ37giGSFqOurd8JrqlwD4",
  authDomain: "pocket-rn-fc714.firebaseapp.com",
  projectId: "pocket-rn-fc714",
  storageBucket: "pocket-rn-fc714.appspot.com",
  messagingSenderId: "1012259179815",
  appId: "1:1012259179815:web:d980de1cc983133c66ed02",
  measurementId: "G-D8P1LCS41V",
};

const app = firebase.initializeApp(firebaseConfig);

export const firebaseFunctions = app.functions();
firebaseFunctions.useEmulator("localhost", 5001);

export async function helloWorld(): Promise<void> {
  const res = await firebaseFunctions.httpsCallable("helloWorld")({});
  console.log(res);
}

/**
 * Update state whenever user auth changes
 * @param handler React state hook to update user logged in status
 */
// export function authStatus(
//   handler: Dispatch<SetStateAction<boolean>>
// ): Promise<string> {
//   return new Promise((resolve, reject) => {
//     firebase.auth().onAuthStateChanged(
//       (user) => {
//         if (user) {
//           // User is signed in.
//           handler(true);
//           resolve(user.displayName!);
//         } else {
//           // User is not signed in.
//           handler(false);
//         }
//       },
//       (error) => {
//         handler(false);
//         reject(error);
//       }
//     );
//   });
// }

/** Functions */
export { register, login, logout } from "./users";
export { getAppointments, scheduleAppointment, searchUsers, updateAppointmentStatus, deleteAppointment } from "./appointments";
/** Interfaces */
export type { User, Appointment } from "./appointments";

