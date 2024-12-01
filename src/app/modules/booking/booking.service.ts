import ApiError from "../../errors/ApiError";
import { TBooking } from "./booking.interface";
import Booking from "./booking.model";

const createBooking = async (bookingInfo: TBooking) => {
  const { date, slot } = bookingInfo;

  const isBookingExist = await Booking.findOne({ date, slot });

  if (isBookingExist) {
    throw new ApiError(400, `The ${slot} slot on ${date} is already booked.`);
  }

  const createdBooking = await Booking.create(bookingInfo);

  return createdBooking;
};

const getAllBookings = async () => {
  const today = new Date().toISOString().split("T")[0];

  await Booking.updateMany(
    {
      date: { $lt: today },
    },
    {
      $set: { expired: true },
    }
  );

  const bookings = await Booking.find({ expired: false });

  return bookings;
};

export const BookingService = {
  createBooking,
  getAllBookings,
};
