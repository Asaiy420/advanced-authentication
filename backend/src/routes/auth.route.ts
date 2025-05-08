import express, {Request, Response} from "express"
import {Signup, Login, Logout} from "../controllers/auth.controller.js"

const router = express.Router();

router.get("/signup", Signup)
router.get("/login", Login )
router.get("/logout", Logout)


export default router;