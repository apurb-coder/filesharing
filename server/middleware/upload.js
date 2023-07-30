import multer from 'multer'// it's a middleware: used to upload files

const upload = multer({dest: "uploads"})


export default upload;