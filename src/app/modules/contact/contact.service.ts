import ApiError from "../../errors/ApiError";
import Admin, { TAdmin } from "../admin/admin.model";
import { TContact } from "./contact.interface";
import Contact from "./contact.model";

const createContact = async (contactInfo: TContact) => {
  const { email, phone } = contactInfo;

  const existingMessagesCount = await Contact.countDocuments({ email, phone });

  if (existingMessagesCount >= 2) {
    throw new ApiError(400, "Message limit is full");
  }

  const result = await Contact.create(contactInfo);

  return result;
};

const gellAllContacts = async (adminInfo: TAdmin) => {
  const admin = await Admin.findOne({
    phone: adminInfo.phone,
    email: adminInfo.email,
    password: adminInfo.password,
  });

  if (!admin) {
    throw new ApiError(401, "Unauthorized Access");
  }

  const result = await Contact.find({}).sort();

  return result;
};

const deleteContact = async (adminInfo: TAdmin, id: string) => {
  const admin = await Admin.findOne({
    phone: adminInfo.phone,
    email: adminInfo.email,
    password: adminInfo.password,
  });

  if (!admin) {
    throw new ApiError(401, "Unauthorized Access");
  }

  const findContact = await Contact.findOne({ _id: id });

  if (!findContact) {
    throw new ApiError(404, "Contact not found");
  }

  const result = await Contact.deleteOne({ _id: id });

  return result;
};

export const ContactService = {
  createContact,
  gellAllContacts,
  deleteContact,
};
