import supertest from "supertest";
import app from "../server";

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
