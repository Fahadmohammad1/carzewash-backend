"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const errorHandler_1 = __importDefault(require("./app/middlewares/errorHandler"));
const app = (0, express_1.default)();
//parser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: "*" }));
// app routes
app.use("/api", routes_1.default);
app.get("/health", (req, res) => {
    res.send("Api is Working fine !");
});
// error handler
app.use((err, req, res, next) => {
    (0, errorHandler_1.default)(err, req, res, next);
});
//Not Found
app.use((req, res, next) => {
    (0, notFound_1.default)(req, res, next);
});
exports.default = app;
