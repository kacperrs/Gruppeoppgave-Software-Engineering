import supertest from "supertest";
import app from "../server";
import database from "../db/index.js";

const toUrlEncoded = (obj) =>
  Object.keys(obj)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
    .join("&");

// "Secret" agent .. dummy user.s
const agent = {
  "9e94b15ed312fa42232fd87a55db0d39": {
    firstname: "James",
    lastname: "Bond",
    email: "007@MI6.co.uk",
    password: "shaken-not-stirred",
    phone: "815 493 00"
  }
};

const booking = {
  "14f8612c1c55b070978ae47c442db4b7": {
    spot: {
      ownerId: "9e94b15ed312fa42232fd87a55db0d39",
      address: "MI 6",
      zipcode: "London",
      hour_price: "50",
      day_price: "400",
      id: "da6be7f5289569b6b2934d58feae154d"
    },
    uid: "69691c7bdcc3ce6d5d8a1361f22d04ac",
    date: {
      start: "2020-11-18T11:00:00.000Z",
      end: "2020-11-20T14:00:00.000Z"
    },
    paymentMethod: "vipps",
    cost: 50
  }
};

describe("GET /users", () => {
  it("Should respond with an array of users", async () => {
    const response = await supertest(app)
      .get(`/users`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toEqual(database.users.get());
  });
});

describe("GET /users/<id>", () => {
  it("Should respond with user", async () => {
    // Admin bruker id
    const userid = "c4ca4238a0b923820dcc509a6f75849b";

    const response = await supertest(app)
      .get(`/users/${userid}`)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body).toEqual(database.users.get(userid));
  });

  it("Should respond with 204 if user not in database", async () => {
    // Bruker som ikke er i systemet
    const userid = "eda0e8dfc4d1f28281f6e0f9ea140445";
    await supertest(app).get(`/users/${userid}`).expect(204);
  });
});

describe("DELETE /users/<id>", () => {
  it("Should remove user from database", async () => {
    const agentData = Object.entries(agent);
    const userid = agentData[0][0];
    const userData = agentData[0][1];

    // Add user directly to db
    database.dbTest.users.set(userid, userData);

    const response = await supertest(app)
      .delete(`/users/${userid}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.message).toEqual(
      `Bruker med id ${userid} ble fjernet fra databasen.`
    );
    expect(database.users.get(userid)).toBeUndefined();
  });

  it("Should return 404 and error message if userid not in database", async () => {
    const userid = Object.keys(agent);

    expect(database.users.get(userid)).toBeUndefined();

    const response = await supertest(app)
      .delete(`/users/${userid}`)
      .expect("Content-Type", /json/)
      .expect(404);

    expect(response.body.message).toEqual(
      `Bruker med id ${userid} finnes ikke i databasen.`
    );
  });
});

describe("POST /users", () => {
  it("Should create a user, and add to database", async () => {
    const agentData = Object.values(agent)[0];

    const response = await supertest(app)
      .post(`/users`)
      .send(toUrlEncoded(agentData))
      .expect("Content-Type", /json/)
      .expect(201);

    const newUserId = response.body.id;
    expect(database.users.get(newUserId)).toEqual(
      expect.objectContaining(agentData)
    );

    // Cleanup - remove user
    database.users.delete(newUserId);
    // Verify cleanup
    expect(database.users.get(newUserId)).toBeUndefined();
  });
});

describe("GET /users/spots/:id", () => {
  it("Should return array containting users spots", async () => {
    // Admin bruker id
    const uid = "c4ca4238a0b923820dcc509a6f75849b";

    const response = await supertest(app)
      .get(`/users/spots/${uid}`)
      .expect("Content-Type", /json/)
      .expect(200);

    const recivedArrayContaining = response.body.every(
      (item) => item[1].ownerId === uid
    );

    expect(recivedArrayContaining).toBe(true);
  });
});

describe("UPDATE /users/:id", () => {
  it("Should return true if update successfull.", async () => {
    // Add agent directly to db - better way to do this?
    const agentData = Object.entries(agent);
    const userid = agentData[0][0];
    const userData = agentData[0][1];

    database.dbTest.users.set(userid, userData);

    userData.firstname = "Sean";
    userData.lastname = "Connery";

    const response = await supertest(app)
      .put(`/users/${userid}`)
      .send(toUrlEncoded(userData))
      .expect(200);

    const updatedUser = database.dbTest.users.get(userid);
    expect(
      updatedUser.firstname == "Sean" && updatedUser.lastname == "Connery"
    ).toBe(true);

    // Cleanup - remove user
    database.users.delete(userid);
    // Verify cleanup
    expect(database.users.get(userid)).toBeUndefined();
  });
});

describe("GET /users/booking/:id", () => {
  it("Should return array containg bookings with users id", async () => {
    // Admin bruker id
    const uid = "c4ca4238a0b923820dcc509a6f75849b";

    const response = await supertest(app)
      .get(`/users/bookings/${uid}`)
      .expect("Content-Type", /json/)
      .expect(200);

    const recivedArrayContaining = response.body.every(
      (item) => item[1].uid === uid
    );

    expect(recivedArrayContaining).toBe(true);
  });
});

describe("GET /users/earnings/:id", () => {
  it("Should return sum with amount of earnings", async () => {
    // Fake booking-data
    const bookingData = Object.entries(booking);
    const bookingId = bookingData[0][0];
    const bookingObj = bookingData[0][1];

    // Insert fake booking into db
    database.dbTest.booking.set(bookingId, bookingObj);

    const response = await supertest(app)
      .get(`/users/earnings/${bookingObj.spot.ownerId}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.sum).toBe(50);

    // Cleanup - remove user
    database.dbTest.booking.delete(bookingId);
    // Verify cleanup
    expect(database.dbTest.booking.get(bookingId)).toBeUndefined();
  });
});
