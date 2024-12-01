import ApiError from "../../errors/ApiError";
import { TBooking } from "./booking.interface";
import Booking from "./booking.model";

const createBooking = async (bookingInfo: TBooking) => {
  const createdBooking = await Booking.create(bookingInfo);

  return createdBooking;
};

const getAllBookings = async () => {
  const bookings = await Booking.find();

  return bookings;
};

export const BookingService = {
  createBooking,
  getAllBookings,
};
