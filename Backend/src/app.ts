import { config} from 'dotenv';
config();
// dotenv must always paste in the top of the file
import express from "express";
// npm i --save-dev @types/morgan
import morgon from 'morgan'
import cookieParser from 'cookie-parser';
import cors from 'cors'

import appRouter from "./routes";

const app = express();

// middleware
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRETE_KEY))

// remove it from the production
app.use(morgon("dev"));

app.use("/api/v1", appRouter);

export default app;