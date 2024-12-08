import express from "express";
import { signTransaction } from "../controllers/txn";
import tryCatch from "../utils/tryCatch";

const router = express.Router();

router.route("/api/v1/txn/sign").post(tryCatch(signTransaction));

export default router;
