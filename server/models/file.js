//for file validation: file bheja hai ki nahi front-end se?

import mongoose from 'mongoose';



const fileSchema= new mongoose.Schema({
    path:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
})

//creating table(collection) in mongodb
const File= mongoose.model('files',fileSchema);

export default File;