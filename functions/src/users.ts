import * as functions from "firebase-functions";

import { firestoreDB } from "./index";

interface RegisterBody {
  username: string;
  email: string;
  uid: string;
  creationTime: string;
}

interface SearchBody {
  email: string;
  uid: string;
}

/**
 * Collection
 *  - Users
 *  - ID: string
 *  - Username: string
 *  - Email: string
 *  - Appointments: []string
 *  - Created at: date | string
 */

/**
 * Create user doc after auth.
 */
export const createUser = functions.https.onCall(
  async (data: RegisterBody, context) => {
    const { username, email, uid, creationTime } = data;

    /** Set collections users at document uid with information */
    await firestoreDB
      .collection("users")
      .doc(uid)
      .set({
        username,
        email,
        uid,
        creationTime: new Date(creationTime),
        appointments: [],
      });

    return { text: "Registered" };
  }
);

/**
 * Search for users to schedule an appointment with
 */
export const searchUsers = functions.https.onCall(
  async (data: SearchBody, context) => {
    const { email } = data;
    const users = await firestoreDB.collection("users");
    const query = await users.where("email", "==", email);

    /**
     * https://firebase.google.com/docs/firestore/query-data/queries?authuser=3
     */
    const execution = await query
      .get()
      .then((querySnapshot) => {
        let results: { [key: string]: string }[] = [];
        /** Push in user information that matches email */
        querySnapshot.forEach((doc) => {
          results.push(doc.data());
        });

        return results;
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    return { users: execution };
  }
);
