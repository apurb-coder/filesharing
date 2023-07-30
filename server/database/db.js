import mongoose from 'mongoose'

export const Connection=async(user,password)=>{
    try{
        const DB_URL = `mongodb+srv://${user}:${password}@filesharing-cluster0.kkrqjgr.mongodb.net/?retryWrites=true&w=majority`;
        await mongoose.connect(DB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("Connected to database Sucessfully");
    }
    catch(error){
        console.error("Failed to connect with MongoDB",error.message);
    }
}