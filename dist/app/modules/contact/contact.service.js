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
exports.ContactService = void 0;
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const admin_model_1 = __importDefault(require("../admin/admin.model"));
const contact_model_1 = __importDefault(require("./contact.model"));
const createContact = (contactInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phone } = contactInfo;
    const existingMessagesCount = yield contact_model_1.default.countDocuments({ email, phone });
    if (existingMessagesCount >= 2) {
        throw new ApiError_1.default(400, "Message limit is full");
    }
    const result = yield contact_model_1.default.create(contactInfo);
    return result;
});
const gellAllContacts = (adminInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_model_1.default.findOne({
        phone: adminInfo.phone,
        email: adminInfo.email,
        password: adminInfo.password,
    });
    if (!admin) {
        throw new ApiError_1.default(401, "Unauthorized Access");
    }
    const result = yield contact_model_1.default.find({}).sort();
    return result;
});
const deleteContact = (adminInfo, id) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_model_1.default.findOne({
        phone: adminInfo.phone,
        email: adminInfo.email,
        password: adminInfo.password,
    });
    if (!admin) {
        throw new ApiError_1.default(401, "Unauthorized Access");
    }
    const findContact = yield contact_model_1.default.findOne({ _id: id });
    if (!findContact) {
        throw new ApiError_1.default(404, "Contact not found");
    }
    const result = yield contact_model_1.default.deleteOne({ _id: id });
    return result;
});
exports.ContactService = {
    createContact,
    gellAllContacts,
    deleteContact,
};
