import { Router } from "express";
import { viewController } from "./view-controller";
import { multerUpload } from "../../lib/multer";
import { uploadController } from "./upload-controller";
import { downloadController } from "./download-controller";
import { searchController } from "./search-controller";
import { deleteController } from "./delete-controller";

export const router = Router()

router
.get("/files", viewController)
.post("/upload", multerUpload.single("file"), uploadController)
.get("/download/:name", downloadController)
.get("/files/search", searchController)
.delete("/files/:name", deleteController)