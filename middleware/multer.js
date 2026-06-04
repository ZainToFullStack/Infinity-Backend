import multer from "multer";
const storage = multer.diskStorage({});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            cb(null, true)
        }
        else {
            cb(new Error("only images allowed"))
        }
    }

})


export default upload;