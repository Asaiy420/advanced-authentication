import { Request, Response } from "express";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email.js";

export const Signup = async (req: Request, res: Response): Promise<any> => {
  const { username, email, password } = req.body;

  // Check for empty fields
  try {
    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }

    // check if user already exists

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // hash the password

    const hashedPassword = await bcrypt.hash(password, 10);

    // get the verification code

    const verificationToken = generateVerificationToken();

    // create the new user

    const user = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken,

      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    // save the user to db

    await user.save();

    // jwt

    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);

    const userObj = user.toObject() as any;
    delete userObj.password;

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      user: userObj,
    });
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        sucess: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    
    await user.save();

    await sendWelcomeEmail(user.email, user.username);

    const userObj = user.toObject() as any;
    delete userObj.password; // remove password

    res.status(200).json({
      success: true,
      message: "Email verified successfully!",
      user: userObj,
    });
  } catch (error: any) {
    console.error("Error when verifying email", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const Login = async (req: Request, res: Response): Promise<any> => {
  res.send("Login page");
};

export const Logout = async (req: Request, res: Response): Promise<any> => {
  res.send("logout page");
};
