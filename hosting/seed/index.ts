import { register, scheduleAppointment, login } from "../src/sdk";

/** Populate with data */

function createUsers() {
  const createUsers = ["test123", "a", "b"];
  for (let i = 0; i < createUsers.length; i++) {
    setTimeout(() => {
      register(createUsers[i], createUsers[i] + "@gmail.com", "123456");
    }, 1000 * i);
  }
}

async function populateData() {
  const uid = await login("a@gmail.com", "123456").then((response) => {
    return response.uid;
  });

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      scheduleAppointment(
        uid,
        "a@gmail.com",
        "test123@gmail.com",
        `ABC${i}`,
        `Tue Apr 29 2021 10:3${i}:04 GMT-0700`
      );
    }, 1000 * i);
  }
}

const populate = () => {
  createUsers();
  setTimeout(populateData, 2000);
};

populate();
