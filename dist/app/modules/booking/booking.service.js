"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const booking_model_1 = __importDefault(require("./booking.model"));
const admin_model_1 = __importDefault(require("../admin/admin.model"));
const createBooking = (bookingInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, slot } = bookingInfo;
    const today = new Date().toISOString().split("T")[0];
    // checking if the date is earlier than today
    if (date < today) {
        throw new ApiError_1.default(400, "Booking cannot be made for a date earlier than today.");
    }
    // checking if the booking is already exist
    const isBookingExist = yield booking_model_1.default.findOne({ date, slot });
    if (isBookingExist) {
        throw new ApiError_1.default(400, `The ${slot} slot on ${date} is already booked.`);
    }
    // creating a new booking
    const createdBooking = yield booking_model_1.default.create(bookingInfo);
    return createdBooking;
});
const getAllBookings = (adminInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date().toISOString().split("T")[0];
    // deleting the expired booking
    yield booking_model_1.default.updateMany({
        date: { $lt: today },
    }, {
        $set: { expired: true },
    });
    // validating the admin
    const admin = yield admin_model_1.default.find({});
    if (admin[0].email !== adminInfo.email &&
        admin[0].phone !== adminInfo.phone &&
        admin[0].password !== adminInfo.password) {
        throw new ApiError_1.default(401, "Unauthorized Access");
    }
    // retrieving all the bookings except the expireds
    const bookings = yield booking_model_1.default.find({});
    return bookings;
});
exports.BookingService = {
    createBooking,
    getAllBookings,
};
