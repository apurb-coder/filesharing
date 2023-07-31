import multer from 'multer'// it's a middleware: used to upload files
//create a file named 'uploads' in the server
const upload = multer({dest: "uploads"})


export default upload;
