import express from "express";
import { listUsers, signIn, signUp } from "../controllers/auth";
import tryCatch from "../utils/tryCatch"
const router = express.Router();

router.route("/api/v1/signIn").post(tryCatch(signIn));
router.route("/api/v1/signUp").post(tryCatch(signUp));
router.route("/api/v1/listusers").get(tryCatch(listUsers))


export default router;