import { Router } from "express";
import { BookingRoutes } from "../modules/booking/booking.routes";
import { AdminRoutes } from "../modules/admin/admin.route";
import { ContactRoutes } from "../modules/contact/contact.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/booking",
    route: BookingRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/contact",
    route: ContactRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
