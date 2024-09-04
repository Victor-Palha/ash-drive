import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log()
        callback(null, `${process.cwd()}/src/uploads/`);
    },
    filename: (req, file, callback)=>{
        callback(null, `${file.originalname}-${Date.now()}`)
    }
})

export const multerUpload = multer({storage})