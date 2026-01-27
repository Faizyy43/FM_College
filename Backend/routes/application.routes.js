import express from "express";
import { dummyAuth } from "../middleware/dummyAuth.middleware.js";
import {
  applyCollege,
  getMyApplications,
} from "../controllers/application.controller.js";

const router = express.Router();

router.post("/apply", dummyAuth, applyCollege);
router.get("/my", dummyAuth, getMyApplications);

export default router;
