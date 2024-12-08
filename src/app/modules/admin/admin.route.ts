import express from "express";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.post("/login", AdminController.login);

router.patch("/update-password", AdminController.updatePassword);

export const AdminRoutes = router;
