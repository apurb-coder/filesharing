/*
metadata of the files is stored in the mongoDB.
uploaded files is stored in the server.
we download the files from the server.


here we are using a middleware named multer to handle our uploads,
multer basically manupulates the request body send by our front-end, and add a file object in the request body. 
the file object contains the metadata of the file. And that metadata we will be storing in the mongoDB.

metadata of file example:
file: {
    fieldname: 'file',
    originalname: 'luffy_gear_5_by_xavierjvg_df4256z.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: 'uploads',
    filename: 'e28a86214069101043491497be2aeeab',
    path: 'uploads\\e28a86214069101043491497be2aeeab',
    size: 2860351
  }

here the path field stores the path of the file stored in the server.

when downloading:  we use the mongoDB to get this path field data to download from the server

*/


import express from 'express';
import upload from '../middleware/upload.js';
import File from '../models/file.js';// importing the schema of table
import dotenv from 'dotenv'

dotenv.config();
const router= express.Router()


//on calling endpoint /upload run the beow function
//for uploading file
router.post('/upload' ,upload.single('file') ,async(req,res)=>{
    const fileObj={
        path: req.file.path,
        name: req.file.originalname
    }
    try{
        const file= await File.create(fileObj);//saving file in the database
        res
          .status(200)
          .json({
            path: `${process.env.DOWNLOAD_URL_BACKEND_LINK}/files/${file._id}`,
          });
    }
    catch(error){
        console.log(error.message)
        res.status(409).json({message:error.message})
    }
})


//for downloading file
router.get('/files/:fileId',async(req,res)=>{
  // :fileId is a variable
  try {
    //we are extracting the fileId portion from the url by using req.params.fileId
    const file = await File.findById(req.params.fileId);//finding the file
    file.downloadContent++;

    await file.save();

    //below function sending download response
    res.download(file.path, file.name); //download() is a inbuilt function to perform download
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
})
export default router;
