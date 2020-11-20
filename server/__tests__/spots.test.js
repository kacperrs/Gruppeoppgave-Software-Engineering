import supertest from "supertest";
import app from "../server";
import database from "../db/index.js";

// Hidden spot ?
const location = {
  "9e94b15ed312fa42232fd87a55db0d39": {
    ownerId: "c81e728d9d4c2f636f067f89cc14862c",
    address: "Batmans Cave",
    zipcode: "Gotham City",
    hour_price: "75",
    day_price: "532"
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

    expect(response.body).toEqual(database.spots.get());
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
    expect(response.body).toEqual(database.spots.get(id));
  });

  it("Should respond with 204 if spot not in database", async () => {
    const id = "89320e2752aa13db5dbc61060d897af0";
    await supertest(app).get(`/spots/${id}`).expect(204);
  });
});

describe("POST /spots", () => {
  it("Should create a parkingspot, and add to database", async () => {
    const dummySpot = Object.values(location)[0];

    const response = await supertest(app)
      .post(`/spots`)
      .send(toUrlEncoded(dummySpot))
      .expect("Content-Type", /json/)
      .expect(201);

    const newParkingSpotId = response.body.id;
    expect(database.spots.get(newParkingSpotId)).toEqual(
      expect.objectContaining(dummySpot)
    );

    // Cleanup - remove parkingspot
    database.spots.delete(newParkingSpotId);
    // Verify cleanup
    expect(database.spots.get(newParkingSpotId)).toBeUndefined();
  });
});

describe("DELETE /spots/<id>", () => {
  it("Should remove spot from database", async () => {
    const dummySpot = Object.entries(location);
    const spotId = dummySpot[0][0];
    const spotData = dummySpot[0][1];

    // Add spot directly to db
    database.dbTest.spots.set(spotId, spotData);

    const response = await supertest(app)
      .delete(`/spots/${spotId}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.message).toEqual(
      `Plass med id ${spotId} ble fjernet fra databasen.`
    );
    expect(database.spots.get(spotId)).toBeUndefined();
  });

  it("Should return 404 and error message if userid not in database", async () => {
    const spotId = Object.keys(location);

    expect(database.spots.get(spotId)).toBeUndefined();

    const response = await supertest(app)
      .delete(`/spots/${spotId}`)
      .expect("Content-Type", /json/)
      .expect(404);

    expect(response.body.message).toEqual(
      `Plass med id ${spotId} finnes ikke i databasen.`
    );
  });
});

describe("GET /spots/location/<zipcode>", () => {
  it("Should respond with parkingspot filterd by zipcode", async () => {
    const dummySpot = Object.entries(location);
    const spotId = dummySpot[0][0];
    const spotData = dummySpot[0][1];

    const zipcode = spotData.zipcode;

    // Add spot directly to db
    database.dbTest.spots.set(spotId, spotData);

    const respond = await supertest(app)
      .get(`/spots/location/${zipcode}`)
      .expect("Content-Type", /json/)
      .expect(200);

    const recivedArrayContaining = respond.body.every(
      (item) => item[1].zipcode === zipcode
    );

    expect(recivedArrayContaining).toBe(true);

    // Cleanup - remove parkingspot
    database.dbTest.spots.delete(spotId);
    // Verify cleanup
    expect(database.dbTest.spots.get(spotId)).toBeUndefined();
  });
});

describe("GET /spots/bookings/:id", () => {
  it("Should respond with array of booked date-object", async () => {
    const dummyBooking = Object.entries(booking);
    const bookingId = dummyBooking[0][0];
    const bookingData = dummyBooking[0][1];

    // Add spot directly to db
    database.dbTest.booking.set(bookingId, bookingData);

    const respond = await supertest(app)
      .get(`/spots/bookings/${bookingId}`)
      .expect("Content-Type", /json/)
      .expect(200);

    const recivedArrayContaining = respond.body.every(
      (item) => item.start === bookingData.start && item.end === bookingData.end
    );

    expect(recivedArrayContaining).toBe(true);

    // Cleanup - remove parkingspot
    database.dbTest.booking.delete(bookingId);
    // Verify cleanup
    expect(database.dbTest.booking.get(bookingId)).toBeUndefined();
  });
});

describe("POST /spots/book", () => {
  it("Should return sum with amount of earnings", async () => {
    const response = await supertest(app).post(`/spots/book`);
    expect(response.statusCode).not.toBe(500);
  });
});
