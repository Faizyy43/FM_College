import express from "express";
import AppliedCollege from "../models/AppliedCollege.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await AppliedCollege.find().sort({ createdAt: -1 });
  res.json(data);
});

export default router;
