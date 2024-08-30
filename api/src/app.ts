import express from "express";
import cors from "cors";
import { router } from "./http/controllers/routes";
import path from "node:path";

export const app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use(router)