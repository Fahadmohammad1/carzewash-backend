import mongoose, { Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    carModel: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    slot: {
      type: String,
      required: true,
      enum: ["morning", "noon"],
    },
    formula: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

bookingSchema.index({ date: 1, slot: 1 }, { unique: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
