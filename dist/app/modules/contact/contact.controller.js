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
exports.ContactController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const contact_service_1 = require("./contact.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
// add contact info to db
const createContact = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contact_service_1.ContactService.createContact(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Contact created successfully",
        data: result,
    });
}));
// get all contact info
const getAllContacts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const phone = req.query.phone;
    const email = req.query.email;
    const password = req.query.password;
    const result = yield contact_service_1.ContactService.gellAllContacts({
        phone,
        email,
        password,
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Contacts retrieved successfully",
        data: result,
    });
}));
// delete single contacts
const deleteContact = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const phone = req.query.phone;
    const email = req.query.email;
    const password = req.query.password;
    const id = req.params.id;
    const result = yield contact_service_1.ContactService.deleteContact({
        phone,
        email,
        password,
    }, id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Contact deleted successfully",
        data: result,
    });
}));
exports.ContactController = {
    createContact,
    getAllContacts,
    deleteContact,
};
