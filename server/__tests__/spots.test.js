import supertest from "supertest";
import { app } from "../server";
import { parkingSpot } from "../db/index.js";

const toUrlEncoded = (obj) =>
  Object.keys(obj)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
    .join("&");

describe("GET /spots", () => {
  it("Should respond with JSON of parking spots", async () => {
    const response = await supertest(app)
      .get(`/spots`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toEqual(parkingSpot.get());
  });
});

describe("GET /spots/<id>", () => {
  it("Should respond with parkingspot", async () => {
    // UDI = first
    const id = "c4ca4238a0b923820dcc509a6f75849b";

    const response = await supertest(app)
      .get(`/spots/${id}`)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body).toEqual(parkingSpot.get(id));
  });

  it("Should respond with 204 if spot not in database", async () => {
    const id = "89320e2752aa13db5dbc61060d897af0";
    await supertest(app).get(`/spots/${id}`).expect(204);
  });
});

describe("POST /spots", () => {
  it("Should create a parkingspot, and add to database", async () => {
    // Hidden spot ?
    const location = {
      ownerId: "c81e728d9d4c2f636f067f89cc14862c",
      address: "Batmans Cave",
      zipcode: "72000",
      hour_price: "75",
      day_price: "532",
      spots: "1"
    };
    const response = await supertest(app)
      .post(`/spots`)
      .send(toUrlEncoded(location))
      .expect("Content-Type", /json/)
      .expect(201);

    const newParkingSpotId = response.body.id;
    expect(parkingSpot.get(newParkingSpotId)).toEqual(
      expect.objectContaining(location)
    );

    // Cleanup - remove parkingspot
    parkingSpot.delete(newParkingSpotId);
    // Verify cleanup
    expect(parkingSpot.get(newParkingSpotId)).toBeUndefined();
  });
});
