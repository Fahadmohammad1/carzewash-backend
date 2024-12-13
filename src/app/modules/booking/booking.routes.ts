import express from "express";
import { BookingController } from "./booking.controller";
const router = express.Router();

router.post("/create", BookingController.createBooking);
router.get("/", BookingController.getAllBookings);
router.delete("/:id", BookingController.deleteBooking);

export const BookingRoutes = router;
