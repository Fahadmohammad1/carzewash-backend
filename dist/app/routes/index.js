"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_routes_1 = require("../modules/booking/booking.routes");
const admin_route_1 = require("../modules/admin/admin.route");
const contact_route_1 = require("../modules/contact/contact.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/booking",
        route: booking_routes_1.BookingRoutes,
    },
    {
        path: "/admin",
        route: admin_route_1.AdminRoutes,
    },
    {
        path: "/contact",
        route: contact_route_1.ContactRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
