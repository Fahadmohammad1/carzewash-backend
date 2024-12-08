import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AdminService } from "./admin.service";
import sendResponse from "../../utils/sendResponse";

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.login(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Login successfull",
    data: result,
  });
});

const updatePassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.updatePassword(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Password updated successfully",
    data: result,
  });
});

export const AdminController = {
  login,
  updatePassword,
};
