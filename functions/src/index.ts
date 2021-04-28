import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const firestoreDB = admin.firestore();

export const helloWorld = functions.https.onCall(async (data, context) => {
  await firestoreDB.collection("foo").doc("bar").set({
    test: "this is a test",
  });
  console.log(data);

  return { text: "Hello from Firebase!" };
});

/** Exports functions https on call */
export { createUser, searchUsers } from "./users";
export {
  scheduleAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from "./appointments";
