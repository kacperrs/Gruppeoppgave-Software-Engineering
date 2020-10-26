import supertest from "supertest";
import { app } from "../server";
import { users } from "../db/index.js";
import { resolvePlugin } from "@babel/core";

const toUrlEncoded = (obj) =>
  Object.keys(obj)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
    .join("&");

describe("GET /", () => {
  it("Should respond with a message", async () => {
    const response = await supertest(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.message).toEqual("Share-A-Spot Server - Up and 🏃");
  });
});

describe("GET /<bad rout>", () => {
  it("Should respond with a 404 status", async () => {
    const badRout = "not_a_valid_rout";
    const response = await supertest(app)
      .get(`/${badRout}`)
      .expect("Content-Type", /json/)
      .expect(404);

    expect(response.body.message).toEqual(`Not found - /${badRout}`);
  });
});

describe("GET /users", () => {
  it("Should respond with an array of users", async () => {
    const response = await supertest(app)
      .get(`/users`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toEqual(users.get());
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
    expect(response.body).toEqual(users.get(userid));
  });

  it("Should respond with 204 if user not in database", async () => {
    // Bruker som ikke er i systemet
    const userid = "eda0e8dfc4d1f28281f6e0f9ea140445";
    await supertest(app).get(`/users/${userid}`).expect(204);
  });
});

// describe("DELETE /users/<id>", () => {
//   it("Should remove user from database", async () => {
//     // Add fake-user
//     const userid = "44902eabeb116bf9155c9717aaaa60d7";

//     const response = await supertest(app)
//       .get(`/users/${userid}`)
//       .expect("Content-Type", /json/)
//       .expect(200);
//     expect(response.body).toEqual(users.get(userid));
//   });
// });

describe("POST /users", () => {
  it("Should create a user, and add to database", async () => {
    // "Secret" user .. agent?
    const agent = {
      firstname: "James",
      lastname: "Bond",
      email: "007@MI6.co.uk",
      password: "shaken-not-stirred"
    };
    const response = await supertest(app)
      .post(`/users`)
      .send(toUrlEncoded(agent))
      .expect("Content-Type", /json/)
      .expect(201);

    const newUserId = response.body.id;
    expect(JSON.parse(users.get(newUserId))).toEqual(
      expect.objectContaining(agent)
    );

    // Cleanup - remove user
    users.delete(newUserId);
  });
});
