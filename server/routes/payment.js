import express from "express";

const router = express.Router();


router.get("/", );
router.get("/:id", payment.get); //Henter betalingsinformasjonen for betalingen
router.get("/admin", payment.all); //Se oversikt over alle betalinger (Kun admin skal ha tilgang)

export default router;