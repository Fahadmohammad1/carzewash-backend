import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.service";

// save bookings in the db
const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.createBooking(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Booking created successfully",
    data: result,
  });
});

// retrieve bookings from db
const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const phone = req.query.phone as string;
  const email = req.query.email as string;
  const password = req.query.password as string;

  const result = await BookingService.getAllBookings({
    phone,
    email,
    password,
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Booking retrieved successfully",
    data: result,
  });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const phone = req.query.phone as string;
  const email = req.query.email as string;
  const password = req.query.password as string;
  const result = await BookingService.deleteBooking(
    { phone, email, password },
    id
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Booking delated successfully",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  deleteBooking,
};
