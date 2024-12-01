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
  const result = await BookingService.getAllBookings();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Booking retrieved successfully",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
};
