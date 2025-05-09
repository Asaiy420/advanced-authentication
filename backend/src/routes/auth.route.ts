import express, {Request, Response} from "express"
import {Signup, Login, Logout, verifyEmail} from "../controllers/auth.controller.js"

const router = express.Router();

router.post("/signup", Signup)
router.post("/login", Login )
router.post("/logout", Logout)
router.post("/verify-email", verifyEmail)


export default router;