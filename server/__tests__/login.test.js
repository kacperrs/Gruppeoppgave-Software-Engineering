import supertest from "supertest";
import app from "../server";
import database from "../db/index.js";

const toUrlEncoded = (obj) =>
  Object.keys(obj)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
    .join("&");

describe("GET / *", () => {
  it("/ - Should respond with 403 - Forbidden", async () => {
    const response = await supertest(app).get("/login").expect(403);
  });
  it("/ * (any) - Should respond with 403 - Forbidden", async () => {
    const response = await supertest(app)
      .get("/login/any/type/of/url")
      .expect(403);
  });
});

describe("POST /login", () => {
  it("Valid username and password should respond 200", async () => {
    const user = database.users.get("c4ca4238a0b923820dcc509a6f75849b");
    const userCredentials = {
      email: user.email,
      password: user.password
    };

    const response = await supertest(app)
      .post(`/login`)
      .send(toUrlEncoded(userCredentials))
      .expect(200);
  });

  it("Invalid username and password should respond 400", async () => {
    const user = database.users.get("c4ca4238a0b923820dcc509a6f75849b");
    const userCredentials = {
      email: user.email,
      password: "Batman is my hero"
    };

    const response = await supertest(app)
      .post(`/login`)
      .send(toUrlEncoded(userCredentials))
      .expect(400);
  });
});
