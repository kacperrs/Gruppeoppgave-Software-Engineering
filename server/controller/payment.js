import { dbPayment } from "../db/index.js";

const payment = {
  all: (req, res) => {
    res.send(payment.get());
  },
  get: (req, res) => {
    const { id } = req.params;
    if (payment.get(id)) res.send(payment.get(id));
    else {
      res.status(204);
      res.send();
    }
  },

  delete: (req, res) => {
    const { id } = req.params;
    if (payment.delete(id)) {
      res.send(`Betaling ${id} fjernet fra databasen.`);
    }
  }
};

export { payment };
