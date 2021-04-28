import "firebase/functions";
import "firebase/auth";

import { firebaseFunctions } from "./";

export interface User {
  username: string;
  email: string;
  uid: string;
  creationTime: string;
  appointments: string[];
}

interface Users {
  data: { users: User[] };
}

export interface Appointment {
  creationTime: string;
  scheduledTime: string;
  senderEmail: string;
  receiverEmail: string;
  description: string;
  status: number;
  uid: string;
  userID: string;
}

/**
 * Search database where field == email.
 * @param email Search email string.
 * @returns An array of User.
 */
export async function searchUsers(email: string): Promise<Users> {
  const res = await firebaseFunctions.httpsCallable("searchUsers")({ email });

  return res;
}

/**
 *
 * @param sender Sender email string.
 * @param uid Uid specific to user string.
 * @param receiver Receiver email string.
 * @param description Appointment description string.
 * @param scheduledTime Date object converted to string.
 * @returns
 */
export async function scheduleAppointment(
  uid: string,
  sender: string,
  receiver: string,
  description: string,
  scheduledTime: string
): Promise<any> {
  const res = await firebaseFunctions.httpsCallable("scheduleAppointment")({
    uid,
    sender,
    receiver,
    description,
    scheduledTime,
  });

  return res;
}

/**
 * Retrieve array of appointments based on uid.
 * @param uid Uid specific to user string.
 * @returns Appointment[]. An array of appointments.
 */
export async function getAppointments(uid: string): Promise<any> {
  const res = await firebaseFunctions.httpsCallable("getAppointments")({
    uid,
  });

  return res;
}

/**
 * Update appointment status with uid.
 * @param status String representing status of appointment
 * @param uid String id of appointment
 * @returns
 */
export async function updateAppointmentStatus(
  status: string,
  uid: string
): Promise<any> {
  const res = await firebaseFunctions.httpsCallable("updateAppointmentStatus")({
    uid,
    status,
  });

  return res;
}

/**
 * Delete appointment.
 * @param uid String id of appointment
 * @returns
 */
export async function deleteAppointment(uid: string): Promise<any> {
  const res = await firebaseFunctions.httpsCallable("deleteAppointment")({
    uid,
  });

  return res;
}
