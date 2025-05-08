import express, {Request, Response} from "express"
import {Signup, Login, Logout} from "../controllers/auth.controller.js"

const router = express.Router();

router.post("/signup", Signup)
router.post("/login", Login )
router.post("/logout", Logout)


export default router;