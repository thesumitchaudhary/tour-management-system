import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import travellerRouter from "./router/travellerRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

const PORT = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("hey it's working");
});

app.use("/api/traveller", travellerRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
