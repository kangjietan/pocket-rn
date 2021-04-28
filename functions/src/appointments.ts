import * as functions from "firebase-functions";

import { firestoreDB } from "./index";

enum Status {
  PENDING,
  ACCEPTED,
  DECLINED,
}

interface ScheduleAppointmentBody {
  uid: string;
  sender: string;
  receiver: string;
  description: string;
  scheduledTime: string;
}

interface UpdateAppointmentBody {
  uid: string;
  status: string;
}

interface Appointment {
  creationTime: string;
  scheduledTime: string;
  description: string;
  status: number;
  uid: string;
  userID: string;
}

/**
 * Collection
 * - Appointments
 *  - ID: string
 *  - Scheduled Time: string
 *  - User ID: string
 *  - SenderEmail: string
 *  - ReceiverEmail: string
 *  - Description: string
 *  - Created at: date | string
 *  - Updated at: date | string
 *  - Deleted at?: date | string
 *  - Status: "Pending" | "Accepted" | "Declined" = > Enum
 */

/**
 * Create appointment document, update document with auto generated id and return id.
 * Update both user appointment arrays with id.
 */
export const scheduleAppointment = functions.https.onCall(
  async (data: ScheduleAppointmentBody, context) => {
    const { sender, receiver, description, uid, scheduledTime } = data;

    /**
     * Returns document id after adding document into collection.
     * https://firebase.google.com/docs/firestore/manage-data/add-data
     */
    const createAppointment = await firestoreDB
      .collection("appointments")
      .add({
        userID: uid,
        senderEmail: sender,
        receiverEmail: receiver,
        description,
        scheduledTime: new Date(scheduledTime),
        creationTime: new Date(),
        status: Status.PENDING,
      })
      .then((docRef) => {
        docRef.update({
          uid: docRef.id,
        });

        return docRef.id;
      })
      .catch((error) => {
        console.log(error);
      });

    /**
     * Update both sender and receiver with the appointment.
     * https://stackoverflow.com/questions/55714423/firestore-query-then-update
     */
    await firestoreDB
      .collection("users")
      .where("email", "in", [receiver, sender])
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          doc.ref.update({
            appointments: [...data.appointments, createAppointment],
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

/**
 * Retrieve appointment data. Modify firestore timestamp to string.
 * @param id string
 * @returns appointment data {}
 */
const retrieveAppointment = async (id: string) => {
  const appointment = await firestoreDB
    .collection("appointments")
    .doc(id)
    .get()
    .then((docSnapshot) => {
      const data = docSnapshot.data();
      /** Don't return appointment if soft deleted */
      if (!data!.deletedTime) {
        /** Make copy of data and alter firestore timestamps */
        return Object.assign({}, data, {
          scheduledTime: data!.scheduledTime.toDate().toString(), // Convert firestore timestamp to string
          creationTime: data!.creationTime.toDate().toString(), // Convert firestore timestamp to string
        });
      } else {
        return;
      }
    });

  return appointment;
};

/**
 * Retrieve array of appointments from uid.
 */
export const getAppointments = functions.https.onCall(
  async (data: { uid: string }, context) => {
    const appointmentIDs = await firestoreDB
      .collection("users")
      .doc(data.uid)
      .get()
      .then((docSnapshot) => {
        const data = docSnapshot.data();
        return data!.appointments;
      });

    let results = [];

    for (let i = 0; i < appointmentIDs.length; i++) {
      const result = await retrieveAppointment(appointmentIDs[i]);

      if (result) results.push(result);
    }

    return results;
  }
);

/**
 * Update appointment document by id with new status
 */
export const updateAppointmentStatus = functions.https.onCall(
  async (data: UpdateAppointmentBody, context) => {
    const { uid, status } = data;
    let code;

    if (status === "ACCEPTED") code = Status.ACCEPTED;
    if (status === "DECLINED") code = Status.DECLINED;

    const appointment = await firestoreDB
      .collection("appointments")
      .doc(uid)
      .update({
        status: code,
        updatedTime: new Date(),
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
      });

    return appointment;
  }
);

/**
 * Soft delete appointment by adding deleted time.
 */
export const deleteAppointment = functions.https.onCall(
  async (data: { uid: string }, context) => {
    const { uid } = data;

    const appointment = await firestoreDB
      .collection("appointments")
      .doc(uid)
      .update({
        deletedTime: new Date(),
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
      });

    return appointment;
  }
);
