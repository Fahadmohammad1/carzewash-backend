import express from "express";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.patch("/update-password", AdminController.updatePassword);

export const AdminRoutes = router;
