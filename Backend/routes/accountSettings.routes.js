import express from "express";
import {
  getAccountSettings,
  saveAccountSettings,
  deleteAccount, // ✅ import
} from "../controllers/accountSettings.controller.js";

const router = express.Router();

router.get("/", getAccountSettings);
router.post("/", saveAccountSettings);
router.delete("/", deleteAccount); // ✅ DELETE ACCOUNT

export default router;
