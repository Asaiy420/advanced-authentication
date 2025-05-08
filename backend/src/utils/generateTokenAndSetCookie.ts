import jwt from "jsonwebtoken"
import  {Request, Response} from "express"
import "dotenv/config"

export const generateTokenAndSetCookie = (res: Response, userId:Object) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET as string, {
        expiresIn: "7d",
    })

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", 
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
    });

    return token;
}