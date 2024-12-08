import ApiError from "../../errors/ApiError";
import Admin, { TAdmin } from "./admin.model";

const updatePassword = async (adminInfo: TAdmin) => {
  const findAdmin = await Admin.find({});

  if (
    findAdmin[0].phone !== adminInfo.phone &&
    findAdmin[0].email !== adminInfo.email &&
    findAdmin[0].password !== adminInfo.password
  ) {
    throw new ApiError(401, "Unauthorized Access");
  }

  const result = await Admin.updateOne(
    { email: adminInfo.email },
    { password: adminInfo.newPassword }
  );

  return result;
};

export const AdminService = {
  updatePassword,
};
