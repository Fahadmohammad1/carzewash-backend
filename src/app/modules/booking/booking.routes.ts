import express from "express";
import { BookingController } from "./booking.controller";
const router = express.Router();

router.get("/", BookingController.getAllBookings);
router.post("/create", BookingController.createBooking);

export const BookingRoutes = router;
