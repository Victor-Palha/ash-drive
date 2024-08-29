import express from "express";
import cors from "cors";
import { router } from "./http/controllers/routes";

export const app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());

// Routes
app.use(router)