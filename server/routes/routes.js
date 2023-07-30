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