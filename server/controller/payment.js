import { payment } from "../db/index.js";

const payments = {
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
};