import { Router } from "express";
import { BookingRoutes } from "../modules/booking/booking.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/booking",
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
