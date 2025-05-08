import express, {Request, Response} from "express"
import dotenv from "dotenv"
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js"

dotenv.config();

const app = express();

app.use(express.json())

app.use("/api/auth", authRoutes)
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on the port ${PORT}`);
})
