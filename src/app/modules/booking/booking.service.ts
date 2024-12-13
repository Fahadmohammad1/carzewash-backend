import ApiError from "../../errors/ApiError";
import { TBooking } from "./booking.interface";
import Booking from "./booking.model";
import Admin, { TAdmin } from "../admin/admin.model";

const createBooking = async (bookingInfo: TBooking) => {
  const { date, slot } = bookingInfo;

  const today = new Date().toISOString().split("T")[0];

  // checking if the date is earlier than today
  if (date < today) {
    throw new ApiError(
      400,
      "Booking cannot be made for a date earlier than today."
    );
  }

  // checking if the booking is already exist
  const isBookingExist = await Booking.findOne({ date, slot });

  if (isBookingExist) {
    throw new ApiError(400, `The ${slot} slot on ${date} is already booked.`);
  }

  // creating a new booking
  const createdBooking = await Booking.create(bookingInfo);

  return createdBooking;
};

const getAllBookings = async (adminInfo: TAdmin) => {
  const today = new Date().toISOString().split("T")[0];

  // deleting the expired booking
  await Booking.updateMany(
    {
      date: { $lt: today },
    },
    {
      $set: { expired: true },
    }
  );

  // validating the admin
  const admin = await Admin.findOne({
    phone: adminInfo.phone,
    email: adminInfo.email,
    password: adminInfo.password,
  });

  if (!admin) {
    throw new ApiError(401, "Unauthorized Access");
  }

  // retrieving all the bookings except the expireds
  const bookings = await Booking.find({});

  return bookings;
};

export const deleteBooking = async (adminInfo: TAdmin, id: string) => {
  const admin = await Admin.findOne({
    phone: adminInfo.phone,
    email: adminInfo.email,
    password: adminInfo.password,
  });

  if (!admin) {
    throw new ApiError(401, "Unauthorized Access");
  }

  const findBooking = await Booking.findOne({ _id: id });
  console.log(findBooking);

  if (!findBooking) {
    throw new ApiError(404, "Booking not found");
  }

  const result = await Booking.updateOne(
    {
      _id: id,
    },
    {
      $set: { expired: true },
    }
  );

  return result;
};

export const BookingService = {
  createBooking,
  getAllBookings,
  deleteBooking,
};
