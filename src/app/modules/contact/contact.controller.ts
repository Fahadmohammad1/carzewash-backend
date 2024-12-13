import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ContactService } from "./contact.service";
import sendResponse from "../../utils/sendResponse";

// add contact info to db
const createContact = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactService.createContact(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Contact created successfully",
    data: result,
  });
});

// get all contact info

const getAllContacts = catchAsync(async (req: Request, res: Response) => {
  const phone = req.query.phone as string;
  const email = req.query.email as string;
  const password = req.query.password as string;

  const result = await ContactService.gellAllContacts({
    phone,
    email,
    password,
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Contacts retrieved successfully",
    data: result,
  });
});

// delete single contacts
const deleteContact = catchAsync(async (req: Request, res: Response) => {
  const phone = req.query.phone as string;
  const email = req.query.email as string;
  const password = req.query.password as string;
  const id = req.params.id;

  const result = await ContactService.deleteContact(
    {
      phone,
      email,
      password,
    },
    id
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Contact deleted successfully",
    data: result,
  });
});

export const ContactController = {
  createContact,
  getAllContacts,
  deleteContact,
};
