"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const admin_model_1 = __importDefault(require("./admin.model"));
const login = (adminInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const findAdmin = yield admin_model_1.default.findOne({
        phone: adminInfo.phone,
        email: adminInfo.email,
    });
    if ((findAdmin === null || findAdmin === void 0 ? void 0 : findAdmin.password) !== adminInfo.password) {
        throw new ApiError_1.default(400, "Failed to login");
    }
    return {
        verified: 200,
    };
});
const updatePassword = (adminInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const findAdmin = yield admin_model_1.default.find({});
    if (findAdmin[0].phone !== adminInfo.phone &&
        findAdmin[0].email !== adminInfo.email &&
        findAdmin[0].password !== adminInfo.password) {
        throw new ApiError_1.default(401, "Unauthorized Access");
    }
    const result = yield admin_model_1.default.updateOne({ email: adminInfo.email }, { password: adminInfo.newPassword });
    return result;
});
exports.AdminService = {
    login,
    updatePassword,
};
