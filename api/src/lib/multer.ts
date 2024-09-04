import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `${process.cwd()}/src/uploads/`);
    },
    filename: (req, file, callback)=>{
        callback(null, `${Date.now()}-${file.originalname}`)
    }
})

export const multerUpload = multer({storage})