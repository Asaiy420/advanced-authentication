import express, {Request, Response} from "express"


export const Signup = async (req: Request, res: Response): Promise<any> => {
    res.send("Signup Page")
}

export const Login = async (req: Request, res: Response): Promise<any> => {
    res.send("Login page")
}

export const Logout = async (req: Request, res: Response): Promise<any> => {
    res.send("logout page")
}