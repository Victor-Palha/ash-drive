import { Router } from "express";
import { viewController } from "./view-controller";
import { multerUpload } from "../../lib/multer";
import { uploadController } from "./upload-controller";
import { downloadController } from "./download-controller";

export const router = Router()

router
.get("/files", viewController)
.post("/upload", multerUpload.single("file"), uploadController)
.get("/download/:name", downloadController)