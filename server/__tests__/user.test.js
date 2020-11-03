import supertest from "supertest";
import { app } from "../server";
import { dbUsers, dbTest } from "../db/index.js";

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
    phone: "815 493 00",
    isFirm: true
  }
};

describe("GET /users", () => {
  it("Should respond with an array of users", async () => {
    const response = await supertest(app)
      .get(`/users`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toEqual(dbUsers.get());
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
    expect(response.body).toEqual(dbUsers.get(userid));
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
    const userid = agentData[0];
    const userData = agentData[1];

    // Add user directly to db
    dbTest.users.set(userid, userData);

    const response = await supertest(app)
      .delete(`/users/${userid}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.message).toEqual(
      `Bruker med id ${userid} ble fjernet fra databasen.`
    );
    expect(dbUsers.get(userid)).toBeUndefined();
  });

  it("Should return 404 and error message if userid not in database", async () => {
    const userid = Object.keys(agent);

    expect(dbUsers.get(userid)).toBeUndefined();

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
    expect(dbUsers.get(newUserId)).toEqual(expect.objectContaining(agentData));

    // Cleanup - remove user
    dbUsers.delete(newUserId);
    // Verify cleanup
    expect(dbUsers.get(newUserId)).toBeUndefined();
  });
});

// TODO: Gjør denne ferdig --
describe("GET /users/spots/:id", () => {
  it("Should return array containting users spots", async () => {
    // Admin bruker id
    const uid = "c4ca4238a0b923820dcc509a6f75849b";

    const response = await supertest(app)
      .get(`/users/spots/${uid}`)
      .expect("Content-Type", /json/)
      .expect(200);

    // const newUserId = response.body.id;
    // expect(dbUsers.get(newUserId)).toEqual(expect.objectContaining(agentData));
  });
});
