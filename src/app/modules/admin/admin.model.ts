import mongoose, { Schema } from "mongoose";

export type TAdmin = {
  phone: string;
  email: string;
  password: string;
  newPassword?: string;
};

const adminSchema = new Schema<TAdmin>(
  {
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
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

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
