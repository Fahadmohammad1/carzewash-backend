import express from "express";
import { ContactController } from "./contact.controller";
const router = express.Router();

router.post("/create", ContactController.createContact);
router.get("/", ContactController.getAllContacts);
router.delete("/:id", ContactController.deleteContact);

export const ContactRoutes = router;
